import prisma from "@/lib/db";
import { getUserId } from "@/pages/api/auth/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  success: boolean;
  message?: string;
};

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
async function categoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "POST":
      try {
        const userId = await getUserId(req);
        const title: string = req.body.title;

        if (!userId) {
          throw new Error("User ID is required");
        }

        await prisma.category.create({
          data: {
            name: title,
            user_id: userId,
          },
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
