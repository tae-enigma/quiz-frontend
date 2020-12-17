import styled from 'styled-components';

export const Container = styled.div``;

export const QuizActions = styled.div`
  button {
    width: fit-content;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Content = styled.div`
  max-width: 960px;
  margin: auto;
`;

export const QuizMenu = styled.div`
  padding: 24px 0;
  display: flex;
  align-items: center;

  h2 {
    color: #9bddd0;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 32px;
  }

  > div:nth-child(2) {
    flex: 1;
  }
`;
