import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  timerStart,
  timerStop,
  timerClear,
} from "../redux/actions/gameplayActions";
import { withRouter } from "react-router-dom";

class Test extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>

        <h3>Timer: {this.props.gameState.timer.timer}</h3>
        <h3>Seconds: {this.props.gameState.timer.seconds}</h3>
        <h3>State: {this.props.gameState.timer.state}</h3>
        <button
          onClick={() => {
            this.props.timerStart(20);
          }}
        >
          Timer Start
        </button>
        <button
          onClick={() => {
            this.props.timerStop();
          }}
        >
          Timer Stop
        </button>
        <button
          onClick={() => {
            this.props.timerClear();
          }}
        >
          Timer Clear
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  gameState: state.gameplayReducer,
  userState: state.userReducer,
});
export default withRouter(
  connect(mapStateToProps, {
    timerStart,
    timerStop,
    timerClear,
  })(Test)
);
