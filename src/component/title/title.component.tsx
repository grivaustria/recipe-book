import {
  TitleContainer,
  TitleText,
  TitleDesc,
  ButtonContainer,
  Container,
  SignUpBtn,
  LoginBtn,
} from "./title.styles";

const Title = () => {
  return (
    <Container>
      <TitleContainer>
        <TitleText>Dish Galeria</TitleText>
        <TitleDesc>
          Collect recipes, all in one place. Accessible to any device.
        </TitleDesc>
      </TitleContainer>
      <ButtonContainer>
        <LoginBtn to="/login">Sign In</LoginBtn>
        <SignUpBtn>Create Account</SignUpBtn>
      </ButtonContainer>
    </Container>
  );
};

export default Title;
