import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 295px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(100, 116, 139, 0.5),
    0 2px 4px -2px rgba(100, 116, 139, 0.5);
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  &:hover span.dish-name {
    text-decoration: underline;
    transition: 0.3s all ease-in-out;
  }
`;

export const DishImage = styled.img`
  width: 295px;
  height: 295px;
  object-fit: cover;
  position: relative;
`;

export const DishTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
`;

export const DishName = styled.span.attrs({ className: "dish-name" })`
  font-weight: 700;
  font-size: 24px;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
