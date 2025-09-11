import styled from "styled-components";
import { styled as muiStyled } from "@mui/material";
import { device, breakpointsBetween } from "../../utils/breakpoints";
import { Button as MUIButton } from "@mui/material";

export const AuthBackground = styled.div`
  background-color: #fdf8f2;
  height: 100dvh;
  display: flex;
  align-content: center;
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

export const AuthTitle = styled.span`
  font-weight: 700;

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

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #ccccccff;
  padding: 1rem 1.5rem;
  width: 45%;
  background-color: #fefefe;
`;

export const LoginContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

export const LoginTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

export const LoginDesc = styled.div`
  color: #464646ff;
`;


