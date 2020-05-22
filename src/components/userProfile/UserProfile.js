import React from "react";
import styled from "styled-components";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import {api, handleError} from "../../helpers/api";
import {withRouter} from "react-router-dom";

import Button from "../../views/design/Button";
import Colors from "../../views/design/Colors";
//Redux
import {connect} from "react-redux";
import {SmallLogo} from "../../views/logos/SmallLogo";
import LeaderboardIcon from "../../views/design/Icons/LeaderboardIcon";
import ProfileIcon from "../../views/design/Icons/GameHistoryIcon";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import GameHistoryTable from "../gameHistory/GameHistoryTable";
import {ContainerRow} from "../game/Gameplay";
import PacmanLoader from "react-spinners/PacmanLoader";
import {getGames} from "../../redux/actions/lobbyActions";
import UserInfoBox from "./UserInfoBox";
import LobbyIcon from "../../views/design/Icons/LobbyIcon";
import {BoxHeader} from "../lobby/Lobby";
import {errorNotification} from "../../helpers/notifications/toasts";
import InstructionsIcon from "../../views/design/Icons/Instructions";
import Grid from "@material-ui/core/Grid";

const Container = styled(BaseContainer)`
  color: ${Colors.black};
  text-align: center;
  margin-bottom: 40px;
`;

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userGames: [],
    };
  }

  componentDidMount() {
    this.timer = setInterval(async () => await this.loadGameHistory(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async loadGameHistory() {
    //1. Get Games
    await this.getGames();
    //2. Filter down to only games this user was a player in
    this.props.lobbyState.gamesList.map((game) => this.getPlayers(game));
  }

  async getPlayers(game) {
    const playerInGame = (p) => p.userId === this.props.userState.user.id;
    const gameAlreadyInList = this.state.userGames.some(
      (g) => game.gameId === g.gameId
    );
    try {
      const response = await api.get(`/games/${game.gameId}/players`, {
        withCredentials: true,
      });
      console.log("***API CALL - Get Players*** ");
      console.log(
        "GameId: ",
        game.gameId,
        "PlayerInGame?: ",
        response.data.some(playerInGame)
      );
      console.log("GameAlreadyInList: ", gameAlreadyInList);
      if (response.data.some(playerInGame) && !gameAlreadyInList)
        this.state.userGames.push(game);
    } catch (error) {
      errorNotification(
        `Something went wrong while fetching the players: \n${handleError(
          error
        )}`
      );
    }
  }

  //getGames
  async getGames() {
    console.log("getGames() Game History");
    try {
      await this.props.getGames();
    } catch (error) {
      errorNotification(
        `Something went wrong while fetching the games: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <Container>
        <GameContainer>
          <SmallLogo />

          <Grid container justify={"center"}>
            <Grid item sm={5}>
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
                  <InstructionsIcon />
                </Grid>
                <Grid item>
                  <LogoutIcon />
                </Grid>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify={"center"}>
              <Grid item sm={8} md={8} lg={8}>
                <BoxHeader>
                  <span style={Colors.textOrange}>P</span>
                  <span style={Colors.textRed}>r</span>
                  <span style={Colors.textPink}>o</span>
                  <span style={Colors.textViolet}>f</span>
                  <span style={Colors.textBlue}>i</span>
                  <span style={Colors.textGreen}>l</span>
                  <span style={Colors.textYellow}>e</span>
                </BoxHeader>
              </Grid>
            </Grid>
          </Grid>

          <UserInfoBox user={this.props.userState.user} />
          <Button
            onClick={() => {
              this.props.history.push(`/lobby`);
            }}
          >
            Back to Lobby
          </Button>
          <h1>Game History</h1>
          {this.state.userGames.length < 1 ? (
            <ContainerRow style={{ margin: 30 }}>
              <PacmanLoader />
            </ContainerRow>
          ) : (
            <GameHistoryTable games={this.state.userGames} />
          )}
        </GameContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userReducer,
  lobbyState: state.lobbyReducer,
});

export default withRouter(connect(mapStateToProps, { getGames })(UserProfile));
