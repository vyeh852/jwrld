import Note from "@/components/index/Note";
import { Note as DomainNote } from "@/domain/models/note";
import { Category as DomainCategory } from "@/domain/models/category";
import React from "react";
import { styled } from "@linaria/react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "@/constant/draggableItem";

const NoteContainer = styled.div`
  > div {
    padding: 15px;
    border-top: 1px solid #dadce0;
    border-left: 1px solid #dadce0;
    border-right: 1px solid #dadce0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
  category: DomainCategory;
  onMoveNote: (
    from: { categoryId: number | null; index: number },
    to: { categoryId: number | null; index: number }
  ) => void;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
};

export const Category = ({
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
    <div
      ref={dropRef}
      style={{ minWidth: "150px", background: isOver ? "#eee" : "transparent" }}
    >
      <p className="category-title">{category.name}</p>
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
    </div>
  );
};
