import styled from "styled-components";

const Button = styled.button`
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

export const RemoveButton = styled(Button)`
  background-color: #e34040;
  font-size: 20px;
  font-weight: 700;
  border: none;
`;

export const AddItemButton = styled(Button)`
  background-color: #20bc1d;
  font-size: 16px;
  border: none;
`;

export const SubmitRecipe = styled(Button)`
  background-color: #2d76e2ff;
  font-size: 20px;
  border: none;
  // font-weight: 700;
  align-self: center;
`;

export const CancelButton = styled(Button)`
  background-color: #d6d6d6ff;
  color: #0e0e0e;
  font-size: 20px;
  border: none;
  align-self: center;
`;

export const DeleteButton = styled(RemoveButton)``;
