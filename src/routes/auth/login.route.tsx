import { type ChangeEvent, type FormEvent, useState } from "react";
import Divider from "@mui/material/Divider";
import { Icon } from "@iconify/react";
import { TextField } from "@mui/material";

import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  loginUserEmailPassword,
} from "../../utils/firebase.utils";

import { toast, ToastContainer } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";

type FormFields = {
  email: string;
  password: string;
};

const defaultFormFields = {
  email: "",
  password: "",
};

const textFieldSx = { width: "100%" };
const authButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 px-3 py-2 font-medium shadow-sm transition hover:cursor-pointer";

const Login = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await loginUserEmailPassword(email, password);
      resetFormFields();
      navigate("/");
      toast.success("Signed in successfully(?)!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error(
              "Invalid email or password. Please check your credentials.",
            );
            break;
          case "auth/user-not-found":
            toast.error("User not found. Please check your email.");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password. Please check your password.");
            break;
          case "auth/too-many-requests":
            toast.error("Too many requests. Please try again later.");
            break;
          default:
            toast.error("An unexpected error occured. Please try again");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const signInGPopup = async () => {
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
            <div className="text-[32px] font-bold">Welcome, User!</div>
            <div className="text-stone-600">
              Log in to your account to continue
            </div>
          </div>
          <TextField
            sx={textFieldSx}
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <TextField
            sx={textFieldSx}
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button
            className={`${authButtonClass} border-transparent bg-[#582924] text-stone-50`}
            type="submit"
          >
            Submit
          </button>
          <Divider>or</Divider>
          <button
            className={`${authButtonClass} bg-white text-stone-900`}
            type="button"
            onClick={signInGPopup}
          >
            <Icon icon="devicon:google" width="16" height="16" />
            Continue with Google
          </button>
          <span className="text-center">
            New to Dish Galeria?{" "}
            <Link
              className="text-sky-500 no-underline hover:underline"
              to="/signup"
            >
              Create an account
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
