// import * as React from "react";
import { useState } from "react";
import type { MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  ContentTitle,
  ContentText,
  ContentTag,
  ContentTitleContainer,
  ContentOption,
} from "./view-recipe.styles";

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
    <ContentTitleContainer>
      <ContentTitle>
        <ContentText>{title}</ContentText>
        <ContentTag>{tag}</ContentTag>
      </ContentTitle>
      <ContentOption>
        {showComponent && (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img className="img" src={MoreOptions} />
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
              className="menu"
            >
              <MenuItem className="menu-item" onClick={handleUpdateItem}>
                Update
              </MenuItem>
              <MenuItem className="menu-item" onClick={handleDeleteItem}>
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </ContentOption>
    </ContentTitleContainer>
  );
};

export default ViewRecipeTitle;
