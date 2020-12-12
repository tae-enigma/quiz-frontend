import React from 'react';
import { ModalProvider } from 'styled-react-modal';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
);

export default App;
