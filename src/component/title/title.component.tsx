import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TitleContainer,
  TitleText,
  TitleDesc,
  Container,
} from "./title.styles";

import AuthUser from "../auth-user/auth-user.component";
import AuthNoUser from "../auth-nouser/auth-nouser.component";
import AppDrawer from "../app-drawer/app-drawer.component";

import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { logOutUser } from "../../utils/firebase.utils";
import { useWindowResize } from "../../hooks/useWindowResize";

const Title = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
 
  const { isMobile, isTablet, isDesktop, isLaptop, isWideScreen } =
    useWindowResize();

  useEffect(() => {
    console.log("isMobile: ", isMobile);
    console.log("isTablet: ", isTablet);
    console.log("isDesktop: ", isDesktop);
    console.log("isWideScreen: ", isWideScreen);
  }, [isMobile, isTablet, isLaptop, isDesktop, isWideScreen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Check Auth: ", currentUser);
      console.log("user id: ", auth.currentUser?.uid);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await logOutUser();
    navigate("/login");
  };

  return (
    <Container>
      <TitleContainer>
        <TitleText>Dish Galeria</TitleText>

        {/* {isTablet ? null : (
          <TitleDesc>
          Collect recipes, all in one place. Accessible to any device.
        </TitleDesc>
        )} */}
        <TitleDesc>
          Collect recipes, all in one place. Accessible to any device.
        </TitleDesc>
      </TitleContainer>
      {isMobile ? <AppDrawer /> : null}


      {!isTablet ? user ? <AuthUser user={user} logout={handleLogout} /> : <AuthNoUser /> : null}
      {/* {user ? <AuthUser user={user} logout={handleLogout} /> : <AuthNoUser />} */}
    </Container>
  );
};

export default Title;
