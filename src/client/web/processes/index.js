import ProcessList from './processList';
import React, { PropTypes as RPT, Component } from 'react';
import InstanceCreationModal from './instanceCreationModal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelProcessInstanceCreation } from '../../common/processes/actions';

@connect(
  (state) => {
    const processes = state.processes.processes;
    const creatingProcessId = state.processes.creatingProcessId;

    return { processes, creatingProcessId };
  },
  (dispatch) => {
    const processActions = bindActionCreators({
      cancelProcessInstanceCreation
    }, dispatch);

    return { processActions };
  }
)
export default class Processes extends Component {

  static propTypes = {
    creatingProcessId: RPT.number,
    processes: RPT.array,
    processActions: RPT.object
  };

  render() {
    const { processes, creatingProcessId } = this.props;

    return (
      <div>
        <ProcessList processes={processes} />
        {!!creatingProcessId && <InstanceCreationModal />}
      </div>
    );
  }
}
