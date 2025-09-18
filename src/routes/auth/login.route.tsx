import { type ChangeEvent, type FormEvent } from "react";
import { useState } from "react";
import {
  AuthBackground,
  Container,
  AuthTitleContainer,
  AuthTitle,
  AuthText,
  AuthForm,
  AuthTitleText,
  AuthDesc,
  AuthContain,
  SignUpPrompt,
  LinkText,
} from "./auth.styles";

import Divider from "@mui/material/Divider";

import { Icon } from "@iconify/react";

import { TextField } from "@mui/material";
import {
  AuthSubmitBtn,
  ThirdPartyAccBtn,
} from "../../component/button/button.styled";

import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  loginUserEmailPassword,
} from "../../utils/firebase.utils";

import { toast, ToastContainer } from "react-toastify";
import { FirebaseError } from "firebase/app";

type FormFields = {
  email: string;
  password: string;
};

const defaultFormFields = {
  email: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password } = formFields;

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
      const userCredential = await loginUserEmailPassword(email, password);
      const user = userCredential.user;
      console.log("userCredential: ", user);
      resetFormFields();
      toast.success("Signed in successfully(?)!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error(
              "Invalid email or password. Please check your credentials."
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
        console.error(error);
      }
    }

    console.log("submit");
  };

  const signInGPopup = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);

    try {
      if (user) {
        toast.success("You have successfully signed in.");
      }
    } catch {
      toast.error(
        "Error continuing with Google. Please enable browser popups to continue"
      );
    }
  };

  return (
    <AuthBackground>
      <ToastContainer />
      <Container>
        <AuthTitleContainer>
          <AuthTitle to="/">Dish Galeria</AuthTitle>
          <AuthText>
            Collect recipes, all in one place. Accessible to any device.
          </AuthText>
        </AuthTitleContainer>
        <AuthForm onSubmit={handleSubmit}>
          <AuthContain>
            <AuthTitleText>Welcome, User!</AuthTitleText>
            <AuthDesc>Log in to your account to continue</AuthDesc>
          </AuthContain>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <AuthSubmitBtn type="submit">Submit</AuthSubmitBtn>
          <Divider>or</Divider>
          <ThirdPartyAccBtn onClick={signInGPopup}>
            <Icon icon="devicon:google" width="16" height="16" />
            Continue with Google
          </ThirdPartyAccBtn>
          <SignUpPrompt>
            New to Dish Galeria?{" "}
            <LinkText to="/signup">Create an account</LinkText>{" "}
          </SignUpPrompt>
        </AuthForm>
      </Container>
    </AuthBackground>
  );
};

export default Login;
