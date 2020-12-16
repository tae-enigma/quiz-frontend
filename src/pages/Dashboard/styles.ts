import styled, { css } from 'styled-components';

export const Container = styled.div``;
export const Content = styled.div`
  max-width: 960px;
  margin: auto;
`;

export const ProfileHeader = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
`;

export const ProfileImg = styled.div`
  background-color: #9bddd0;
  width: 50px;
  height: 50px;
  margin-right: 16px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #374354;
  }
`;

export const QuizzesList = styled.div``;
export const QuizzesListHeader = styled.div`
  padding: 32px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: #9bddd0;
  }

  button {
    align-items: center;
    width: min-content;
    height: min-content;
    padding: 0;
    margin: 0;
  }
`;
export const QuizzesListContent = styled.div`
  margin-bottom: 50px;
  height: 700px;
  padding: 4px;
  background-color: #303d50;
  border-radius: 8px;

  overflow-y: auto;
`;

export const CardContent = styled.div`
  width: 100%;

  a {
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    color: #303d50;
  }

  p {
    margin-top: 16px;
    color: #6a7b8d;
  }
`;

interface StatusBadgeProps {
  status: 'not-started' | 'started' | 'finished';
}

const statusBadgeColors = {
  'not-started': css`
    background-color: #f8f9fa;
    color: #374354;
  `,
  started: css`
    background-color: #17a2b8;
    color: #f2f2f2;
  `,
  finished: css`
    background-color: #28a745;
    color: #f2f2f2;
  `,
};

export const StatusBadge = styled.div<StatusBadgeProps>`
  border-radius: 8px;
  padding: 8px;
  width: fit-content;
  margin: 8px 0;
  font-size: 12px;
  font-weight: 500;

  ${props => statusBadgeColors[props.status]};
`;
