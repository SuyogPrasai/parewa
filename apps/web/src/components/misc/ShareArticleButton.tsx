"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { VariantProps } from "class-variance-authority"
import { Check, Link2, Share2 } from "lucide-react"

import { Button, type buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ShareButtonVariants = VariantProps<typeof buttonVariants>

interface ShareArticleButtonProps {
  className?: string
  label?: string
  sharedLabel?: string
  copiedLabel?: string
  errorLabel?: string
  title?: string
  text?: string
  variant?: ShareButtonVariants["variant"]
  size?: ShareButtonVariants["size"]
}

type ShareState = "idle" | "shared" | "copied" | "error"

function ShareArticleButton({
  className,
  label = "Share",
  sharedLabel = "Shared",
  copiedLabel = "Link Copied",
  errorLabel = "Share Failed",
  title,
  text,
  variant = "outline",
  size = "sm",
}: ShareArticleButtonProps) {
  const [state, setState] = useState<ShareState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const setTransientState = useCallback((nextState: ShareState) => {
    setState(nextState)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setState("idle")
      timeoutRef.current = null
    }, 2000)
  }, [])

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return

    const currentUrl = window.location.href

    const tryCopyToClipboard = async () => {
      if (!navigator.clipboard?.writeText) {
        setTransientState("error")
        return
      }

      try {
        await navigator.clipboard.writeText(currentUrl)
        setTransientState("copied")
      } catch {
        setTransientState("error")
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: currentUrl,
        })
        setTransientState("shared")
        return
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "name" in error &&
          error.name === "AbortError"
        ) {
          return
        }
      }
    }

    await tryCopyToClipboard()
  }, [text, title, setTransientState])

  const content =
    state === "shared"
      ? sharedLabel
      : state === "copied"
        ? copiedLabel
        : state === "error"
          ? errorLabel
          : label

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={handleShare}
        className={cn(
          "inline-flex items-center gap-2 hover:bg-primary-foreground/10 rounded-none border-border px-3 font-mono text-[0.7rem] uppercase tracking-wide",
          className,
        )}
      >
        {state === "shared" || state === "copied" ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : state === "error" ? (
          <Link2 className="size-3.5" aria-hidden="true" />
        ) : (
          <Share2 className="size-3.5" aria-hidden="true" />
        )}
        <span>{content}</span>
      </Button>
      <span className="sr-only" aria-live="polite">
        {content}
      </span>
    </div>
  )
}

export default ShareArticleButton
