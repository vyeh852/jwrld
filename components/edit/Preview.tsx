import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styled } from "@linaria/react";
import CodeBlock from "@/components/edit/CodeBlock";
import { PreviewType } from "@/components/Layout";

const Container = styled.div`
  flex: 1 1 50%;
  min-width: 0;
  height: calc(100vh - 50px);
  overflow: auto;
  padding: 30px;
  margin: auto;
  width: 100%;
  max-width: 750px;

  &[data-preview-type="editing"] {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &[data-preview-type="reading"] {
    height: auto;
  }
`;

const Markdown = styled(ReactMarkdown)`
  img {
    max-width: 100%;
    vertical-align: middle;
  }

  pre {
    margin-bottom: 16px;
    padding: 20px;
    background-color: #f7f7f7;

    // for syntaxed-code-block
    > div {
      background-color: #f7f7f7 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
  }

  code {
    white-space: pre-wrap;
    background-color: #f7f7f7;
    font-family: monospace !important;
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
`;

interface PreviewProps {
  noteContent: string;
  previewType: PreviewType;
}

/**
 * @param {PreviewProps} props
 * @return {JSX.Element}
 */
const Preview = ({ noteContent, previewType }: PreviewProps): JSX.Element => {
  return (
    <Container data-preview-type={previewType}>
      <Markdown
        components={{
          code: CodeBlock,
        }}
        remarkPlugins={[remarkGfm]}
        data-preview-type={previewType}
      >
        {noteContent}
      </Markdown>
    </Container>
  );
};

export default Preview;
