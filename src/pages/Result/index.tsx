import React, { useCallback, useEffect, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { Container, Content, CloseButton } from './styles';

interface Quiz {
  id: string;
  name: string;
  start: Date;
  time_limit: number;
}

interface Answer {
  id: string;
  xp: number;
  gold: number;
  type: 'hit' | 'miss';
}

interface Result {
  gold: number;
  xp: number;
  total: number;
}

interface Response {
  result: Result;
  answers: Answer[];
}

interface RouteParams {
  quizId: string;
}

const Result: React.FC = () => {
  const history = useHistory();
  const { quizId } = useParams<RouteParams>();
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [qtyHits, setQtyHits] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<Result>({} as Result);

  useEffect(() => {
    api.get(`/quizzes/${quizId}`).then(resp => {
      setQuiz(resp.data);
    });
  }, [quizId]);

  useEffect(() => {
    api.get<Response>(`/quizzes/${quizId}/answer`).then(resp => {
      // const { answers, result } = resp.data;

      const hitsCount = resp.data.answers.reduce((acc, curr) => {
        return acc + (curr.type === 'hit' ? 1 : 0);
      }, 0);

      setQtyHits(hitsCount);
      setAnswers(resp.data.answers);
      setResult(resp.data.result);
    });
  }, [quizId]);

  const goBack = useCallback(() => {
    history.push(`/dashboard/quizzes/${quizId}`);
  }, [quizId, history]);

  return (
    <Container>
      <Content>
        <CloseButton onClick={goBack}>
          <FiXCircle size={30} color="#8E9FB1" />
        </CloseButton>
        <h2>Quiz finalizado!</h2>
        {/* <h2>{quiz.name}</h2> */}
        <h3>Você acertou</h3>
        <p>{`${qtyHits}/${answers.length}`}</p>

        <h2>Você ganhou: </h2>
        <h3>Gold</h3>
        <p>{`${result.gold}x`}</p>

        <h3>Experiência</h3>
        <p>{`${result.xp}x`}</p>

        <h3>Total de pontos</h3>
        <p>{`${result.total} pts`}</p>
      </Content>
    </Container>
  );
};

export default Result;
