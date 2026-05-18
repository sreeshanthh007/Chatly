import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden select-none">
      {/* Premium Warm Amber Background Blur Gradients */}
      <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="text-center max-w-md w-full bg-surface border border-border p-10 rounded-[16px] shadow-2xl relative z-10 animate-fade-in flex flex-col items-center">
        
        {/* Animated Compass Icon */}
        <div className="h-16 w-16 rounded-[16px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 animate-pulse">
          <Compass className="h-8 w-8 text-accent" strokeWidth={1.5} />
        </div>

        {/* 404 Large Label */}
        <h1 className="text-7xl font-light tracking-widest text-accent mb-2">
          404
        </h1>
        
        {/* Heading */}
        <h2 className="text-lg font-medium text-text-primary mb-3">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-xs text-text-secondary leading-relaxed mb-8 max-w-xs">
          The destination you are trying to reach has either been relocated or does not exist in the Chatly network.
        </p>

        {/* Dynamic Nav CTAs */}
        <div className="w-full flex flex-col gap-2.5">
          <Button
            onClick={() => navigate("/chat")}
            className="w-full bg-accent text-background hover:bg-accent-hover font-medium h-11 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Chats
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/login")}
            className="w-full bg-elevated border-border text-text-primary hover:bg-elevated/70 h-11"
          >
            Back to Sign In
          </Button>
        </div>

        {/* Wordmark logo footer */}
        <div className="flex items-center gap-1.5 mt-10 opacity-40">
          <MessageCircle className="h-3.5 w-3.5 text-accent" />
          <span className="text-[10px] font-semibold text-accent tracking-widest uppercase">
            Chatly
          </span>
        </div>
      </div>
    </div>
  );
}
