import React, { ButtonHTMLAttributes } from 'react';

import { Container, Option, Checkbox } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'unchecked' | 'checked';
  alternative: string;
}

const Button: React.FC<ButtonProps> = ({ alternative, children, ...rest }) => (
  <Container>
    <Checkbox type="button" {...rest} />
    <Option>{alternative}</Option>
  </Container>
);

export default Button;
