import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import global from '../components/style';

const style = {
  base: {
    border: '1px solid #ddd',
    marginBottom: 20,
    borderRadius: 4,
    boxShadow: '0 1px 1px rgba(0,0,0,.05)'
  },
  header: {
    backgroundColor: '#f5f5f5',
    color: global.colors.darkFont,
    padding: '10px 15px',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottom: '1px solid #ddd'
  },
  content: {
    padding: 15
  },
  id: {
    color: global.colors.lightFont,
    marginLeft: 10
  }
};

const ProcessPanel = function (props) {
  const { process: { name, description, id } } = props;

  return (
    <div style={style.base}>
      <div style={style.header}>
        <span>{name}</span>
        <span style={style.id}>#{id}</span>
      </div>
      <div style={style.content}>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};

ProcessPanel.propTypes = {
  process: RPT.object
};

export default Radium(ProcessPanel);
