import React, { useCallback, useRef, useState } from 'react';

import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiCheckCircle, FiCircle, FiPlus } from 'react-icons/fi';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import TextArea from '../../../../components/TextArea';

import { Option, Container } from './styles';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';

interface IOnSubmitDTO {
  formData: any;
  correctOptionIndex: number | undefined;
}

interface NewQuestionModalProps {
  toggle(): any;
  isOpen: boolean;
  onSubmit({ formData, correctOptionIndex }: IOnSubmitDTO): any;
}

const NewQuestionModal: React.FC<NewQuestionModalProps> = ({
  onSubmit,
  toggle,
  isOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [correctOptionIndex, setCorrectOptionIndex] = useState<
    number | undefined
  >();

  const handleChangeCorrectOptionIndex = useCallback(
    (newCorrectOptionIndex: number) => {
      if (correctOptionIndex === newCorrectOptionIndex) {
        setCorrectOptionIndex(undefined);
      } else {
        setCorrectOptionIndex(newCorrectOptionIndex);
      }
    },
    [correctOptionIndex],
  );

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(
            'Você precisa informar o comando da questão a ser adicionada',
          ),
          options: Yup.array()
            .required()
            .min(4)
            .of(
              Yup.object({
                description: Yup.string().required(
                  'Você precisa informar as opções',
                ),
              }),
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!correctOptionIndex) {
          formRef.current?.setErrors({
            description: 'Você precisa escolher uma opção como correta',
          });

          return;
        }

        onSubmit({ formData: data, correctOptionIndex });
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
    [correctOptionIndex, addToast, onSubmit],
  );

  const beforeModalClose = useCallback(() => {
    setCorrectOptionIndex(undefined);
    formRef.current?.reset();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="lg"
      beforeClose={beforeModalClose}
    >
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Cadastre uma nova questão</h2>
          <p>
            Crie uma nova questão para o seu time, o professor irá escolher as
            questões mais pertinentes para compor o questionário
          </p>
          <TextArea
            name="description"
            placeholder="Comando da questão"
            rows={10}
          />
          <Scope path="">
            <Option>
              <Button
                color={correctOptionIndex === 0 ? 'primary' : 'secondary'}
                onClick={() => handleChangeCorrectOptionIndex(0)}
              >
                {correctOptionIndex === 0 ? (
                  <FiCheckCircle size={30} />
                ) : (
                  <FiCircle size={30} />
                )}
              </Button>
              <TextArea name="options[0].description" rows={2} />
            </Option>
            <Option>
              <Button
                color={correctOptionIndex === 1 ? 'primary' : 'secondary'}
                onClick={() => handleChangeCorrectOptionIndex(1)}
              >
                {correctOptionIndex === 1 ? (
                  <FiCheckCircle size={30} />
                ) : (
                  <FiCircle size={30} />
                )}
              </Button>
              <TextArea name="options[1].description" rows={2} />
            </Option>
            <Option>
              <Button
                color={correctOptionIndex === 2 ? 'primary' : 'secondary'}
                onClick={() => handleChangeCorrectOptionIndex(2)}
              >
                {correctOptionIndex === 2 ? (
                  <FiCheckCircle size={30} />
                ) : (
                  <FiCircle size={30} />
                )}
              </Button>
              <TextArea name="options[2].description" rows={2} />
            </Option>
            <Option>
              <Button
                color={correctOptionIndex === 3 ? 'primary' : 'secondary'}
                onClick={() => handleChangeCorrectOptionIndex(3)}
              >
                {correctOptionIndex === 3 ? (
                  <FiCheckCircle size={30} />
                ) : (
                  <FiCircle size={30} />
                )}
              </Button>
              <TextArea name="options[3].description" rows={2} />
            </Option>
          </Scope>
          <Button color="primary" type="submit">
            <FiPlus size={20} />
            Cadastrar
          </Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default NewQuestionModal;
