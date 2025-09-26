import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SVGBurger, SVGLogout, SVGClose } from "../../assets/svg.asset";
import AppLogo from "../../assets/dishgaleria-drawer.png";

import Drawer from "@mui/material/Drawer";
import { Divider } from "@mui/material";
import { logOutUser } from "../../utils/firebase.utils";

import {
  DrawerButton,
  DrawerContent,
  DrawerBox,
  DrawerInfo,
  DrawerInfoText,
  DrawerLogo,
  DrawerTitle,
  DrawerUserContainer,
  DrawerUserEmail,
  DrawerUserName,
  DrawerOptions,
  OpenDrawer,
} from "./app-drawer.styles";

import { getAuth, onAuthStateChanged, type User } from "firebase/auth";



const AppDrawer = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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

  const DrawerList = (
    <DrawerBox
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <DrawerContent>
        <DrawerTitle>
          <DrawerLogo src={AppLogo} />
          Dish Galeria
        </DrawerTitle>
        <Divider />

        <DrawerUserContainer>
          <DrawerUserName>{user?.displayName}</DrawerUserName>
          <DrawerUserEmail>{user?.email}</DrawerUserEmail>
        </DrawerUserContainer>
        <Divider />

        <DrawerInfo>
          <DrawerInfoText>Recipe Count</DrawerInfoText>
        </DrawerInfo>
        <Divider />
      </DrawerContent>
      <DrawerOptions>
        <Divider />

        <DrawerButton>
          <SVGClose width={18} height={18} /> Close
        </DrawerButton>
        <DrawerButton className="logout" onClick={handleLogout}>
          <SVGLogout width={18} height={18} /> Logout
        </DrawerButton>
      </DrawerOptions>
    </DrawerBox>
  );

  return (
    <>
      <OpenDrawer onClick={toggleDrawer(true)}>
        <SVGBurger width={18} height={18} />
      </OpenDrawer>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default AppDrawer;
