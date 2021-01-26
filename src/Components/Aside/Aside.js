import React from 'react';
import asideData from '../../data/asideData';

// sidebar (reustable component with input data)
const Aside = () => {
  return (
    <aside className="aside">
      {asideData.map((aside) => {
        return (
          <a href="#/" key={aside}>
            {aside}
          </a>
        );
      })}
    </aside>
  );
};

export default Aside;
