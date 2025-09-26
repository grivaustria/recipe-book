import { useState, useEffect } from "react";

import {
  AppBarContainer,
} from "./app-bar.styles";


import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import AppDrawer from "../app-drawer/app-drawer.component";

const AppBar = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AppBarContainer>
      <AppDrawer />

      
    </AppBarContainer>
  );
};

export default AppBar;
