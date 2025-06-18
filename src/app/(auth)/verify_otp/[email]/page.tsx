'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useForm } from "react-hook-form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

import { otpSchema } from "@/schemas/otpSchema";

export default function OTPPage() {
  const { toast } = useToast();
  const params = useParams<{ email: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleSubmit = async (data: z.infer<typeof otpSchema>) => {
    try {
      if (!params.email) {
        toast({
          title: "Invalid URL",
          description: "Email parameter is missing.",
          variant: "destructive",
        });
        return;
      }

      const email = decodeURIComponent(params.email);

      await axios.post("/api/verify_otp", {
        email,
        otp: data.otp,
      });

      toast({
        title: "Success",
        description: "OTP Verified Successfully",
        variant: "default",
      });

      router.replace(`/set_password/${email}`);
    } catch (error: any) {
      console.error("Verification Error:", error.response?.data || error);

      console.log(error)
      toast({
        title: "Invalid OTP",
        description: error.response?.data?.message || "Verification failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-sm md:max-w-md bg-background shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle>Enter OTP</CardTitle>
          <CardDescription>
            We&apos;ve sent a code to your email. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              {/* OTP Input Field */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          className="flex justify-center"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <CardFooter className="flex flex-col gap-2 mt-3">
                <Button
                  className="w-full bg-foreground hover:bg-foreground-highlight"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Verifying..." : "Verify OTP"}
                </Button>
                <div>
                  
                <p className="text-sm text-muted-foreground text-center">
                  Didn&apos;t receive a code?{" "}
                  <a href="#" className="text-foreground">
                    Resend
                  </a>
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  You may want to check your spam
                </p>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
