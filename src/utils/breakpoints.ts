export type BreakpointName =
  | "mobileSM"
  | "mobileMD"
  | "mobileLG"
  | "tablet"
  | "laptop"
  | "laptopLG"
  | "bigDesktop"
  | "max";

const breakpointValues: Record<BreakpointName, string> = {
  mobileSM: "20em", // 320px
  mobileMD: "23.4375em", // 375px
  mobileLG: "26.5625em", // 425px
  tablet: "48em", // 768px
  laptop: "64em", // 1024px
  laptopLG: "90em", // 1440px
  bigDesktop: "112.5em", // 1800px
  max: "160em", // 2560px
};

const emToNumber = (emValue: string): number => parseFloat(emValue);

export const breakpoints: Record<BreakpointName, string> = Object.keys(
  breakpointValues
).reduce((acc, key) => {
  const breakpointKey = key as BreakpointName;
  acc[breakpointKey] = `@media (min-width: ${breakpointValues[breakpointKey]})`;
  return acc;
}, {} as Record<BreakpointName, string>);

export const breakpointsMax: Record<BreakpointName, string> = Object.keys(
  breakpointValues
).reduce((acc, key) => {
  const breakpointKey = key as BreakpointName;
  const value = emToNumber(breakpointValues[breakpointKey]);
  const maxValue = (value - 0.0625).toFixed(4); // Subtract 1px equivalent
  acc[breakpointKey] = `@media (max-width: ${maxValue}em)`;
  return acc;
}, {} as Record<BreakpointName, string>);

export const breakpointsBetween = (
  min: BreakpointName,
  max: BreakpointName
): string => {
  if (!breakpointValues[min] || !breakpointValues[max]) {
    console.warn(`Breakpoint '${min}' or '${max}' not found`);
    return "";
  }
  const maxValue = emToNumber(breakpointValues[max]);
  const adjustedMax = (maxValue - 0.0625).toFixed(4);
  return `@media (min-width: ${breakpointValues[min]}) and (max-width: ${adjustedMax}em)`;
};

type DeviceBreakpoints = {
    mobile: string;
    tablet: string;
    laptop: string;
    desktop: string;
    wide: string;
}

export const device: DeviceBreakpoints = {
  mobile: breakpoints.mobileSM,
  tablet: breakpoints.tablet,
  laptop: breakpoints.laptop,
  desktop: breakpoints.laptopLG,
  wide: breakpoints.bigDesktop,
};

export const deviceMax: DeviceBreakpoints = {
  mobile: breakpointsMax.mobileLG,
  tablet: breakpointsMax.tablet,
  laptop: breakpointsMax.laptop,
  desktop: breakpointsMax.laptopLG,
  wide: breakpointsMax.max,
};

// Type guard to check if a string is a valid breakpoint name
export const isValidBreakpoint = (breakpoint: string): breakpoint is BreakpointName => {
  return Object.keys(breakpointValues).includes(breakpoint);
};

export const getBreakpointValue = (breakpoint: BreakpointName): string => {
  return breakpointValues[breakpoint];
};
