import styled from "styled-components";

export const ViewRecipeContainer = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 1200px;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 40%;
  box-shadow: 5px 0px 6px 0px rgba(100, 116, 139, 0.5);
`;

export const ImageDisplay = styled.img`
  width: 450px;
  height: 600px;
  object-fit: cover;
  position: relative;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 1 60%;
  padding: 1rem 0.5rem;
  max-height: 565px;
  overflow-y: auto;
`;



export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
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
`;

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;

`

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




