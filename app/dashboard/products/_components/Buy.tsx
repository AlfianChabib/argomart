"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  productId: z.string(),
  phone: z.string().min(11, { message: "Nomor telepon harus minimal 11 digit" }),
  address: z.string().min(5, { message: "Alamat harus minimal 5 karakter" }),
  count: z.string().transform((val) => parseInt(val, 10)),
});

export type BuySchema = z.infer<typeof schema>;

export default function Buy({
  productId,
  productName,
  price,
}: {
  productId: string;
  productName: string;
  price: number;
}) {
  const { user } = useKindeBrowserClient();
  const [pending, setPending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<BuySchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId,
      phone: "",
      address: "",
      count: 1,
    },
  });

  const onSubmit = async (data: BuySchema) => {
    setPending(true);
    const res = await fetch("/api/product", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        totalPrice: data.count * price,
        kindeId: user?.id,
      }),
    });

    const resData = await res.json();
    if (!res.ok) {
      toast.error(resData.message);
      setPending(false);
      form.reset();
    }

    toast.success(resData.message);
    setPending(false);
    setOpenDialog(false);
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>Beli</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Beli {productName}</DialogTitle>
          <DialogDescription>
            Produk ini akan di kirim ke rumah anda. Pembayaran hanya dapat dilakukan di rumah anda.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="No Telepon" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Alamat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <p>Total harga</p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(price * form.watch("count"))}
                </p>
              </div>
              <Button type="submit" disabled={pending}>
                {pending ? "Sedang memproses" : "Kirim"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
