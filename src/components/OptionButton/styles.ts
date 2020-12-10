import styled, { css } from 'styled-components';

interface OptionButtonProps {
  selected?: 'unselected' | 'selected';
}

const optionsCheck = {
  unselected: css`
    border: 3px solid #374354;
  `,
  selected: css`
    border: 3px solid #3bae97;
  `,
};

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  color: #374354;
`;

export const OptionButtonCard = styled.button<OptionButtonProps>`
  transition: all 0.2s;
  border-radius: 8px;
  margin-top: 5px;

  ${props => optionsCheck[props.selected || 'unselected']};
`;

export const Option = styled.p`
  padding: 5px;
  text-align: left;
  color: #374354;
`;
