import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 295px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(100, 116, 139, 0.5),
    0 2px 4px -2px rgba(100, 116, 139, 0.5);
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;
  transition: 0.3s all ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  &:hover span.dish-name {
    text-decoration: underline;
  }
`;

export const DishImage = styled.img`
  width: 380px;
  height: 150px;
  object-fit: cover;
  position: relative;
`;

export const DishTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 90%;
  padding: 0.5rem 0.75rem;
`;

export const DishName = styled.span.attrs({ className: "dish-name" })`
  font-weight: 700;
  font-size: 24px;
`;

export const DishType = styled.span`
  text-transform: capitalize;
`
