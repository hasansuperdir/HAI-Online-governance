"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === "hasansuperdir" && password === "1231231231") {
        localStorage.setItem("hasanonline_auth", "true");
        localStorage.setItem("hasanonline_user", username);
        router.push("/platform/dashboard");
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hai-primary via-hai-blue to-hai-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-white">Hasan</span>
            <span className="text-blue-400">Online</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 tracking-wider uppercase">
            Governance Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-hai-navy border border-hai-steel rounded-2xl p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-1">Welcome Back</h2>
          <p className="text-xs text-gray-500 mb-6">
            Sign in to access the governance platform
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-hai-primary border border-hai-steel rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-hai-primary border border-hai-steel rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-hai-accent text-white rounded-lg font-semibold text-sm hover:bg-hai-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; 2026 HAI Group. All rights reserved.
        </p>
      </div>
    </div>
  );
}
