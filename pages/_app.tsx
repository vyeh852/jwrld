import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

/**
 * Next.js uses this App component to initialize pages, we can do the following things:
 *
 * Persist layouts between page changes
 * Keeping state when navigating pages
 * Inject additional data into pages
 * Add global CSS
 * @return {JSX.Element}
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
