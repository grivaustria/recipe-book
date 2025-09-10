import {
  AuthContainer,
  ButtonContainer,
  LoginBtn,
  SignUpBtn,
} from "./auth.styles";

const AuthBar = () => {
  return (
    <AuthContainer>
      <ButtonContainer>
        <LoginBtn>Sign In</LoginBtn>
        <SignUpBtn>Create Account</SignUpBtn>
      </ButtonContainer>
    </AuthContainer>
  );
};

export default AuthBar;
