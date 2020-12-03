import React, { useCallback, useState, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import SelectUserType from './SelectUserType';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import { Container, FormContent } from './styles';

type SelectedUserType = 'teacher' | 'student' | '';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [selectedUserType, setSelectedUserType] = useState<SelectedUserType>(
    '',
  );

  const [userTypeSubmited, setUserTypeSubmited] = useState(false);

  const handleSubmitUserType = useCallback(() => {
    if (selectedUserType === '') {
      addToast({
        type: 'error',
        title: 'Selecione um tipo de usuário',
      });
    } else {
      setUserTypeSubmited(true);
    }
  }, [selectedUserType, addToast]);

  const handleSelectAnotherUserType = useCallback(() => {
    setUserTypeSubmited(false);
    setSelectedUserType('');
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(selectedUserType);

        await api.post('/users', {
          ...data,
          type: selectedUserType,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: err.error,
          });
        }
      }
    },
    [addToast, history, selectedUserType],
  );

  const onChangeUserType = useCallback((newUserType: SelectedUserType) => {
    setSelectedUserType(newUserType);
  }, []);

  return (
    <Container>
      {userTypeSubmited ? (
        <FormContent>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Faça seu cadastro</h2>

            <Input name="name" type="text" placeholder="Nome" />

            <Input name="email" type="text" placeholder="E-mail" />

            <Input name="password" type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <button type="button" onClick={handleSelectAnotherUserType}>
            <FiArrowLeft />
            Escolher outro tipo de usuário
          </button>
        </FormContent>
      ) : (
        <SelectUserType
          selected={selectedUserType}
          onChange={onChangeUserType}
          onSubmit={handleSubmitUserType}
        />
      )}
    </Container>
  );
};

export default SignUp;
