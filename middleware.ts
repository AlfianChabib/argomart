import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    return NextResponse.rewrite(new URL(`/dashboard${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
