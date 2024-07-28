"use client"
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/hint";

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse,
    } = useCreatorSidebar((state) => state);
    
    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                <Hint label={label} side="right" asChild>
                    <Button variant="ghost" onClick={onExpand} className="h-auto p-2">
                        <ArrowRightFromLine className="w-4 h-4" />
                    </Button>
                </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                <p className="font-semibold text-primary">Dashboard</p>
                    <Hint label= {label} side="right" asChild>
                        <Button className="h-auto ml-auto p-2" variant="ghost" onClick={onCollapse}>
                            <ArrowLeftFromLine className="w-4 h-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};