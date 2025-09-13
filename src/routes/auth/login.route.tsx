import type { FormEvent } from "react";

import {
  AuthBackground,
  Container,
  AuthTitleContainer,
  AuthTitle,
  AuthText,
  LoginForm,
  LoginTitle,
  LoginDesc,
  LoginContain,
} from "./auth.styles";

import Divider from "@mui/material/Divider";

import { Icon } from "@iconify/react";

import { TextField } from "@mui/material";
import {
  AuthSubmitBtn,
  ThirdPartyAccBtn,
} from "../../component/button/button.styled";

const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <AuthBackground>
      <Container>
        <AuthTitleContainer>
          <AuthTitle>Dish Galeria</AuthTitle>
          <AuthText>
            Collect recipes, all in one place. Accessible to any device.
          </AuthText>
        </AuthTitleContainer>
        <LoginForm onSubmit={handleSubmit}>
          <LoginContain>
            <LoginTitle>Welcome, User!</LoginTitle>
            <LoginDesc>Log in to your account to continue</LoginDesc>
          </LoginContain>
          <TextField variant="outlined" label="Email" type="email" />
          <TextField variant="outlined" label="Password" type="password" />
          <AuthSubmitBtn>Submit</AuthSubmitBtn>
          <Divider>or continue with</Divider>
          <ThirdPartyAccBtn>
            <Icon icon="devicon:google" width="18" height="18" />
            Continue with Google
          </ThirdPartyAccBtn>
        </LoginForm>
      </Container>
    </AuthBackground>
  );
};

export default Login;
