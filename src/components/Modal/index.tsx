import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { ModalProps as ReactModalProps } from 'styled-react-modal';

import { Container, CloseButton, Content } from './styles';

interface ModalProps extends ReactModalProps {
  toggle?(): any;
  size?: 'xlg' | 'lg' | 'md' | 'sm';
}

const Modal: React.FC<ModalProps> = ({
  children,
  toggle,
  size = 'md',
  ...rest
}) => {
  return (
    <Container {...rest} onBackgroundClick={toggle}>
      <Content size={size}>
        <CloseButton onClick={toggle}>
          <FiXCircle size={30} color="#8E9FB1" />
        </CloseButton>
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
