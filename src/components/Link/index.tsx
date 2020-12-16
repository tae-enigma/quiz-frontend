import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface LinkProps {
  to: string;
  active?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const Link: React.FC<LinkProps> = ({ to, children, icon: Icon, active }) => {
  return (
    <Container to={to} exact activeClassName="active-link">
      {Icon && <Icon size={20} />}
      {children}
    </Container>
  );
};

export default Link;
