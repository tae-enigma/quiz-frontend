import styled from 'styled-components';

export const Container = styled.div`
  background-color: #303d50;
`;

export const Content = styled.div`
  max-width: 960px;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px 0;

  img {
    height: 50px;
  }

  button {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: #8e9fb1;

    svg {
      margin-left: 16px;
    }
  }
`;
