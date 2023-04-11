import { Note } from "@/domain/models/note";

export type Category = {
  id: number | null;
  name: string;
  notes: Note[];
};
