import styled from "styled-components";

export const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 1rem;

  width: 100%;
  max-width: 1200px; /* for better control */
  margin: 0 auto 1rem; 
  padding: 0 1rem 1rem;
  height: 410px;
  overflow-y: auto;
`;