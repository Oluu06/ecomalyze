import React, { ReactNode } from "react";
import { UserProvider } from "./UserContext";

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
