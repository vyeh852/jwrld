import Note from "@/components/note/Note";
import { Note as DomainNote } from "@/domain/models/note";
import { Category } from "@/domain/models/category";
import React from "react";
import { styled } from "@linaria/react";

const NoteContainer = styled.div`
  > div {
    padding: 15px;
    border-top: 1px solid #dadce0;
    border-left: 1px solid #dadce0;
    border-right: 1px solid #dadce0;
    &:last-child {
      border-bottom: 1px solid #dadce0;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  }
`;

type CategoryProps = {
  category: Category;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
};

export const CategoryNote = ({
  category,
  onDeleteNote,
}: CategoryProps): JSX.Element => {
  return (
    <div>
      <p className="category-title">{category.name}</p>
      <NoteContainer>
        {category.notes.map((note) => (
          <Note note={note} key={note.id} onDeleteNote={onDeleteNote} />
        ))}
      </NoteContainer>
    </div>
  );
};
