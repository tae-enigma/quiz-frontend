import styled from 'styled-components';
import Card from '../../../components/Card';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  background-color: #303d50;
  padding: 24px 16px;
  border-radius: 8px;

  width: 100%;

  div + & {
    margin-left: 16px;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  > div {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      width: 30px;
      margin-right: 16px;
    }
  }

  button {
    align-items: center;
    width: min-content;
    height: min-content;
    padding: 0;
    margin: 0;
  }
`;

export const List = styled.div`
  height: 500px;
`;

export const ParticipantCard = styled.div`
  h4 {
    color: #374354;
    margin-bottom: 8px;
  }

  p {
    color: #8e9fb1;
  }
`;
