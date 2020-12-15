import styled, { css } from 'styled-components';
import radiantIconImg from '../../../assets/images/radiant_icon.png';
import direIconImg from '../../../assets/images/dire_icon.png';

import radiantTowerImg from '../../../assets/images/tower_iluminados.png';
import direTowerImg from '../../../assets/images/tower_temidos.png';

export const Container = styled.div``;

export const QuestionHeader = styled.div`
  > div {
    display: flex;
    align-items: center;
  }

  div + div {
    margin-left: 32px;
  }
`;

export const ModalBody = styled.div`
  form > p {
    font-size: 12px;
    color: #e5e5e5;
    margin-bottom: 24px;
  }
`;

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

  p + p {
    margin-left: 16px;
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
interface TeamTowerProps {
  team: 'radiant' | 'dire';
}

const teamTowers = {
  radiant: radiantTowerImg,
  dire: direTowerImg,
};

export const TeamTower = styled.div<TeamTowerProps>`
  width: 30px;
  height: 30px;
  background-size: contain;

  margin-right: 16px;

  ${props =>
    props.team &&
    css`
      background-image: url(${teamTowers[props.team]});
    `};
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

  margin: 16px 0;

  svg {
    align-self: flex-start;
    margin-right: 16px;
  }

  > div {
    max-width: 80%;
  }

  ${props =>
    props.is_selected &&
    css`
      color: #2d7c72;
    `};
`;
