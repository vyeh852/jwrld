import { Note } from "@/domain/models/note";

export type Category = {
  id: string | number;
  title: string;
  notes: Record<string, Array<Note>>;
};
