import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});
