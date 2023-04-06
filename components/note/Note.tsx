import { Note as DomainNote } from "@/domain/models/note";
import React from "react";
import { useRouter } from "next/router";

import { styled } from "@linaria/react";

const NoteContainer = styled.div`
  position: relative;
  .delete-icon {
    position: absolute;
    right: 5px;
    top: 0;
    display: none;
  }

  &:hover {
    .delete-icon {
      display: block;
    }
  }
`;

type NoteProps = {
  note: DomainNote;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
};

/**
 * @return {JSX.Element}
 */
export default function Note({ note, onDeleteNote }: NoteProps): JSX.Element {
  const router = useRouter();
  const { id, title } = note;

  return (
    <NoteContainer onClick={() => router.push(`/${id}`)}>
      <span
        className="delete-icon"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteNote({ title, id });
        }}
      >
        x
      </span>
      <span>{title}</span>
    </NoteContainer>
  );
}
