import React from "react";
import IndexPage from "@/components/index/IndexPage";
import OverView from "@/components/index/Overview";
import { getCategories } from "@/pages/api/overview";
import { Category } from "@/domain/models/category";
import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import { getUserId } from "@/pages/api/auth/getUserId";

/**
 * @return {JSX.Element}
 */
export default function Index({
  userId,
  categories,
}: {
  userId: string;
  categories: Category[];
}) {
  return (
    <Layout>
      {userId ? <OverView categories={categories} /> : <IndexPage />}
    </Layout>
  );
}

/**
 * if verified google login, pass the session to the provider
 */
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userId = await getUserId(req);

  if (userId) {
    const categories = await getCategories(userId);

    return {
      props: {
        userId,
        categories,
      },
    };
  }

  return {
    props: {
      userId: null,
    },
  };
};
