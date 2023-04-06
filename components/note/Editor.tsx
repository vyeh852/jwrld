import React, { useCallback } from "react";
import { styled } from "@linaria/react";
import useCodeMirror from "@/components/note/use-codemirror";

const Textarea = styled.div`
  flex: 1 1 50%;
  min-width: 0;
  height: calc(100vh - 50px);
  .cm-theme-light,
  .cm-editor {
    height: 100%;
    background-color: #282c34;
  }

  .cm-content {
    white-space: normal;
    flex-shrink: initial;
  }
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
  const handleChange = useCallback(
    (state) => onChangeNoteContent(state.doc.toString()),
    [onChangeNoteContent]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: noteContent,
    onChange: handleChange,
  });

  return <Textarea className="editor-wrapper" ref={refContainer}></Textarea>;
}
