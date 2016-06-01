import React, {PropTypes as RPT} from 'react';

export default function Layout({ children }) {

  static propTypes = {
    children: RPT.any
  }

  return (
    <div>
      {children}
    </div>
  )
}
