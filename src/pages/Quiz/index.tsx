import React from 'react';
import { FiFileText, FiUsers, FiInfo } from 'react-icons/fi';

import { Switch, useRouteMatch, Route } from 'react-router-dom';
import Link from '../../components/Link';
import Participants from './Participants';
import Questions from './Questions';
import QuizInfo from './QuizInfo';

import { Container, Content, QuizMenu } from './styles';

const Quiz: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Container>
      <Content>
        <QuizMenu>
          <h2>Atividade Avaliativa</h2>
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
          <Route path={`${match.url}`} component={QuizInfo} />
          <Route path={`${match.url}`} component={Questions} />
          <Route path={`${match.url}`} component={Participants} />
        </Switch>
      </Content>
    </Container>
  );
};

export default Quiz;
