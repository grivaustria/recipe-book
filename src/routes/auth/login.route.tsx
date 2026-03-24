import { Icon } from "@iconify/react";
import { FirebaseError } from "firebase/app";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createUserDocFromAuth,
  loginUserEmailPassword,
  signInWithGooglePopup,
} from "../../utils/firebase.utils";
import { refreshToHome } from "../../utils/auth.utils";

import AuthPage from "./index";
import styles from "./auth.module.scss";

type LoginFields = {
  email: string;
  password: string;
};

const defaultLoginFields: LoginFields = {
  email: "",
  password: "",
};

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const Login = () => {
  const [formFields, setFormFields] = useState<LoginFields>(defaultLoginFields);
  const [errors, setErrors] = useState<Partial<LoginFields>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<LoginFields> = {};

    if (!formFields.email || !isValidEmail(formFields.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formFields.password) {
      nextErrors.password = "Password is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await loginUserEmailPassword(formFields.email, formFields.password);
      toast.success("Signed in successfully.");
      setFormFields(defaultLoginFields);
      refreshToHome();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
          case "auth/user-not-found":
          case "auth/wrong-password":
            toast.error("Invalid email or password. Please try again.");
            break;
          case "auth/too-many-requests":
            toast.error("Too many attempts. Please try again later.");
            break;
          default:
            toast.error("Unable to sign in right now. Please try again.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);

    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user);
      toast.success("Signed in with Google.");
      refreshToHome();
    } catch {
      toast.error("Error continuing with Google.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPage
      activeTab="login"
      heading="Welcome back."
      subheading="Log in to open your recipe collection."
      footer={
        <>
          New to Dish Galeria?{" "}
          <LinkButton label="Create an account" to="/signup" />
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-email">
            Email Address
          </label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>{"\u2709\uFE0F"}</span>
            <input
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              id="login-email"
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
          <label className={styles.label} htmlFor="login-password">
            Password
          </label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>{"\u{1F512}"}</span>
            <input
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              id="login-password"
              name="password"
              onChange={handleChange}
              placeholder="Your password"
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
        </div>

        <button
          className={styles.submitButton}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Signing In..." : "Log In to My Galeria"}
        </button>

        <div className={styles.divider}>or continue with</div>

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

export default Login;
