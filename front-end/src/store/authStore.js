// authStore.js

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false, // To track user authentication
  user: null,  // To store logged-in user info

  // Login Function
  login: async (credentials) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // If login is successful, update the auth state
    set({ isAuthenticated: true, user: data.user });
    return { success: true, message: "Login successful" };
  },

  // Logout Function
  logout: async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // If logout is successful, reset auth state
    set({ isAuthenticated: false, user: null });
    return { success: true, message: "Logout successful" };
  },
}));
