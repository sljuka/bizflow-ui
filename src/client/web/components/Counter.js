import React, { PropTypes as RPT, Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../../common/counter/actions';

function a(state) { return { counter: state.counter }; }
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

  click() {
    const query = `{
      users {
      	id
      	lastName
    	}
    }`;
    fetch(`/api/graphql?query=${query}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((stories) => {
        console.log(stories);
      });
  }

  render() {
    const { actions } = this.props;

    return (
      <div>
        <h2>Counter: {this.props.counter}</h2>
        <button onClick={actions.increment}>ssssddd</button>
        <button onClick={actions.decrement}>ddddssss</button>
        <button onClick={this.click}>eeeffff</button>
      </div>
   );
  }
}
