"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

// //The function is declared using a named function syntax. The children prop is typed directly within the function parameter.
// export function Container({ children }: { children: React.ReactNode }) {
//     const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
//     const matches = useMediaQuery("(max-width: 1024px)");
//     useEffect(() => {
//         if (matches) {
//         onCollapse();
//         } else {
//         onExpand();
//         }
//     }, [matches, onCollapse, onExpand]);
//     return (
//         <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
//         {children}
//         </div>
//     );
// }

// //The function is declared using an arrow function syntax with an interface for props. An interface ContainerProps is defined to type the children prop. 
interface ContainerProps {
    children: React.ReactNode;
};

export const Container = ({
    children,
} : ContainerProps) => {
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
    const matches = useMediaQuery("(max-width: 1024px)");
    useEffect(() => {
        if (matches) {
          onCollapse();
        } else {
          onExpand();
        }
    }, [matches, onCollapse, onExpand]);
    return (
        <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
            {children}
        </div>
    );
};