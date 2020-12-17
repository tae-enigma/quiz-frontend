import styled from 'styled-components';
import mapBackgroundImg from '../../assets/images/map.png';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${mapBackgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Content = styled.div`
  position: relative;
  width: 500px;
  min-height: 400px;
  padding: 16px;
  padding-top: 48px;

  background-color: #303d50;
  opacity: 0.85;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  text-align: center;

  h2 {
    margin-bottom: 32px;
    color: #9bddd0;
  }

  h3 {
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 16px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;

  background: transparent;
  border: none;
`;
