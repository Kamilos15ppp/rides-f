import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  label {
    color: #fff;
  }

  input,
  span {
    border-radius: 30px;
  }

  button {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
