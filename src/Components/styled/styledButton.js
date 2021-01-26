import styled from 'styled-components';

// button component using styled-components
const Button = styled.button`
  border-radius: 3px;
  border: 2px solid darkorange;
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  text-decoration: none;

  &:hover {
    background-color: darkorange;
    color: white;
  }
`;

export default Button;
