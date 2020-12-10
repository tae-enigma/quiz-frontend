import React, { ButtonHTMLAttributes } from 'react';
import { Container, Option, OptionButtonCard } from './styles';

interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: 'unselected' | 'selected';
  alternative: string;
}

const OptionButton: React.FC<OptionProps> = ({
  id,
  alternative,
  children,
  ...rest
}) => (
  <Container>
    <OptionButtonCard selected="unselected" type="button" {...rest}>
      <Option>{alternative}</Option>
    </OptionButtonCard>
  </Container>
);

export default OptionButton;
