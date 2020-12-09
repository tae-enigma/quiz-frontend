import React from 'react';

import { Container, InfoList, Info } from './styles';

interface QuizInfo {
  name: string;
  time_limit: string;
  question_qty_limit: number;
  question_team_qty_limit: number;
  status: 'not-started' | 'started' | 'finished';
}

interface QuizInfoProps {
  quizInfo: QuizInfo;
}

const quizStatusMap = {
  'not-started': 'Não iniciado',
  started: 'Iniciado',
  finished: 'Finalizado',
};

const QuizInfo: React.FC<QuizInfoProps> = ({ quizInfo }) => {
  return (
    <Container>
      <div>
        <h4>Configurações</h4>
        <InfoList>
          <Info>
            <h4>Máximo de questões por equipe</h4>
            <p>{quizInfo.question_team_qty_limit}</p>
          </Info>
          <Info>
            <h4>Máximo de questões no questionário</h4>
            <p>{quizInfo.question_qty_limit}</p>
          </Info>
          <Info>
            <h4>Duração da aplicação do questionário</h4>
            <p>{quizInfo.time_limit}</p>
          </Info>
        </InfoList>
      </div>
      <div>
        <h4>Informações do questionário</h4>
        <InfoList>
          <Info>
            <h4>Status</h4>
            <p>{quizStatusMap[quizInfo.status]}</p>
          </Info>
        </InfoList>
      </div>
    </Container>
  );
};

export default QuizInfo;
