import globals from '../components/style';
import Radium from 'radium';
import React, { PropTypes as RPT, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { displayInstance } from '../../common/processes/actions';

const defaultStyle = {
  base: {
    borderBottom: '1px solid #ddd',
    padding: '5px',
    ':hover': {
      background: '#fafdff'
    }
  },
  content: {
    color: globals.colors.lightFont
  }
};

@connect(
  null,
  (dispatch) => {
    const processActions = bindActionCreators({
      displayInstance
    }, dispatch);

    return { processActions };
  }
)
@Radium
export default class ProcessInstance extends Component {

  static propTypes = {
    processInstance: RPT.object,
    processActions: RPT.object
  };

  render() {
    const { processInstance: { name, id }, processActions } = this.props;

    return (
      <div style={defaultStyle.base}>
        <div style={defaultStyle.content}>
          <span>{name} #{id}</span>
          <button onClick={() => processActions.displayInstance(name, id)}>display</button>
        </div>
      </div>
    );
  }
}
