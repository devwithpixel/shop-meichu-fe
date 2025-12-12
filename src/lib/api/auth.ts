"use server";

import { extendedFetch } from "./base";
import { getSession } from "@/lib/session";

import type { LoginResponse } from "@/types/admin/login";

export async function login(email: string, password: string) {
  const session = await getSession();

  try {
    const response = await extendedFetch("/auth/local", {
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      },
    });

    if (!response.ok) {
      const { error } = await response.json();
      return { success: false, error: error.message || "Invalid credentials" };
    }

    const data: LoginResponse = await response.json();

    session.jwt = data.jwt;
    session.isLoggedIn = true;
    session.user = data.user;

    await session.save();

    return { success: true };
  } catch {
    return { success: false, error: "Network error occurred" };
  }
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}
