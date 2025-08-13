import styled from "styled-components";
import { device } from "../../../utils/breakpoints";
import { CancelButton } from "../../button/button.styled";
export const ViewRecipeContainer = styled.div`
  display: flex;
  // gap: 1rem;
  // max-width: 1200px;
  width: 100%;

  ${device.mobile} {
    flex-direction: column;
  }

  ${device.laptop} {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0px 6px 0px rgba(100, 116, 139, 0.5);

  ${device.laptop} {
    flex: 1 1 40%;
  }
`;

export const ImageDisplay = styled.img`
  object-fit: cover;
  position: relative;

  ${device.mobile} {
    max-height: 200px;
  }

  ${device.tablet} {
    max-height: 300px;
  }

  ${device.laptop} {
    max-height: none;
    width: 450px;
    height: 600px;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  // flex-grow: 1;
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

  ${device.mobile} {
    padding: 0 0.5rem;
  }

  ${device.laptop} {
    padding: 0.5rem;
  }
`;

export const ContentText = styled.span`
  font-weight: 700;

  ${device.mobile} {
    font-size: 24px;
  }

  ${device.tablet} {
    font-size: 28px;
  }

  ${device.laptop} {
    font-size: 32px;
  }
`;

export const ContentTag = styled.span`
  text-transform: capitalize;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
  background-color: #8c6662;
  color: #fefefe;
  margin-bottom: 0.5rem;

  ${device.mobile} {
    font-size: 13px;
    padding: 0.5rem 0.75rem;
    border-radius: 12px;
  }

  ${device.tablet} {
    font-size: 14px;
  }

  ${device.laptop} {
    font-size: 16px;
  }
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
`;

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;

  ${device.mobile} {
    margin: 0 1rem 0 0;
  }

  ${device.laptop} {
    margin: 0;
  }
`;

export const ContentHeading = styled.span`
  font-weight: 700;
  padding: 0.5rem;
  border-bottom: 3px solid #8c6662;

  cursor: default;

  ${device.mobile} {
    font-size: 24px;
  }

  ${device.laptop} {
    font-size: 28px;
  }
`;

export const ContentBullet = styled.ul`
  line-height: 28px;

  ${device.mobile} {
    font-size: 16px;

    & li {
      margin: 0.2rem 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ${device.tablet} {
    font-size: 17px;
  }

  ${device.laptop} {
    font-size: 18px;

    & li {
      margin: 0.5rem 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const ContentOrder = styled.ol`
  line-height: 28px;

  ${device.mobile} {
    font-size: 16px;

    & li {
      margin: 0.2rem 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ${device.tablet} {
    font-size: 17px;
  }

  ${device.laptop} {
    font-size: 18px;

    & li {
      margin: 0.5rem 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const CloseButton = styled(CancelButton)`
  ${device.mobile} {
    font-size: 16px;
  }

  ${device.laptop} {
    font-size: 18px;
  }
`;
