import React from "react";
import { getSession } from "next-auth/react";
import IndexPage from "@/components/home/index";
import OverView from "@/components/home/Overview";
import { Session } from "next-auth";
import { getCategoryWithNote } from "@/pages/api/overview";
import { Category } from "@/domain/models/category";

/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
export default function Index({
  session,
  categories,
}: {
  session: Session;
  categories: Category[];
}) {
  return <>{session ? <OverView categories={categories} /> : <IndexPage />}</>;
}

/**
 * if verified google login, pass the session to the provider
 */
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    const categories = await getCategoryWithNote(req);

    return {
      props: {
        session,
        categories,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
