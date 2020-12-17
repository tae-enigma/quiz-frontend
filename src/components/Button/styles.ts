import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  color?: 'primary' | 'secondary';
}
// '#3BAE97
const buttonColors = {
  primary: {
    enabled: css`
      background: #3bae97;
      border: 3px solid #3bae97;
      color: #374354;

      &:hover {
        border-color: ${shade(0.2, '#3BAE97')};
        background: ${shade(0.2, '#3BAE97')};
      }
    `,
    disabled: css`
      background: #8e9fb1;
      border: 3px solid #8e9fb1;
      color: #374354;

      /* &:hover {
        border-color: ${shade(0.2, '#9BDDD0')};
        background: ${shade(0.2, '#9BDDD0')};
      } */
    `,
  },
  secondary: {
    enabled: css`
      background: transparent;
      border: 3px solid #3bae97;
      color: #3bae97;

      &:hover {
        background: #3bae97;
        color: #f5f5f5;
      }
    `,
    disabled: css`
      background: transparent;
      border: 3px solid #8e9fb1;
      color: #8e9fb1;

      /* &:hover {
        background: #3bae97;
        color: #f5f5f5;
      } */
    `,
  },
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 0;
  padding: 16px 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;

  div + & {
    margin-top: 16px;
  }

  transition: all 0.2s;

  ${props => buttonColors[props.color || 'primary'].enabled}

  &:disabled {
    cursor: default;
    ${props => buttonColors[props.color || 'primary'].disabled}
  }
`;
