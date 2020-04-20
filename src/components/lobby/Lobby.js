import React from "react";
import styled from "styled-components";

import { BaseContainer, GameContainer } from "../../helpers/layout";
import { handleError } from "../../helpers/api";
import Button from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import LogoutIcon from "../../views/design/LogoutIcon";
import GameTable from "./GameTable";
import Colors from "../../views/design/Colors";
import { SmallLogo } from "../../views/logos/SmallLogo";
//Redux
import { connect } from "react-redux";
import { getGames, startGame } from "../../redux/actions/lobbyActions";
import { store } from "../../store";
import { element } from "prop-types";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const BoxHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin: auto;
  margin-bottom: 20px;
`;

class Lobby extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.timer = setInterval(async () => await this.loadLobby(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async loadLobby() {
    await this.getGames();
  }

  //getGames
  async getGames() {
    console.log("getGames() Lobby");
    try {
      await this.props.getGames();
    } catch (error) {
      alert(
        `Something went wrong while fetching the games: \n${handleError(error)}`
      );
    }
  }

  async startTheGame() {
    console.log("StartGame()");
    const currentGameId = this.props.state.gameId;
    try {
      if ((await this.props.startGame(currentGameId)) == 0) {
        this.props.history.push(`/gameplay`);
      }
    } catch (error) {
      alert(
        `Something went wrong while starting the game: \n${handleError(error)}`
      );
    }
  }

  render() {
    console.log("Render Lobby");
    return (
      <Container>
        <GameContainer>
          <SmallLogo />
          <BoxHeader>
            <span style={Colors.textOrange}>G</span>
            <span style={Colors.textRed}>a</span>
            <span style={Colors.textPink}>m</span>
            <span style={Colors.textViolet}>e </span>
            <span style={Colors.textBlue}>L</span>
            <span style={Colors.textGreen}>o</span>
            <span style={Colors.textYellow}>b</span>
            <span style={Colors.textBlack}>b</span>
            <span style={Colors.textOrange}>y</span>
            <LogoutIcon />
          </BoxHeader>
          {!this.props.state.gamesList == null ? (
            <div />
          ) : (
            <GameTable games={this.props.state.gamesList} />
          )}
          {this.props.state.isUserCreator ? (
            <Button
              onClick={() => {
                this.startTheGame();
              }}
            >
              Start Game
            </Button>
          ) : (
            <Button
              onClick={() => {
                this.props.history.push(`/gamedetails`);
              }}
            >
              Create Game
            </Button>
          )}
        </GameContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.lobbyReducer,
});

export default withRouter(
  connect(mapStateToProps, { getGames, startGame })(Lobby)
);
