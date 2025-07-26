import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 288px;
  width: 100%;
  height: 214px; /* Match the CardAdd height exactly */
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
  width: 100%; /* This should be 100% not 380px */
  height: 150px;
  object-fit: cover;
  flex-shrink: 0; /* Prevent image from shrinking */
`;

export const DishTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 90%;
  padding: 0.5rem 0.75rem;
  flex: 1; /* This will make text container fill remaining space */
  justify-content: flex-start; /* Align text to top */
`;

export const DishName = styled.span.attrs({ className: "dish-name" })`
  font-weight: 700;
  font-size: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const DishType = styled.span`
  text-transform: capitalize;
`;
