import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import OptionButton from '../../components/OptionButton';
import { Container, Content, Painting, Title } from './styles';
import tower1 from '../../assets/images/tower_iluminados.png';
import gold from '../../assets/images/gold.gif';

interface selectedOptionProps {
  selected: '1' | '2' | '3' | '4' | '';
  onChange(newOption: string | undefined): void;
  onSubmit(): void;
}

interface OptionTypes {
  text: string;
  value: '1' | '2' | '3' | '4' | '';
}

const Quizzes: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

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

  const [options, setOptions] = useState<OptionTypes[]>([
    {
      text: 'Resposta 1',
      value: '1',
    },
    {
      text: 'Resposta 2',
      value: '2',
    },
    {
      text: 'Resposta 3',
      value: '3',
    },
    {
      text: 'Resposta 4',
      value: '4',
    },
  ]);

  const onSubmit = useCallback(() => {
    // função que trata o envio da resposta e segue para a próxima.
  }, []);

  return (
    <Container>
      {/* lista de questões  */}
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
        {options &&
          options.map(option => (
            <OptionButton
              description={option.text}
              key={option.value}
              selected={selectedOption === option.value}
              onClick={() => onChange(option.value)}
            />
          ))}
        <Button type="button" onClick={onSubmit}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
};

export default Quizzes;
