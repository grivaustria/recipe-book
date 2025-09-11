import { styled as muiStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";
import { Link } from "react-router";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  // ${device.mobile} {
  //   // text-align: center;
  // }
`;

export const TitleText = styled.span`
  font-size: 64px;
  font-weight: 700;

  ${device.mobile} {
    font-size: 40px;
  }

  ${device.tablet} {
    font-size: 64px;
  }
`;

export const TitleDesc = styled.span`
  color: #6d6d6d;
  font-weight: 400;

  ${device.mobile} {
    font-size: 18px;
  }

  ${device.tablet} {
    font-size: 23px;
  }
`;

export const AuthContainer = styled.div`
  position: absolute;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  gap: 0.5rem;
`;

const BaseBtn = muiStyled(Button)`
  text-transform: uppercase;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-weight: 500;
`;

const BaseLinkBtn = (props) => {
  return <BaseBtn component={Link} {...props} />;
};

export const LoginBtn = styled(BaseLinkBtn)`
  background-color: #fefefe;
  color: #301411;
`;

export const SignUpBtn = styled(BaseLinkBtn)`
  background-color: #301411;
  color: #fefefe;
  text-transform: uppercase;
`;
