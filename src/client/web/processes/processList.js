import CircleMenu from '../components/circleMenu';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';
import globals from '../components/style';
import Process from './process';
import Radium from 'radium';
import React, { PropTypes as RPT, Component } from 'react';
import Row from 'muicss/lib/react/row';
import Search from '../components/search';
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
    processes: RPT.object,
    processActions: RPT.object
  };

  render() {
    const { processes, processActions } = this.props;

    return (
      <div>
        <Container fluid>
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
          <Row>
            {processes.map((process) =>
              <Col key={process.id} md="6">
                <Process process={process} />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

const ProcessesHeader = (props) => {
  if (props.processes.length < 0) return null;

  return <h2 style={props.style}>Processes</h2>;
};

ProcessesHeader.propTypes = {
  processes: RPT.object,
  style: RPT.object
};
