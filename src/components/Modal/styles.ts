import Modal from 'styled-react-modal';
import styled, { css } from 'styled-components';

interface ModalContentProps {
  size?: 'xlg' | 'lg' | 'md' | 'sm';
}

const modalSize = {
  xlg: css`
    width: 1140px;
  `,
  lg: css`
    width: 800px;
  `,
  md: css`
    width: 500px;
  `,
  sm: css`
    width: 300px;
  `,
};

export const Container = Modal.styled`
  overflow-y: auto;
  max-height: 90vh;

  /* Designing for scroll-bar */ 
  ::-webkit-scrollbar { 
    display: none;
  } 

  /* Track */ 
  ::-webkit-scrollbar-track { 
      background: #8E9FB1; 
      border-radius: 5px; 
  } 

  /* Handle */ 
  ::-webkit-scrollbar-thumb { 
      background: #9BDDD0; 
      border-radius: 5px; 
  } 

  /* Handle on hover */ 
  ::-webkit-scrollbar-thumb:hover { 
      background: #555; 
  } 
`;

export const Content = styled.div<ModalContentProps>`
  background-color: #6a7b8d;
  min-height: 400px;
  border-radius: 8px;
  padding: 32px;
  padding-top: 64px;

  position: relative;

  ${props => props.size && modalSize[props.size || 'md']}

  h2 {
    margin-bottom: 24px;
    color: #9bddd0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;

  background: transparent;
  border: none;
`;
