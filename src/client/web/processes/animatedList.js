import Radium from 'radium';
import range from 'lodash.range';
import React, { PropTypes as RPT, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProcesses } from '../../common/processes/actions';
import { TransitionMotion, spring } from 'react-motion';

const NUMBER_OF_ITEMS = 6;

const itemStyle = {
  border: '1px solid',
  textAlign: 'center',
  backgroundColor: '#99D',
  position: 'absolute',
};

const layout = range(NUMBER_OF_ITEMS).map(index => ({
  width: 200,
  height: 40,
  top: index / 3 < 1 ? 100 : 180,
  left: (index % 3) * 250 + 100,
  opacity: 1
}));

@connect(
  null,
  (dispatch) => {
    const processActions = bindActionCreators({ fetchProcesses }, dispatch);

    return { processActions };
  }
)
@Radium
export default class AnimatedList extends Component {

  static propTypes = {
    processes: RPT.array,
    processActions: RPT.object
  };

  state = {
    items: range(NUMBER_OF_ITEMS).map(item => `key${item}`)
  }

  // getInitialState() {
  //   return {
  //     items: range(NUMBER_OF_ITEMS).map(item => item.toString())
  //   };
  // }

  willLeave(styleThatLeft) {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return { ...styleThatLeft.style, opacity: spring(0) };
  }

  removeItem(key) {
    const { items } = this.state;

    if (items.indexOf(key) !== -1) {
      items.splice(items.indexOf(key), 1);
      this.setState({
        items
      });
    }
  }

  removeAll() {
    this.setState({
      items: []
    });
  }

  render() {
    const { items } = this.state;

    const array = items.map((item, index) => ({
      key: item,
      style: layout[index]
    }));

    return (
      <div>
        <TransitionMotion
          willLeave={this.willLeave}
          styles={array}
        >
          {interpolatedStyles => {
            return (
              <div>
                {interpolatedStyles.map(({ key, style }) =>
                  <div
                    key={key}
                    style={{ ...style, ...itemStyle }}
                    onClick={() => this.removeAll()}
                  >
                    {key}
                  </div>
                )}
              </div>
            );
          }}
        </TransitionMotion>
      </div>
    );
  }
}
