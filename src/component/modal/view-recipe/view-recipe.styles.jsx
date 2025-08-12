import styled from "styled-components";
import { device } from "../../../utils/breakpoints";

export const ViewRecipeContainer = styled.div`
  display: flex;
  // gap: 1rem;
  // max-width: 1200px;
  width: 100%;

  ${device.mobile} {
    flex-direction: column;
  }

  ${device.tablet} {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0px 6px 0px rgba(100, 116, 139, 0.5);

  ${device.tablet} {
    flex: 1 1 40%;
  }
`;

export const ImageDisplay = styled.img`
    object-fit:cover;

  ${device.mobile} {
    max-height: 200px;
    // display: none;
  }

  ${device.tablet} {
    max-height: none;
    width: 450px; 
    height 600px; 
  }

  position: relative;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  min-width: 0;
  width: 100%;
  padding: 1rem 0.5rem;
  max-height: 565px;
  overflow-y: auto;
`;

export const ContentTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const ContentText = styled.span`
  font-size: 32px;
  font-weight: 700;
`;

export const ContentTag = styled.span`
  text-transform: capitalize;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  background-color: #8c6662;
  color: #fefefe;
  margin-bottom: 0.5rem;
`;

export const ContentOption = styled.div`
  margin: 0.5rem 0.8rem 0 0;

  & .img {
    align-self: center;
    height: 30px;
    transition: 0.2s all ease-in-out;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }

  & .menu-item {
  }
`;

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentHeading = styled.span`
  font-size: 28px;
  font-weight: 700;
  padding: 0.5rem;
  border-bottom: 3px solid #8c6662;

  cursor: default;
`;

export const ContentBullet = styled.ul`
  font-size: 18px;
  line-height: 28px;
`;

export const ContentOrder = styled.ol`
  font-size: 18px;
  line-height: 28px;
`;
