import Modal from 'react-modal';
import Radium from 'radium';
import React, { PropTypes as RPT, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  cancelProcessInstanceCreation,
  createProcessInstance
} from '../../common/processes/actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

@Radium
@connect(
  (state) => {
    const creatingProcessId = state.processes.creatingProcessId;
    const pcss = state.processes.processes.find(pcs => pcs.id === creatingProcessId);

    return { creatingProcessId, pcss };
  },
  (dispatch) => {
    const processActions = bindActionCreators({
      cancelProcessInstanceCreation,
      createProcessInstance
    }, dispatch);

    return { processActions };
  }
)
export default class InstanceCreationModal extends Component {
  render() {
    const { creatingProcessId, processActions, pcss: { name } } = this.props;

    return (
      <Modal
        isOpen={!!creatingProcessId}
        style={customStyles}
        onRequestClose={processActions.cancelProcessInstanceCreation}
      >
        <h2>Create new process instance</h2>
        <p>{name}</p>
        <textarea>
        </textarea>
        <button
          onClick={processActions.cancelProcessInstanceCreation}
        >
          Cancel
        </button>
        <button
          onClick={() => processActions.createProcessInstance(creatingProcessId)}
        >
          Submit
        </button>
      </Modal>
    );
  }
}

InstanceCreationModal.propTypes = {
  creatingProcessId: RPT.number,
  processActions: RPT.object,
  pcss: RPT.object
};
