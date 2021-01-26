import React from 'react';
import Aside from './Aside/Aside';
import Header from './Header/Header';
import PageContent from './PageContent/PageContent';

// admin dashboard component
const AdminDashboard = () => {
  return (
    <div className="admin">
      <Header />
      <PageContent />
      <Aside />
    </div>
  );
};

export default AdminDashboard;
