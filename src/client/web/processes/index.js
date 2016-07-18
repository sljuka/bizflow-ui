import { fetchProcesses } from '../../common/processes/actions';
import ProcessList from './processList';
import AnimatedList from './animatedLIst';
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
    processes: RPT.array
  };

  render() {
    const { processes } = this.props;

    return (
      <div>
        <AnimatedList />
      </div>
    );
  }
}
