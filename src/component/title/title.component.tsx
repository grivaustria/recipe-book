import { useEffect, useState } from "react";

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
  SignOutBtn,
} from "../button/button.styled";

import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { logOutUser } from "../../utils/firebase.utils";

const Title = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Check Auth: ", currentUser);
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <Container>
      <TitleContainer>
        <TitleText>Dish Galeria</TitleText>
        <TitleDesc>
          Collect recipes, all in one place. Accessible to any device.
        </TitleDesc>
      </TitleContainer>

      {user ? (
        <SignOutBtn onClick={logOutUser}>Log Out</SignOutBtn>
      ) : (
        <MUIButtonContainer>
          <LoginBtn to="/login">Log In</LoginBtn>
          <SignUpBtn to="/signup">Create Account</SignUpBtn>
        </MUIButtonContainer>
      )}
    </Container>
  );
};

export default Title;
