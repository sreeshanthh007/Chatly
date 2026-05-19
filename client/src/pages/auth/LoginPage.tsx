import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MessageCircle, AlertTriangle } from "lucide-react";
import { AuthForm } from "../../components/auth/AuthForm";
import { Button } from "../../components/ui/button";
import { Uselogin } from "../../hooks/auth/UseLogin";
import type { LoginRequestDTO } from "../../DTO/auth.dto";

export default function LoginPage() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");

  const loginMutation = Uselogin();
  const [isLoading, setIsLoading] = useState(false); // needed for Google OAuth mock

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate("/chat");
    }
  }, [loginMutation.isSuccess, navigate]);

  const handleLoginSubmit = (values: LoginRequestDTO) => {
    setGeneralError("");
    loginMutation.mutate(values); 
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

        {generalError && (
          <div className="mb-4 p-3 rounded-[8px] bg-error/10 border border-error/20 flex items-start gap-2.5 text-xs text-error">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        <AuthForm 
          type="login"
          onSubmit={handleLoginSubmit} 
          isLoading={loginMutation.isPending} 
        />

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
