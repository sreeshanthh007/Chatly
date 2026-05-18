import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    // Simple email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate authenticating for a high-end feel
    setTimeout(() => {
      setIsLoading(false);
      navigate("/chat");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden select-none">
      {/* Visual background accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-[420px] bg-surface border border-border p-8 rounded-[16px] shadow-2xl relative z-10 animate-fade-in">
        {/* Wordmark logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-[12px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
            <MessageCircle className="h-6 w-6 text-accent" strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl font-semibold tracking-wider text-accent uppercase">
            Chatly
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Premium Warm Chocolate Messaging
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-[8px] bg-error/10 border border-error/20 flex items-start gap-2.5 text-xs text-error">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
              <Input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-text-secondary">
                Password
              </label>
              <a href="#" className="text-xs text-accent hover:text-accent-hover transition-colors font-medium">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-10 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-text-secondary/60 hover:text-text-primary transition-colors focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-background hover:bg-accent-hover font-medium h-11 flex items-center justify-center gap-2 mt-6 relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-surface px-3 text-text-secondary">
              or continue with
            </span>
          </div>
        </div>

        {/* Google OAuth */}
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/chat");
            }, 1000);
          }}
          className="w-full bg-elevated border-border text-text-primary hover:bg-elevated/70 flex items-center justify-center gap-2.5 h-11"
          disabled={isLoading}
        >
          <svg className="h-4 w-4 mr-1 text-text-primary fill-current" viewBox="0 0 24 24" stroke="none">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.94 5.94 0 0 1 8 12.57c0-3.3 2.643-5.972 5.991-5.972 1.517 0 2.91.56 3.99 1.488l3.14-3.14C19.23 3.197 16.793 2 13.99 2 8.163 2 3.4 6.734 3.4 12.57s4.763 10.57 10.59 10.57c6.079 0 10.117-4.27 10.117-10.286 0-.693-.062-1.353-.18-1.986H12.24Z" />
          </svg>
          Google OAuth
        </Button>

        <div className="mt-8 text-center text-xs text-text-secondary">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-accent hover:text-accent-hover transition-colors font-medium underline underline-offset-4"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
