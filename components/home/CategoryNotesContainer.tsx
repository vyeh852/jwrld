import Note from "@/components/note/Note";
import { Category } from "@/domain/models/category";
import React from "react";
import { styled } from "@linaria/react";

const Container = styled.div`
  padding: 15px;
  flex: 1;
  > div {
    margin-top: 10px;
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
};

type CategoryProps = {
  category: Category;
};

/**
 * @return {JSX.Element}
 */
export default function CategoryNotesContainer({
  categories,
}: CategoryNotesContainerProps): JSX.Element {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryWithNote category={category} key={category.id} />
      ))}
    </Container>
  );
}

const CategoryWithNote = ({ category }: CategoryProps): JSX.Element => {
  return (
    <div>
      <p className="category-title">{category.name}</p>
      <NoteContainer>
        {category.notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </NoteContainer>
    </div>
  );
};
