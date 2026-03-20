// / <reference types="vite/client" />

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.css";
declare module "*.scss";
declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}
