import styled from "styled-components";

export const AddRecipeContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow-x: auto;
  padding: 1.5rem;
`;

export const RecipeTitleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const InputLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LabelText = styled.label`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
`;

export const InputText = styled.input`
  font-size: 18px;
  padding: 0.5rem 0.75rem;
  border: 2px solid #000;
  border-radius: 10px;
`;

export const SelectOption = styled.select`
  font-size: 18px;
  padding: 0.5rem 0.75rem;
  border: 2px solid #000;

  border-radius: 10px;
`;

export const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 0.5rem;

`;


export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  & :is(${ContentContainer}:nth-child(1), ${ContentContainer}:nth-child(2)) {
    grid-template-columns: 10% 20% 50% 20%;
  
  } 
`;


export const OptionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  // width: 100%;
`;

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
