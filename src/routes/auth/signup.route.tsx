import type { FormEvent } from "react";

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
  TextFieldRow,
  TextFieldInput,
} from "./auth.styles";

import Divider from "@mui/material/Divider";

import { Icon } from "@iconify/react";

import { TextField } from "@mui/material";
import {
  AuthSubmitBtn,
  ThirdPartyAccBtn,
} from "../../component/button/button.styled";

import { signInWithGooglePopup } from "../../utils/firebase.utils";
import { toast } from "react-toastify";
const SignUp = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Testing");
  };

  const signUpGPopup = async () => {
    const { user } = await signInWithGooglePopup();
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
          <TextFieldRow>
            <TextFieldInput variant="outlined" label="First Name" type="text" />
            <TextFieldInput variant="outlined" label="Last Name" type="text" />
          </TextFieldRow>
          <TextField variant="outlined" label="Email" type="email" />
          <TextField variant="outlined" label="Password" type="password" />
          <TextFieldInput
            variant="outlined"
            label="Confirm Password"
            type="password"
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
