import React, { LabelHTMLAttributes } from 'react';

import { Container } from './styles';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({ children, htmlFor, ...rest }) => {
  return (
    <Container>
      <label htmlFor={htmlFor} {...rest}>
        {children}
      </label>
    </Container>
  );
};

export default Label;
