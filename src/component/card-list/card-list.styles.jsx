import styled from "styled-components";

export const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px; /* for better control */
  margin-left: 0
`;
