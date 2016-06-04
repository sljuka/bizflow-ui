import * as counterActions from '../../common/counter/actions';
import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Counter(props) {
  const { actions, counter } = props;

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={actions.increment}>inc</button>
      <button onClick={actions.decrement}>dec</button>
      <button onClick={actions.magicAction2}>asyncss</button>
    </div>
 );
}

Counter.propTypes = {
  counter: RPT.number,
  actions: RPT.object
};

export default connect(
  (state) => {
    const counter = state.counter.counter;

    return { counter };
  },
  (dispatch) => {
    const actions = bindActionCreators(counterActions, dispatch);

    return { actions };
  }
)(Counter);
