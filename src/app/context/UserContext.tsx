"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  email: string;
  fullName?: string;
  websiteName?: string; // Nuevo campo para nombre del sitio
  siteUrl?: string;     // Nuevo campo para URL del sitio
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  updateWebsiteInfo: (websiteName: string, siteUrl: string) => void; // Nueva función
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carga inicial del usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Actualiza nombre y URL del sitio y persiste en localStorage
  const updateWebsiteInfo = (websiteName: string, siteUrl: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, websiteName, siteUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, setUser, updateWebsiteInfo, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}
