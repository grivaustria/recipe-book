import styled from "styled-components";
import { device, breakpointsBetween } from "../../utils/breakpoints";

export const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  /* for better control */
  max-width: 1200px;

  margin: 0 auto 1rem;
  padding: 0 1rem 1rem;
  overflow-y: auto;

  ${device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
    width: 80%;
  }

  ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
    width: 90%;
  }

  ${device.laptop} {
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
  }
`;
