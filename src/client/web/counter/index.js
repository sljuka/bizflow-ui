import * as counterActions from '../../common/counter/actions';
import * as processActions from '../../common/processes/actions';
import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Counter(props) {
  const { actions, procActions, counter } = props;

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={actions.increment}>inc</button>
      <button onClick={actions.decrement}>dec</button>
      <button onClick={procActions.fetchProcesses}>asyncss</button>
    </div>
 );
}

Counter.propTypes = {
  counter: RPT.number,
  actions: RPT.object,
  procActions: RPT.object
};

export default connect(
  (state) => {
    const counter = state.counter.counter;

    return { counter };
  },
  (dispatch) => {
    const actions = bindActionCreators(counterActions, dispatch);
    const procActions = bindActionCreators(processActions, dispatch);

    return { actions, procActions };
  }
)(Counter);
