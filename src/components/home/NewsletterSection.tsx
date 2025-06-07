"use client";

import React, { useState } from "react";
import Article from "@/types/post_objects/article";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card_newsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ArticleRankings from "@/components/articles/TopArticles";

export function NewsletterSignup({ articles }: { articles: Article[] }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        console.log("Subscribing email:", email);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (email.includes("@")) {
                setMessage("Thank you for subscribing!");
                setEmail("");
            } else {
                setMessage("Please enter a valid email address.");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setMessage("There was an error subscribing. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col relative ">
                <div className="text-black text-3xl font-bold pr-5 font-oswald mb-10">Article Rankings for the Month</div>
                <div className="flex flex-col lgplus:flex-row">
                    <ArticleRankings articles={articles} />
                    <Card className="relative lg:max-w-sm b/g-white text-gray-800 p-10 rounded-none mt-10 lgplus:mt-0 mx-auto">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-gray-900 text-3xl font-extrabold leading-tight mt-2">
                                Join the Newsletter
                            </CardTitle>
                            <CardDescription className="text-primary-high_bright text-xl font-bold mt-2">
                                Original reporting.<br />Fearless journalism.<br />Delivered to you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="email" className="sr-only">
                                        Enter your email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        className="w-full h-12 p-7 border-light text-black placeholder-gray-400 bg-white rounded-none focus:ring-2 focus:ring-primary-light_dark text-base border"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 p-7 border border-primary-high_bright bg-white flex justify-start text-primary-high_bright font-bold text-lg rounded-none hover:bg-white transition disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center w-full">
                                            <span className="animate-spin">⚙️</span>
                                        </div>
                                    ) : (
                                        <>
                                            I'm in <span className="ml-2">→</span>
                                        </>
                                    )}
                                </Button>
                            </form>
                            {message && (
                                <p
                                    className={`mt-4 text-center text-sm font-medium ${message.includes("Thank you") ? "text-primary-block" : "text-red-600"}`}
                                >
                                    {message}
                                </p>
                            )}
                            <p className="text-xs mt-6 text-left mx-auto text-gray-600 w-[95%] ml-3">
                                By signing up, I agree to receive emails from Parewa and to the{' '}
                                <a
                                    href="#"
                                    className="underline font-bold text-primary-block hover:text-primary-dark"
                                >
                                    Privacy Policy
                                </a>{' '}and{' '}
                                <a
                                    href="#"
                                    className="underline font-bold text-primary-block hover:text-primary-dark"
                                >
                                    Terms of Use
                                </a>.
                            </p>
                        </CardContent>
                        {/* Decorative Borders - Changed to a darker blue/gray */}
                        <div className="absolute top-0 left-0 w-3 z-10 h-[calc(100%-60px)] bg-primary-high_bright shadow-lg" />
                        <div className="absolute top-0 left-0 h-3 w-[15%] bg-primary-high_bright shadow-lg" />
                        <div className="absolute top-0 right-0 h-3 w-[15%] bg-primary-high_bright shadow-lg" />
                        <div className="absolute bottom-[50px] right-0 h-3 w-[10%] bg-primary-high_bright shadow-lg" />
                        <div className="absolute bottom-[50px] left-0 h-3 w-[10%] bg-primary-high_bright shadow-lg" />
                        <div className="absolute top-0 right-0 w-3 z-10 h-[calc(100%-60px)] bg-primary-high_bright shadow-lg" />
                    </Card>
                </div>
            </div>
        </>
    );
}
