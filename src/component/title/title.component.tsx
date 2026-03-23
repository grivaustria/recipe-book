import { useNavigate } from "react-router-dom";

import AuthUser from "@component/auth-user/auth-user.component";
import AppDrawer from "@component/app-drawer/app-drawer.component";

import { logOutUser } from "@utils/firebase.utils";
import { useSetAuthUser } from "@hooks/useSetAuthUser";
import { useWindowResize } from "@hooks/useWindowResize";

const Title = () => {
  const navigate = useNavigate();

  const { isTablet } = useWindowResize();
  const { user } = useSetAuthUser();

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
        ) : null
      ) : null}
    </div>
  );
};

export default Title;
