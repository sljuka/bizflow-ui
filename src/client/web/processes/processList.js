import Col from 'react-bootstrap/lib/Col';
import CircleMenu from '../components/circleMenu';
import Grid from 'react-bootstrap/lib/Grid';
import ProcessPanel from './processPanel';
import Radium from 'radium';
import React, { PropTypes as RPT, Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Search from '../components/search';
import globals from '../components/style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProcesses } from '../../common/processes/actions';

const style = {
  floatLeft: {
    float: 'left'
  },
  floatRight: {
    float: 'right'
  },
  button: {
    marginTop: 20,
    marginBottom: 10
  }
};

@connect(
  null,
  (dispatch) => {
    const processActions = bindActionCreators({ fetchProcesses }, dispatch);

    return { processActions };
  }
)
@Radium
export default class ProcessList extends Component {

  static propTypes = {
    processes: RPT.array,
    processActions: RPT.object
  };

  render() {
    const { processes, processActions } = this.props;

    return (
      <div>
        <Grid>
          <CircleMenu style={style.floatLeft} />
          <ProcessesHeader processes={processes} style={style.floatLeft} />
          <button
            onClick={processActions.fetchProcesses}
            style={{ ...style.button, ...style.floatLeft }}
          >
            Fetch processes
          </button>
          <Search inheritedStyle={{ base: style.floatRight }} />
          <div style={globals.clearfix}></div>
          <Row className="show-grid">
            {processes.map((process) =>
              <Col key={process.id} xs={12} sm={6} md={6} lg={4}>
                <ProcessPanel process={process} />
              </Col>
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

const ProcessesHeader = (props) => {
  if (props.processes.length < 0) return null;

  return <h2 style={props.style}>Processes</h2>;
};

ProcessesHeader.propTypes = {
  processes: RPT.array,
  style: RPT.object
};
