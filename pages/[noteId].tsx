import React, { useEffect, useState } from "react";
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
  .markdown-result {
    flex: 1 1 50%;
    min-width: 0;
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 30px;
    margin: auto;
    width: 100%;
    max-width: 750px;
    img {
      max-width: 100%;
      vertical-align: middle;
    }
    pre {
      margin-bottom: 16px;
      padding: 20px;
      background-color: #f7f7f7;
      > div {
        background-color: #f7f7f7 !important;
      }
    }
    code {
      white-space: pre-wrap;
      background-color: #f7f7f7;
    }
    a {
      color: #337ab7;
      text-decoration: none;
      word-wrap: break-word;
    }
    ul,
    ol {
      margin-bottom: 16px;
      line-height: 25px;
      padding-left: 32px;
    }
    h1 {
      border-bottom: 1px solid #eee;
      margin-bottom: 16px;
      padding-bottom: 10px;
    }
    h2 {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 24px;
      margin-bottom: 16px;
    }
    p {
      margin-bottom: 16px;
    }
    li > p {
      margin-top: 16px;
    }
    hr {
      height: 0.25em;
      padding: 0;
      margin: 24px 0;
      background-color: #e7e7e7;
      border: 0;
    }
    blockquote {
      border-left: 0.25em solid #ddd;
      color: #777;
      padding: 0 1em;
      > p {
        white-space: break-spaces;
      }
    }
    table {
      table-layout: fixed;
      width: 100%;
      word-break: break-all;
      margin-bottom: 16px;
      border-spacing: 0;
      border-collapse: collapse;
      th,
      td {
        border: 1px solid #ddd;
        padding: 6px;
      }
      tr:nth-child(2n) {
        background-color: #f8f8f8;
      }
    }
  }

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

  const debouncedNoteContent = useDebounce(noteContent, 2000);

  useEffect(() => {
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
