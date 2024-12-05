import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

/**
 * A custom Document can update the <html> and <body> tags used to render a Page.
 * This file is only rendered on the server.
 * @return {JSX.Element}
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
