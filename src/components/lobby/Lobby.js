import React from "react";
import styled from "styled-components";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import {handleError} from "../../helpers/api";
import Button from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import GameTable from "./GameTable";
import Colors from "../../views/design/Colors";
import {SmallLogo} from "../../views/logos/SmallLogo";
//Redux
import {connect} from "react-redux";
import {cancelGame, clearJoinedGame, getGames, leaveGame, startGame,} from "../../redux/actions/lobbyActions";

import {logoutUser} from "../../redux/actions/userActions";
import {ContainerRow} from "../game/Gameplay";
import PacmanLoader from "react-spinners/PacmanLoader";

import Grid from "@material-ui/core/Grid";

import {errorNotification, infoNotification,} from "../../helpers/notifications/toasts";
import MenuBar from "../../views/design/Menu/MenuBar";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

export const BoxHeader = styled.div`
  font-size: 3.2em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.25em;
`;

const WelcomeMessage = styled.h2`
  letter-spacing: 0.1em;
  font-size: 2em;
`;

class Lobby extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.timer = setInterval(async () => await this.loadLobby(), 1000);
    window.addEventListener("beforeunload", (event) => {
      let data = {
        isUserCreator: this.props.lobbyState.isUserCreator,
        gameId: this.props.lobbyState.gameId,
        userId: this.props.userState.user.id,
      };
      this.props.logoutUser(true, data);

      sessionStorage.clear();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async loadLobby() {
    //1. Get Games
    await this.getGames();

    //2. If Player has joined a game, check if the creator has started it
    if (this.props.lobbyState.joinedGame != null) {
      // If gamesList doesn't have the joined game, it means the creator has deleted the game.

      if (
        this.props.lobbyState.gamesList.find(
          ({ gameId }) => gameId === this.props.lobbyState.joinedGame.gameId
        )
      ) {
        const game = this.props.lobbyState.gamesList.find(
          ({ gameId }) => gameId === this.props.lobbyState.joinedGame.gameId
        );
        if (game.gameStatus === "RUNNING") {
          console.log("Loading Game");
          this.props.history.push(`/gameplay`);
        } else {
          //Game not yet started
        }
      } else {
        //Creator has deleted the game
        this.props.clearJoinedGame();
        infoNotification("Game canceled by Creator", 2000);
      }
    }
  }

  //getGames
  async getGames() {
    console.log("getGames() Lobby");
    try {
      await this.props.getGames();
    } catch (error) {
      errorNotification(
        `Something went wrong while fetching the games: \n${handleError(error)}`
      );
    }
  }

  async startTheGame() {
    console.log("StartGame()");
    const currentGameId = this.props.lobbyState.gameId;
    try {
      if ((await this.props.startGame(currentGameId)) === 0) {
        this.props.history.push(`/gameplay`);
      }
    } catch (error) {
      errorNotification(
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
          <Grid container justify={"center"}>
            <MenuBar/>
            <Grid container alignItems="center" justify={"center"}>
              <Grid item sm={8} md={8} lg={8}>
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
                </BoxHeader>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <WelcomeMessage>
              <span style={Colors.textOrange}>W</span>
              <span style={Colors.textRed}>e</span>
              <span style={Colors.textPink}>l</span>
              <span style={Colors.textViolet}>c</span>
              <span style={Colors.textBlue}>o</span>
              <span style={Colors.textGreen}>m</span>
              <span style={Colors.textYellow}>e</span>
              <span style={Colors.textBlack}>, </span>
              <span style={Colors.textBlack}>
                {this.props.userState.user.name}
              </span>
              <span style={Colors.textOrange}>!</span>
            </WelcomeMessage>
          </Grid>

          {this.props.lobbyState.gamesList.length < 1 ? (
            <ContainerRow style={{ margin: 30 }}>
              <PacmanLoader color={"#00a4ea"} />
            </ContainerRow>
          ) : (
            <GameTable games={this.props.lobbyState.gamesList} />
          )}

          {this.props.lobbyState.joinedGame != null ? (
            this.props.lobbyState.isUserCreator === true ? (
              <h3 style={Colors.textGreen}>Press Start Game to begin!</h3>
            ) : (
              <h3 style={Colors.textRed}>
                Waiting for the game creator to start the game!
              </h3>
            )
          ) : null}

          {this.props.lobbyState.isUserCreator ? (
            <Button
              onClick={() => {
                this.startTheGame();
              }}
            >
              Start Game
            </Button>
          ) : this.props.lobbyState.joinedGame == null ? (
            <Button
              onClick={() => {
                this.props.history.push(`/gamedetails`);
              }}
            >
              Create Game
            </Button>
          ) : null}
        </GameContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  userState: state.userReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getGames,
    startGame,
    logoutUser,
    clearJoinedGame,
    cancelGame,
    leaveGame,
  })(Lobby)
);
