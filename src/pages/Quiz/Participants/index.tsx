import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiPlus } from 'react-icons/fi';
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
  FormContent,
  ModalBody,
  ModalFooter,
  EmailList,
} from './styles';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

interface IStudent {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'teacher';
  quizzes: Array<{
    points: number;
    team: 'radiant' | 'dire';
    quiz_id: string;
  }>;
}

interface ParticipantsProps {
  quizId: string;
}

interface IFormData {
  email: string;
}

const Participants: React.FC<ParticipantsProps> = ({ quizId }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  // const [students, setStudents] = useState<IStudent[]>([]);

  const formRef = useRef<FormHandles>(null);
  const [isOpen, setOpen] = useState(false);

  const [selectedTeam, setSelectedteam] = useState<'radiant' | 'dire' | ''>();
  const [studentsEmails, setStudentsEmails] = useState<Array<string>>([]);

  const [direParticipants, setDireParticipants] = useState<IStudent[]>([]);
  const [radiantParticipants, setRadiantParticipants] = useState<IStudent[]>(
    [],
  );

  useEffect(() => {
    let isCancelled = false;
    const fetchStudents = async () => {
      try {
        const response = await api.get<IStudent[]>(
          `/quizzes/${quizId}/students`,
        );

        if (!isCancelled) {
          const students = response.data;

          setDireParticipants(
            students.filter(student => student.quizzes[0].team === 'dire'),
          );

          setRadiantParticipants(
            students.filter(student => student.quizzes[0].team === 'radiant'),
          );
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: err.response.data.error,
        });
      }
    };

    fetchStudents();

    return () => {
      isCancelled = true;
    };
  }, [quizId, addToast]);

  const toggleModal = useCallback(() => setOpen(!isOpen), [isOpen]);

  const openAddNewStudentsModal = useCallback(
    (team: 'radiant' | 'dire') => {
      setSelectedteam(team);

      toggleModal();
    },
    [toggleModal],
  );

  const handleAddNewEmailToList = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Você precisa informar um email para ser adicionado')
            .email('Informe um e-mail de formato válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const hasSelected = studentsEmails.find(
          studentEmail => studentEmail === data.email,
        );

        if (hasSelected) return;

        setStudentsEmails([...studentsEmails, data.email]);

        formRef.current?.setData({ email: '' });
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
    [studentsEmails, addToast],
  );

  const handleSubmit = useCallback(async () => {
    try {
      const response = await api.post(`quizzes/${quizId}/students`, {
        students_emails: studentsEmails,
        team: selectedTeam,
      });

      if (selectedTeam === 'dire') {
        setDireParticipants(oldState => [...oldState, ...response.data]);
      } else {
        setRadiantParticipants(oldState => [...oldState, ...response.data]);
      }

      addToast({
        title: 'Participantes adicionados',
        type: 'success',
        description: 'Os participantes foram adicionados com sucesso',
      });

      setStudentsEmails([]);
      setSelectedteam('');
      toggleModal();
    } catch (err) {
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
  }, [selectedTeam, studentsEmails, quizId]);

  return (
    <Container>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <>
          <ModalBody>
            <Form ref={formRef} onSubmit={handleAddNewEmailToList}>
              <FormContent>
                <h2>Convide novos invocadores a participar dessa aventura</h2>
                <p>
                  Adicione mais participantes para os times, lembre-se que os
                  times devem possuir uma quantidade igual de pessoas entre eles
                  ou no máximo com a diferença de um participante.
                </p>
                <div>
                  <Input name="email" type="email" placeholder="E-mail" />
                  <Button color="secondary" type="submit">
                    <FiPlus size={30} />
                  </Button>
                </div>
              </FormContent>
            </Form>
            <EmailList>
              {studentsEmails.length > 0 &&
                studentsEmails.map(email => <p key={email}>{email}</p>)}
            </EmailList>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" type="button" onClick={handleSubmit}>
              Adicionar
            </Button>
            <Button color="secondary" type="button" onClick={toggleModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </>
      </Modal>
      <Content>
        <ListHeader>
          <div>
            <img src={radiantIconImg} alt="radiant icon" />
            <h4>Iluminados</h4>
          </div>
          {user.type === 'teacher' && (
            <Button
              color="secondary"
              onClick={() => openAddNewStudentsModal('radiant')}
            >
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
            <Button
              color="secondary"
              onClick={() => openAddNewStudentsModal('dire')}
            >
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
