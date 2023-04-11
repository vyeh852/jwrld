import { NetNote } from "@/domain/remote/netNote";
import excuteQuery from "@/lib/db";
import { getUserSession } from "@/pages/api/auth/[...nextauth]";
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
  const session = await getUserSession(req, res);
  const userId = session?.userId;

  switch (req.method) {
    case "GET":
      try {
        const { noteId } = req.query;
        const noteContent = await getNote(noteId, userId);

        res.status(200).json({ success: true, message: noteContent });
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
 * @return {string}
 */
export async function getNote(
  noteId: string,
  userId?: number
): Promise<string> {
  const notes = await excuteQuery<NetNote[]>({
    query: `
           SELECT content FROM notes WHERE id = ? AND user_id = ?
          `,
    values: [noteId, userId],
  });

  const noteContent = notes[0]?.content;

  return noteContent;
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

  await excuteQuery({
    query: `
           UPDATE notes SET content = ? WHERE id = ? AND user_id = ?
          `,
    values: [content, noteId, userId],
  });
}

/**
 * @param {NextApiRequest} req
 * @param {number | undefined} userId
 * @return {Promise<void>}
 */
async function deleteNote(req: NextApiRequest, userId?: number): Promise<void> {
  const noteId = req.query.noteId;

  await excuteQuery({
    query: `
           DELETE FROM notes WHERE id = ? AND user_id = ?
          `,
    values: [noteId, userId],
  });
}
