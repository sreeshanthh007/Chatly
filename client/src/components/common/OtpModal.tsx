import React, { useState, useRef, useEffect } from "react";
import { X, Lock, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { UseTimer } from "../../hooks/UseTimer";
import { SuccessAnimation } from "./animations/SuccessAnimation";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  onResend?: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  email?: string;
  successTitle?: string;
  successSubtitle?: string;
}

export function OtpModal({
  isOpen,
  onClose,
  onSubmit,
  onResend,
  isLoading = false,
  isSuccess = false,
  email = "your email",
  successTitle,
  successSubtitle,
}: OtpModalProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const { time, reset: resetTimer } = UseTimer(60);
  const canResend = time === 0;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

 
  useEffect(() => {
    if (isOpen) {
      resetTimer();
      setOtp(["", "", "", ""]);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen, resetTimer]);

  if (!isOpen) return null;

  const handleChange = (value: string, index: number) => {

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input if value is filled
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Focus previous input on backspace if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Just clear current
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{4}$/.test(pastedData)) return; // Only process exactly 4 digits

    const digits = pastedData.split("");
    setOtp(digits);
    inputRefs.current[3]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      onSubmit(otpValue);
    }
  };

  const handleResendClick = () => {
    if (!canResend) return;
    resetTimer();
    if (onResend) onResend();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={isSuccess ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[400px] bg-surface border border-border p-8 rounded-[20px] shadow-2xl z-10 overflow-hidden animate-scale-in">
        {/* Subtle background decoration to match premium dark/chocolaty tone */}
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        {!isSuccess && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-secondary/60 hover:text-text-primary transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {isSuccess ? (
          <SuccessAnimation title={successTitle} subtitle={successSubtitle} />
        ) : (
          <>
            {/* Modal Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="h-12 w-12 rounded-[14px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-accent animate-pulse" strokeWidth={1.8} />
              </div>
              <h2 className="text-xl font-semibold tracking-wide text-text-primary">
                Verification Required
              </h2>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed px-4">
                We sent a 4-digit verification code to <span className="text-accent font-medium">{email}</span>. Please enter it below.
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-3.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                    className="w-14 h-16 text-center text-2xl font-bold bg-elevated border border-border hover:border-accent/40 focus:border-accent focus:ring-1 focus:ring-accent rounded-[12px] text-text-primary placeholder:text-text-secondary/20 transition-all focus:outline-none selection:bg-transparent"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={otp.some(d => d === "") || isLoading}
                  className="w-full bg-accent text-background hover:bg-accent-hover font-semibold h-11 flex items-center justify-center gap-2 rounded-[10px]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                {/* Resend Timer / Action */}
                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendClick}
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-semibold hover:underline underline-offset-4 transition-all"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Resend Verification Code
                    </button>
                  ) : (
                    <p className="text-xs text-text-secondary">
                      Resend code in <span className="font-semibold text-text-primary">{time}s</span>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
