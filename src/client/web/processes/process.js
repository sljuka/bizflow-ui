import Panel from 'react-bootstrap/lib/Panel';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';

function Process(props) {
  const { name } = props.process;

  return (
    <Panel header={name}>
      <p>
        Lorem ipsum dolor sit amet...
      </p>
    </Panel>
  );
}

Process.propTypes = {
  process: RPT.object
};

export default Radium(Process);
