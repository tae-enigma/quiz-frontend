import styled from 'styled-components';
import { shade } from 'polished';
import { NavLink } from 'react-router-dom';

export const Container = styled(NavLink)`
  color: #f2f2f2;
  text-decoration: none;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    color: ${shade(0.2, '#f2f2f2')};
  }

  &.active-link {
    color: #3bae97;
  }

  + a {
    margin-left: 24px;
  }

  svg {
    margin-right: 16px;
  }
`;
