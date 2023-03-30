import { Note } from "@/domain/models/note";

export type Category = {
  id: number | null;
  title: string;
  notes: Note[];
};
