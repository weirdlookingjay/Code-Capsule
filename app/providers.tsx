"use client";

import posthog from "posthog-js";
import { ReactNode } from "react";
import { PostHogProvider as PostHogProviderJS } from "posthog-js/react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ENABLE_POSTHOG) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        session_recording: {
            recordCrossOriginIframes: true,
        },
    });
}

export function PostHogProvider({ children }: { children: ReactNode }) {
    return process.env.NEXT_PUBLIC_ENABLE_POSTHOG ? (
        <PostHogProviderJS client={posthog}>{children}</PostHogProviderJS>
    ) : (
        children
    );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}