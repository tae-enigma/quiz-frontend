import Modal from 'styled-react-modal';
import styled from 'styled-components';

export const Container = Modal.styled`
  background-color: #6a7b8d;
  width: 480px;
  min-height: 400px;
  border-radius: 8px;
  padding: 32px;
  padding-top: 64px;

  position: relative;

  h2 {
    margin-bottom: 24px;
    color: #9BDDD0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;

  background: transparent;
  border: none;
`;
