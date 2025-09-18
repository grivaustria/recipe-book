import {
  TitleContainer,
  TitleText,
  TitleDesc,
  Container,
} from "./title.styles";

import {
  MUIButtonContainer,
  SignUpBtn,
  LoginBtn,
} from "../button/button.styled";

const Title = () => {
  return (
    <Container>
      <TitleContainer>
        <TitleText>Dish Galeria</TitleText>
        <TitleDesc>
          Collect recipes, all in one place. Accessible to any device.
        </TitleDesc>
      </TitleContainer>
      <MUIButtonContainer>
        <LoginBtn to="/login">Sign In</LoginBtn>
        <SignUpBtn to="/signup">Create Account</SignUpBtn>
      </MUIButtonContainer>
    </Container>
  );
};

export default Title;
