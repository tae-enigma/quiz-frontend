import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiPlus, FiUser } from 'react-icons/fi';
import { Switch, useRouteMatch, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Card from '../../components/Card';

import Header from '../../components/Header';
import Quiz from '../Quiz';

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
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface ICreateQuizFormData {
  name: string;
  time_limit: Date;
  question_qty_limit: number;
  question_team_qty_limit: number;
}

interface IQuiz {
  id: string;
  name: string;
  time_limit: string;
  question_qty_limit: number;
  question_team_qty_limit: number;
  teacher_id: string;
  teacher: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard: React.FC = () => {
  const match = useRouteMatch();
  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get('/quizzes');

        setQuizzes(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          signOut();
          addToast({
            title: 'Sessão expirada',
            description:
              'Sua sessão expirou, por favor, faça o login novamente',
          });
        }
      }
    };

    fetchQuizzes();
  }, [signOut, addToast]);

  const toggleModal = useCallback(() => setOpen(!isOpen), [isOpen]);

  const handleSubmit = useCallback(
    async (data: ICreateQuizFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(
            'Você precisa informar o nome do questionário',
          ),
          time_limit: Yup.string().required(
            'Você precisa informar um limite de tempo para o questionário',
          ),
          question_qty_limit: Yup.string().required(
            'Você precisa informar a quantidade máxima de questões',
          ),
          question_team_qty_limit: Yup.string().required(
            'Você precisa informar a quantidade máxima de questões por time',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const teacher_id = user.id;

        const response = await api.post('quizzes', {
          ...data,
          teacher_id,
        });

        setQuizzes([...quizzes, response.data]);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else if (err.response && err.response.data) {
          addToast({
            type: 'error',
            title: 'Erro',
            description: err.response.data.error,
          });
        } else {
          console.log(err);
        }
      }
    },
    [quizzes, user, addToast],
  );

  return (
    <Container>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Novo questionário</h2>

          <Input name="name" type="text" placeholder="Nome da aventura" />
          <Input
            name="time_limit"
            type="time"
            placeholder="Tempo limite"
            step="1"
          />
          <Input
            name="question_qty_limit"
            type="number"
            step="2"
            placeholder="Quantidade máxima de questões"
          />
          <Input
            name="question_team_qty_limit"
            type="number"
            step="2"
            placeholder="Máximo de questões por time"
          />
          <Button color="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Modal>
      <Header />
      <Switch>
        <Route path={`${match.url}`} exact>
          <Content>
            <ProfileHeader>
              <ProfileImg>
                <FiUser size={30} />
              </ProfileImg>
              <h3>{user.name}</h3>
            </ProfileHeader>
            <QuizzesList>
              <QuizzesListHeader>
                <h2>Meus questionários</h2>
                {user.type === 'teacher' && (
                  <Button color="secondary" onClick={toggleModal}>
                    <FiPlus size={30} />
                  </Button>
                )}
              </QuizzesListHeader>
              <QuizzesListContent>
                {quizzes.map(quiz => (
                  <Card key={quiz.id}>
                    <CardContent>
                      <Link to={`${match.url}/quizzes/${quiz.id}`}>
                        {quiz.name}
                      </Link>
                      <StatusBadge status="not-started">
                        Não iniciado
                      </StatusBadge>
                      <p>{`Professor: ${quiz.teacher.name}`}</p>
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
