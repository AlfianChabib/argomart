import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SellForm from "./_components/SellForm";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex flex-col w-full items-center min-h-screen mt-4 max-w-7xl md:px-8 px-4 gap-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold text-green-800">Jual Hasil Pertanian Anda</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl">
        <SellForm kindeId={user?.id} />
      </div>
    </div>
  );
}
