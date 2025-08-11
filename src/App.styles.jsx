import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  // height: 100vh;
  font-family: "Arial", sans-serif;
  background-color: #fdf8f2;
}
`;

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100vh;
`;

