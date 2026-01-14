"use client";

import * as React from "react";

export const UserContext = React.createContext<{
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
