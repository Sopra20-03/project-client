import React, { Component } from 'react';
import styled from 'styled-components';
import TimerInfo from './TimerInfo';
import PointsInfo from './PointsInfo';
import RoleInfo from './RoleInfo';
import Table from './Table';
import { BaseContainer, GameContainer } from '../../helpers/layout';
import AllPlayerBoxes from './AllPlayerBoxes';
import { SmallLogo } from '../../views/logos/SmallLogo';
import { withRouter } from 'react-router-dom';
import { api, handleError } from '../../helpers/api';
import Button from '@material-ui/core/Button';
import LogoutIcon from '../../views/design/Icons/LogoutIcon';
import GameStates from '../../redux/reducers/gameStates';

import RoundMessage from './RoundMessage';
//Redux
import { connect } from 'react-redux';
import {
  gameClearGame,
  gameGetClues,
  gameGetGame,
  gameGetRound,
  gameLoadGame,
  gameSetState,
  gameSubmitClue,
  gameSubmitGuess,
  gameUpdateRound,
  getGamePlayers,
  guesserSelectWord,
  playerSetRole,
  timerClear,
  timerStart,
  timerStop
} from '../../redux/actions/gameplayActions';
import { errorNotification } from '../../helpers/notifications/toasts';

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
      icons: [],
      infoBox: {
        selectedWord: null,
        userClue: null,
        score: null,
        guess: null,
        mode: "round",
        result: "success",
        role: null,
      },
    };

    this.RoundMessageElement = React.createRef();
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
    this.startPolling();
  }

  startPolling() {
    this.timer = setInterval(async () => await this.runGame(), 1000);
  }

  stopPolling() {
    clearInterval(this.timer);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async runGame() {
    //Check Rounds
    //DEMO: 3 Rounds

    if (this.props.gameState.roundNum > 3) {
      this.stopPolling();
      return;
    } else {
      //3. Get Round
      await this.getRound();
      //1. Get Players and icons
      await this.getPlayers();
      if (
        this.props.gameState.gamePlayers &&
        this.props.gameState.gamePlayers.length > 0
      )
        await this.getPlayerUserDetails();

      //4. Get Clues
      if (
        this.props.gameState.round.roundNum === this.props.gameState.roundNum
      ) {
        if (this.props.gameState.round.wordCard.selectedWord != null) {
          await this.getClues();
        }
      }

      //5. Get Game Phase or State
      await this.getGameState();

      //6. Get Score
      await this.getGame();
    }
  }

  async getPlayers() {
    try {
      await this.props.getGamePlayers(
        this.props.gameState.gameId,
        this.props.gameState.userId
      );
    } catch (error) {
      errorNotification(
        `Something went wrong while fetching the players: \n${handleError(
          error
        )}`
      );
    }
  }

  async getPlayerUserDetails() {
    let icons = ["dog", "butterfly", "owl", "bird"];
    let players = this.props.gameState.gamePlayers.filter(
      (x) => x.userId !== this.props.gameState.userId
    );
    try {
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const icon = await api
          .get(`/users/${player.userId}`, {
            withCredentials: true,
          })
          .then((res) => res.data.icon);
        if (icon) icons[i] = icon;
      }
      this.setState({ icons: icons });
    } catch (error) {
      errorNotification(handleError(error));
    }
    console.log("Player Icons: ", icons);
  }

  async getGame() {
    try {
      await this.props.gameGetGame({ gameId: this.props.gameState.gameId });
    } catch (error) {
      errorNotification(
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
      errorNotification(
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

  gameOver() {
    //Get Details
    let pScore = this.props.gameState.score;
    this.setState({
      ...this.state,
      infoBox: {
        ...this.state.infoBox,
        mode: "game",
      },
    });
    //Display Message
    this.RoundMessageElement.current.handleState(true);
    setTimeout(() => {
      this.RoundMessageElement.current.handleState(false);
      //Clear State

      setTimeout(() => {
        //Push to Lobby
        this.stopPolling();
        this.props.gameClearGame();
        this.props.history.push(`/lobby`);
      }, 2000);
    }, 10000);
  }

  async roundOver() {
    //Get Details
    //TODO Check Success
    //TODO Check Points
    console.log("$$$$$$$$Round Over: " + this.props.gameState.roundNum);

    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };
      const response = await api.get(
        `/games/${data.gameId}/rounds/${data.roundNum}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      let role = this.props.gameState.role;
      let word = response.data.wordCard.selectedWord;
      let clues = this.props.gameState.clues;
      let pUserClue = null;

      if (role === "GUESSER") {
        pUserClue = null;
      } else {
        pUserClue = clues.find(
          (x) => x.ownerId === this.props.gameState.playerId
        );
        if (pUserClue != null) {
          pUserClue = pUserClue.word;
        }
      }
      let pScore = this.props.gameState.score;
      let pResult = "success";
      this.setState({
        infoBox: {
          selectedWord: word,
          userClue: pUserClue,
          score: pScore,
          mode: "round",
          result: pResult,
          role: this.props.gameState.role,
          guess: null,
        },
      });
      //Display Message
      this.RoundMessageElement.current.handleState(true);
      setTimeout(() => {
        this.RoundMessageElement.current.handleState(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  async getRound() {
    //if round is over, advance to next round
    if (
      this.props.gameState.round &&
      this.props.gameState.round.roundStatus === "FINISHED"
    ) {
      this.roundOver();
      //Update Round
      if (this.props.gameState.roundNum < 3) {
        this.props.gameUpdateRound(this.props.gameState.roundNum + 1);
      } else {
        this.stopPolling();
        setTimeout(() => {
          this.gameOver();
        }, 6000);
      }
    }
    // get round details
    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };
      await this.props.gameGetRound(data);
    } catch (error) {
      errorNotification(
        `Something went wrong while fetching the round: \n${handleError(error)}`
      );
    }

    //2. Update Role for each round
    await this.playerUpdateRole();
  }

  async getClues() {
    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };
      await this.props.gameGetClues(data);
    } catch (error) {
      errorNotification(
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

    //Initial
    if (this.props.gameState.currentGameState == null) {
      if (gameState === GameStates.SELECT_WORD) {
        this.gamePhaseChange(gameState);
      }
    } else {
      if (gameState !== this.props.gameState.currentGameState) {
        //Phase Change
        console.log("###PHASE CHANGE###");
        this.gamePhaseChange(gameState);
      }
    }
    this.props.gameSetState(gameState);
  }

  //Phase Change
  gamePhaseChange(gameState) {
    console.log("PhaseChange Timer Reset");

    if (gameState === GameStates.SELECT_WORD) {
      let timeoutFunction = () => {
        const data = {
          gameId: this.props.gameState.gameId,
          roundNum: this.props.gameState.roundNum,
          selectedWord: this.props.gameState.round.wordCard.word1,
        };

        if (this.props.gameState.role === "GUESSER") {
          this.props.guesserSelectWord(data);
        }
      };

      if (this.props.gameState.role === "GUESSER") {
        this.props.timerStart(30, timeoutFunction);
      } else {
        this.props.timerClear();
      }
    }

    if (gameState === GameStates.WRITE_CLUES) {
      let timeoutFunction = () => {
        let clue = this.props.gameState.clues.find(
          (x) => x.ownerId === this.props.gameState.playerId
        );
        const data = {
          gameId: this.props.gameState.gameId,
          playerId: this.props.gameState.playerId,
          clueId: clue.clueId,
          word: "N/A",
        };

        if (this.props.gameState.role === "CLUE_WRITER") {
          this.props.gameSubmitClue(data);
        }
      };

      if (this.props.gameState.role === "CLUE_WRITER") {
        this.props.timerStart(45, timeoutFunction);
      } else {
        this.props.timerClear();
      }
    }

    if (gameState === GameStates.GUESSING) {
      let timeoutFunction = () => {
        const data = {
          gameId: this.props.gameState.gameId,
          playerId: this.props.gameState.playerId,
          word: "N/A",
        };
        if (this.props.gameState.role === "GUESSER") {
          this.props.gameSubmitGuess(data);
        }
      };
      if (this.props.gameState.role === "GUESSER") {
        this.props.timerStart(60, timeoutFunction);
      } else {
        this.props.timerClear();
      }
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
            <AllPlayerBoxes
              players={this.props.gameState.gamePlayers}
              icons={this.state.icons}
            />

            <TableContainer>
              <Table
                onSubmitClue={this.submitClue}
                ownerClue={this.props.gameState.clues.find(
                  (x) => x.ownerId === this.props.gameState.playerId
                )}
              />
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.stopPolling();

                this.props.timerClear();
              }}
            >
              Stop Polling
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.startPolling();
              }}
            >
              Start Polling
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.RoundMessageElement.current.handleState(true);
                setTimeout(() => {
                  this.RoundMessageElement.current.handleState(false);
                }, 5000);
              }}
            >
              Show Dialog
            </Button>

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

        <RoundMessage
          ref={this.RoundMessageElement}
          mode={this.state.infoBox.mode}
          result={this.state.infoBox.result}
          guess={this.state.infoBox.guess}
          score={this.state.infoBox.score}
          userClue={this.state.infoBox.userClue}
          selectedWord={this.state.infoBox.selectedWord}
          playerrole={this.state.infoBox.role}
        />
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
    gameSubmitGuess,
  })(Gameplay)
);
