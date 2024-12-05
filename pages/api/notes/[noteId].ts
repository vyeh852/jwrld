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
export default async function noteHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const userId = await getUserId(req);

  if (!userId) {
    throw new Error("User ID is required");
  }

  switch (req.method) {
    case "GET":
      try {
        const { noteId } = req.query;
        if (typeof noteId === "string") {
          const noteContent = await getNote(noteId, userId);

          if (noteContent) {
            res.status(200).json({ success: true, message: noteContent });
          }
        }
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    case "PUT":
      try {
        await updateNoteContent(req, userId);

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    case "DELETE":
      try {
        await deleteNote(req, userId);

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    default:
      throw new Error("not a valid request method on this controller");
  }
}

/**
 * @param {string} noteId
 * @param {number | undefined} userId
 * @return {string | undefined | null}
 */
export async function getNote(
  noteId: string,
  userId?: number
): Promise<string | undefined | null> {
  const note = await prisma.note.findFirst({
    where: {
      id: Number(noteId),
      user_id: userId,
    },
    select: {
      content: true,
    },
  });

  return note?.content;
}

/**
 * @param {NextApiRequest} req
 * @param {number | undefined} userId
 * @return {Promise<void>}
 */
async function updateNoteContent(
  req: NextApiRequest,
  userId?: number
): Promise<void> {
  const content = req.body.content;
  const noteId = req.query.noteId;

  await prisma.note.update({
    where: {
      id: Number(noteId),
      user_id: userId,
    },
    data: {
      content: content,
    },
  });
}

/**
 * @param {NextApiRequest} req
 * @param {number | undefined} userId
 * @return {Promise<void>}
 */
async function deleteNote(req: NextApiRequest, userId?: number): Promise<void> {
  const noteId = Number(req.query.noteId);

  if (!userId) {
    throw new Error("User ID is required");
  }

  await prisma.note.deleteMany({
    where: {
      id: noteId,
      user_id: userId,
    },
  });
}
