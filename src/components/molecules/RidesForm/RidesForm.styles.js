import styled from 'styled-components';

export const Wrapper = styled.div`
  form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  input,
  span {
    border-radius: 30px;
  }
`;
