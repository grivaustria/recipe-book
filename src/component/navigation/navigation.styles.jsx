import styled from "styled-components";
import { device } from "../../utils/breakpoints";

export const Container = styled.div`
  display: flex;
  // justify-content: space-between;
  // gap: 1rem;
  align-items: center;
  // max-width: 1200px;
  width: 100%;

  ${device.mobile} {
    flex-direction: column;
    gap: 1rem;
  }

  ${device.laptop} {
    flex-direction: row;
    max-width: 910px;
    justify-content: center;
    gap: 0.5rem;
  }

  ${device.desktop} {
    max-width: 1200px;
    gap: 1rem;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const NavigationDish = styled.div`
  border-radius: 20px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
  // padding: 0.5rem 1rem;

  ${device.mobile} {
    padding: 0.5rem 0.75rem;
    font-size: 12px;
  }

  ${device.tablet} {
    font-size: 16px;
  }

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

