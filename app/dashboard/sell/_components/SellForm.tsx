"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

export const sellSchema = z.object({
  type: z.enum(["JAGUNG", "BERAS"]),
  address: z.string(),
  phone: z.string(),
  // price: z.string().transform((val) => parseInt(val, 10)),
  price: z.coerce.number(),
  totalWeight: z.string().transform((val) => parseInt(val, 10)),
});

export type SellSchema = z.infer<typeof sellSchema>;

export default function SellForm({ kindeId }: { kindeId: string }) {
  const [pending, setPending] = useState(false);

  const form = useForm<SellSchema>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      type: undefined,
      address: "",
      phone: "",
      price: 0,
      totalWeight: 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    const type = form.watch("type");
    switch (type) {
      case "JAGUNG":
        form.setValue("price", 5500);
        break;
      case "BERAS":
        form.setValue("price", 11000);
        break;
      default:
        form.setValue("price", 0);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("type")]);

  const onSubmit = async (data: SellSchema) => {
    setPending(true);
    const res = await fetch("/api/sell", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        totalPrice: data.totalWeight * data.price,
        kindeId,
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
    form.reset();
  };

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex w-full justify-center gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="JAGUNG" className="hidden" />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          "flex h-24 w-24 gap-2 cursor-pointer flex-col items-center justify-center rounded-md border font-normal text-gray-700 *:transition-all *:duration-300 *:ease-out",
                          field.value === "JAGUNG" &&
                            "border-green-600 bg-green-50 font-medium text-green-800 *:scale-125"
                        )}
                      >
                        <Image src={"/icon/corn.svg"} width={50} height={50} alt="Jagung" />
                        <span>Jagung</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="BERAS" className="hidden" />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          "flex h-24 w-24 gap-2 cursor-pointer flex-col items-center justify-center rounded-md border font-normal text-gray-500 *:transition-all *:duration-300 *:ease-out",
                          field.value === "BERAS" &&
                            "border-green-600 bg-green-50 font-medium text-green-800 *:scale-110"
                        )}
                      >
                        <Image src={"/icon/wheat.svg"} width={50} height={50} alt="Jagung" />
                        <span>Beras</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga per kilogram</FormLabel>
                <FormControl>
                  <Input placeholder="Harga per kilogram" type="number" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
              }).format(form.watch("price") * form.watch("totalWeight"))}
            </p>
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Sedang memproses" : "Kirim"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
