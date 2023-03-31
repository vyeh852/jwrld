import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

type PreviewProps = {
  noteContent: string;
};

/**
 * Note Preview
 * @return {JSX.Element}
 */
export default function Preview({ noteContent }: PreviewProps): JSX.Element {
  return (
    <ReactMarkdown
      className="markdown-result"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              PreTag="div"
              {...props}
            />
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
    </ReactMarkdown>
  );
}
