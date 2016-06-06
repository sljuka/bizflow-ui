import * as counterActions from '../../common/counter/actions';
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
    const actions = bindActionCreators(counterActions, dispatch);

    return { actions };
  }
)
export default class Processes extends Component {

  static propTypes = {
    processes: RPT.array,
    actions: RPT.object
  };

  render() {
    const { processes } = this.props;

    return (
      <ProcessList processes={processes} />
    );
  }
}
