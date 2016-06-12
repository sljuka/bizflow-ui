import Process from './process';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

function ProcessList(props) {
  const { processes } = props;

  if (processes.length < 1)
    return null;

  return (
    <div>
      <Grid>
        <h2>Processes</h2>
        <Row className="show-grid">
          {processes.map((process) =>
            <Col key={process.id} xs={12} sm={6} md={6} lg={4}>
              <Process process={process} />
            </Col>
          )}
        </Row>
      </Grid>
    </div>
 );
}

ProcessList.propTypes = {
  processes: RPT.array
};

export default Radium(ProcessList);
