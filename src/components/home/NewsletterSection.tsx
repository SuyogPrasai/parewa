"use client";

import React, { useState, useEffect, useCallback } from "react";
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

// Renamed for clarity to avoid confusion with the collection component
import { ArticleRankings as TopArticlesRankingsCompact } from "@/components/articles/TopArticles";
// Assuming this is the full-width version for smaller screens
import ArticleRankingsFull from "../collections/CollectionsTopArticles";

// --- Constants for better maintainability ---
const LG_BREAKPOINT = 1024; // Tailwind CSS 'lg' breakpoint
const SUCCESS_MESSAGE = "Thank you for subscribing!";
const INVALID_EMAIL_MESSAGE = "Please enter a valid email address.";
const SUBSCRIPTION_ERROR_MESSAGE = "There was an error subscribing. Please try again.";

// --- Reusable Hook for Screen Size Detection ---
const useScreenSize = (breakpoint: number) => {
    const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            setIsAboveBreakpoint(window.innerWidth >= breakpoint);
        };

        checkSize(); // Initial check
        window.addEventListener("resize", checkSize);

        return () => window.removeEventListener("resize", checkSize);
    }, [breakpoint]); // Re-run if breakpoint changes

    return isAboveBreakpoint;
};

// --- NewsletterSignup Component ---
export function     NewsletterSignup({ articles }: { articles: Article[] }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Use the custom hook for screen size logic
    const isLargeScreen = useScreenSize(LG_BREAKPOINT);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);
            setMessage(""); // Clear previous messages

            console.log("Attempting to subscribe with email:", email);

            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));

                if (email.includes("@")) {
                    setMessage(SUCCESS_MESSAGE);
                    setEmail(""); // Clear email on success
                } else {
                    setMessage(INVALID_EMAIL_MESSAGE);
                }
            } catch (error) {
                console.error("Subscription failed:", error);
                setMessage(SUBSCRIPTION_ERROR_MESSAGE);
            } finally {
                setIsLoading(false);
            }
        },
        [email] // Re-create handleSubmit only if email changes
    );

    return (
        <>
            <h2 className="md:mx-2 text-black text-2xl sm:text-3xl lg:text-4xl font-bold pr-4 sm:pr-5 font-oswald mb-8 sm:mb-10">
                Article Rankings for the Month
            </h2>
            <div className="flex flex-col justify-center mx-auto lgplus:flex-row flex-wrap w-full overflow-hidden">
                {/* Conditional rendering for article rankings */}

                {isLargeScreen ? (
                    <div className="w-full flex lg:w-auto min-w-[100px] justify-center lg:min-w-[300px] xl:min-w-[350px] lgplus:ml-5">
                        <TopArticlesRankingsCompact articles={articles} />
                    </div>
                ) : (

                    <ArticleRankingsFull articles={articles} />

                )}

                {/* Newsletter Signup Card */}
                <div className="flex flex-col justify-center">
                <Card className="relative w-full mx-auto max-w-[400px] lg:max-w-sm bg-white text-gray-800 p-10 rounded-none mt-10 lgplus:mt-0">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-gray-900 text-3xl font-extrabold leading-tight mt-2">
                            Join the Newsletter
                        </CardTitle>
                        <CardDescription className="text-primary-high_bright text-xl font-bold mt-2">
                            Original reporting.
                            <br />
                            Fearless journalism.
                            <br />
                            Delivered to you.
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
                                    className="w-full h-12 p-3 lgplus:p-7 border-light text-black placeholder-gray-400 bg-white rounded-none focus:ring-2 focus:ring-primary-light_dark text-base border"
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
                                className={`mt-4 text-center text-sm font-medium ${message.includes("Thank you")
                                    ? "text-primary-block"
                                    : "text-red-600"
                                    }`}
                            >
                                {message}
                            </p>
                        )}
                        <p className="text-xs mt-6 text-left mx-auto text-gray-600 w-[80%] lgplus:w-[95%] ml-3">
                            By signing up, I agree to receive emails from Parewa and to the{" "}
                            <a
                                href="#"
                                className="underline font-bold text-primary-block hover:text-primary-dark"
                            >
                                Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="underline font-bold text-primary-block hover:text-primary-dark"
                            >
                                Terms of Use
                            </a>
                            .
                        </p>
                    </CardContent>
                    {/* Decorative Borders */}
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