import styled from 'styled-components';

export const Loader = styled.div`
  width: 5rem;
  height: 5rem;
  border: 0.6rem solid #999;
  border-bottom-color: transparent;
  border-radius: 50%;
  margin: 0 auto;
  animation: loader 500ms linear infinite;

  @keyframes loader {
    to {
      transform: rotate(360deg);
    }
  }
`;
