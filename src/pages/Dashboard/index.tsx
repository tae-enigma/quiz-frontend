import React from 'react';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return <div>{user?.name}</div>;
};

export default Dashboard;
