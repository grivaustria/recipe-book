import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  margin: 0.25rem 0 0;

  ${device.mobile} {
    text-align: center;
  }
`;

export const TitleText = styled.span`
  font-size: 64px;
  font-weight: 700;

  ${device.mobile} {
    font-size: 48px;
  }

  ${device.tablet} {
    font-size: 64px;
  }
`;

export const TitleDesc = styled.span`
  font-size: 23px;
  color: #6d6d6d;
  font-weight: 400;

`;
