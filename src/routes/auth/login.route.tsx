import { type FormEvent } from "react";

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
} from "../../utils/firebase.utils";

import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const signInGPopup = async () => {
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
            <AuthTitleText>Welcome, User!</AuthTitleText>
            <AuthDesc>Log in to your account to continue</AuthDesc>
          </AuthContain>
          <TextField variant="outlined" label="Email" type="email" />
          <TextField variant="outlined" label="Password" type="password" />
          <AuthSubmitBtn>Submit</AuthSubmitBtn>
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
