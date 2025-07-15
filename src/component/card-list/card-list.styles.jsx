import styled from "styled-components";

export const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px; /* for better control */
  margin-left: 0;
  padding: 0 1rem 1rem;
  max-height: 450px;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(100, 116, 139, 0.5),
    0 2px 4px -2px rgba(100, 116, 139, 0.5);
`;
