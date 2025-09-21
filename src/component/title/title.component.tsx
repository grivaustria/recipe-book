import { useEffect, useState } from "react";

import {
  TitleContainer,
  TitleText,
  TitleDesc,
  Container,
  UserContainer,
  UserName,
  UserEmail,
  AuthUserContainer,
} from "./title.styles";

import {
  MUIButtonContainer,
  SignUpBtn,
  LoginBtn,
  SignOutBtn,
} from "../button/button.styled";

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
        <AuthUserContainer>
          <UserContainer>
            <UserName>{user.displayName}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserContainer>
          <SignOutBtn onClick={logOutUser}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
              ></path>
            </svg>
            <span>&nbsp; Log Out</span>
          </SignOutBtn>
        </AuthUserContainer>
      ) : (
        <MUIButtonContainer>
          <LoginBtn to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21v-2h7V5h-7V3h9v18zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
              ></path>
            </svg>
            <span>&nbsp; Log In</span>
          </LoginBtn>
          <SignUpBtn to="/signup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.5 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11M23 19h-4v4h-2v-4h-4v-2h4v-4h2v4h4zm-10.124-5a6.47 6.47 0 0 0-1.376 4c0 1.509.514 2.897 1.376 4H2v-2a6 6 0 0 1 6-6z"
              ></path>
            </svg>
            <span>&nbsp; Create Account</span>
          </SignUpBtn>
        </MUIButtonContainer>
      )}
    </Container>
  );
};

export default Title;
