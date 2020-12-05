import styled, { css } from 'styled-components';
import check from '../../assets/images/checked.png';

interface ContainerProps {
  color?: 'unchecked' | 'checked';
}

const buttonColors = {
  unchecked: css`
    background: transparent;
    border: 3px solid #374354;
  `,
  checked: css`
    background: url(${check});
    border: 2px solid #374354;
  `,
};

export const Container = styled.div`
  width: 340px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  color: #374354;
`;

export const Checkbox = styled.button<ContainerProps>`
  height: 36px;
  width: 36px !important;
  transition: all 0.2s;
  border-radius: 8px;
  margin-top: 6px;
  margin-left: 18px;
  margin-right: 6px;

  ${props => buttonColors[props.color || 'unchecked']};
`;

export const Option = styled.p`
  max-width: 80%;
  text-align: left;
  margin-top: 6px;
`;
