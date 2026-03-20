import { type FormEvent, type ChangeEvent, useState } from "react";
import Divider from "@mui/material/Divider";
import { Icon } from "@iconify/react";
import { TextField } from "@mui/material";

import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  authCreateUserEmailPassword,
} from "../../utils/firebase.utils";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

type FormFields = {
  displayName: string;
  email: string;
  password: string;
  conPassword: string;
};

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  conPassword: "",
};

const textFieldSx = { width: "100%" };
const authButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 px-3 py-2 font-medium shadow-sm transition hover:cursor-pointer";

const SignUp = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { displayName, email, password, conPassword } = formFields;
  const navigate = useNavigate();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== conPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { user } = await authCreateUserEmailPassword(
        email,
        password,
        displayName,
      );
      await createUserDocFromAuth(user, { displayName });
      toast.success("Account created successfully!");

      resetFormFields();
      navigate("/");
    } catch {
      toast.error("Failed to create account");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signUpGPopup = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);

    try {
      if (user) {
        toast.success("You have successfully signed in.");
        navigate("/");
      }
    } catch {
      toast.error(
        "Error continuing with Google. Please enable browser popups to continue",
      );
    }
  };
  return (
    <div className="flex h-dvh bg-[#fdf8f2] px-10 font-sans">
      <ToastContainer />
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex w-[55%] flex-col gap-1">
          <Link
            className="text-[40px] font-bold text-stone-900 no-underline md:text-[64px]"
            to="/"
          >
            Dish Galeria
          </Link>
          <span className="text-lg font-normal text-stone-500 md:text-[23px]">
            Collect recipes, all in one place. Accessible to any device.
          </span>
        </div>
        <form
          className="flex w-[45%] flex-col gap-4 rounded-md border border-stone-300 bg-stone-50 px-6 py-4"
          onSubmit={handleSubmit}
        >
          <div className="my-2 flex flex-col items-center gap-2">
            <div className="text-[32px] font-bold">Create an account</div>
          </div>
          <button
            className={`${authButtonClass} bg-white text-stone-900`}
            type="button"
            onClick={signUpGPopup}
          >
            <Icon icon="devicon:google" width="16" height="16" />
            Continue with Google
          </button>
          <Divider>or</Divider>
          <TextField
            sx={textFieldSx}
            variant="outlined"
            label="Display Name"
            name="displayName"
            type="text"
            onChange={handleChange}
            value={displayName}
            required
          />
          <TextField
            sx={textFieldSx}
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <TextField
            sx={textFieldSx}
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          <TextField
            sx={textFieldSx}
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="conPassword"
            onChange={handleChange}
            value={conPassword}
            required
          />

          <button
            className={`${authButtonClass} border-transparent bg-[#582924] text-stone-50`}
            type="submit"
          >
            Submit
          </button>

          <span className="text-center">
            Already have an account?{" "}
            <Link
              className="text-sky-500 no-underline hover:underline"
              to="/login"
            >
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
