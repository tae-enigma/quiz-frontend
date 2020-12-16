import React, { useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container, Content } from './styles';
import logoImg from '../../assets/images/logo.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logoImg} alt="enigma logo" />
        </Link>
        <button type="button" onClick={handleSignOut}>
          Sair
          <FiLogOut size={24} />
        </button>
      </Content>
    </Container>
  );
};

export default Header;
