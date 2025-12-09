"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/admin";
import { getAvatarInitials } from "@/lib/utils";
import { LogOut, ChevronDown } from "lucide-react";
import { useMemo } from "react";

import type { User } from "@/types/strapi/user";

export function ProfileDropdown({ user }: { user: User }) {
  const initial = useMemo(
    () => getAvatarInitials(user.username),
    [user.username]
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 hover:bg-accent/50 px-3 py-3 rounded-lg cursor-pointer transition-colors">
          <Avatar className="h-9 w-9 border border-primary/30 rounded-lg">
            <AvatarFallback className="text-lg font-medium bg-accent-foreground text-accent">
              {initial}
            </AvatarFallback>
          </Avatar>

          <div className="hidden lg:flex flex-col items-start text-left">
            <p className="text-base font-semibold leading-none">
              {user.username}
            </p>
            <p className="text-muted-foreground text-sm leading-none mt-1">
              {user.email}
            </p>
          </div>

          <ChevronDown className="h-5 w-5 text-muted-foreground ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-bold leading-none">{user.username}</p>
              <p className="text-muted-foreground text-sm leading-none">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="p-4 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer text-base"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-semibold">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
