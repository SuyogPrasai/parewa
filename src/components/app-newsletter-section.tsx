// components/NewsletterSignup.tsx
"use client";

import React, { useState } from "react";
import { Article } from "@/types/articleSection";
import Link from "next/link";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
            <div className="flex flex-col md:flex-row relative">
                <div className="flex flex-col gap-6 md:col-span-1 mx-5 mb-10 md:mb-0">
                    <div className="text-black text-lg font-bold font-sans">SOME OF THE MOST POPULAR ARTICLES</div>

                    {articles.slice(1).map((article) => (
                        <SideArticleCard key={article.link} article={article} />
                    ))}
                </div>
                <Card className="relative  max-w-lg bg-white text-gray-800 p-12 rounded-none shadow-xl">
                    <CardHeader className="p-0 mb-6">
                        <div className="text-blue-600 text-lg font-semibold">PAREWA NOTICE SYSTEM</div>
                        <CardTitle className="text-gray-900 text-3xl font-extrabold leading-tight mt-2">
                            Join the Newsletter
                        </CardTitle>
                        <CardDescription className="text-blue-500 text-xl font-bold mt-2">
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
                                    className="w-full h-12 px-4 text-black placeholder-gray-400 bg-white rounded-none focus:ring-2 focus:ring-blue-500 text-base border border-gray-300"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-blue-600 text-white font-bold text-lg rounded-none hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="animate-spin mr-2">⚙️</span>
                                ) : (
                                    <>
                                        I'm in <span className="ml-2">→</span>
                                    </>
                                )}
                            </Button>
                        </form>

                        {message && (
                            <p
                                className={`mt-4 text-center text-sm font-medium ${message.includes("Thank you") ? "text-blue-600" : "text-red-600"
                                    }`}
                            >
                                {message}
                            </p>
                        )}

                        <p className="text-xs mt-6 text-center text-gray-600">
                            By signing up, I agree to receive emails from The Intercept and to the{' '}
                            <a
                                href="#"
                                className="underline font-bold text-blue-600 hover:text-blue-800"
                            >
                                Privacy Policy
                            </a>{' '}and{' '}
                            <a
                                href="#"
                                className="underline font-bold text-blue-600 hover:text-blue-800"
                            >
                                Terms of Use
                            </a>.
                        </p>
                    </CardContent>

                    {/* Decorative Borders - Changed to a darker blue/gray */}
                    <div className="absolute top-0 left-0 w-5 z-10 h-full bg-blue-500 shadow-lg " />
                    <div className="absolute top-0 left-0 h-5 w-[15%] bg-blue-500 shadow-lg " />
                    <div className="absolute top-0 right-0 h-5 w-[15%] bg-blue-500 shadow-lg " />
                    <div className="absolute bottom-0 right-0 h-5 w-[15%] bg-blue-500 shadow-lg " />
                    <div className="absolute bottom-0 left-0 h-5 w-[15%] bg-blue-500 shadow-lg " />
                    <div className="absolute top-0 right-0 w-5 z-10 h-full bg-blue-500 shadow-lg " />
                </Card>
                    
            </div>
        </>
    );
}

function SideArticleCard({ article }: { article: Article }) {
    return (
        <div className="relative">

            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200 rounded-lg">
                <Link href={article.link} className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-40 flex-shrink-0">
                        <Image src={article.image} alt={article.title} fill className="object-cover" />
                    </div>
                    <CardContent className="px-4 pt-4 flex-1 bg-white">
                        <div className="relative bg-black w-[40%] rounded-lg h-[0.15rem] mb-2"></div>
                        <h3 className="text-sm font-bold  hover:text-blue-600 transition-colors duration-200">
                            {article.title}
                        </h3>
                        <span className="text-blue-600 text-xs font-medium">{article.author}</span>
                    </CardContent>
                </Link>
            </Card>
        </div>
    );
}