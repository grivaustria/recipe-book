import styled from "styled-components";

export const TinyModal = styled.div`
  display: flex;
  background-color: #fefefe;
  margin: 0 30rem;
  border-radius: 1rem;
`;

export const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  // gap: 0.5rem;
  font-size: 20px;
`;

export const ImageDeleteWarning = styled.img`
  margin-bottom: 0.5rem;
`;

export const DeleteText = styled.div`
  text-align: center;
`;

export const RecipeToDelete = styled.span`
  font-weight: 700;
  font-style: italic;
`;

export const DeleteWarning = styled.div`
  color: #cf1b0eff;
  font-weight: 700;
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
