import React, {Component} from 'react';
import styled from 'styled-components';
import TimerInfo from './TimerInfo';
import PointsInfo from './PointsInfo';
import RoleInfo from './RoleInfo';
import Table from './Table';
import {BaseContainer, GameContainer} from '../../helpers/layout';
import AllPlayerBoxes from './AllPlayerBoxes';
import {SmallLogo} from '../../views/logos/SmallLogo';
import {withRouter} from 'react-router-dom';
import {api, handleError} from '../../helpers/api';
import LogoutIcon from '../../views/design/Icons/LogoutIcon';
import GameStates from '../../redux/reducers/gameStates';
import dog from '../../views/logos/002-dog.png';

import RoundMessage from './RoundMessage';
//Redux
import {connect} from 'react-redux';
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
  setScore,
  timerClear,
  timerStart,
  timerStop
} from '../../redux/actions/gameplayActions';
import {errorNotification, infoNotification} from '../../helpers/notifications/toasts';
import ChatBox from '../chat/chatbox';
import {getGame} from '../../redux/actions/lobbyActions';
import InstructionsIcon from "../../views/design/Icons/HelpIcon";
import Grid from "@material-ui/core/Grid";

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
      messageList: null,
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
    // Check if Game exists
    if (this.props.gameState.gameId != null) {
      try {
        let gameCheck = await this.props.getGame(this.props.gameState.gameId);

        if (gameCheck == null) {
          errorNotification(`Oops! Creator canceled the game!`);
          this.props.history.push(`/lobby`);
          this.props.gameClearGame();
          return;
        }
      } catch (err) {
        errorNotification(`Oops! Creator canceled the game!`);
        this.props.history.push(`/lobby`);
        this.props.gameClearGame();
        return;
      }
    }

    if (this.props.gameState.roundNum > 3) {
      this.stopPolling();
      return;
    } else {
      //Get Round
      await this.getRound();

      //Get Players and icons
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
      await this.getScore();

      //7. Get Messages
      await this.getMessages();


    }
  }

  async getScore() {
    if (this.props.gameState.game != null) {
      if (this.props.gameState.game.gameMode === "STANDARD") {
        this.props.setScore(this.props.gameState.game.score);
      } else {
        //Rival Mode Individual Scores
        let playerScore = this.props.gameState.gamePlayers.find(
          (x) => x.userId === this.props.gameState.userId
        ).score;

        this.props.setScore(playerScore);
      }
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
      }, 1000);
    }, 10000);
  }

  async roundOver(role) {
    //Get Details
    try {
      const data = {
        gameId: this.props.gameState.gameId,
        roundNum: this.props.gameState.roundNum,
      };

      console.log(data);
      const response = await api.get(
        `/games/${data.gameId}/rounds/${data.roundNum}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      let pRole = role;
      let word = response.data.wordCard.selectedWord;
      let clues = this.props.gameState.clues;
      let pUserClue = null;
      let pResult = "success";
      let guessWord = "N/A";
      if (response.data.guess != null) {
        pResult = response.data.guess.isValid === true ? "success" : "fail";
        guessWord = response.data.guess.word;
      }

      if (pRole === "GUESSER") {
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
      this.setState({
        infoBox: {
          selectedWord: word,
          userClue: pUserClue,
          score: pScore,
          mode: "round",
          result: pResult,
          role: pRole,
          guess: guessWord,
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
      this.roundOver(this.props.gameState.role);
      //Update Round
      if (this.props.gameState.roundNum < 3) {
        this.props.gameUpdateRound(this.props.gameState.roundNum + 1);
        infoNotification(`Round ${this.props.gameState.roundNum} started!`);
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
    if (this.props.gameState.role == null) {
      return;
    }
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

  async getMessages(){
    try {
      const response = await api.get(
          `/games/${this.props.gameState.gameId}/messages`,
          {
            withCredentials: true,
          }
      );
      this.setState({messageList: response.data});
      console.log('MessageList: ', response.data);
    } catch (error) {
      console.log(handleError(error));
    }
  };

  //Phase Change
  gamePhaseChange(gameState) {
    let timeout = {
      selectWord: 30,
      submitClue: 45,
      submitGuess: 60,
    };

    if (this.props.gameState.game.duration === "SHORT") {
      timeout = {
        selectWord: 30,
        submitClue: 30,
        submitGuess: 30,
      };
    } else if (this.props.gameState.game.duration === "MEDIUM") {
      timeout = {
        selectWord: 45,
        submitClue: 45,
        submitGuess: 45,
      };
    } else if (this.props.gameState.game.duration === "LONG") {
      timeout = {
        selectWord: 60,
        submitClue: 60,
        submitGuess: 60,
      };
    }

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
        this.props.timerStart(timeout.selectWord, timeoutFunction);
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
        this.props.timerStart(timeout.submitClue, timeoutFunction);
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
        this.props.timerStart(timeout.submitGuess, timeoutFunction);
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
            <Grid container justify={"center"}>
              <Grid item sm={2}>
                <Grid container alignItems="center" justify={"center"}>
                  <Grid item>
                    <InstructionsIcon />
                  </Grid>
                  <Grid item>
                    <LogoutIcon />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
        <ChatBox messageList={this.state.messageList}/>
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
    setScore,
    timerClear,
    gameSubmitGuess,
    getGame,
  })(Gameplay)
);
