import React, { Component } from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import Table from "./Table";
import { BaseContainer, GameContainer } from "../../helpers/layout";
import AllPlayerBoxes from "./AllPlayerBoxes";
import { SmallLogo } from "../../views/logos/SmallLogo";
import { withRouter } from "react-router-dom";
import { handleError } from "../../helpers/api";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
//Redux
import { connect } from "react-redux";
import {
  gameLoadGame,
  getGamePlayers,
  playerSetRole,
  gameGetRound,
  gameUpdateRound,
  gameGetClues,
  gameSubmitClue,
} from "../../redux/actions/gameplayActions";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class Gameplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRolePopup: false,
    };
  }

  toggleRolePopup() {
    this.setState({
      showRolePopup: !this.state.showRolePopup,
    });
  }

  componentDidMount() {
    console.log("Gameplay Mount");
    //1. Load gameState
    const gameData = {
      userId: this.props.userState.user.id,
      gameId: this.props.lobbyState.gameId,
    };
    this.props.gameLoadGame(gameData);
    //2. Set RoundNum to 1
    this.props.gameUpdateRound(1);
    //3. Start Polling
    this.timer = setInterval(async () => await this.runGame(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async runGame() {
    //1. TODO Get Gamestatus, check if it is running/ checkRound

    //2. Get Players
    await this.getPlayers();

    //3. Update Role for each round
    this.playerUpdateRole();

    //4. Get Round
    await this.getRound();

    //5. Get Clues
    await this.getClues();
  }

  async getPlayers() {
    try {
      await this.props.getGamePlayers(this.props.gameState.gameId, this.props.gameState.userId);
    } catch (error) {
      alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
    }
  }

  async submitClue(clueId, word) {
    try {
      console.log("GameId in GameState: ");
      const requestData = {
        gameId: this.props.gameState.gameId,
        playerId: this.props.gameState.playerId,
        clueId: clueId,
        word: word,
      };
      await this.props.gameSubmitClue(requestData);
    } catch (error) {
      alert(
          `Something went wrong while submitting the clue: \n${handleError(error)}`
      );
    }
  }

  playerUpdateRole() {
    let players = this.props.gameState.gamePlayers;
    if (players != null) {
      let player = players.find((x) => x.userId === this.props.gameState.userId );
      if (player) this.props.playerSetRole(player.role);
    }
  }

  async getRound() {
    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };
      await this.props.gameGetRound(data);
    } catch (error) {
      alert(
        `Something went wrong while fetching the games: \n${handleError(error)}`
      );
    }
  }

  async getClues() {
    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };
      await this.props.gameGetClues(data);
    } catch (error) {
      alert(
          `Something went wrong while fetching the clues: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <div>
        <BaseContainer>
          <GameContainer>
            <SmallLogo />
            <LogoutIcon />
            <div></div>

            <AllPlayerBoxes players={this.props.gameState.gamePlayers} />

            <TableContainer>
              <Table onSubmitClue = {this.submitClue}/>
            </TableContainer>

            <InfoContainer>
              <PointsInfo />
              <TimerInfo />
            </InfoContainer>
          </GameContainer>
        </BaseContainer>
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
    gameLoadGame,
    getGamePlayers,
    playerSetRole,
    gameGetRound,
    gameUpdateRound,
    gameGetClues,
    gameSubmitClue,
  })(Gameplay)
);
