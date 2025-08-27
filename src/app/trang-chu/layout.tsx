"use client"
import { useState } from "react";

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/page/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { SidebarIcon } from "@phosphor-icons/react/dist/ssr";

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
    <div className="min-h-screen bg-background">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar />
        <div className="transition-all flex flex-col flex-1">
          <div className="h-20 flex flex-row gap-2 items-center px-4">
            <SidebarTrigger />
            {/* <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            <p className="text-gray-600">Here you can manage your settings and preferences.</p> */}
          </div>
          <Separator />
          <div className="p-8">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}