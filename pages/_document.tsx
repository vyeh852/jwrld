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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/f2e24ec61e.js"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
