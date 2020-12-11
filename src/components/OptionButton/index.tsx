import React, { ButtonHTMLAttributes } from 'react';
import { Container, OptionText, OptionButtonCard } from './styles';

interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  description: string;
}

const OptionButton: React.FC<OptionProps> = ({
  id,
  description,
  children,
  ...rest
}) => (
  <Container>
    <OptionButtonCard {...rest}>
      <OptionText>{description}</OptionText>
    </OptionButtonCard>
  </Container>
);

export default OptionButton;
