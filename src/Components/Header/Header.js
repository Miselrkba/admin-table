import React from 'react';
import headerData from '../../data/headerData';

// header (reustable component with input data)
const Header = () => {
  return (
    <header className="header">
      {headerData.map((header) => {
        return (
          <a href="#/" key={header}>
            {header}
          </a>
        );
      })}
    </header>
  );
};

export default Header;
