import styled from "styled-components";
import { device } from "../../utils/breakpoints";

export const ModalBackground = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #0000007c;
  position: absolute;
  z-index: 50;
`;

export const Modal = styled.div`
  display: flex;
  background-color: #fefefe;
  // margin: 0 13rem;
  z-index: 60;

  ${device.mobile} {
    height: 90vh;
    margin: 1rem;
  }

  ${device.tablet} {
    margin: 2rem 3rem;
  }

  ${device.laptop} {
    height: auto;
    margin: 0 13rem;
  }
`;
