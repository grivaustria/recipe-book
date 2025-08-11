import styled from "styled-components";

export const AddRecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  // max-width: 288px;
  // padding: 0 2rem;
  width: 100%;
  height: 214px; /* Keep this to match your regular cards */
  box-shadow: 0 4px 6px -1px rgba(100, 116, 139, 0.5),
    0 2px 4px -2px rgba(100, 116, 139, 0.5);
  align-items: center;
  border-radius: 0.5rem;
  border: 1px dashed #949494;
  overflow: hidden;
  background-color: #fdf8f2;
  transition: 0.3s all ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  &:hover span.add-dish-name {
    text-decoration: underline;
  }
`;

export const AddRecipeImage = styled.img`
  width: 40px;
  // width: 100%;
  color: #0e0e0e;
  height: auto;
`;

export const AddRecipeText = styled.span.attrs({ className: "add-dish-name" })`
  font-size: 24px;
  font-weight: 400;
  color: #797979;
`;
