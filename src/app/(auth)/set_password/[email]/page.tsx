'use client'

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { setPasswordSchema } from "@/schemas/setPasswordSchema";

function Page() {
    const params = useParams<{ email: string }>();
    const email = decodeURIComponent(params.email);

    const { toast } = useToast();
    const router = useRouter();
    
    const [isConfirming, setIsConfirming] = useState(false);

    const form = useForm<z.infer<typeof setPasswordSchema>>({
        resolver: zodResolver(setPasswordSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof setPasswordSchema>) => {
        setIsConfirming(true);
        try {
            await axios.post("/api/signup", {
                email,
                password: data.password,
                confirm_password: data.confirm_password
            });

            toast({
                title: "Success",
                description: "Account successfully created!",
                variant: "default",
            });
            toast({
                title: "Log In",
                description: "You can login to your account now",
                variant: "default",
            });
            // Redirect to login page
            router.replace('/signin')
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Set Password</CardTitle>
                        <CardDescription>
                            Set a new password below to log in to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirm password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full bg-foreground hover:bg-foreground-highlight" disabled={isConfirming}>
                                    {isConfirming ? "Verifying..." : "Confirm"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Page;
