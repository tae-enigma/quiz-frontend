import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { ModalProps as ReactModalProps } from 'styled-react-modal';

import { Container, CloseButton } from './styles';

interface ModalProps extends ReactModalProps {
  toggle?(): any;
}

const Modal: React.FC<ModalProps> = ({ children, toggle, ...rest }) => {
  return (
    <Container {...rest} onBackgroundClick={toggle}>
      <CloseButton onClick={toggle}>
        <FiXCircle size={30} color="#8E9FB1" />
      </CloseButton>
      {children}
    </Container>
  );
};

export default Modal;
