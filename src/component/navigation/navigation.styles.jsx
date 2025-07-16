import styled from "styled-components";

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const NavigationDish = styled.div`
  border: 3px solid;
  // padding: 0.5rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 355px;
  height: 130px;

  &:hover {
    opacity: 0.7;
  }
  
  &.active span {
    font-size: 38px
  }

  /* Prevent text selection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;


export const NavigationHeading = styled.span`
  font-weight: 700;
  font-size: 32px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;

export const NavigationFish = styled(NavigationDish)`
  border-color: #64ebe6;
  background-color: #abfffc;
  border-bottom-left-radius: 32px;
  color: #2391cd;

  &.active {
    background-color: #8af5f1;
    border-color: #4dd4cf;
  }
`;

export const NavigationMeat = styled(NavigationDish)`
  border-color: #8be556;
  background-color: #c1fa9f;
  color: #14ae5c;

  &.active {
    background-color: #aef77a;
    border-color: #6bc230;
  }
`;

export const NavigationDessert = styled(NavigationDish)`
  border-color: #F094A4;
  background-color: #FFC1CC;
  border-bottom-right-radius: 32px;
  color: #F04F6C;

  &.active {
    background-color: #ffaab8;
    border-color: #e6708a;
  }
`;
