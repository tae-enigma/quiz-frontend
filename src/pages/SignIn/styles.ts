import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #6a7b8d;
  padding: 32px;
  border-radius: 8px;

  h1 {
    text-align: center;
    margin-bottom: 32px;
  }

  form {
    width: 100%;
  }

  > a {
    color: #f5f5f5;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#f5f5f5')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
