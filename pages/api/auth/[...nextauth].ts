import excuteQuery from "@/lib/db";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user: { id, name, email }, account }) {
      await excuteQuery({
        query:
          "INSERT INTO users (name, email, platform_type, platform_id) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, email = ?",
        values: [name, email, account?.provider, id, name, email],
      });

      return true;
    },
    async session({ session, token }) {
      const user = await excuteQuery<Array<{ id: number }>>({
        query: "SELECT id FROM users WHERE platform_id = ?",
        values: [token.id],
      });

      session["userId"] = user[0].id;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.provider = account.provider;
      }
      if (user) {
        token.id = user.id.toString();
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

export const getUserSession = async (
  req: NextApiRequest | GetServerSidePropsContext["req"],
  res: NextApiResponse | GetServerSidePropsContext["res"]
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return;

  const userId = await excuteQuery<Array<{ id: number }>>({
    query: "SELECT id FROM users WHERE email = ?",
    values: [session?.user?.email],
  });

  session["userId"] = userId[0].id;

  return session;
};
