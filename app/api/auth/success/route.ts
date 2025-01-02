import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) throw new Error("something went wrong with authentication");

  const dbUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        kindeId: user.id,
        email: user.email!,
        firstName: user.given_name!,
        lastName: user.family_name!,
      },
    });
  }

  return NextResponse.redirect(process.env.KINDE_SITE_URL + "/dashboard");
}
