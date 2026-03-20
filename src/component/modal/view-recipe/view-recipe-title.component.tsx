// import * as React from "react";
import { type MouseEvent, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreOptions from "../../../assets/qlementine-icons--menu-dots-16.svg";
import { useWindowResize } from "../../../hooks/useWindowResize";

type ViewRecipeTitleProps = {
  id: string;
  title: string;
  tag: string;
  onDelete: () => void;
  onUpdate: () => void;
};

const ViewRecipeTitle = ({
  title,
  tag,
  onDelete,
  onUpdate,
}: ViewRecipeTitleProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { showComponent } = useWindowResize();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = async () => {
    setAnchorEl(null);
    onDelete();
  };

  const handleUpdateItem = () => {
    setAnchorEl(null);
    onUpdate();
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col items-start gap-2 px-2 py-2">
        <span className="text-2xl font-bold text-stone-900 md:text-[28px] xl:text-[32px]">
          {title}
        </span>
        <span className="mb-2 rounded-xl bg-[#8c6662] px-3 py-2 text-sm capitalize text-stone-50 shadow-[2px_2px_2px_0_rgba(0,0,0,0.5)] md:text-base">
          {tag}
        </span>
      </div>
      <div className="mr-3 mt-2">
        {showComponent && (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ minWidth: "auto", padding: 0.5 }}
            >
              <img
                className="h-[30px] self-center transition hover:cursor-pointer hover:opacity-70"
                src={MoreOptions}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={handleUpdateItem}>Update</MenuItem>
              <MenuItem onClick={handleDeleteItem}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRecipeTitle;
