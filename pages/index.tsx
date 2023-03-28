import React from "react";
import { getSession } from "next-auth/react";
import IndexPage from "@/components/home/index";
import OverView from "@/components/home/OverView";
import { Session } from "next-auth";
import Header from "@/components/header";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
export default function Index({ session }: { session: Session }) {
  return (
    <>
      <Header />
      {session ? <OverView /> : <IndexPage />}
    </>
  );
}

/**
 * if verified google login, pass the session to the provider
 */
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
}
