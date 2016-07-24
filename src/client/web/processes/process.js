import global from '../components/style';
import ProcssInstance from './processInstance';
import Radium from 'radium';
import React, { PropTypes as RPT, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  attemptProcessInstanceCreation,
  cancelProcessInstanceCreation
} from '../../common/processes/actions';

const defaultStyle = {
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
    height: 300,
    overflowY: 'auto'
  },
  id: {
    color: global.colors.lightFont,
    marginLeft: 10
  }
};

@connect(
  (state) => {
    const creatingProcessId = state.processes.creatingProcessId;

    return { creatingProcessId };
  },
  (dispatch) => {
    const processActions = bindActionCreators({
      attemptProcessInstanceCreation,
      cancelProcessInstanceCreation
    }, dispatch);

    return { processActions };
  }
)
@Radium
export default class ProcessPanel extends Component {

  render() {
    const {
      process: { name, id, instances },
      processActions
    } = this.props;

    return (
      <div style={defaultStyle.base}>
        <div style={defaultStyle.header}>
          <span>{name}</span>
          <span style={defaultStyle.id}>#{id}</span>
          <button onClick={() => processActions.attemptProcessInstanceCreation(id)}>+</button>
        </div>
        <div style={defaultStyle.content}>
          {instances.map(instance =>
            <ProcssInstance processInstance={instance} key={instance.id} />
          )}
        </div>
      </div>
    );
  }
}

ProcessPanel.propTypes = {
  creatingProcessId: RPT.number,
  process: RPT.object,
  processActions: RPT.object
};
