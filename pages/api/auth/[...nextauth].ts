import prisma from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
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
      return session;
    },
    async jwt({ token, account }) {
      if (!token.email) {
        throw new Error("User has no email");
      }

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.provider = account.provider;
      }

      if (token.userId) {
        return token;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        token.userId = user.id;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
