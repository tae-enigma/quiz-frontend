import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 360px;

  background-color: #6a7b8d;
  padding: 32px;
  border-radius: 8px;

  form {
    width: 100%;
  }

  h2 {
    margin-bottom: 32px;
    text-align: center;
  }

  > button {
    background: transparent;
    border: none;
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
