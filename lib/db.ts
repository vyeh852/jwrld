import mysql from "serverless-mysql";

type Query = {
  query: string;
  values: Array<unknown>;
};

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

/**
 * @param {string} query
 * @param {Array<unknown>} values
 */
export default async function excuteQuery<T>({
  query,
  values,
}: Query): Promise<T> {
  try {
    const results = await db.query<T>(query, values);
    await db.end();
    return results;
  } catch (error) {
    throw new Error();
  }
}
