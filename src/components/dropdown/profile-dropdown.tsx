"use client";

import { useAdminProvider } from "@/context/admin-provider";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/api/auth";
import { getAvatarInitials } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ProfileDropdown() {
  const { user } = useAdminProvider();
  const initial = useMemo(
    () => getAvatarInitials(user.username),
    [user.username]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {initial}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-outfit text-base" align="end">
        <DropdownMenuLabel className="px-4 py-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <p className="font-bold leading-none">{user.username}</p>
              <p className="text-muted-foreground text-sm leading-none">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-semibold">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
