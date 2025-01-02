import Image from "next/image";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { icons, LogOut } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { USER_MENU_ITEMS } from "@/utils/constants";
import { Icon } from "./lucide-icon";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Header() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  return (
    <header className="flex z-50 w-full justify-between items-center px-4 py-3 top-0 sticky bg-green-50 border-b border-green-200">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <div className="flex flex-col">
          <h1 className="text-2xl leading-6 font-bold text-green-800">Agromart</h1>
          <p className="text-sm text-green-800/70 font-medium">A farmer solution</p>
        </div>
      </Link>
      <div className="flex items-center gap-4 text-green-800 font-medium">
        {isLoggedIn && user ? (
          <Sheet>
            <SheetTrigger>
              <Avatar className="border">
                {user?.picture ? <AvatarImage src={user?.picture} /> : null}
                <AvatarFallback>{user.given_name?.[0]}</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent className="flex flex-col text-green-900 p-4">
              <SheetHeader>
                <SheetTitle className="text-green-900 text-2xl text-center">Agromart</SheetTitle>
                <SheetDescription className="sr-only"></SheetDescription>
              </SheetHeader>
              <div className="bg-green-600/20 rounded-md w-full p-2 flex items-center gap-2">
                <Avatar className="border">
                  {user?.picture ? <AvatarImage src={user?.picture} /> : null}
                  <AvatarFallback>{user.given_name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <h2 className="text-lg font-semibold leading-6">
                    {user.given_name} {user.family_name}
                  </h2>
                  <p>{user.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col w-full gap-2">
                {USER_MENU_ITEMS.map((item) => {
                  const icon = item.icon as keyof typeof icons;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex justify-between px-3 py-1 hover:bg-green-600/20 bg-green-600/10 rounded-sm items-center"
                    >
                      <p>{item.name}</p>
                      <Icon name={icon} size={18} />
                    </Link>
                  );
                })}
              </div>
              <Separator />
              <LogoutLink className="flex justify-between px-3 py-1 hover:bg-green-600/20 bg-green-600/10 rounded-sm items-center">
                <p>Log out</p>
                <LogOut size={18} />
              </LogoutLink>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <LoginLink className={buttonVariants({ variant: "outline" })}>Sign in</LoginLink>
            <RegisterLink className={buttonVariants()}>Sign up</RegisterLink>
          </>
        )}
      </div>
    </header>
  );
}
