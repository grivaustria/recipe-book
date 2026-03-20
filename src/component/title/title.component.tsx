import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const { isTablet } = useWindowResize();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await logOutUser();
    navigate("/login");
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col gap-1 ml-5">
        <span className="text-4xl font-bold md:text-[64px]">Dish Galeria</span>
        <span className="text-sm font-normal text-stone-500 md:text-[23px]">
          Collect recipes, all in one place. Accessible to any device.
        </span>
      </div>
      {isTablet ? <AppDrawer /> : null}

      {!isTablet ? (
        user ? (
          <AuthUser user={user} logout={handleLogout} className="mr-5" />
        ) : (
          <AuthNoUser />
        )
      ) : null}
    </div>
  );
};

export default Title;
