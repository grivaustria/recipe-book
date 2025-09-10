import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
import { Button } from "@mui/material";

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

export const LoginBtn = styled(BaseBtn)`
  background-color: #fefefe;
  color: #301411;
`;

export const SignUpBtn = styled(BaseBtn)`
  background-color: #301411;
  color: #fefefe;
  text-transform: uppercase;
`;
