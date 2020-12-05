import React, { ButtonHTMLAttributes } from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import { Container, Content, Painting, Title } from './styles';
import tower1 from '../../assets/images/tower_iluminados.png';
import gold from '../../assets/images/gold.gif';

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'unchecked' | 'checked';
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Painting>
        <Checkbox alternative="Resposta 1" />
        <Checkbox alternative="Resposta 2" />
        <Checkbox alternative="Resposta 3A propriedade CSS text-align descreve como conteúdo inline, como texto, é alinhado no elemento pai em bloco. text-alig s" />
        <Checkbox alternative="Resposta 4" />
        <Button>Enviar</Button>
      </Content>
    </Container>
  );
};

export default Quizzes;
