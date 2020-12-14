import styled, { css } from 'styled-components';
import radiantIconImg from '../../../assets/images/radiant_icon.png';
import direIconImg from '../../../assets/images/dire_icon.png';

export const Container = styled.div``;

export const Content = styled.div`
  margin-bottom: 50px;
  height: 700px;
  padding: 4px;
  background-color: #303d50;
  border-radius: 8px;

  overflow-y: auto;
`;

export const QuestionsHeader = styled.div``;

export const QuestionsActions = styled.div``;

export const Question = styled.div`
  display: flex;
  padding: 16px;
  background-color: #e5e5e5;
  border-radius: 8px;

  & + div {
    margin-top: 8px;
  }
`;

export const QuestionContent = styled.div`
  flex: 1;
  color: #303d50;

  div:first-child {
    display: flex;
    align-items: center;
  }

  > div + div {
    margin-top: 16px;
  }
`;
export const QuestionActions = styled.div`
  padding-left: 16px;

  button {
    align-items: center;
    width: min-content;
    height: min-content;
    padding: 0;
    margin: 0;
  }
`;

interface TeamIconProps {
  team: 'radiant' | 'dire';
}

const teamIcons = {
  radiant: radiantIconImg,
  dire: direIconImg,
};

export const TeamIcon = styled.div<TeamIconProps>`
  width: 30px;
  height: 30px;
  background-size: contain;

  margin-right: 16px;

  ${props =>
    props.team &&
    css`
      background-image: url(${teamIcons[props.team]});
    `};
`;

export const Options = styled.div``;

interface OptionProps {
  is_selected: boolean;
}

export const Option = styled.div<OptionProps>`
  display: flex;

  + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.is_selected &&
    css`
      color: #2d7c72;
    `};
`;
