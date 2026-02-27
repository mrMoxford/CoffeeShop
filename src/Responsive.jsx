import { css } from "styled-components";

export const smallDevice = props => {
  return css`
    @media (max-width: 31.25em) {
      ${props}
    }
  `;
};
export const tabletDevice = props => {
  return css`
    @media (max-width: 56.25em) {
      ${props}
    }
  `;
};
export const mediumDevice = props => {
  return css`
    @media (max-width: 75em) {
      ${props}
    }
  `;
};
export const largeDevice = props => {
  return css`
    @media (min-width: 54.7em) {
      ${props}
    }
  `;
};
