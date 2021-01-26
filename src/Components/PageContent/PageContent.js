import React from 'react';
import Table from '../Table/Table';
import Button from '../styled/styledButton';
import { dummyInputPageContentData } from '../../data/dummyData';
import { expandableMenuActions, tableDefaultSortColumn, tableHeaders } from '../Table/tableConfig';

// page content using reusable table component
const PageContent = () => {
  return (
    <div className="page-content">
      <div className="page-content__header-container">
        <h1>Surveys</h1>
        <Button>New Survey</Button>
      </div>
      <Table
        data={dummyInputPageContentData}
        headers={tableHeaders}
        tableDefaultSortColumn={tableDefaultSortColumn}
        expandableMenuActions={expandableMenuActions}
        isActionsMenuVisible
        sortable
      />
    </div>
  );
};

export default PageContent;
