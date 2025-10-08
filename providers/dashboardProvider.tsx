"use client";

import ProfileDropdown from "@/components/dashboard/navbar/profile-dropdown";
import { ThemeSwitch } from "@/components/dashboard/navbar/theme-switch";
import TopNav from "@/components/dashboard/navbar/top-nav";
import { AppSidebar } from "@/components/dashboard/partial/app-side-bar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import React from "react";

export default function DashboardProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header
            className={cn(
              "bg-background flex h-16 items-center gap-3 p-4 sm:gap-4 transition-shadow duration-300 shadow-sm header-fixed peer/header z-50 w-full border border-border",
              offset > 10
                ? "shadow-sm header-fixed peer/header fixed z-50 w-full border border-border bg-background"
                : ""
            )}
          >
            <SidebarTrigger
              variant="outline"
              className="scale-125 sm:scale-100"
            />
            <Separator orientation="vertical" className="h-6" />

            <TopNav links={topNav} />

            <div className="flex-1" />

            <div className="flex items-center space-x-2">
              <ThemeSwitch />
              <ProfileDropdown user={user} />
            </div>
          </header>
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
