import { GetServerSidePropsContext, NextApiRequest } from "next";
import { decode } from "next-auth/jwt";

export const getUserId = async (
  req: NextApiRequest | GetServerSidePropsContext["req"]
) => {
  const sessionToken = req.cookies["next-auth.session-token"];
  const decodedToken = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (typeof decodedToken?.userId === "number") {
    return decodedToken.userId;
  } else {
    return null;
  }
};
