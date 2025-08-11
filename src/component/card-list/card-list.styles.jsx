import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";

export const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  // width: 100%;

  /* for better control */
  max-width: 1200px;

  margin: 0 auto 1rem;
  padding: 0 1rem 1rem;
  // height: 410px;
  overflow-y: auto;

  ${device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
    // max-width: 400px;
    max-height: 200px;
  }

  ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
    max-height: 400px;
  }
`;
