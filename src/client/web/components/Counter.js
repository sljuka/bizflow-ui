import React, { PropTypes as RPT, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../../common/counter/actions';

function a(state) { return { counter: state.counter.counter }; }
function b(dispatch) { return { actions: bindActionCreators(counterActions, dispatch) }; }

@connect(
  a,
  b
)
export default class Counter extends Component {

  static propTypes = {
    counter: RPT.number,
    actions: RPT.object
  }

  click() {}

  render() {
    const { actions } = this.props;

    return (
      <div>
        <h2>Counter: {this.props.counter}</h2>
        <button onClick={actions.increment}>ssssddd</button>
        <button onClick={actions.decrement}>ddddssss</button>
        <button onClick={actions.magicAction2}>eeeffff</button>
      </div>
   );
  }
}
