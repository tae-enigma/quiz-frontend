import React, { ButtonHTMLAttributes } from 'react';
import Button from '../../components/Button';
import OptionButton from '../../components/OptionButton';
import { Container, Content, Painting, Title } from './styles';
import tower1 from '../../assets/images/tower_iluminados.png';
import gold from '../../assets/images/gold.gif';

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  check?: 'unchecked' | 'checked';
}

const Quizzes: React.FC<CheckboxProps> = () => {
  return (
    <Container>
      <Content>
        <img src={tower1} alt="tower" />
        <Title>
          <img src={gold} alt="gold" />
          Questão 1
        </Title>
        <Painting>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Painting>
        <OptionButton alternative="Resposta 1" />
        <OptionButton alternative="Resposta 2" />
        <OptionButton selected="selected" alternative="Resposta 3" />
        <OptionButton alternative="Resposta 4" />
        <Button>Enviar</Button>
      </Content>
    </Container>
  );
};

export default Quizzes;
