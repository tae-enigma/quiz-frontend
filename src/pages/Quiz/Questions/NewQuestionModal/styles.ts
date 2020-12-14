import styled from 'styled-components';

export const Container = styled.div`
  form > p {
    font-size: 12px;
    color: #e5e5e5;
    margin-bottom: 24px;
  }
`;

export const Option = styled.div`
  display: flex;

  button {
    /* padding: 24px; */
    width: min-content;
    margin-right: 8px;
  }

  + div {
    margin-top: 8px;
  }
`;
