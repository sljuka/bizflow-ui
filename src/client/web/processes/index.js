import { fetchProcesses } from '../../common/processes/actions';
import ProcessList from './processList';
import React, { PropTypes as RPT, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(
  (state) => {
    const processes = state.processes.processes;

    return { processes };
  },
  (dispatch) => {
    const processActions = bindActionCreators({ fetchProcesses }, dispatch);

    return { processActions };
  }
)
export default class Processes extends Component {

  static propTypes = {
    processes: RPT.array,
    processActions: RPT.object
  };

  render() {
    const { processes, processActions } = this.props;

    return (
      <div>
        <button onClick={processActions.fetchProcesses}>Fetch processes</button>
        <ProcessList processes={processes} />
      </div>
    );
  }
}
