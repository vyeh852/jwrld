import type { AppProps } from "next/app";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

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
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
