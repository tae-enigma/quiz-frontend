import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  color?: 'primary' | 'secondary';
}
// '#3BAE97
const buttonColors = {
  primary: css`
    background: #3bae97;
    border: 3px solid #3bae97;
    color: #374354;

    &:hover {
      border-color: ${shade(0.2, '#3BAE97')};
      background: ${shade(0.2, '#3BAE97')};
    }
  `,
  secondary: css`
    background: transparent;
    border: 3px solid #3bae97;
    color: #3bae97;

    &:hover {
      background: #3bae97;
      color: #f5f5f5;
    }
  `,
};

export const Container = styled.button<ContainerProps>`
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;

  transition: all 0.2s;

  ${props => buttonColors[props.color || 'primary']}
`;
