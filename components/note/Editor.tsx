import React from "react";
import { styled } from "@linaria/react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDarkTheme } from "@codemirror/theme-one-dark";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { atomone } from "@uiw/codemirror-theme-atomone";

const Textarea = styled.div`
  flex: 1 1 50%;
  min-width: 0;
  height: calc(100vh - 50px);
  font-size: 15px;
  overflow: auto;
  .cm-theme-light,
  .cm-editor,
  .cm-theme {
    height: 100%;
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
  return (
    <Textarea className="code-mirror">
      <CodeMirror
        value={noteContent}
        basicSetup={{
          highlightActiveLineGutter: true,
          foldGutter: true,
          bracketMatching: true,
          autocompletion: true,
          syntaxHighlighting: true,
        }}
        theme={atomone}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          oneDarkTheme,
        ]}
        onChange={onChangeNoteContent}
      />
    </Textarea>
  );
}
