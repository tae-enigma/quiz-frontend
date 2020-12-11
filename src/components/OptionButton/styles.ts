import styled, { css } from 'styled-components';

interface OptionButtonProps1 {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  color: #374354;
`;

export const OptionButtonCard = styled.button<OptionButtonProps1>`
  transition: all 0.2s;
  border-radius: 8px;
  margin-top: 5px;
  border: 3px solid #374354;

  ${props =>
    props.selected &&
    css`
      border: 3px solid #3bae97;
      > p {
        color: #3bae97;
      }
    `}
`;

export const OptionText = styled.p`
  padding: 5px;
  text-align: left;
  color: #374354;
`;
