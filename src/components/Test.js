import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  timerRoundStart,
  timerRoundReset,
  timerRoundStop,
} from "../redux/actions/gameplayActions";
import { withRouter } from "react-router-dom";

class Test extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <button
          onClick={() => {
            console.log("Timer Test");
            this.props.timerRoundReset(20);
          }}
        >
          Timer Reset
        </button>
        <button
          onClick={() => {
            console.log("Timer Test");
            this.props.timerRoundStart();
          }}
        >
          Timer Start
        </button>
        <button
          onClick={() => {
            console.log("Timer Test");
            this.props.timerRoundStop();
          }}
        >
          Timer Stop
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
    timerRoundStart,
    timerRoundReset,
    timerRoundStop,
  })(Test)
);
