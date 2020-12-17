import React, { useCallback, useEffect, useState } from 'react';
import { FiFileText, FiUsers, FiInfo, FiPlay, FiAward } from 'react-icons/fi';

import {
  Switch,
  useRouteMatch,
  Route,
  useParams,
  useHistory,
} from 'react-router-dom';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Participants from './Participants';
import Questions from './Questions';
import QuizInfo from './QuizInfo';

import { Container, Content, QuizMenu, QuizActions } from './styles';

interface IQuizInfo {
  id: string;
  name: string;
  time_limit: string;
  question_qty_limit: number;
  question_team_qty_limit: number;
  teacher_id: string;
  formated_time_limit: string;
  teacher: {
    name: string;
    email: string;
  };
  status: 'not-started' | 'started' | 'finished';
}
interface QuizParams {
  quizId: string;
}

const Quiz: React.FC = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const { user } = useAuth();
  const { addToast } = useToast();

  const { quizId } = useParams<QuizParams>();
  const [quizInfo, setQuizInfo] = useState<IQuizInfo>({} as IQuizInfo);

  useEffect(() => {
    api.get(`quizzes/${quizId}`).then(resp => {
      setQuizInfo(resp.data);
    });
  }, [quizId]);

  const handlePlayQuiz = useCallback(async () => {
    try {
      const response = await api.patch(`quizzes/${quizId}/start`);

      setQuizInfo({
        ...response.data,
        teacher: user,
      });

      addToast({
        title: 'Quiz iniciado com sucesso',
        description: 'Agora os participantes já podem responder as questões',
        type: 'success',
      });
    } catch (error) {
      if (error.response && error.response.data) {
        addToast({
          title: 'Erro',
          description: error.response.data.error,
          type: 'error',
        });
      }
    }
  }, [quizId, addToast, user]);

  const handleGoToReply = useCallback(() => {
    history.push(`/quizzes/${quizId}/reply`);
  }, [history, quizId]);

  const handleGoToResults = useCallback(() => {
    history.push(`/quizzes/${quizId}/result`);
  }, [history, quizId]);

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
            <QuizActions>
              {user.type === 'teacher' && (
                <Button
                  onClick={handlePlayQuiz}
                  disabled={quizInfo.status !== 'not-started'}
                >
                  <FiPlay size={20} />
                  Iniciar
                </Button>
              )}
              {user.type === 'student' && (
                <>
                  {quizInfo.status !== 'finished' ? (
                    <Button
                      onClick={handleGoToReply}
                      disabled={quizInfo.status !== 'started'}
                    >
                      <FiPlay size={20} />
                      Responder
                    </Button>
                  ) : (
                    <Button
                      onClick={handleGoToResults}
                      disabled={quizInfo.status !== 'finished'}
                    >
                      <FiAward size={20} />
                      Resultado
                    </Button>
                  )}
                </>
              )}
            </QuizActions>
          </QuizMenu>
          <Switch>
            <Route path={`${match.url}`} exact>
              <QuizInfo quizInfo={quizInfo} />
            </Route>
            <Route path={`${match.url}/participants`} exact>
              <Participants quizId={quizId} />
            </Route>
            <Route path={`${match.url}/questions`} exact>
              <Questions quizId={quizId} />
            </Route>
          </Switch>
        </Content>
      )}
    </Container>
  );
};

export default Quiz;
