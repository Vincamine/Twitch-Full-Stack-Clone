"use client";

interface WrapperProps {
    children: React.ReactNode;
};

import React from "react";
// import { useIsClient } from "usehooks-ts";
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils";

export const Wrapper = ({
    children,
} : WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);
    return (
        <aside
            className={cn(
                "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
                collapsed && "w-[70px]"
            )}
        >
            {children}
        </aside>
    );
};