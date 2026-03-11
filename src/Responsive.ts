// src/Responsive.ts
import { css, FlattenSimpleInterpolation } from "styled-components";

// Accept either a string or a css helper
type CssProps = string | FlattenSimpleInterpolation;

/**
 * Helper for small devices (mobile)
 */
export const smallDevice = (props: CssProps) => css`
  @media (max-width: 31.25em) {
    ${props}
  }
`;

/**
 * Helper for tablet devices
 */
export const tabletDevice = (props: CssProps) => css`
  @media (max-width: 56.25em) {
    ${props}
  }
`;

/**
 * Helper for medium devices (small laptops / large tablets)
 */
export const mediumDevice = (props: CssProps) => css`
  @media (max-width: 75em) {
    ${props}
  }
`;

/**
 * Helper for large devices (desktop)
 */
export const largeDevice = (props: CssProps) => css`
  @media (min-width: 54.7em) {
    ${props}
  }
`;
