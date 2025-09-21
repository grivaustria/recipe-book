import styled from "styled-components";
import { SpinnerContainer } from "../spinner/spinner.styles";

export const NoResultContainer = styled.div`
  //   height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoResultText = styled.span`
  font-size: 24px;
  font-style: italic;
  color: #8b8b8bff;
  text-align: center;
`;
