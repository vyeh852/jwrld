import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { styled } from "@linaria/react";

type PreviewProps = {
  noteContent: string;
};

const MarkdownResult = styled(ReactMarkdown)`
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

/**
 * Note Preview
 * @return {JSX.Element}
 */
export default function Preview({ noteContent }: PreviewProps): JSX.Element {
  return (
    <MarkdownResult
      className="markdown-result"
      components={{
        code({ inline, className, children, style, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {noteContent}
    </MarkdownResult>
  );
}
