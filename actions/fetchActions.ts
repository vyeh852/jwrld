import { Category } from "@/domain/models/category";
import { Note } from "@/domain/models/note";
import axios from "axios";

export const createNote = async ({ title }: Partial<Note>): Promise<void> => {
  try {
    axios.post("/api/notes", { title });
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
    axios.post("/api/categories", { title });
  } catch (error) {
    throw new Error(
      "something went wrong when creating category, please try it again later"
    );
  }
};
