import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { type ReactNode, createContext, useContext } from "react";

interface AuthContextValue {
  identity: ReturnType<typeof useInternetIdentity>["identity"];
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear, isLoggingIn, isAuthenticated } =
    useInternetIdentity();

  return (
    <AuthContext.Provider
      value={{
        identity,
        isAuthenticated,
        login,
        logout: clear,
        isLoading: isLoggingIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
