import styled from "styled-components";
import { styled as muiStyled } from "@mui/material";
import Button from "@mui/material/Button";

export const AppBarContainer = styled.div`
  //   background-color: #282828;
  width: 100%;
  //   position: absolute;
  //   top: 0;
  //   padding: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonDrawer = muiStyled(Button)`
    color: #282828;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fefefe;
  align-items: flex-end;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

export const UserEmail = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export const SignOutBtn = styled.button``;
