import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MessageCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { AuthForm } from "../../components/auth/AuthForm";
import { Uselogin } from "../../hooks/auth/UseLogin";
import { ForgotEmailModal } from "../../components/modals/ForgotEmailModal";
import { OtpModal } from "../../components/common/OtpModal";
import { UpdatePasswordModal } from "../../components/modals/UpdatePasswordModal";
import { useSendOtpforForgotPassword } from "../../hooks/auth/UseSendOtpforForgotPassword";
import { useVerifyForgotPasswordOtp } from "../../hooks/auth/useVerifyForgotPasswordOtp";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import type { LoginRequestDTO } from "../../DTO/auth.dto";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [generalError, setGeneralError] = useState("");


  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const loginMutation = Uselogin();
  const sendOtpForgotPasswordMutation = useSendOtpforForgotPassword();
  const verifyForgotPasswordOtpMutation = useVerifyForgotPasswordOtp();
  const forgotPasswordMutation = useForgotPassword();

  const fromRegister = location.state?.fromRegister;

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate("/chat");
    }
  }, [loginMutation.isSuccess, navigate]);

  useEffect(() => {
    if (location.state?.fromRegister) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Handle forgot password modal flow transitions
  useEffect(() => {
    if (sendOtpForgotPasswordMutation.isSuccess) {
      setIsEmailModalOpen(false);
      setIsOtpModalOpen(true);
      sendOtpForgotPasswordMutation.reset();
    }
  }, [sendOtpForgotPasswordMutation.isSuccess]);

  useEffect(() => {
    if (verifyForgotPasswordOtpMutation.isSuccess) {
      const timer = setTimeout(() => {
        setIsOtpModalOpen(false);
        setIsUpdateModalOpen(true);
        verifyForgotPasswordOtpMutation.reset();
      }, 1800); // Allow checkmark animation to complete fully
      return () => clearTimeout(timer);
    }
  }, [verifyForgotPasswordOtpMutation.isSuccess]);

  useEffect(() => {
    if (forgotPasswordMutation.data?.success) {
      setIsUpdateModalOpen(false);
      setForgotPasswordEmail("");
      forgotPasswordMutation.reset();
    }
  }, [forgotPasswordMutation.isSuccess, forgotPasswordMutation.data]);

  const handleLoginSubmit = (values: LoginRequestDTO) => {
    setGeneralError("");
    loginMutation.mutate(values); 
  };

  const handleForgotEmailSubmit = (email: string) => {
    setForgotPasswordEmail(email);
    sendOtpForgotPasswordMutation.mutate(email);
  };

  const handleForgotPasswordOtpSubmit = (otp: string) => {
    verifyForgotPasswordOtpMutation.mutate({
      email: forgotPasswordEmail,
      otp,
    });
  };

  const handleForgotPasswordOtpResend = () => {
    sendOtpForgotPasswordMutation.mutate(forgotPasswordEmail);
  };

  const handleForgotPasswordSubmit = (values: { email: string; newPassword: string }) => {
    forgotPasswordMutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden select-none">
      {/* Visual background accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        initial={fromRegister ? { x: 100, opacity: 0 } : { y: 4, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: fromRegister ? 100 : 300,
          damping: fromRegister ? 15 : 30,
          mass: 1,
        }}
        className="w-full max-w-[420px] bg-surface border border-border p-8 rounded-[16px] shadow-2xl relative z-10"
      >
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
          onForgotPassword={() => setIsEmailModalOpen(true)}
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
      </motion.div>

      {/* Forgot Password Flow Modals */}
      <ForgotEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleForgotEmailSubmit}
        isLoading={sendOtpForgotPasswordMutation.isPending}
      />

      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onSubmit={handleForgotPasswordOtpSubmit}
        onResend={handleForgotPasswordOtpResend}
        isLoading={verifyForgotPasswordOtpMutation.isPending || sendOtpForgotPasswordMutation.isPending}
        isSuccess={verifyForgotPasswordOtpMutation.isSuccess}
        email={forgotPasswordEmail}
        successTitle="OTP Verified"
        successSubtitle="Opening password reset..."
      />

      <UpdatePasswordModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleForgotPasswordSubmit}
        isLoading={forgotPasswordMutation.isPending}
        email={forgotPasswordEmail}
      />
    </div>
  );
}
