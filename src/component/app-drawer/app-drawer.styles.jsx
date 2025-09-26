import styled from "styled-components";
import { styled as muiStyled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { BaseLinkBtn } from "../button/button.styled";

export const DrawerBox = muiStyled(Box)`
    display: flex;
    flex-direction: column;
    // justify-content: center;
    justify-content: space-between; 
    padding: 1rem;
    height: 100%;
`

export const DrawerContent = styled.div`
 display: flex; 
 flex-direction: column;
 gap: 1rem;
`

export const DrawerUserContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const DrawerTitle = styled.div`
    font-size: 28px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

export const DrawerLogo = styled.img`
    width: 75px;
`

export const DrawerUserName = styled.span`
    font-size: 22px;
    font-weight: 700;
`

export const DrawerUserEmail = styled.span`
    font-size: 15px;
    font-weight: 400;
`

export const DrawerUID = styled.span`
    font-size: 14px;
    color: #6b6b6bff;
`

export const DrawerInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const DrawerInfoText = styled.span`

`

export const DrawerOptions = styled.span`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0;
`

export const OpenDrawer = muiStyled(Button)`
    color: #282828;
`;

export const DrawerButton = styled.button`
    background-color: #fefefe;
    border: none;
    padding: 0.5rem;
    text-align: left;
    font-size: 15px;
    display: flex;
    align-items: center; 
    gap: 0.5rem;

    &.logout {
        color: #f35555ff;
        // font-weight: 600;
        
    }
`

