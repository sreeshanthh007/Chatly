import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MessageCircle, AlertTriangle } from "lucide-react";
import { AuthForm } from "../../components/auth/AuthForm";
import { Uselogin } from "../../hooks/auth/UseLogin";
import type { LoginRequestDTO } from "../../DTO/auth.dto";

export default function LoginPage() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");

  const loginMutation = Uselogin();

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
