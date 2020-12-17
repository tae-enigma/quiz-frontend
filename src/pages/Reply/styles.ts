import styled, { css } from 'styled-components';
import map from '../../assets/images/map.png';
import radiantTowerImg from '../../assets/images/tower_iluminados.png';
import direTowerImg from '../../assets/images/tower_temidos.png';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${map});
  background-repeat: no-repeat;
  background-size: cover;
`;

// cor da torre dos temidos: #000000
export const Content = styled.div`
  position: relative;
  width: 800px;
  padding: 16px;

  background: #f2f2f2; // fazer verificação do time
  opacity: 0.85;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  text-align: center;
  padding: 10px;
`;

export const Header = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  img {
    /* position: fixed; */
    margin-right: 16px;
    width: 35px;
    height: 40px;
    /* margin-top: -15px; */
    /* margin-left: -90px; */
  }
`;

export const Title = styled.div`
  display: flex;
  color: #374354;
  font-size: 22px;
  text-align: center;
`;

export const Description = styled.div`
  background: #374354;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Options = styled.div`
  width: 100%;
`;

interface OptionProps {
  selected: boolean;
}

export const Option = styled.button<OptionProps>`
  width: 100%;

  transition: all 0.2s;
  border-radius: 8px;
  /* margin-top: 5px; */
  border: 3px solid #374354;
  color: #374354;

  padding: 16px;
  text-align: left;

  margin-bottom: 8px;

  ${props =>
    props.selected &&
    css`
      border: 3px solid #3bae97;
      /* > p { */
      color: #3bae97;
      /* } */
    `}
`;

interface TeamTowerProps {
  team: 'radiant' | 'dire';
}

const teamTowers = {
  radiant: radiantTowerImg,
  dire: direTowerImg,
};

export const TeamTower = styled.div<TeamTowerProps>`
  width: 80px;
  height: 80px;
  background-size: contain;

  margin-right: 16px;

  ${props =>
    props.team &&
    css`
      background-image: url(${teamTowers[props.team]});
    `};
`;
