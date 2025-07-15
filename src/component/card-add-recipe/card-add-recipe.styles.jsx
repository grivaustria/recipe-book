import styled from "styled-components";

export const AddRecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 295px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(100, 116, 139, 0.5),
    0 2px 4px -2px rgba(100, 116, 139, 0.5);
  align-items: center;
  border-radius: 0.5rem;
  border: 3px dashed #949494;
  overflow: hidden;
  background-color: #E5E5E5;

  &:hover {
    cursor: pointer;
  }

  &:hover span.add-dish-name{
    text-decoration: underline;
  }
`;

export const AddRecipeImage = styled.img`
    width: 100px;
    height: auto;
`

export const AddRecipeText = styled.span.attrs({ className: "add-dish-name" })`
    font-size: 32px;
    font-weight: 700;
    color: #797979;
`