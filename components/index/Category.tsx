import Note from "@/components/index/Note";
import { Note as DomainNote } from "@/domain/models/note";
import { Category as DomainCategory } from "@/domain/models/category";
import React from "react";
import { styled } from "@linaria/react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "@/constant/draggableItem";

const Container = styled.div`
  min-width: 150px;
  margin-bottom: 15px;

  &[data-isOver="true"] {
    background: #eee;
  }
`;

const Title = styled.p`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  background: #fff;

  @media (min-width: 768px) {
    padding: 0 15px;
  }
`;

const NoteContainer = styled.div`
  @media (min-width: 768px) {
    margin: 15px;
  }
`;

interface CategoryProps {
  category: DomainCategory;
  onMoveNote: (
    from: { categoryId: number | null; index: number },
    to: { categoryId: number | null; index: number }
  ) => void;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
}

const Category = ({
  category,
  onDeleteNote,
  onMoveNote,
}: CategoryProps): JSX.Element => {
  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.NOTE,
    drop: (
      item: { id: number; categoryId: number | null; index: number },
      monitor: DropTargetMonitor
    ) => {
      const from = {
        categoryId: item.categoryId,
        index: item.index,
      };
      const toCategoryId = category.id;

      if (monitor.didDrop()) {
        // 處理疊在 note 上, 插入筆記的情境
        const toIndex =
          monitor.getDropResult<{ toIndex: number }>()?.toIndex || 0;

        onMoveNote(from, { categoryId: toCategoryId, index: toIndex });
      } else {
        // 處理隨意丟進 container, 插入該類別筆記的最後面
        const toCategoryNotesCount = category.notes.length;

        onMoveNote(from, {
          categoryId: toCategoryId,
          index: toCategoryNotesCount,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Container ref={dropRef} data-isOver={isOver}>
      <Title>{category.name}</Title>
      <NoteContainer>
        {category.notes.map((note, index) => (
          <Note
            note={note}
            key={`${note.id}-${index}`}
            index={index}
            onDeleteNote={onDeleteNote}
            categoryId={category.id}
          />
        ))}
      </NoteContainer>
    </Container>
  );
};

export default Category;
