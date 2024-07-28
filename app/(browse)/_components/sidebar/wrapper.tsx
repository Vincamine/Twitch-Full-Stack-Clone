"use client";

interface WrapperProps {
    children: React.ReactNode;
};

import React, { useEffect, useState } from "react";
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils";
import { Toggle, ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";

export const Wrapper = ({
    children,
} : WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);
    // const [isClient, setIsClient] = useState(false);
    // useEffect(() => {
    //     setIsClient(true);
    // }, []);
    //replace line18-21 with line8 import { useIsClient } from "usehooks-ts";
    const isClient = useIsClient(); 

    if(!isClient) return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
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