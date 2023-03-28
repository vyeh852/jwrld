import excuteQuery from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  success: boolean;
  message?: string;
};

type User = {
  id: number;
};

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function categoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      try {
        const session = await getSession({ req });
        if (!session) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
        const title: string = req.body.title;

        const user = await excuteQuery<Array<User>>({
          query: "SELECT id FROM users WHERE email = ?",
          values: [session.user?.email],
        });
        const userId = user[0].id;

        await excuteQuery({
          query: "INSERT INTO categories (name, user_id) VALUES(?, ?)",
          values: [title, userId],
        });

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    default:
      throw new Error("not a valid request method on this controller");
  }
}

export default categoriesHandler;
