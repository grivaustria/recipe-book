import styled from "styled-components";

export const AddRecipeContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1.5rem;
  height: 550px;
`;

export const RecipeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  &.ingredient ${ContentContainer} {
    grid-template-columns: 10% 20% 54% 20%;
  }

  &.procedure ${ContentContainer} {
    // grid-template-columns: 5% 76% 18%;
    grid-template-columns: 5% 80% 18%;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  // width: 100%;
`;
