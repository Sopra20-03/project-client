import React, { Component } from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import RoleInfo from "./RoleInfo";
import Table from "./Table";
import { BaseContainer, GameContainer } from "../../helpers/layout";
import AllPlayerBoxes from "./AllPlayerBoxes";
import { SmallLogo } from "../../views/logos/SmallLogo";
import { withRouter } from "react-router-dom";
import { handleError } from "../../helpers/api";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import GameStates from "../../redux/reducers/gameStates";
//Redux
import { connect } from "react-redux";
import {
  gameGetClues,
  gameGetGame,
  gameGetRound,
  gameLoadGame,
  guesserSelectWord,
  gameSubmitClue,
  gameSetState,
  gameUpdateRound,
  gameClearGame,
  getGamePlayers,
  playerSetRole,
  timerStart,
  timerStop,
  gameSubmitGuess,
  timerClear,
} from "../../redux/actions/gameplayActions";
import Button from "@material-ui/core/Button";

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
    if (this.props.gameState.roundNum != null) {
      this.props.gameUpdateRound(this.props.gameState.roundNum);
    } else {
      this.props.gameUpdateRound(1);
    }

    //3. Start Polling
    this.timer = setInterval(async () => await this.runGame(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async runGame() {
    if (this.props.gameState.roundNum > 13) {
      this.props.gameClearGame();
      alert("Game Over");
      this.props.history.push(`/lobby`);
    }
    //1. Get Players
    await this.getPlayers();

    //2. Update Role for each round
    await this.playerUpdateRole();

    //3. Get Round
    await this.getRound();

    //4. Get Clues
    if (this.props.gameState.round.wordCard.selectedWord != null) {
      await this.getClues();
    }

    //5. Get Game Phase or State
    await this.getGameState();

    //6. Get Score
    await this.getGame();
  }

  async getPlayers() {
    try {
      await this.props.getGamePlayers(
        this.props.gameState.gameId,
        this.props.gameState.userId
      );
    } catch (error) {
      alert(
        `Something went wrong while fetching the players: \n${handleError(
          error
        )}`
      );
    }
  }

  async getGame() {
    try {
      await this.props.gameGetGame({ gameId: this.props.gameState.gameId });
    } catch (error) {
      alert(
        `Something went wrong while fetching the game: \n${handleError(error)}`
      );
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
        `Something went wrong while submitting the clue: \n${handleError(
          error
        )}`
      );
    }
  }

  playerUpdateRole() {
    let players = this.props.gameState.gamePlayers;
    if (players != null) {
      let player = players.find(
        (x) => x.userId === this.props.gameState.userId
      );
      if (player) this.props.playerSetRole(player.role);
    }
  }

  async getRound() {
    //if round is over, advance to next round
    if (
      this.props.gameState.round &&
      this.props.gameState.round.roundStatus === "FINISHED"
    ) {
      this.props.gameUpdateRound(this.props.gameState.roundNum + 1);
    }
    // get round details
    if (this.props.gameState.roundNum > 13) {
      this.props.gameClearGame();
      alert("Game Over");
      this.props.history.push(`/lobby`);
    }
    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };
      await this.props.gameGetRound(data);
    } catch (error) {
      alert(
        `Something went wrong while fetching the round: \n${handleError(error)}`
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
        `Something went wrong while fetching the clues: \n${handleError(error)}`
      );
    }
  }

  async getGameState() {
    let gameState;
    if (!this.props.gameState.round.wordCard.selectedWord) {
      gameState = GameStates.SELECT_WORD;
    } else if (
      this.props.gameState.clues.filter((clue) => clue.word === null).length > 0
    ) {
      gameState = GameStates.WRITE_CLUES;
      // Todo Check if all players have voted on all the clues --> guessing
    } else {
      gameState = GameStates.GUESSING;
    }

    //Phase Change
    if (
      this.props.gameState.currentGameState != null &&
      gameState != this.props.gameState.currentGameState
    ) {
      console.log("###PHASE CHANGE###");
      console.log(
        "OLD Store currentGameState:" +
          this.props.gameState.currentGameState.value
      );
      console.log("NEW Var gameState:" + gameState.value);
      this.gamePhaseChange(gameState);
    }
    this.props.gameSetState(gameState);
  }

  //Phase Change
  gamePhaseChange(gameState) {
    console.log("PhaseChange Timer Reset");

    //SELECT WORD
    if (
      gameState == GameStates.SELECT_WORD &&
      this.props.gameState.role === "GUESSER"
    ) {
      let timeoutFunction = () => {
        const data = {
          gameId: this.props.gameState.gameId,
          roundNum: this.props.gameState.roundNum,
          selectedWord: this.props.gameState.round.wordCard.word1,
        };

        this.props.guesserSelectWord(data);
      };
      this.props.timerStart(30, timeoutFunction);
    }

    //WRITE_CLUES
    if (
      gameState == GameStates.WRITE_CLUES &&
      this.props.gameState.role === "CLUE_WRITER"
    ) {
      let timeoutFunction = () => {
        let clue = this.props.gameState.clues.find(
          (x) => x.ownerId == this.props.gameState.playerId
        );
        const data = {
          gameId: this.props.gameState.gameId,
          playerId: this.props.gameState.playerId,
          clueId: clue.clueId,
          word: "N/A",
        };

        this.props.gameSubmitClue(data);
      };
      this.props.timerStart(45, timeoutFunction);
    }

    //GUESSING
    if (
      gameState == GameStates.GUESSING &&
      this.props.gameState.role === "GUESSER"
    ) {
      let timeoutFunction = () => {
        const data = {
          gameId: this.props.gameState.gameId,
          playerId: this.props.gameState.playerId,
          word: "N/A",
        };
        this.props.gameSubmitGuess(data);
      };
      this.props.timerStart(60, timeoutFunction);
    }
  }

  render() {
    if (
      this.props.gameState.gameId == null ||
      this.props.gameState.userId == null ||
      this.props.gameState.playerId == null ||
      this.props.gameState.gamePlayers.length == 0 ||
      this.props.gameState.roundNum == null ||
      this.props.gameState.round == null ||
      this.props.gameState.role == null ||
      this.props.gameState.currentGameState == null ||
      this.props.gameState.score == null ||
      this.props.gameState.timer.timer == null
    ) {
      return <div></div>;
    }
    return (
      <div>
        <BaseContainer>
          <GameContainer>
            <SmallLogo />
            <LogoutIcon />
            <div></div>
            <AllPlayerBoxes players={this.props.gameState.gamePlayers} />

            <TableContainer>
              <Table
                onSubmitClue={this.submitClue}
                ownerClue={this.props.gameState.clues.find(
                  (x) => x.ownerId === this.props.gameState.playerId
                )}
              />
            </TableContainer>

            <InfoContainer>
              <PointsInfo
                score={
                  this.props.gameState.score ? this.props.gameState.score : 0
                }
              />
              <RoleInfo role={this.props.gameState.role} />
              <TimerInfo round={this.props.gameState.roundNum} />
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
    guesserSelectWord,
    gameClearGame,
    playerSetRole,
    gameGetRound,
    gameUpdateRound,
    gameGetClues,
    gameSubmitClue,
    gameSetState,
    gameGetGame,
    timerStart,
    timerStop,
    timerClear,
    gameSubmitClue,
    gameSubmitGuess,
  })(Gameplay)
);
