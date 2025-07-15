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
    
`;

export const ImageDisplay = styled.img`
width: 450px;
  height: 450px;
  object-fit: cover;
  position: relative;

`

export const ImageText = styled.span`
    font-size: 28px;
    font-weight: 700;
    padding: 0.5rem;
`

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 60%;
  padding: 1rem 0.5rem;
  max-height: 450px;
    overflow-y: auto;
`;

export const ContentHeading = styled.span`
    font-size: 24px;
    font-weight: 700;
`

export const ContentBullet = styled.ul`
    font-size: 18px;
`

export const ContentOrder = styled.ol`
    font-size: 18px;
`

