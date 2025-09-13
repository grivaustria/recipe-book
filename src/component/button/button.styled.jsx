import { styled as muiStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";
import { Link } from "react-router";

const CustomButton = styled.button`
  padding: 0.5rem 1rem;
  color: #fefefe;
  border-radius: 10px;
  transition: 0.2s opacity ease-in-out;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
`;

export const RemoveButton = styled(CustomButton)`
  background-color: #e34040;
  font-size: 20px;
  font-weight: 700;
  border: none;
`;

export const AddItemButton = styled(CustomButton)`
  background-color: #20bc1d;
  font-size: 16px;
  border: none;
`;

export const SubmitRecipe = styled(CustomButton)`
  background-color: #2d76e2ff;
  font-size: 20px;
  border: none;
  // font-weight: 700;
  align-self: center;
`;

export const CancelButton = styled(CustomButton)`
  background-color: #d6d6d6ff;
  color: #0e0e0e;
  font-size: 20px;
  border: none;
  align-self: center;
`;

export const DeleteButton = styled(RemoveButton)``;

export const MUIButtonContainer = styled.div`
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

export const AuthSubmitBtn = styled(SignUpBtn)``;

export const ThirdPartyAccBtn = styled(BaseBtn)`
  color: #0e0e0e;
  text-transform: capitalize;
  display: flex;
  gap: 0.5rem;
  font-size: 15px;
`;
