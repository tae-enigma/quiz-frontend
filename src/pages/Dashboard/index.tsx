import React, { useCallback } from 'react';
import { FiUser } from 'react-icons/fi';
import {
  Switch,
  useRouteMatch,
  Route,
  useHistory,
  Link,
} from 'react-router-dom';
import Card from '../../components/Card';

import Header from '../../components/Header';
import Quiz from '../Quiz';
// import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  ProfileHeader,
  ProfileImg,
  QuizzesList,
  QuizzesListContent,
  QuizzesListHeader,
  CardContent,
  StatusBadge,
} from './styles';

const Dashboard: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Container>
      <Header />
      <Switch>
        <Route path={`${match.url}`} exact>
          <Content>
            <ProfileHeader>
              <ProfileImg>
                <FiUser size={30} />
              </ProfileImg>
              <h3>José Vinícius</h3>
            </ProfileHeader>
            <QuizzesList>
              <QuizzesListHeader>
                <h2>Meus questionários</h2>
              </QuizzesListHeader>
              <QuizzesListContent>
                {[1, 2, 3].map(quiz => (
                  <Card>
                    <CardContent>
                      <Link to={`${match.url}/quizzes/${quiz}`}>
                        Atividade Avaliativa
                      </Link>
                      <StatusBadge status="not-started">
                        Não iniciado
                      </StatusBadge>
                      <p>Professor: José Vinícius</p>
                    </CardContent>
                  </Card>
                ))}
              </QuizzesListContent>
            </QuizzesList>
          </Content>
        </Route>
        <Route path={`${match.url}/quizzes/:quizId`} component={Quiz} />
      </Switch>
    </Container>
  );
};

export default Dashboard;
