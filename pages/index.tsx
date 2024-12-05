import React from "react";
import IndexPage from "@/components/index/IndexPage";
import OverView from "@/components/index/Overview";
import { Session } from "next-auth";
import { getCategories } from "@/pages/api/overview";
import { Category } from "@/domain/models/category";
import Layout from "@/components/Layout";
import { getUserSession } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

/**
 * @return {JSX.Element}
 */
export default function Index({
  session,
  categories,
}: {
  session: Session;
  categories: Category[];
}) {
  return (
    <Layout>
      {session ? <OverView categories={categories} /> : <IndexPage />}
    </Layout>
  );
}

/**
 * if verified google login, pass the session to the provider
 */
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getUserSession(req, res);

  if (session) {
    const categories = await getCategories(session.userId);

    return {
      props: {
        session,
        categories,
      },
    };
  }

  return {
    props: {
      session: null,
    },
  };
};
