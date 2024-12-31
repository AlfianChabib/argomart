import { NextResponse, type NextRequest } from "next/server";

// export { auth as middleware } from "@/auth";
export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.basePath);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
