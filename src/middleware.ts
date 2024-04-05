import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(async function middleware(req: NextRequest) {
  return withAuth(req);
});

export const config = {
  matcher: ["/dashboard/:path*"], //"/api/url/:path*"
  // /((?!api|_next/static|_next/image|assets|favicon.ico).*)
};
