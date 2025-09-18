import styled from "styled-components";
import { styled as muiStyled, TextField } from "@mui/material";
import { device, breakpointsBetween } from "../../utils/breakpoints";
import { Button as MUIButton } from "@mui/material";
import { Link } from "react-router";

export const AuthBackground = styled.div`
  background-color: #fdf8f2;
  display: flex;
  margin: 0;
  padding: 0 2.5rem;
  font-family: "Arial", sans-serif;

  ${device.mobile} {
    height: 100dvh;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AuthTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 55%;

  // ${device.mobile} {
  //   // text-align: center;
  // }
`;

export const AuthTitle = styled(Link)`
  font-weight: 700;
  text-decoration: none;
  color: #0e0e0e;

  ${device.mobile} {
    font-size: 40px;
  }

  ${device.tablet} {
    font-size: 64px;
  }
`;

export const AuthText = styled.span`
  color: #6d6d6d;
  font-weight: 400;

  ${device.mobile} {
    font-size: 18px;
  }

  ${device.tablet} {
    font-size: 23px;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #ccccccff;
  padding: 1rem 1.5rem;
  width: 45%;
  background-color: #fefefe;
`;

export const AuthContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

export const AuthTitleText = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

export const AuthDesc = styled.div`
  color: #464646ff;
`;

export const SignUpPrompt = styled.span`
  text-align: center;
`;

export const LinkText = styled(Link)`
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const TextFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const TextFieldInput = muiStyled(TextField)`
  width: 100%;
`;
