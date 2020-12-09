import React, { useEffect, useState } from 'react';
import { FiFileText, FiUsers, FiInfo } from 'react-icons/fi';

import { Switch, useRouteMatch, Route } from 'react-router-dom';
import Link from '../../components/Link';
import Participants from './Participants';
import Questions from './Questions';
import QuizInfo from './QuizInfo';

import { Container, Content, QuizMenu } from './styles';

interface IQuizInfo {
  name: string;
  time_limit: string;
  question_qty_limit: number;
  question_team_qty_limit: number;
  status: 'not-started' | 'started' | 'finished';
}

const Quiz: React.FC = () => {
  const match = useRouteMatch();
  const [quizInfo, setQuizInfo] = useState<IQuizInfo>({} as IQuizInfo);

  useEffect(() => {
    setQuizInfo({
      name: 'Atividade Avaliativa',
      time_limit: '00:50:00',
      question_qty_limit: 40,
      question_team_qty_limit: 80,
      status: 'not-started',
    });
  }, []);

  return (
    <Container>
      {quizInfo && (
        <Content>
          <QuizMenu>
            <h2>{quizInfo.name}</h2>
            <div>
              <Link to={`${match.url}`} icon={FiInfo}>
                Questionário
              </Link>
              <Link to={`${match.url}/participants`} icon={FiUsers}>
                Participantes
              </Link>
              <Link to={`${match.url}/questions`} icon={FiFileText}>
                Questões
              </Link>
            </div>
          </QuizMenu>
          <Switch>
            <Route path={`${match.url}`} exact>
              <QuizInfo quizInfo={quizInfo} />
            </Route>
            <Route
              path={`${match.url}/participants`}
              component={Participants}
              exact
            />
            <Route
              path={`${match.url}/questions`}
              component={Questions}
              exact
            />
          </Switch>
        </Content>
      )}
    </Container>
  );
};

export default Quiz;
