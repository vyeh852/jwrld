import React, { useEffect, useRef, useState } from "react";
import { styled } from "@linaria/react";
import { getNote } from "@/pages/api/notes/[noteId]";
import { updateNote } from "@/actions/fetchActions";
import { useRouter } from "next/router";
import Layout, { PreviewType, PreviewTypeContext } from "@/components/Layout";
import Preview from "@/components/edit/Preview";
import Editor from "@/components/edit/Editor";
import { GetServerSideProps } from "next";
import { getUserSession } from "@/pages/api/auth/[...nextauth]";
import { useDebounce } from "@/hooks/useDebounce";

const Container = styled.div`
  display: flex;
`;

/**
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

    if (typeof noteId === "string") {
      updateNote(noteId, { content: debouncedNoteContent });
    }
  }, [debouncedNoteContent]);

  return (
    <Layout>
      <PreviewTypeContext.Consumer>
        {(previewType) => (
          <Container>
            {previewType === PreviewType.Editing && (
              <Editor
                noteContent={noteContent}
                onChangeNoteContent={(noteContent) =>
                  setNoteContent(noteContent)
                }
              />
            )}
            <Preview noteContent={noteContent} previewType={previewType} />
          </Container>
        )}
      </PreviewTypeContext.Consumer>
    </Layout>
  );
}

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

  if (typeof params?.noteId !== "string") {
    return {
      notFound: true,
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
