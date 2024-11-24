import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode & React.ReactNode[];
}

/**
 * @param {CodeBlockProps} props
 * @return {JSX.Element}
 */
const CodeBlock = ({
  inline,
  className,
  children,
}: CodeBlockProps): JSX.Element => {
  const getParsedChildren = (): string => {
    const parsedChildren = Array.isArray(children) ? children.at(0) : children;

    return typeof parsedChildren === "string" ? parsedChildren : "";
  };

  const getLanguageSyntax = () => {
    if (!className) return;

    const match = className.match(/language-(\w+)/);
    if (!match) return;

    return match[1];
  };

  const languageSyntax = getLanguageSyntax();
  if (inline || !languageSyntax) {
    return <code>{getParsedChildren()}</code>;
  }

  return (
    <SyntaxHighlighter language={languageSyntax} PreTag="div">
      {getParsedChildren()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
