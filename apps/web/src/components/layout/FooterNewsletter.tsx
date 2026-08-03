"use client";

import { useState, useTransition } from "react";
import type * as React from "react";

interface NewsletterResponse {
  success: boolean;
  message?: string;
}

type Status = { type: "success" | "error"; text: string } | null;

export default function FooterNewsletter({ privacyPolicyLink }: { privacyPolicyLink: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setStatus(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/subscribe_newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail }),
        });

        const data: NewsletterResponse = await response.json().catch(() => ({
          success: false,
          message: "Unexpected response from newsletter service.",
        }));

        if (response.ok && data.success) {
          setStatus({ type: "success", text: "Successfully subscribed to the newsletter!" });
          setEmail("");
        } else {
          setStatus({ type: "error", text: data.message ?? "Failed to subscribe. Please try again." });
        }
      } catch {
        setStatus({ type: "error", text: "An error occurred. Please try again later." });
      }
    });
  };

  return (
    <section className="mt-4 pt-4">
      <h3 className="mb-4 font-sans text-xl font-semibold text-primary-foreground">Newsletter</h3>
      {status && (
        <p className={`text-xs ${status.type === "success" ? "text-success" : "text-destructive"}`}>
          {status.text}
        </p>
      )}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <p className="mb-2 text-sm text-primary-foreground sm:mb-0">Subscribe to our newsletter for updates.</p>
        <form onSubmit={handleSubmit} className="flex w-full sm:max-w-xs lg:ml-7">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
            className="grow rounded-l-md rounded-r-none bg-muted px-3 py-2 text-sm placeholder-muted-foreground text-primary-foreground transition-colors duration-200 focus:border-accent"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 cursor-pointer whitespace-nowrap rounded-l-none rounded-r-md px-4 py-2 text-sm text-primary-foreground transition-colors duration-200"
          >
            {isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
      <p className="mt-2 text-xs text-muted-foreground sm:mt-0">
        By subscribing, you agree to our{" "}
        <a href={privacyPolicyLink} className="underline hover:text-primary-foreground">
          Privacy Policy
        </a>
      </p>
    </section>
  );
}