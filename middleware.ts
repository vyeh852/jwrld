export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/overview", "/api/notes", "/api/categories"],
};
