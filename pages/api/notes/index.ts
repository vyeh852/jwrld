import excuteQuery from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Response = {
  success: boolean;
  message?: string;
};

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function notesHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "POST":
      try {
        const session = await getSession({ req });
        const title: string = req.body.title;

        await excuteQuery({
          query: "INSERT INTO notes (title, content, user_id) VALUES(?, ?, ?)",
          values: [title, "", session?.userId],
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

export default notesHandler;
