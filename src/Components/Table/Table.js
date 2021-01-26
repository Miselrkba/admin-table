import React, { useEffect, useState, Fragment } from 'react';
import { string, bool, arrayOf, shape, number } from 'prop-types';
import { orderBy } from 'lodash';
import StyledTable from '../styled/styledTable';
import transformToCamelcase from '../../helpers/transformToCamelcase';
import '../../App.css';

// reusable table component
const Table = ({
  tableDefaultSortColumn,
  isActionsMenuVisible,
  sortable,
  data,
  headers,
  expandableMenuActions
}) => {
  const [isOrderAscending, setIsOrderAscending] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState(tableDefaultSortColumn);
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // sort table
  const handleSort = (header = tableDefaultSortColumn) => {
    // table sortable based on flag in table config
    if (!sortable) {
      return;
    }

    // use lodash to sort ascending | descending
    const sortedList = orderBy(
      tableData,
      [transformToCamelcase(header)],
      [isOrderAscending ? 'asc' : 'desc']
    );
    setTableData(sortedList);

    // toggle state ascending / descending
    setIsOrderAscending((prevState) => {
      return !prevState;
    });
  };

  // set default sort based on prop in table config on component mount
  const getTableDataAndSort = async () => {
    const importTableData = await data;
    const sortedList = orderBy(
      importTableData,
      [transformToCamelcase(tableDefaultSortColumn)],
      ['desc']
    );
    setTableData(sortedList);
  };

  useEffect(() => {
    getTableDataAndSort();
  }, []);

  // headers
  const highlightHeaderAndSort = (event) => {
    setSelectedHeader(event.target.id);
    handleSort(event.target.id);
  };

  const generateThead = headers.map((header) => {
    return (
      <th key={header}>
        <a
          href="/#"
          id={header}
          onClick={highlightHeaderAndSort}
          className={
            header === selectedHeader ? '--color-white' : '--color-grey'
          }
        >
          {header}
        </a>
      </th>
    );
  });

  // check if all rows are selected
  const areAllRowsSelected = selectedRows.length === tableData.length;

  // select row / (de)select all rows / expand row
  const selectOrExpandRow = (row, actionType) => {
    let currentRow = null;
    let isRowActioned = null;

    switch (actionType) {
      case 'select':
        currentRow = selectedRows;
        isRowActioned = currentRow.includes(row.id);
        break;
      case 'expand':
        currentRow = expandedRows;
        isRowActioned = currentRow.includes(row.id);
        break;
      default:
        setSelectedRows(new Array(tableData.length));
        if (selectedRows.length === tableData.length) {
          setSelectedRows([]);
        }
        return;
    }

    const obj = {};
    // eslint-disable-next-line no-unused-expressions
    isRowActioned ? (obj[row.id] = false) : (obj[row.id] = true);

    // if row is selected/expanded, remove it from state, otherwise add
    const newActionedRows = isRowActioned
      ? currentRow.filter((id) => {
          return id !== row.id;
        })
      : currentRow.concat(row.id);

    // eslint-disable-next-line no-unused-expressions
    actionType === 'select'
      ? setSelectedRows(newActionedRows)
      : setExpandedRows(newActionedRows);
  };

  // actions menu
  const generateActionsMenu = isActionsMenuVisible
    ? expandableMenuActions.map((action) => {
        return (
          <a href="/#" key={action}>
            {action}
          </a>
        );
      })
    : null;

  // generate table from data in state, and apply styling for select/expand
  const generateDataInTable = tableData.map((row) => {
    // render all data properties except omittedKeys
    const omittedKeys = ['id'];
    const renderTableProperties = Object.keys(row).map((prop) => {
      return (
        !omittedKeys.includes(prop) && <td key={row[prop]}>{row[prop]}</td>
      );
    });

    // selected & expaded rows styling
    const selectedRowsClass =
      selectedRows.includes(row.id) || areAllRowsSelected
        ? '--background-dark --color-white'
        : null;

    const expandedRowsClass = expandedRows.includes(row.id)
      ? '--shadow-effect'
      : null;

    return (
      <Fragment key={row.id}>
        <tr className={selectedRowsClass || expandedRowsClass}>
          <td>
            <label className="row-checkbox" htmlFor="row-checkbox">
              <input
                id={row.id}
                type="checkbox"
                checked={selectedRows.includes(row.id) || areAllRowsSelected}
                onChange={() => {
                  selectOrExpandRow(row, 'select');
                }}
              />
            </label>
          </td>
          {renderTableProperties}
          {/* show menu actions based on flag in table config */}
          {isActionsMenuVisible && (
            <td>
              <a
                id={row.id}
                href="/#"
                className="dot-button"
                onClick={() => {
                  selectOrExpandRow(row, 'expand');
                }}
              >
                &#10247;
              </a>
            </td>
          )}
        </tr>
        {/* expanded row actions */}
        {expandedRows.includes(row.id) && (
          <tr>
            <td colSpan="10">
              <div className="expandable-menu expandable-menu--bottom-left-radius expandable-menu--bottom-right-radius">
                {generateActionsMenu}
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  });

  const generateBody =
    tableData && tableData.length ? (
      generateDataInTable
    ) : (
      <tr>
        <td>No table data available</td>
      </tr>
    );

  return (
    <StyledTable>
      <thead>
        <tr>
          <td>
            <label className="row-checkbox" htmlFor="row-checkbox">
              <input
                type="checkbox"
                checked={areAllRowsSelected}
                onChange={selectOrExpandRow}
              />
            </label>
          </td>
          {generateThead}
        </tr>
      </thead>
      <tbody>{generateBody}</tbody>
    </StyledTable>
  );
};

// type validation (* makes the component not reusable)
Table.propTypes = {
  data: arrayOf(
    shape({
      title: string,
      state: string,
      viewed: number,
      answered: number,
      folder: string,
      created: string,
      createdBy: string,
    })
  ).isRequired,
  tableDefaultSortColumn: string.isRequired,
  isActionsMenuVisible: bool.isRequired,
  sortable: bool.isRequired,
};

export default Table;
