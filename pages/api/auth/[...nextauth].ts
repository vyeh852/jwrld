import prisma from "@/lib/db";
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
    async signIn({ user, account }) {
      const { id, name, email } = user;
      if (!account || !id || !name || !email) {
        throw new Error("Missing user information");
      }

      await prisma.user.upsert({
        where: {
          platform_type: account.provider,
        },
        update: {
          name: name,
          email: email,
        },
        create: {
          name: name,
          email: email,
          platform_type: account.provider,
        },
      });

      return true;
    },
    async session({ session }) {
      if (!session?.user?.email) {
        throw new Error("User have no email");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        session["userId"] = user.id;
      }

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
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    select: {
      id: true,
    },
  });

  const userId = user?.id;
  if (userId) {
    session["userId"] = userId;
  }

  return session;
};
