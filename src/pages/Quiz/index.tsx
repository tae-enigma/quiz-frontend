import React, { useEffect, useState } from 'react';
import { FiFileText, FiUsers, FiInfo } from 'react-icons/fi';

import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom';
import Link from '../../components/Link';
import api from '../../services/api';
import Participants from './Participants';
import Questions from './Questions';
import QuizInfo from './QuizInfo';

import { Container, Content, QuizMenu } from './styles';

interface IQuizInfo {
  id: string;
  name: string;
  time_limit: string;
  question_qty_limit: number;
  question_team_qty_limit: number;
  teacher_id: string;
  status: 'not-started' | 'started' | 'finished';
}

interface IOption {
  id: string;
  description: string;
  is_correct: boolean;
  question_id: string;
}

interface IQuestion {
  id: string;
  description: string;
  team: 'radiant' | 'dire';
  level: 1 | 2;
  is_selected: boolean;
  options: IOption[];
}

interface IStudent {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'teacher';
  points: number;
  team: 'radiant' | 'dire';
  quiz_id: string;
}

interface QuizParams {
  quizId: string;
}

const Quiz: React.FC = () => {
  const match = useRouteMatch();
  const { quizId } = useParams<QuizParams>();
  const [quizInfo, setQuizInfo] = useState<IQuizInfo>({} as IQuizInfo);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);

  useEffect(() => {
    api.get(`quizzes/${quizId}`).then(resp => {
      setQuizInfo({
        ...resp.data.quiz,
        status: 'not-started',
      });

      setQuestions(resp.data.questions);

      setStudents(resp.data.students);
    });
  }, [quizId]);

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
            <Route path={`${match.url}/participants`} exact>
              <Participants students={students} quizId={quizId} />
            </Route>
            <Route path={`${match.url}/questions`} exact>
              <Questions questions={questions} />
            </Route>
          </Switch>
        </Content>
      )}
    </Container>
  );
};

export default Quiz;
