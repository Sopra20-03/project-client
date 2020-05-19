import React from "react";
import styled from "styled-components";
import { BaseContainer, GameContainer } from "../../helpers/layout";
import { handleError } from "../../helpers/api";
import Button from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import GameTable from "./GameTable";
import Colors from "../../views/design/Colors";
import { SmallLogo } from "../../views/logos/SmallLogo";
//Redux
import { connect } from "react-redux";
import { getGames, startGame } from "../../redux/actions/lobbyActions";

import { logoutUser } from "../../redux/actions/userActions";
import ProfileIcon from "../../views/design/Icons/GameHistoryIcon";
import LeaderboardIcon from "../../views/design/Icons/LeaderboardIcon";
import { ContainerRow } from "../game/Gameplay";
import PacmanLoader from "react-spinners/PacmanLoader";
import LobbyIcon from "../../views/design/Icons/LobbyIcon";

import Grid from "@material-ui/core/Grid";
import { errorNotification } from "../../helpers/notifications/toasts";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

export const BoxHeader = styled.div`
  font-size: 3.2em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-left: 50px;
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
      // Cancel the event as stated by the standard.
      //event.preventDefault();
      // Chrome requires returnValue to be set.
      //event.returnValue = "This will log you out and clear your session.";
      sessionStorage.clear();
      this.props.logoutUser();
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
      const game = this.props.lobbyState.gamesList.find(
        ({ gameId }) => gameId === this.props.lobbyState.joinedGame.gameId
      );

      if (game.gameStatus === "RUNNING") {
        console.log("Loading Game");
        this.props.history.push(`/gameplay`);
      } else {
        //Game not yet started
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
            <Grid item sm={4}>
              <Grid container alignItems="center" justify={"center"}>
                <Grid item>
                  <LobbyIcon />
                </Grid>
                <Grid item>
                  <LeaderboardIcon />
                </Grid>
                <Grid item>
                  <ProfileIcon />
                </Grid>
                <Grid item>
                  <LogoutIcon />
                </Grid>
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
  connect(mapStateToProps, { getGames, startGame, logoutUser })(Lobby)
);
