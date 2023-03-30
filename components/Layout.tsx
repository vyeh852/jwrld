import React from "react";
import Header from "@/components/Header";

/**
 * @return {JSX.Element}
 */
export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
