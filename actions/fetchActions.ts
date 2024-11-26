import { Category } from "@/domain/models/category";
import { Note } from "@/domain/models/note";
import axios from "axios";

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
}: {
  title: string;
}): Promise<void> => {
  try {
    await axios.post("/api/categories", { title });
  } catch (error) {
    throw new Error(
      "something went wrong when creating category, please try it again later"
    );
  }
};

export const updateNote = async (
  noteId: string,
  note: Partial<Note>
): Promise<void> => {
  try {
    await axios.put(`/api/notes/${noteId}`, note);
  } catch (error) {
    throw new Error(
      "something went wrong when updating note, please try it again later"
    );
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get("api/overview");

    return data.data;
  } catch (error) {
    throw new Error(
      "something went wrong when getting categories, please try it again later"
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
