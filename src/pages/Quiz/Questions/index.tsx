import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { FiCheckCircle, FiCircle, FiPlus } from 'react-icons/fi';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { useAuth } from '../../../hooks/auth';

import {
  Container,
  Content,
  Options,
  Question,
  TeamIcon,
  Option,
  QuestionContent,
  QuestionActions,
  QuestionsHeader,
  QuestionsActions,
} from './styles';
import TextArea from '../../../components/TextArea';
import NewQuestionModal from './NewQuestionModal';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

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

const teamsMap = {
  radiant: 'Iluminados',
  dire: 'Temidos',
};

interface QuestionsProps {
  quizId: string;
}

interface IOnSubmitDTO {
  formData: {
    description: string;
    options: Array<{ description: string }>;
  };
  correctOptionIndex: number | undefined;
}

const Questions: React.FC<QuestionsProps> = ({ quizId }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isOpen, setOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    api
      .get(`/quizzes/${quizId}/questions`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        addToast({
          title: 'Erro',
          description: error.response.data.error,
          type: 'error',
        });
      });
  }, [quizId, addToast]);

  const handleSubmit = useCallback(
    async ({ formData, correctOptionIndex }: IOnSubmitDTO) => {
      const formatedFormData = { ...formData };

      try {
        formatedFormData.options = formatedFormData.options.map(
          (option, index) => ({
            ...option,
            is_correct: correctOptionIndex === index,
          }),
        );

        const response = await api.post(
          `quizzes/${quizId}/questions`,
          formatedFormData,
        );

        setQuestions(oldState => [
          ...oldState,
          {
            ...response.data.question,
            options: response.data.options,
          },
        ]);

        toggleModal();

        addToast({
          title: 'Questão adicionada com sucesso',
        });
      } catch (error) {
        addToast({
          title: 'Error',
          description: error.response.data.error,
          type: 'error',
        });
      }
    },
    [quizId, toggleModal, addToast],
  );

  return (
    <Container>
      <NewQuestionModal
        toggle={toggleModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      />
      <QuestionsHeader>
        <QuestionsActions>
          <Button onClick={toggleModal}>
            <FiPlus size={20} />
            Nova questão
          </Button>
        </QuestionsActions>
      </QuestionsHeader>
      <Content>
        {questions.length > 0 &&
          questions.map(question => (
            <Question key={question.id}>
              <QuestionContent>
                <div>
                  <TeamIcon team={question.team} />
                  <p>{teamsMap[question.team]}</p>
                </div>
                <div>{question.description}</div>
                <Options>
                  {question.options?.map(option => (
                    <Option key={option.id} is_selected={option.is_correct}>
                      {option.is_correct ? (
                        <FiCheckCircle size={20} />
                      ) : (
                        <FiCircle size={20} />
                      )}
                      {option.description}
                    </Option>
                  ))}
                </Options>
              </QuestionContent>
              {user.type === 'teacher' && (
                <QuestionActions>
                  <Button color="secondary">
                    <FiPlus size={30} />
                  </Button>
                </QuestionActions>
              )}
            </Question>
          ))}
      </Content>
    </Container>
  );
};

export default Questions;
