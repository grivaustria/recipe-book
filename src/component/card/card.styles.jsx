import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 295px;
  box-shadow: 0 4px 6px -1px rgba(100, 116, 139, 0.5),
    0 2px 4px -2px rgba(100, 116, 139, 0.5);
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &:hover span.dish-name { 
    text-decoration: underline;
    transition: 0.3s all ease-in-out
  }
`;

export const DishImage = styled.img`
  max-width: 295px;
`;

export const DishTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
`;

export const DishName = styled.span.attrs({classname: "dish-name"})`
  font-weight: 700;
  font-size: 28px;
  height: 70px;
  display: flex;
  align-items: center;
  text-align: center;
`;
