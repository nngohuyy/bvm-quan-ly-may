"use client"
import { useState } from "react";
import Image from "next/image";

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/page/app-sidebar";

import { BellIcon } from "@phosphor-icons/react/dist/ssr/Bell";
import { SidebarIcon } from "@phosphor-icons/react/dist/ssr/Sidebar"

function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" onClick={toggleSidebar} className="!p-4">
      <SidebarIcon className="size-8" weight="duotone" />
    </Button>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-dvh bg-background">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar />
        <div className="transition-all flex flex-col flex-1 h-screen">
          <div className="h-20 w-full flex justify-between items-center border-b px-4 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="!p-4">
                <BellIcon className="size-8" weight="duotone" />
              </Button>
              <Image
                className="mx-auto dark:invert"
                src="/bvm.svg"
                alt="Next.js logo"
                width={57}
                height={48}
                priority
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}