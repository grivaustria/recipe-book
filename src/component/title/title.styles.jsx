import { styled as muiStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";
import { Link } from "react-router";

export const Container = styled.div`
  display: flex;
  align-items: center;

  margin: 0 1rem;

  ${device.mobile} {
    // flex-direction: column;
    // justify-content: center;
  }

  ${device.laptop} {
    justify-content: space-between;
    max-width: 910px;
    width: 100%;
  }

  ${device.desktop} {
    max-width: 1200px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const TitleText = styled.span`
  font-size: 64px;
  font-weight: 700;
  // width: 100%;

  ${device.mobile} {
    font-size: 36px;
  }

  ${device.tablet} {
    font-size: 64px;
  }
`;

export const TitleDesc = styled.span`
  color: #6d6d6d;
  font-weight: 400;

  ${device.mobile} {
    font-size: 14px;
  }

  ${device.tablet} {
    font-size: 23px;
  }
`;

export const AuthContainer = styled.div`
  position: absolute;
  width: 100%;
`;

export const AuthUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const UserName = styled.span`
  font-weight: 700;
  font-size: 24px;
`;

export const UserEmail = styled.span`
  font-weight: 400;
  font-size: 16px;
`;

export const UserUID = styled.span`
  font-size: 16px;
  color: #6b6b6bff;
`;
