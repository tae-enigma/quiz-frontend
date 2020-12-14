import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
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
  ModalBody,
} from './styles';
import NewQuestionModal from './NewQuestionModal';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

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
  const formRef = useRef<FormHandles>(null);

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isOpen, setOpen] = useState({
    newQuestionModal: false,
    setQuestionLevelModal: false,
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    string | undefined
  >();

  const toggleModal = useCallback(
    (modalName: 'newQuestionModal' | 'setQuestionLevelModal') => {
      setOpen(oldState => ({
        ...oldState,
        [modalName]: !oldState[modalName],
      }));
    },
    [],
  );

  useEffect(() => {
    let isCancelled = false;

    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/quizzes/${quizId}/questions`);

        if (!isCancelled) {
          setQuestions(response.data);
        }
      } catch (error) {
        addToast({
          title: 'Erro',
          description: error.response.data.error,
          type: 'error',
        });
      }
    };

    fetchQuestions();

    return () => {
      isCancelled = true;
    };
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

        toggleModal('newQuestionModal');

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

  const handleSubmitLinkQuestion = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          level: Yup.number()
            .required('Você precisa informar o nível da questão')
            .min(1)
            .max(2),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.patch<IQuestion>(
          `/quizzes/${quizId}/questions`,
          {
            ...data,
            question_id: selectedQuestionId,
          },
        );

        const findQuestionIndex = questions.findIndex(
          question => question.id === response.data.id,
        );

        if (findQuestionIndex !== -1) {
          const newQuestions = [...questions];

          newQuestions[findQuestionIndex] = response.data;

          setQuestions(newQuestions);
        }

        formRef.current?.setData({ level: '' });
        toggleModal('setQuestionLevelModal');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: err.response.data.error,
          });
        }
      }
    },
    [addToast, toggleModal, quizId, selectedQuestionId, questions],
  );
  return (
    <Container>
      <Modal
        isOpen={isOpen.setQuestionLevelModal}
        size="sm"
        toggle={() => toggleModal('setQuestionLevelModal')}
      >
        <ModalBody>
          <Form
            ref={formRef}
            onSubmit={handleSubmitLinkQuestion}
            initialData={{
              level: 0,
            }}
          >
            <h2>Adicionar questão ao questionário</h2>
            <p>
              Essa questão passará a fazer parte do questionário quando o mesmo
              for aplicado, e para isso, você precisa definir o nível da
              questão.
              <br />
              (1 - Questão simples/fácil, 2 - Questão complexa/difícil)
            </p>
            <Input
              name="level"
              placeholder="Nível da questão"
              type="number"
              min="1"
              max="2"
            />

            <Button color="primary" type="submit">
              <FiPlus size={20} />
              Vincular
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <NewQuestionModal
        toggle={() => toggleModal('newQuestionModal')}
        isOpen={isOpen.newQuestionModal}
        onSubmit={handleSubmit}
      />
      {user.type === 'student' && (
        <QuestionsHeader>
          <QuestionsActions>
            <Button onClick={() => toggleModal('newQuestionModal')}>
              <FiPlus size={20} />
              Nova questão
            </Button>
          </QuestionsActions>
        </QuestionsHeader>
      )}
      <Content>
        {questions.length > 0 &&
          questions.map(question => (
            <Question key={question.id}>
              <QuestionContent>
                <div>
                  <TeamIcon team={question.team} />
                  <p>{teamsMap[question.team]}</p>
                  {question.is_selected && (
                    <p>
                      {`Dificuldade: ${String(question.level).padStart(
                        2,
                        '0',
                      )}`}
                    </p>
                  )}
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
                  {!question.is_selected && (
                    <Button
                      color="secondary"
                      onClick={() => {
                        setSelectedQuestionId(question.id);
                        toggleModal('setQuestionLevelModal');
                      }}
                    >
                      <FiPlus size={30} />
                    </Button>
                  )}
                </QuestionActions>
              )}
            </Question>
          ))}
      </Content>
    </Container>
  );
};

export default Questions;
