"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const LoginForm = () => {
  const { login, loading: isLoading } = useAuth();
  const searchParams = useSearchParams();

  const [credentials, setCredentials] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });
  const [error, setError] = useState("");

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(credentials.email, credentials.password);

      if (success) {
        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 300);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError((err as Error).message || "Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
            htmlFor="email"
          >
            メール
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            type="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-1">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
            htmlFor="password"
          >
            パスワード
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="password"
            placeholder="********"
            autoCapitalize="none"
            autoComplete="new-password"
            autoCorrect="off"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={isLoading}
          className="cursor-pointer inline-flex items-center !bg-black justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
