import React from "react";
import { styled } from "@linaria/react";

const Textarea = styled.textarea`
  flex: 1 1 50%;
  height: 100vh;
  padding: 10px;
`;

type EditorProps = {
  noteContent: string;
  onChangeNoteContent: (noteContent: string) => void;
};

/**
 * Note Editor
 * @return {JSX.Element}
 */
export default function Editor({
  noteContent,
  onChangeNoteContent,
}: EditorProps): JSX.Element {
  return (
    <Textarea
      value={noteContent}
      onChange={(e) => onChangeNoteContent(e.target.value)}
    />
  );
}
