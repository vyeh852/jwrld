import { NetNote } from "@/domain/remote/netNote";
import prisma from "@/lib/db";
import { getUserSession } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

type NetCategoryResponse = {
  id: number | null;
  name: string;
  notes: Array<Pick<NetNote, "id" | "title">>;
};

type Response = {
  success: boolean;
  message?: string;
  data?: NetCategoryResponse[];
};

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function overviewHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "GET":
      try {
        const session = await getUserSession(req, res);
        const userId = session?.userId;
        const categoryWithNote = await getCategories(userId);

        res.status(200).json({
          success: true,
          data: categoryWithNote,
        });
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    default:
      throw new Error("not a valid request method on this controller");
  }
}

/**
 * @param {number | undefined} userId
 * @return {NetCategoryResponse[]}
 */
export async function getCategories(
  userId?: number
): Promise<NetCategoryResponse[]> {
  const categoriesWithNotes = await prisma.category.findMany({
    where: {
      user_id: userId,
    },
    include: {
      notes: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  const notesWithoutCategory = await prisma.note.findMany({
    where: {
      user_id: userId,
      category_id: null,
    },
    select: {
      id: true,
      title: true,
    },
  });

  const combinedCategories: NetCategoryResponse[] = categoriesWithNotes.map(
    (category) => {
      return {
        id: category.id,
        name: category.name,
        notes: category.notes.map((note) => ({
          id: note.id,
          title: note.title,
        })),
      };
    }
  );

  const notesWithoutCategoryResponse =
    notesWithoutCategory.reduce<NetCategoryResponse>(
      (acc, cur) => {
        const { id, title } = cur;
        acc.notes.push({
          id,
          title,
        });

        return acc;
      },
      {
        id: null,
        name: "無分類",
        notes: [],
      }
    );

  return [notesWithoutCategoryResponse, ...combinedCategories];
}
