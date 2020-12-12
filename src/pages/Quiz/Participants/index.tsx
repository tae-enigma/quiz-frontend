import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiPlus } from 'react-icons/fi';
import { useParams } from 'react-router';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

import radiantIconImg from '../../../assets/images/radiant_icon.png';
import direIconImg from '../../../assets/images/dire_icon.png';

import {
  Container,
  Content,
  List,
  ListHeader,
  ParticipantCard,
} from './styles';

import { useAuth } from '../../../hooks/auth';

interface IStudent {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'teacher';
  points: number;
  team: 'radiant' | 'dire';
  quiz_id: string;
}

interface ParticipantsProps {
  students: IStudent[];
}

interface IAddStudentToQuizFormData {
  students_emails: Array<string>;
}

interface RouteParams {
  quizId: string;
}

const Participants: React.FC<ParticipantsProps> = ({ students }) => {
  const { user } = useAuth();
  const { quizId } = useParams<RouteParams>();

  const formRef = useRef<FormHandles>(null);
  const [isOpen, setOpen] = useState(false);

  const [selectedTeam, setSelectedteam] = useState<'radiant' | 'dire'>();
  const [direParticipants, setDireParticipants] = useState<IStudent[]>([]);
  const [radiantParticipants, setRadiantParticipants] = useState<IStudent[]>(
    [],
  );

  useEffect(() => {
    setDireParticipants(students.filter(student => student.team === 'dire'));

    setRadiantParticipants(
      students.filter(student => student.team === 'radiant'),
    );
  }, [students]);

  const toggleModal = useCallback(() => setOpen(!isOpen), [isOpen]);

  const handleSubmit = useCallback(
    async (data: IAddStudentToQuizFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(
            'Você precisa informar o nome do questionário',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post(`quizzes/${quizId}`, {
          ...data,
          team: selectedTeam,
        });

        if (selectedTeam === 'dire') {
          setDireParticipants([...direParticipants, response.data]);
        } else {
          setRadiantParticipants([...radiantParticipants, response.data]);
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          // addToast({
          //   type: 'error',
          //   title: 'Erro na autenticação',
          //   description:
          //     'Ocorreu um erro ao fazer login, cheque as credenciais',
          // });
        }
      }
    },
    [radiantParticipants, direParticipants, quizId, selectedTeam],
  );

  return (
    <Container>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Novo questionário</h2>

          <Input name="name" type="text" placeholder="Nome da aventura" />
          <Input name="time_limit" type="time" placeholder="Tempo limite" />
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
      <Content>
        <ListHeader>
          <div>
            <img src={radiantIconImg} alt="radiant icon" />
            <h4>Iluminados</h4>
          </div>
          {user.type === 'teacher' && (
            <Button color="secondary">
              <FiPlus size={30} />
            </Button>
          )}
        </ListHeader>
        <List>
          {radiantParticipants.map(participant => (
            <Card key={participant.id}>
              <ParticipantCard>
                <h4>{participant.name}</h4>
                <p>{participant.email}</p>
              </ParticipantCard>
            </Card>
          ))}
        </List>
      </Content>
      <Content>
        <ListHeader>
          <div>
            <img src={direIconImg} alt="dire icon" />
            <h4>Temidos</h4>
          </div>
          {user.type === 'teacher' && (
            <Button color="secondary">
              <FiPlus size={30} />
            </Button>
          )}
        </ListHeader>
        <List>
          {direParticipants.map(participant => (
            <Card key={participant.id}>
              <ParticipantCard>
                <h4>{participant.name}</h4>
                <p>{participant.email}</p>
              </ParticipantCard>
            </Card>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default Participants;
