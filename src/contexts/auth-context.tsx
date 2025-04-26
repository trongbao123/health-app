"use client";

import { AuthService } from "@/services/client/auth/auth.service";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
    callback?: () => void
  ) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleAuthState = (
    user: AuthUser | null,
    error: string | null = null
  ) => {
    setUser(user);
    setError(error);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await AuthService.me();
        handleAuthState(user);
      } catch (err) {
        handleAuthState(null, "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (
    email: string,
    password: string,
    callback?: () => void
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { user } = await AuthService.login(email, password);
      setUser(user);
      if (callback) setTimeout(callback, 500);
      return true;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      handleAuthState(null);
    } catch (err) {
      handleAuthState(null, "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
