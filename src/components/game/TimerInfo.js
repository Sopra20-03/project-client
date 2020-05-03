import styled from "styled-components";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

import PulseLoader from "react-spinners/PulseLoader";

export const TimerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  border: 2px black solid;
  border-radius: 5px;
  background-color: white;
  align-items: center;
  margin: 2px;
  padding: 5px;
`;

class TimerInfo extends Component {
  render() {
    if (this.props.gameState.timer.timer == null) {
      return (
        <div>
          <TimerInfoContainer>
            <PulseLoader />
            <h3 style={{ margin: "0px" }}>Round {this.props.round} of 13</h3>
          </TimerInfoContainer>
        </div>
      );
    } else {
      return (
        <div>
          <TimerInfoContainer>
            {this.props.gameState.timer.seconds <= 10 ? (
              <h1
                style={{
                  margin: "0px",
                  color: "#de0006",
                  fontWeight: "1000",
                }}
              >
                {this.props.gameState.timer.seconds}
              </h1>
            ) : (
              <h1 style={{ margin: "0px" }}>
                {this.props.gameState.timer.seconds}
              </h1>
            )}

            <h3 style={{ margin: "0px" }}>Round {this.props.round} of 13</h3>
          </TimerInfoContainer>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  gameState: state.gameplayReducer,
  userState: state.userReducer,
});
export default withRouter(connect(mapStateToProps, {})(TimerInfo));
