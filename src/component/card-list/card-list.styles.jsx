import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";

export const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  /* for better control */
    max-width: 1200px;
    width: 100%;

  margin: 0 auto 1rem;
    padding: 0 0 1rem;

  overflow-y: auto;
  overflow-x: hidden;
  height: 65vh;

  ${device.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${device.desktop} {
    grid-template-columns: repeat(4, 1fr);

  }

`;
