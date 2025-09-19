import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import {
  AuthBackground,
  Container,
  AuthTitleContainer,
  AuthTitle,
  AuthText,
  AuthForm,
  AuthTitleText,
  AuthContain,
  SignUpPrompt,
  LinkText,
  TextFieldInput,
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
  authCreateUserEmailPassword,
} from "../../utils/firebase.utils";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

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
        displayName
      );
      await createUserDocFromAuth(user, { displayName });
      toast.success("Account created successfully!");

      resetFormFields();
      navigate("/");
    } catch (err) {
      console.error("Error signing up", err);
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

    console.log("signInWithGooglePopup");
    console.log(user);
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
            <AuthTitleText>Create an account</AuthTitleText>
          </AuthContain>
          <ThirdPartyAccBtn onClick={signUpGPopup}>
            <Icon icon="devicon:google" width="16" height="16" />
            Continue with Google
          </ThirdPartyAccBtn>
          <Divider>or</Divider>
          <TextField
            variant="outlined"
            label="Display Name"
            name="displayName"
            type="text"
            onChange={handleChange}
            value={displayName}
            required
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          <TextFieldInput
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="conPassword"
            onChange={handleChange}
            value={conPassword}
            required
          />

          <AuthSubmitBtn type="submit">Submit</AuthSubmitBtn>

          <SignUpPrompt>
            Already have an account?<LinkText to="/login"> Sign In</LinkText>
          </SignUpPrompt>
        </AuthForm>
      </Container>
    </AuthBackground>
  );
};

export default SignUp;
