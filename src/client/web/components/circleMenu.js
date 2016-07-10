import Radium from 'radium';
import range from 'lodash.range';
import React, { Component, PropTypes as RPT } from 'react';
import { StaggeredMotion, spring } from 'react-motion';

const DEG_TO_RAD = Math.PI / 180;
const MAIN_BUTTON_DIAM = 40;
const CHILD_BUTTON_DIAM = 40;
const NUM_CHILDREN = 5;
const M_X = 100;
const M_Y = 25;
const FLY_OUT_RADIUS = 60;
const SEPARATION_ANGLE = 40; // degrees
const FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE; // degrees
const BASE_ANGLE = 270 - FAN_ANGLE / 2; // degrees

const style = {
  mainButton: {
    position: 'absolute',
    width: `${MAIN_BUTTON_DIAM}px`,
    height: `${MAIN_BUTTON_DIAM}px`,
    borderRadius: '100%',
    backgroundColor: '#68AEF0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontWeight: 'lighter',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  },
  childButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `${CHILD_BUTTON_DIAM}px`,
    height: `${CHILD_BUTTON_DIAM}px`,
    borderRadius: '100%',
    backgroundColor: 'pink',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px',
    color: '#8898A5',
  }
};

const toRadians = (degrees) => degrees * DEG_TO_RAD;

const childPosition = (index, percent) => {
  const angle = BASE_ANGLE + index * SEPARATION_ANGLE;
  const deltaX = FLY_OUT_RADIUS * Math.cos(toRadians(angle)) * percent;
  const deltaY = FLY_OUT_RADIUS * Math.sin(toRadians(angle)) * percent;

  return {
    deltaX: deltaX + CHILD_BUTTON_DIAM / 2,
    deltaY: deltaY + CHILD_BUTTON_DIAM / 2
  };
};

const childButtonStyle = (index, percent) => {
  const { deltaX, deltaY } = childPosition(index, percent);
  const deg = 360 * percent;

  return {
    top: M_Y - deltaY,
    left: M_X - deltaX,
    transform: `rotate(${deg}deg)`,
    ...style.childButton
  };
};

const mainButtonStyle = (percent) => {
  const deg = 135 * percent;

  return {
    top: M_Y - MAIN_BUTTON_DIAM / 2,
    left: M_X - MAIN_BUTTON_DIAM / 2,
    transform: `rotate(${deg}deg)`,
    ...style.mainButton
  };
};

@Radium
export default class CircleMenu extends Component {

  static PropTypes = {
    menuItemClick: RPT.func.isRequired,
    menuItemsAngle: RPT.number,
    menuItems: RPT.array
  }

  toggleMenu() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    const goalPercent = isOpen ? 1.0 : 0.0;
    const defaultStyles = range(NUM_CHILDREN).map(() => ({ percent: 0.0 }));
    const nextStyles = (previousStyles) => {
      return previousStyles.map((prev, i) => {
        if (i === 0) return { percent: spring(goalPercent) };

        const lastButtonPreviousPercent = previousStyles[i - 1].percent;
        const thisButtonPreviousPercent = previousStyles[i].percent;
        const shouldThisAnimate = isOpen ?
          lastButtonPreviousPercent > 0.2 :
          lastButtonPreviousPercent < 0.8;
        return { percent: shouldThisAnimate ? spring(goalPercent) : thisButtonPreviousPercent };
      });
    };

    return (
      <div>
        <StaggeredMotion defaultStyles={defaultStyles} styles={nextStyles}>
          {(interpolatedStyles) => {
            const leaderPercent = interpolatedStyles[0].percent;

            return (
              <div>
                {interpolatedStyles.map(({ percent }, index) => {
                  return (
                    <div
                      key={index}
                      style={{ ...childButtonStyle(index, percent) }}
                    >
                      C
                    </div>
                  );
                })}
                <div
                  style={{ ...mainButtonStyle(leaderPercent) }}
                  onClick={this.toggleMenu.bind(this)}
                >
                  P
                </div>
              </div>
            );
          }}
        </StaggeredMotion>
      </div>
    );
  }
}
