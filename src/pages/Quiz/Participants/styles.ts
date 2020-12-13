import styled from 'styled-components';
import Card from '../../../components/Card';

export const Container = styled.div`
  display: flex;
`;

export const EmailList = styled.div`
  display: flex;
  flex-wrap: wrap;

  p {
    background-color: #8e9fb1;
    font-size: 12px;

    padding: 4px 16px;
    border-radius: 16px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

export const ModalBody = styled.div``;

export const FormContent = styled.div`
  margin-bottom: 32px;
  h2 {
    margin-bottom: 16px;
  }

  > p {
    font-size: 12px;
    color: #e5e5e5;
    margin-bottom: 24px;
  }

  > div {
    display: flex;
    align-items: center;

    button {
      margin: 0;
      margin-left: 8px;
      width: min-content;
      padding: 10px;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: min-content;
  }

  button + button {
    margin-left: 8px;
  }
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
