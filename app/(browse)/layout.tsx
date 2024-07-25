import React, { Suspense } from "react";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>
          {children}
        </Container>
      </div>
    </>
  );
};