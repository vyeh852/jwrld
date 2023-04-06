import { NetNote } from "@/domain/remote/netNote";
import excuteQuery from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";

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
  switch (req.method) {
    case "GET":
      try {
        const { noteId } = req.query;
        const noteContent = await getNote(req, noteId);

        res.status(200).json({ success: true, message: noteContent });
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    case "PUT":
      try {
        await updateNoteContent(req);

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(422).json({ success: false });
      }
      return;
    case "DELETE":
      try {
        await deleteNote(req);

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
 * @param {NextApiRequest} req
 * @param {string} noteId
 * @return {string}
 */
export async function getNote(
  req: NextApiRequest | NextRequest,
  noteId: string
): Promise<string> {
  const session = await getSession({ req });
  const userId = session?.userId;

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
 * @return {Promise<void>}
 */
async function updateNoteContent(req: NextApiRequest): Promise<void> {
  const session = await getSession({ req });
  const userId = session?.userId;
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
 * @return {Promise<void>}
 */
async function deleteNote(req: NextApiRequest): Promise<void> {
  const session = await getSession({ req });
  const userId = session?.userId;
  const noteId = req.query.noteId;

  await excuteQuery({
    query: `
           DELETE FROM notes WHERE id = ? AND user_id = ?
          `,
    values: [noteId, userId],
  });
}
