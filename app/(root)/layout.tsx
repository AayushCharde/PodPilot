"use client";

import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import PodcastPlayer from "@/components/PodcastPlayer";
import { usePathname } from "next/navigation"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 

  // Log the current pathname for debugging
  console.log('Current pathname:', pathname);

  // Define paths where the right sidebar should be hidden
  const hideRightSidebarPaths = ['/LLM-Support', '/Contact-us'];

  // Determine whether to show the right sidebar
  const showRightSidebar = !hideRightSidebarPaths.includes(pathname);

  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image 
                src="/icons/logo.svg"
                width={30}
                height={30}
                alt="menu icon"
              />
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
              <Toaster />
              {children}
            </div>
          </div>
        </section>

        {/* Conditionally render the RightSidebar */}
        {showRightSidebar && <RightSidebar />}
      </main>

      <PodcastPlayer />
    </div>
  );
}
