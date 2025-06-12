"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ApiResponse } from "@/types/api-responses";
import { emailVerifySchema } from "@/schemas/emailVerifySchema";


function Page() {
  const [emailMessage, setEmailMessage] = useState("");
  const [loading, setLoading] = useState({ checkingEmail: false, submitting: false });

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof emailVerifySchema>>({
    resolver: zodResolver(emailVerifySchema),
    defaultValues: { email: "" },
  });

  const email = form.watch("email");
  const [debouncedEmail,] = useDebounceValue(email, 500);

  useEffect(() => {
    const checkEmailUnique = async () => {
      if (debouncedEmail) {
        setLoading((prev) => ({ ...prev, checkingEmail: true }));
        setEmailMessage("");
        try {
          const response = await axios.get<ApiResponse>(
            `/api/verify_email?email=${debouncedEmail}`
          );
          setEmailMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setEmailMessage(String(axiosError.response?.data.message ?? "Error checking email"));
        } finally {
          setLoading((prev) => ({ ...prev, checkingEmail: false }));
        }
      }
    };
    checkEmailUnique();
  }, [debouncedEmail]);

  const onSubmit = async ({ email }: z.infer<typeof emailVerifySchema>) => {
    setLoading((prev) => ({ ...prev, submitting: true }));
    try {
      const { data } = await axios.get<ApiResponse>(`/api/verify_email?email=${email}`);
      toast({ title: "Success", description: data.message, variant: "default" });
      await axios.post("/api/send_otp", { email });
      router.replace(`/verify_otp/${email}`);

      toast({
        title: "Success",
        description: "Successfully sent OTP email. Check your email.",
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Email verification failed.",
        variant: "destructive",
      });
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Verify Your Account</h1>
                      <p className="text-balance text-muted-foreground">
                        Set up your Parewa password
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            {loading.checkingEmail && (
                              <p className="text-sm text-blue-500">Checking email availability...</p>
                            )}
                            {emailMessage && <p className="text-sm text-gray-600">{emailMessage}</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-foreground hover:bg-foreground-highlight" disabled={loading.submitting}>
                      {loading.submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                    <div className="text-center text-sm">
                      Already Verified?{" "}
                      <Link href="/signin" className="underline underline-offset-4"> Sign in</Link>

                    </div>
                  </div>
                </form>
              </Form>
              <div className="relative hidden bg-muted md:block">
                <Image
                  src="/auth_background.jpg"
                  alt="Image"
                  width={500}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
