import excuteQuery from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email } }) {
      await excuteQuery({
        query:
          "INSERT INTO users (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?, email = ?",
        values: [name, email, name, email],
      });

      return true;
    },
  },
});
