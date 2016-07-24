import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import globals from '../components/style';

const defaultStyle = {
  base: {
    borderBottom: '1px solid #ddd',
    padding: '5px',
    ':hover': {
      background: '#fafdff'
    }
  },
  content: {
    color: globals.colors.lightFont
  }
};

const ProcessInstance = function (props) {
  const { processInstance: { name, id } } = props;

  return (
    <div style={defaultStyle.base}>
      <div style={defaultStyle.content}>{name} #{id}</div>
    </div>
  );
};

ProcessInstance.propTypes = {
  processInstance: RPT.object
};

export default Radium(ProcessInstance);
