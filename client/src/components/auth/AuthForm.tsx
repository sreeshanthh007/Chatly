import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFormik } from "formik";
import { loginSchema, registerSchema } from "../../validators/auth.validator";
import type { LoginRequestDTO, RegisterRequestDTO } from "../../DTO/auth.dto";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (values: any) => void;
  isLoading: boolean;
  onForgotPassword?: () => void;
}

export function AuthForm({ type, onSubmit, isLoading, onForgotPassword }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = type === "login";

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: isLogin ? loginSchema : registerSchema,
    onSubmit: (values) => {
      if (isLogin) {
        const { email, password } = values;
        onSubmit({ email, password } as LoginRequestDTO);
      } else {
        onSubmit(values as RegisterRequestDTO);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="pl-9 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
              disabled={isLoading}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-error text-xs mt-1 ml-1">{formik.errors.fullName}</div>
          ) : null}
        </div>
      )}

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
            placeholder="you@domain.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="pl-9 bg-surface border-border text-text-primary placeholder:text-text-secondary/30"
            disabled={isLoading}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-error text-xs mt-1 ml-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Password
          </label>
          {isLogin && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-accent hover:text-accent-hover transition-colors font-medium focus:outline-none"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary/60" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
        {formik.touched.password && formik.errors.password ? (
          <div className="text-error text-xs mt-1 ml-1">{formik.errors.password}</div>
        ) : null}
      </div>

      <Button
        type="submit"
        className="w-full bg-accent text-background hover:bg-accent-hover font-medium h-11 flex items-center justify-center gap-2 mt-6 relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            <span>{isLogin ? "Signing in..." : "Registering..."}</span>
          </div>
        ) : (
          <span>{isLogin ? "Sign In" : "Create Account"}</span>
        )}
      </Button>
    </form>
  );
}
