import styled from 'styled-components';
import map from '../../assets/images/map.png';

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
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f2f2f2; // fazer verificação do time
  opacity: 0.85;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  text-align: center;
  padding: 10px;

  img {
    width: 80px;
    margin-top: -50px;
    margin-left: 380px;
    opacity: 0.9;
  }

  button {
    color: #fff;
    width: 320px;
  }
`;

export const Title = styled.div`
  display: flex;
  color: #374354;
  font-size: 22px;
  padding-bottom: 10px;

  img {
    position: fixed;
    width: 35px;
    height: 40px;
    margin-top: -15px;
    margin-left: -90px;
  }
`;

export const Painting = styled.div`
  width: 320px;
  background: #374354;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;
