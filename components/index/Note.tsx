import { Note as DomainNote } from "@/domain/models/note";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@linaria/react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "@/constant/draggableItem";

const NoteContainer = styled.div`
  position: relative;
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
`;

const DeleteIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 0;
  display: none;

  &[data-show="true"] {
    display: block;
  }
`;

interface NoteProps {
  note: DomainNote;
  categoryId: number | null;
  index: number;
  onDeleteNote: ({ id, title }: Pick<DomainNote, "id" | "title">) => void;
}

/**
 * @param {NoteProps} props
 * @return {JSX.Element}
 */
const Note = (props: NoteProps): JSX.Element => {
  const router = useRouter();
  const { note, onDeleteNote, categoryId, index } = props;
  const { id, title } = note;
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

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

  const [{}, dropRef] = useDrop(() => ({
    accept: ItemTypes.NOTE,
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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <DeleteIcon
        onClick={(e) => {
          e.stopPropagation();
          onDeleteNote({ title, id });
        }}
        data-show={isHovering}
      >
        x
      </DeleteIcon>
      <span>{title}</span>
    </NoteContainer>
  );
};

export default Note;
