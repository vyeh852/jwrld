import Note from "@/components/note/Note";
import { Note as DomainNote } from "@/domain/models/note";
import { Category } from "@/domain/models/category";
import React from "react";
import { styled } from "@linaria/react";

const Container = styled.div`
  padding: 15px;
  flex: 1;
  > div,
  .category-title {
    margin-bottom: 15px;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .category-title {
    font-size: 20px;
    font-weight: 700;
  }
`;

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

type CategoryNotesContainerProps = {
  categories: Category[];
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
};

type CategoryProps = {
  category: Category;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
};

/**
 * @return {JSX.Element}
 */
export default function CategoryNotesContainer({
  categories,
  onDeleteNote,
}: CategoryNotesContainerProps): JSX.Element {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryWithNote
          category={category}
          key={category.id}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </Container>
  );
}

const CategoryWithNote = ({
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
