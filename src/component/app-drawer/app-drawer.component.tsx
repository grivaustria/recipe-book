import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SVGBurger, SVGLogout, SVGClose } from "@assets/svg.asset";
import AppLogo from "@assets/dishgaleria-drawer.png";
import { useSetAuthUser } from "@hooks/useSetAuthUser";

import Drawer from "@mui/material/Drawer";
import { Box, Button, Divider } from "@mui/material";
import { logOutUser } from "@utils/supabase.utils";

const AppDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSetAuthUser();

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    await logOutUser();
    navigate("/login");
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="flex h-full flex-col justify-between p-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[28px] font-bold">
          <img className="w-[75px]" src={AppLogo} />
          Dish Galeria
        </div>
        <Divider />

        <div className="flex flex-col">
          <span className="text-[22px] font-bold">{user?.displayName}</span>
          <span className="text-[15px]">{user?.email}</span>
        </div>
        <Divider />

        <div className="flex flex-col gap-2">
          <span>Recipe Count</span>
        </div>
        <Divider />
      </div>
      <div className="flex flex-col gap-2 py-2">
        <Divider />
        <button className="flex items-center gap-2 border-none bg-stone-50 p-2 text-left text-[15px]">
          <SVGClose width={18} height={18} /> Close
        </button>
        <button
          className="flex items-center gap-2 border-none bg-stone-50 p-2 text-left text-[15px] text-red-400"
          onClick={handleLogout}
        >
          <SVGLogout width={18} height={18} /> Logout
        </button>
      </div>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{ color: "#282828", minWidth: 0 }}
      >
        <SVGBurger />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default AppDrawer;
