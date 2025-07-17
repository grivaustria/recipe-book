import styled from "styled-components";

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const NavigationDish = styled.div`
  border-radius: 20px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;


  &:hover {
    opacity: 0.7;
  }
  
  &.active {
    background-color: #301411;
    color: #fefefe; 
  }

  /* Prevent text selection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

