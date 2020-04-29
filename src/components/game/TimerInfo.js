import styled from "styled-components";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

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
    return (
      <div>
        <TimerInfoContainer>
          {this.props.gameState.timers != null ? (
            <h1 style={{ margin: "0px" }}>
              {this.props.gameState.timers.round.seconds}
            </h1>
          ) : (
            <h1 style={{ margin: "0px" }}>2:00</h1>
          )}

          <h3 style={{ margin: "0px" }}>Round {this.props.round} of 13</h3>
        </TimerInfoContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  gameState: state.gameplayReducer,
  userState: state.userReducer,
});
export default withRouter(connect(mapStateToProps, {})(TimerInfo));
