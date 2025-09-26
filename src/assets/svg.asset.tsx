import { useMediaQuery } from "@mui/material";

type SVGProps = {
  width?: number | string;
  height?: number | string;
}

export const SVGLogout = ({width, height}: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21V3h9v2H5v14h7v2zm13-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
      ></path>
    </svg>
  );
};

export const SVGBurger = ({width, height}: SVGProps) => {
  const deviceMobile = useMediaQuery("(max-width: 599px)");
  const deviceTablet = useMediaQuery("(max-width: 1023px)");
  const deviceLaptop = useMediaQuery("(max-width: 1919px)");
  const deviceDesktop = useMediaQuery("(max-width: 2559px)");
  const deviceWide = useMediaQuery("(min-width: 2560px)");

  const sizeCondition = deviceMobile 
    ? 18
    : deviceTablet 
      ? 30
      : deviceLaptop
        ? 48
        : deviceDesktop
         ? 48
         : deviceWide 
          ? 48
          : 18; 

  const finalWidth = width ?? sizeCondition;
  const finalHeight = height ?? sizeCondition;   

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={finalWidth} height={finalHeight} viewBox="0 0 24 24"><path fill="none" stroke="#0d0b0b" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 6h18M3 12h18M3 18h18"></path></svg>
  )
}


export const SVGClose = ({width, height}: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>
  )
}

