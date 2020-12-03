import React, { useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiBookOpen, FiAward } from 'react-icons/fi';
import Button from '../../../components/Button';
import {
  Container,
  TypeCard,
  Title,
  CardsContainer,
  CardTitle,
} from './styles';

interface SelectUserTypeProps {
  selected: 'student' | 'teacher' | '';
  onChange(newUserType: 'student' | 'teacher' | ''): void;
  onSubmit(): void;
}

interface UserTypes {
  title: string;
  value: 'student' | 'teacher' | '';
  icon: IconBaseProps;
}

const SelectUserType: React.FC<SelectUserTypeProps> = ({
  selected,
  onChange,
  onSubmit,
}) => {
  const [userTypes, setUserTypes] = useState<UserTypes[]>([
    {
      title: 'Professor',
      value: 'teacher',
      icon: <FiBookOpen size={70} />,
    },
    {
      title: 'Aluno',
      value: 'student',
      icon: <FiAward size={70} />,
    },
  ]);

  return (
    <Container>
      <Title>Escolha seu tipo de usuário</Title>
      <CardsContainer>
        {userTypes &&
          userTypes.map(userType => (
            <TypeCard
              key={userType.value}
              selected={selected === userType.value}
              onClick={() => onChange(userType.value)}
            >
              <CardTitle>{userType.title}</CardTitle>
              {userType.icon}
            </TypeCard>
          ))}
      </CardsContainer>
      <Button type="button" onClick={onSubmit}>
        Próximo
      </Button>
    </Container>
  );
};

export default SelectUserType;
