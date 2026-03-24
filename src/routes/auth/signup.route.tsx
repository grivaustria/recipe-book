import { Icon } from "@iconify/react";
import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  authCreateUserEmailPassword,
  getAuthErrorCode,
  isSupabaseAuthError,
  signInWithGoogle,
} from "../../utils/supabase.utils";
import { refreshToHome } from "../../utils/auth.utils";

import AuthPage from "./index";
import styles from "./auth.module.scss";

type SignupFields = {
  displayName: string;
  email: string;
  password: string;
  conPassword: string;
};

const defaultSignupFields: SignupFields = {
  displayName: "",
  email: "",
  password: "",
  conPassword: "",
};

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const getPasswordStrength = (value: string) => {
  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];

  return {
    score,
    label: value ? labels[score] : "",
  };
};

const SignUp = () => {
  const [formFields, setFormFields] =
    useState<SignupFields>(defaultSignupFields);
  const [errors, setErrors] = useState<Partial<SignupFields>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formFields.password),
    [formFields.password],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<SignupFields> = {};

    if (!formFields.displayName.trim()) {
      nextErrors.displayName = "Display name is required.";
    }

    if (!formFields.email || !isValidEmail(formFields.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (formFields.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (formFields.password !== formFields.conPassword) {
      nextErrors.conPassword = "Passwords do not match.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { session } = await authCreateUserEmailPassword(
        formFields.email,
        formFields.password,
        formFields.displayName,
      );

      toast.success(
        session
          ? "Account created successfully."
          : "Account created. Check your email to confirm your signup.",
      );
      setFormFields(defaultSignupFields);
      if (session) {
        refreshToHome();
      }
    } catch (error) {
      if (isSupabaseAuthError(error)) {
        switch (getAuthErrorCode(error)) {
          case "user_already_exists":
            toast.error("That email is already in use.");
            break;
          case "weak_password":
            toast.error("Choose a stronger password.");
            break;
          default:
            toast.error("Unable to create your account right now.");
        }
      } else {
        toast.error("Failed to create account.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
    } catch {
      toast.error("Error continuing with Google.");
      setIsSubmitting(false);
      return;
    } finally {
      if (!document.hidden) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AuthPage
      activeTab="signup"
      heading="Start your galeria."
      subheading="Create a free account and start saving recipes today."
      note="By signing up you agree to our Terms of Service and Privacy Policy."
      footer={
        <>
          Already have an account? <LinkButton label="Log in" to="/login" />
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-display-name">
            Display Name
          </label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>{"\u{1F464}"}</span>
            <input
              className={`${styles.input} ${errors.displayName ? styles.error : ""}`}
              id="signup-display-name"
              name="displayName"
              onChange={handleChange}
              placeholder="Your name"
              type="text"
              value={formFields.displayName}
            />
          </div>
          {errors.displayName ? (
            <span className={styles.errorMessage}>{errors.displayName}</span>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-email">
            Email Address
          </label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>{"\u2709\uFE0F"}</span>
            <input
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              id="signup-email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={formFields.email}
            />
          </div>
          {errors.email ? (
            <span className={styles.errorMessage}>{errors.email}</span>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-password">
            Password
          </label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>{"\u{1F512}"}</span>
            <input
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              id="signup-password"
              name="password"
              onChange={handleChange}
              placeholder="Min. 8 characters"
              type={showPassword ? "text" : "password"}
              value={formFields.password}
            />
            <button
              className={styles.passwordToggle}
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? "\u{1F648}" : "\u{1F441}"}
            </button>
          </div>
          {errors.password ? (
            <span className={styles.errorMessage}>{errors.password}</span>
          ) : null}
          <div className={styles.strengthMeter} aria-hidden="true">
            {[1, 2, 3, 4].map((index) => (
              <span
                className={`${styles.strengthSegment} ${
                  index <= passwordStrength.score ? styles.filled : ""
                }`}
                key={index}
              />
            ))}
          </div>
          <div className={styles.strengthLabel}>{passwordStrength.label}</div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-confirm-password">
            Confirm Password
          </label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>{"\u{1F512}"}</span>
            <input
              className={`${styles.input} ${errors.conPassword ? styles.error : ""}`}
              id="signup-confirm-password"
              name="conPassword"
              onChange={handleChange}
              placeholder="Repeat password"
              type={showConfirmPassword ? "text" : "password"}
              value={formFields.conPassword}
            />
            <button
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword((current) => !current)}
              type="button"
            >
              {showConfirmPassword ? "\u{1F648}" : "\u{1F441}"}
            </button>
          </div>
          {errors.conPassword ? (
            <span className={styles.errorMessage}>{errors.conPassword}</span>
          ) : null}
        </div>

        <button
          className={styles.submitButton}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating Account..." : "Create My Account"}
        </button>

        <div className={styles.divider}>or sign up with</div>

        <button
          className={styles.googleButton}
          disabled={isSubmitting}
          onClick={handleGoogleAuth}
          type="button"
        >
          <Icon icon="devicon:google" height="18" width="18" />
          Continue with Google
        </button>
      </form>
    </AuthPage>
  );
};

type LinkButtonProps = {
  label: string;
  to: string;
};

const LinkButton = ({ label, to }: LinkButtonProps) => (
  <Link className={styles.switchButton} to={to}>
    {label}
  </Link>
);

export default SignUp;
