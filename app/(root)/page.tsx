import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
// import { redirect } from "next/navigation";

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  return (
    <>
      <div className="max-w-7xl flex flex-col gap-8 w-full h-full mt-4 md:px-4 px-2 items-center">
        <section className="flex w-full rounded-xl bg-green-50 border border-green-200 md:px-8 px-4 py-2 gap-4 mx-4">
          <div className="flex flex-col justify-center md:gap-4 gap-2 flex-1">
            <h1 className="md:text-xl text-sm font-bold text-green-800">Selamat datang di Agromart</h1>
            <p className="uppercase text-green-700 md:text-6xl text-xl *:text-green-800 font-bold">
              Pasar <span>Adil</span>
              <br /> untuk Petani <span>Hebat</span>
            </p>
            <p className="text-green-800/70 font-medium md:text-sm text-xs md:block hidden">
              Menghubungkan petani langsung ke pasar, memaksimalkan hasil panen, dan menyediakan kebutuhan pertanian
              untuk masa depan yang sejahtera.
            </p>
            {isLoggedIn ? (
              <Link href={"/dashboard"} className={buttonVariants({ size: "lg", className: "w-max" })}>
                Get Started
              </Link>
            ) : (
              <RegisterLink className={buttonVariants({ size: "lg", className: "w-max" })}>Get Started</RegisterLink>
            )}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Image src={"/hero.png"} width={500} height={500} alt="hero" />
          </div>
        </section>
        <section className="flex flex-col items-center w-full md:px-8 px-4 gap-4 mx-4">
          <h2 className="text-3xl font-semibold text-green-900 ">About Agromart</h2>
          <p className="text-center text-green-800 max-w-4xl">
            Platform digital yang didesain khusus untuk mendukung petani Indonesia menjual hasil pertaniannya dengan
            harga yang adil dan sesuai pasar. Kami menghubungkan petani langsung dengan pembeli tanpa perantara,
            sehingga keuntungan petani dapat dimaksimalkan. Selain itu, kami juga menyediakan akses mudah untuk membeli
            pupuk, benih, dan kebutuhan pertanian lainnya. Bersama kami, petani bisa lebih sejahtera dan masa depan
            pertanian lebih cerah!
          </p>
        </section>
      </div>
      <footer className="flex w-full items-center bg-green-900/10 justify-center border-t border-green-900/30 py-3">
        <p className="text-green-800/70">Copyright © 2024 Agromart. All rights reserved.</p>
      </footer>
    </>
  );
}
