import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 360px;

  background-color: #6a7b8d;
  padding: 32px;
  border-radius: 8px;
`;
export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  margin-bottom: 64px;
`;

interface TypeCardProps {
  selected: boolean;
}

export const TypeCard = styled.div<TypeCardProps>`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  background-color: #8e9fb1;

  cursor: pointer;

  + div {
    margin-left: 8px;
  }

  > div {
    color: #6a7b8d;
  }

  svg {
    margin: 16px 0;
    color: #6a7b8d;
  }

  ${props =>
    props.selected &&
    css`
      background-color: #3bae97;
      > div {
        color: #3bae97;
      }

      svg {
        color: #fff;
      }
    `}
`;

export const CardTitle = styled.div`
  width: 100%;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-align: center;

  padding: 8px;

  border-radius: 8px 8px 0 0;
`;

export const Title = styled.h3`
  margin-bottom: 32px;
`;
