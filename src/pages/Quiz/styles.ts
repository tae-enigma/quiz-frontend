import styled from 'styled-components';

export const Container = styled.div``;
export const Content = styled.div`
  max-width: 960px;
  margin: auto;
`;
export const QuizMenu = styled.div`
  padding: 24px 0;
  display: flex;

  h2 {
    color: #9bddd0;
  }

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;