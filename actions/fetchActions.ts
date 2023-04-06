import { Category } from "@/domain/models/category";
import { Note } from "@/domain/models/note";
import axios from "axios";

type Response = {
  success: boolean;
  message?: string;
  data: Category[];
};

export const createNote = async ({ title }: Partial<Note>): Promise<void> => {
  try {
    await axios.post("/api/notes", { title });
  } catch (error) {
    throw new Error(
      "something went wrong when creating note, please try it again later"
    );
  }
};

export const createCategory = async ({
  title,
}: Partial<Category>): Promise<void> => {
  try {
    await axios.post("/api/categories", { title });
  } catch (error) {
    throw new Error(
      "something went wrong when creating category, please try it again later"
    );
  }
};

export const updateNoteContent = async (
  noteId: number,
  content: string
): Promise<void> => {
  try {
    await axios.put(`/api/notes/${noteId}`, { content });
  } catch (error) {
    throw new Error(
      "something went wrong when updating note content, please try it again later"
    );
  }
};

export const getCategoryWithNote = async (): Promise<Category[]> => {
  try {
    const categoriesJson = await fetch("/api/overview");
    const categories: Response = await categoriesJson.json();

    return categories.data;
  } catch (error) {
    throw new Error(
      "something went wrong when getting category with note, please try it again later"
    );
  }
};

export const deleteNote = async ({ id }: Pick<Note, "id">): Promise<void> => {
  try {
    await axios.delete(`/api/notes/${id}`);
  } catch (error) {
    throw new Error(
      "something went wrong when deleting note, please try it again later"
    );
  }
};
