import React from "react";
import styled from "styled-components";

import { BaseContainer, GameContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import Button from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import LogoutIcon from "../../views/design/LogoutIcon";
import GameTable from "./GameTable";
import Colors from "../../views/design/Colors";
import { SmallLogo } from "../../views/logos/SmallLogo";
//Redux
import { connect } from "react-redux";
import { getGames, getGamePlayers } from "../../redux/actions/lobbyActions";
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
    await this.getPlayers();
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

  async getPlayers() {
    try {
      const gamesList = store.getState().lobbyReducer.gamesList;
      await this.props.getGamePlayers(gamesList);
    } catch (error) {
      alert(
        `Something went wrong while fetching the players: \n${handleError(
          error
        )}`
      );
    }
  }

  render() {
    const state = store.getState().lobbyReducer;
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

          {!state.gamesList == null ? (
            <div />
          ) : (
            <GameTable games={state.gamesList} players={state.playersList} />
          )}

          <Button
            onClick={() => {
              this.props.history.push(`/gamedetails`);
            }}
          >
            Create New Game
          </Button>
        </GameContainer>
      </Container>
    );
  }
}

export default withRouter(connect(null, { getGames, getGamePlayers })(Lobby));
