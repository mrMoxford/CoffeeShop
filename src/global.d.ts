// src/declarations.d.ts

// ---------------------------
// WHY WE NEED THIS FILE
// ---------------------------
// TypeScript by default only understands .ts, .tsx, and .js files.
// When you import static assets like images, SVGs, or videos:
//    import africa from "./Countries/africaHighspec.svg";
// TypeScript doesn't know the type of "africa" and will throw:
//    "Cannot find module './Countries/africaHighspec.svg' or its corresponding type declarations."
//
// This file declares modules for these file types so TypeScript
// knows how to handle them, preventing type errors in your imports.
//
// Essentially, this tells TS: "Treat these files as strings representing their URLs"
// OR optionally as React components for SVGs.

// ---------------------------
// DECLARE IMAGE MODULES
// ---------------------------

// For PNG files
declare module "*.png" {
  const content: string; // TypeScript treats import as a string (URL)
  export default content;
}

// For JPG/JPEG files
declare module "*.jpg" {
  const content: string;
  export default content;
}

// For SVG files imported as URLs
declare module "*.svg" {
  const content: string;
  export default content;
}

// Optional: SVG as React component
// Uncomment if you want to do:
// import { ReactComponent as Logo } from "./logo.svg";
// <Logo /> in JSX
/*
declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
*/

// For MP4 or other video files
declare module "*.mp4" {
  const content: string;
  export default content;
}
