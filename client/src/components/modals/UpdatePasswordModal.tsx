import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../validators/auth.validator";

interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { email: string; newPassword: string }) => void;
  isLoading: boolean;
  email: string;
}

export function UpdatePasswordModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  email,
}: UpdatePasswordModalProps) {
  const formik = useFormik({
    initialValues: {
      email: email || "",
      newPassword: "",
      confirmNewPassword: "",
    },
    enableReinitialize: true,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      onSubmit({
        email: values.email,
        newPassword: values.newPassword,
      });
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen, formik.resetForm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={isLoading ? undefined : onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-[400px] bg-surface border border-border p-8 rounded-[20px] shadow-2xl z-10 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            {!isLoading && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-text-secondary/60 hover:text-text-primary transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="h-12 w-12 rounded-[14px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-accent animate-pulse" strokeWidth={1.8} />
              </div>
              <h2 className="text-xl font-semibold tracking-wide text-text-primary">
                Update Password
              </h2>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed px-4">
                Set a strong, premium password for your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-9 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-9 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
                    disabled={isLoading}
                  />
                </div>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-error text-xs mt-1 ml-1">
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
                  <Input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-9 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
                    disabled={isLoading}
                  />
                </div>
                {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                  <div className="text-error text-xs mt-1 ml-1">
                    {formik.errors.confirmNewPassword}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-background hover:bg-accent-hover font-semibold h-11 flex items-center justify-center gap-2 rounded-[10px] mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
