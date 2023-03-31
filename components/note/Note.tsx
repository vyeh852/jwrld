import { Note as DomainNote } from "@/domain/models/note";
import React from "react";
import { useRouter } from "next/router";

type NoteProps = {
  note: DomainNote;
};

/**
 * @return {JSX.Element}
 */
export default function Note({ note }: NoteProps): JSX.Element {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/${note.id}`)}>
      <span>{note.title}</span>
      <br />
    </div>
  );
}
