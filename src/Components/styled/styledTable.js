import styled from 'styled-components';

// table component using styled-components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: start;
    padding: 10px 20px;
  }

  th:not(:first-child):not(:last-child) {
    border-bottom: 1px #ff8c0021 dashed;
  }

  td {
    padding: 10px 20px;
  }

  .--shadow-effect td:not(:first-child):not(:last-child) {
    background-color: #343a40;
    box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.4);
    color: white;
  }

  tbody tr {
    :hover {
      color: white;
      background-color: #454d55;
    }
  }

  tr > td:nth-child(2) {
    color: white;
  }
`;

export default Table;
