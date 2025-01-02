import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    return NextResponse.rewrite(new URL(`/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
