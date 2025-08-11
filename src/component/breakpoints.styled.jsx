const breakpointValues = {
  mobileSM: "20em", // 320px
  mobileMD: "23.4375em", // 375px
  mobileLG: "26.5625em", // 425px
  tablet: "48em", // 768px
  laptop: "64em", // 1024px
  laptopLG: "90em", // 1440px
  bigDesktop: "112.5em", // 1800px
  max: "160em", // 2560px
};

const emToNumber = (emValue) => parseFloat(emValue);

const breakpoints = Object.keys(breakpointValues).reduce((acc, key) => {
  acc[key] = `@media (min-width: ${breakpointValues[key]})`;
  return acc;
}, {});

const breakpointsMax = Object.keys(breakpointValues).reduce(
  (acc, key) => {
    const value = emToNumber(breakpointValues[key]);
    const maxValue = (value - 0.0625).toFixed(4);
    acc[key] = `@media (max-width: ${maxValue}em)`;
    return acc;
  },
  {}
);

export const breakpointsInBetween = (min, max) => {
  if (!breakpointValues[min] || !breakpointValues[max]) {
    console.warn(`breakpoint '${min}' or '${max} not found.`);
    return "";
  }
  const maxValue = emToNumber(breakpointValues[max]);
  const adjustedMax = (maxValue - 0.0625).toFixed(4);
  return `@media (min-width: ${breakpointValues[min]}) and (max-width: ${adjustedMax}em)`;
};

export const bp = breakpointValues;

export const device = {
    mobile: breakpoints.mobileSM,
    tablet: breakpoints.tablet,
    laptop: breakpoints.laptop,
    desktop: breakpoints.laptopLG,
    wide: breakpoints.bigDesktop,
};

export const deviceMax = {
    mobile: breakpointsMax.mobileLG,
    tablet: breakpointsMax.tablet,
    laptop: breakpointsMax.laptop,
    desktop: breakpointsMax.laptopLG,
    wide: breakpointsMax.max,
}

