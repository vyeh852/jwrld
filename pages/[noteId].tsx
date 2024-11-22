import React, { useEffect, useRef, useState } from "react";
import { styled } from "@linaria/react";
import { getNote } from "@/pages/api/notes/[noteId]";
import { updateNote } from "@/actions/fetchActions";
import { useRouter } from "next/router";
import Layout, { PreviewTypeContext } from "@/components/Layout";
import Preview from "@/components/edit/Preview";
import Editor from "@/components/edit/Editor";
import { GetServerSideProps } from "next";
import { getUserSession } from "@/pages/api/auth/[...nextauth]";
import { useDebounce } from "@/hooks/useDebounce";

const Container = styled.div`
  display: flex;

  &.editing {
    @media (max-width: 768px) {
      .markdown-result {
        display: none;
      }
    }
  }

  &.reading {
    > .code-mirror {
      display: none;
    }
    > .markdown-result {
      overflow: auto;
      height: auto;
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
  const firstLoad = useRef(true);
  const debouncedNoteContent = useDebounce(noteContent, 2000);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    updateNote(noteId, { content: debouncedNoteContent });
  }, [debouncedNoteContent]);

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
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getUserSession(req, res);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const noteContent = await getNote(params.noteId, session.userId);

  if (noteContent === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
      noteContent,
    },
  };
};
