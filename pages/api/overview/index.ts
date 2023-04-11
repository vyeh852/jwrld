import { NetNote } from "@/domain/remote/netNote";
import excuteQuery from "@/lib/db";
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

type NetCategoryWithNote = {
  category_name: string | null;
  note_title: string;
  note_content: string;
  note_id: number;
  category_id: number | null;
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
  const categoryWithNote = await excuteQuery<NetCategoryWithNote[]>({
    query: `
         SELECT categories.id AS category_id, notes.id AS note_id, name AS category_name, title AS note_title 
         FROM categories 
         LEFT JOIN notes ON categories.id = notes.category_id 
         WHERE categories.user_id = ?
         UNION 
         SELECT categories.id AS category_id, notes.id AS note_id, name as category_name, title AS note_title
         FROM notes 
         LEFT JOIN categories ON categories.id = notes.category_id 
         WHERE notes.category_id IS NULL AND notes.user_id = ?
        `,
    values: [userId, userId],
  });

  return createToNetCategoryResponse(categoryWithNote);
}

const createToNetCategoryResponse = (
  categoryWithNote: NetCategoryWithNote[]
): NetCategoryResponse[] => {
  const result = categoryWithNote.reduce<NetCategoryResponse[]>(
    (acc, cur) => {
      const targetCategory = acc.find(
        (categoryWithNote) => categoryWithNote.id === cur.category_id
      );

      if (targetCategory) {
        targetCategory.notes.push({
          id: cur.note_id,
          title: cur.note_title,
        });
      } else {
        const categoryResponse = {
          id: cur.category_id,
          name: cur.category_name || "",
          notes: cur.note_id
            ? [
                {
                  id: cur.note_id,
                  title: cur.note_title,
                },
              ]
            : [],
        };

        acc.push(categoryResponse);
      }

      return acc;
    },
    [{ id: null, name: "無分類", notes: [] }]
  );

  return result;
};
