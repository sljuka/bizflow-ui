import React, { PropTypes as RPT } from 'react';

export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: RPT.any
};
