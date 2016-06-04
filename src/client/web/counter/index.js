import React, { PropTypes as RPT, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../../common/counter/actions';

@connect(
  (state) => {
    const counter = state.counter.counter;
    return { counter };
  },
  (dispatch) => {
    const actions = bindActionCreators(counterActions, dispatch);
    return { actions };
  }
)
export default class Counter extends Component {

  static propTypes = {
    counter: RPT.number,
    actions: RPT.object
  }

  render() {
    const { actions } = this.props;

    return (
      <div>
        <h2>Counter: {this.props.counter}</h2>
        <button onClick={actions.increment}>inc</button>
        <button onClick={actions.decrement}>dec</button>
        <button onClick={actions.magicAction2}>asyncss</button>
      </div>
   );
  }
}
