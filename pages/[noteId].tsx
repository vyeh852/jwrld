import React, { useEffect, useState } from "react";
import { styled } from "@linaria/react";
import { getNote } from "@/pages/api/notes/[noteId]";
import { updateNoteContent } from "@/actions/fetchActions";
import { useRouter } from "next/router";
import Layout, { PreviewTypeContext } from "@/components/Layout";
import { getSession } from "next-auth/react";
import Preview from "@/components/note/Preview";
import Editor from "@/components/note/Editor";

const Container = styled.div`
  display: flex;
  .markdown-result {
    flex: 1 1 50%;
    min-width: 0;
  }
  a {
    word-wrap: break-word;
  }

  &.editing {
    @media (max-width: 768px) {
      .markdown-result {
        display: none;
      }
    }
  }

  &.reading {
    > textarea {
      display: none;
    }
  }
`;

/**
 * Note Page
 * @return {JSX.Element}
 */
export default function Note({
  noteContent: initialNoteContent,
}: {
  noteContent: string;
}): JSX.Element {
  const [noteContent, setNoteContent] = useState(initialNoteContent);
  const router = useRouter();
  const { noteId } = router.query;

  useEffect(() => {
    const timer = setTimeout(() => {
      updateNoteContent(noteId, noteContent);
    }, 2000);

    return () => clearTimeout(timer);
  }, [noteContent]);

  return (
    <Layout>
      <PreviewTypeContext.Consumer>
        {(previewType) => (
          <Container className={previewType}>
            <Editor
              noteContent={noteContent}
              onChangeNoteContent={(noteContent) => setNoteContent(noteContent)}
            />
            <Preview noteContent={noteContent} />
          </Container>
        )}
      </PreviewTypeContext.Consumer>
    </Layout>
  );
}

/**
 * fetch note content
 */
export async function getServerSideProps({ req, params }) {
  const noteContent = await getNote(req, params.noteId);
  if (noteContent === undefined) {
    return {
      notFound: true,
    };
  }

  const session = await getSession({ req });

  return {
    props: {
      session,
      noteContent,
    },
  };
}
