import ProcessList from './processList';
import React, { PropTypes as RPT, Component } from 'react';
import InstanceCreationModal from './instanceCreationModal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelProcessInstanceCreation } from '../../common/processes/actions';

@connect(
  (state) => {
    const processes = state.processes.processes.valueSeq();
    const newInstanceProcessId = state.processes.newInstanceProcessId;

    return { processes, newInstanceProcessId };
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
    newInstanceProcessId: RPT.number,
    processes: RPT.object,
    processActions: RPT.object
  };

  render() {
    const { processes, newInstanceProcessId } = this.props;

    return (
      <div>
        <ProcessList processes={processes} />
        {!!newInstanceProcessId && <InstanceCreationModal />}
      </div>
    );
  }
}
