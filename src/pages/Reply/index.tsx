import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Button from '../../components/Button';
import gold from '../../assets/images/gold.gif';
// import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  Header,
  Description,
  Options,
  Option,
  Title,
  TeamTower,
} from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface RouteParams {
  quizId: string;
}

interface Question {
  id: string;
  description: string;
  level: number;
  team: 'dire' | 'radiant';
  answered: Boolean;
  options: Array<{
    id: string;
    description: string;
  }>;
}

interface Quiz {
  id: string;
  name: string;
  start: Date;
  time_limit: number;
}

const Reply: React.FC = () => {
  // const { user } = useAuth();
  const history = useHistory();

  const { addToast } = useToast();
  const { quizId } = useParams<RouteParams>();
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState<string>('');

  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    api
      .get<{ quiz: Quiz; questions: Question[] }>(`/quizzes/${quizId}/reply`)
      .then(response => {
        // const { quiz, questions } = response.data;

        setQuiz(response.data.quiz);
        setQuestions(response.data.questions);

        const notAnswered = response.data.questions.findIndex(
          question => !question.answered,
        );

        if (notAnswered === -1) {
          history.push('result');
          return;
        }

        setCurrentQuestion(notAnswered);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          addToast({
            title: 'Erro',
            description: error.response.data.error,
            type: 'error',
          });
        }

        history.push('result');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [quizId, addToast, history]);

  const onChange = useCallback(
    (newOption: string) => {
      if (newOption === selectedOption) {
        setSelectedOption('');
      } else {
        setSelectedOption(newOption);
      }
    },
    [selectedOption],
  );

  const onSubmit = useCallback(async () => {
    // função que trata o envio da resposta e segue para a próxima.
    try {
      const response = await api.post(`/quizzes/${quizId}/answer`, {
        option_id: selectedOption,
      });

      const answer = response.data;

      if (answer.type === 'hit') {
        addToast({
          title: 'Parabéns, você acertou',
          type: 'success',
        });
      } else {
        addToast({
          title: 'Poxa, você errou essa',
          type: 'error',
        });
      }

      setSelectedOption('');
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        addToast({
          title: 'Quiz Finalizado',
          description:
            'Parabéns, você finalizou o quiz, agora será redirecionado para a página de resultado',
          type: 'success',
        });
        history.push('result');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        addToast({
          title: 'Erro',
          description: error.response.data.error,
          type: 'error',
        });
      }
    }
  }, [addToast, quizId, selectedOption, currentQuestion, questions]);

  return (
    <Container>
      {loading ? (
        <div />
      ) : (
        <Content>
          <Header>
            {/* <img src={tower1} alt="tower" /> */}
            <Title>
              <img src={gold} alt="gold" />

              <h2>{quiz.name}</h2>
            </Title>
            <TeamTower team={questions[currentQuestion].team} />
          </Header>
          <Description>{questions[currentQuestion].description}</Description>
          <Options>
            {questions[currentQuestion].options &&
              questions[currentQuestion].options.map(option => (
                <Option
                  // description={option.text}
                  key={option.id}
                  selected={selectedOption === option.id}
                  onClick={() => onChange(option.id)}
                >
                  {option.description}
                </Option>
              ))}
          </Options>
          <Button type="button" onClick={onSubmit}>
            Enviar
          </Button>
        </Content>
      )}
    </Container>
  );
};

export default Reply;
