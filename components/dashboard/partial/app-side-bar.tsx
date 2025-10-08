"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { User } from "next-auth";
import * as React from "react";
import { sidebarData } from "./data/sidebar-data";
import { NavGroup } from "./nav-group";
import NavUser from "./nav-user";
import TeamSwitcher from "./team-switcher";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: User }) {
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      {...props}
      className="h-screen border-r border-border p-0 rounded-none"
    >
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
