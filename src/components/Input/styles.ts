import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  flex-direction: column;

  color: #8e9fb1;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}



  input {
    background-color: #e5e5e5;
    border-radius: 8px;
    padding: 16px 32px;
    width: 100%;
    color: #374354;

    border: 2px solid #e5e5e5;

    &::placeholder {
      color: #8e9fb1;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled.div`
  width: 100%;
  background-color: #f8d7da;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  display: flex;
  color: #c53030;

  margin-top: 8px;

  svg {
    margin: 0;
    margin-right: 16px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
