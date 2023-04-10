import { Note as DomainNote } from "@/domain/models/note";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { styled } from "@linaria/react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "@/constant/draggableItem";

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
  categoryId: number | null;
  index: number;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
};

/**
 * @param {NoteProps} props
 * @return {JSX.Element}
 */
export default function Note(props: NoteProps): JSX.Element {
  const router = useRouter();
  const { note, onDeleteNote, categoryId, index } = props;
  const { id, title } = note;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.NOTE,
    item: {
      id,
      categoryId,
      index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.NOTE,
    // TODO: for better UX
    // hover: (
    //   item: { id: string; index: number },
    //   monitor: DropTargetMonitor
    // ) => {
    //   const fromIndex = item.index;
    //   const toIndex = index;

    //   if (toIndex !== fromIndex) {
    //   }
    // },
    drop: () => ({ toIndex: index }),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <NoteContainer
      onClick={() => router.push(`/${id}`)}
      ref={dragRef(dropRef(ref)) as any}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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
