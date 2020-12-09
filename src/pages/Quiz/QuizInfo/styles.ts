import styled from 'styled-components';

export const Container = styled.div`
  background-color: #303d50;
  padding: 32px;
  border-radius: 8px;

  > div > h4 {
    margin-bottom: 24px;
  }

  > div + div {
    margin-top: 64px;
  }
`;

export const InfoList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const Info = styled.div`
  max-width: 140px;

  h4 {
    color: #8e9fb1;
    font-weight: 400;
    margin-bottom: 16px;
  }

  p {
    font-weight: 600;
    font-size: 18px;
  }
`;
