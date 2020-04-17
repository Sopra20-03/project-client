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
import { startGame } from "../../redux/actions/lobbyActions";
import { store } from "../../store";


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
    this.state = {
      games: null,
    };
  }

  async getPlayerCount(gameId) {
    try {
      console.log("***API CALL : GET PLAYERS***");
        const response = await api.get(`/games/${gameId}/players`, {
          withCredentials: true,
        });
        //console.log("request to:", response.request.responseURL);
        //console.log("requested data:", response.data);
        this.state.games.find(x=>x.gameId===gameId).playerCount = response.data.length;
        console.log("Game ", gameId, " - PlayerCount: ", this.state.games.find(x=>x.gameId===gameId).playerCount);
      }
    catch (error) {
      alert(`Something went wrong getting player count: \n${handleError(error)}`);
    }
  };

  getNumberOfPlayers() {
    const gamesWithPlayerCount = this.state.games;
    gamesWithPlayerCount.map((game) => (
        this.getPlayerCount(game.gameId)
    ));
    this.setState({games: gamesWithPlayerCount});
    console.log("Games after numplayers: ", this.state.games);
  }

  async componentDidMount() {
    try {
      console.log("***API CALL - GET GAMES***");
      const response = await api.get("/games", {
        withCredentials: true,
      });
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the returned games and filter on game status then set the state.
      const initializedGames = response.data.filter(x=>x.gameStatus==='INITIALIZED');
      this.setState({ games: initializedGames });

      // This is just some data for you to see what is available.
      console.log("request to:", response.request.responseURL);
      console.log("status code:", response.status);
      console.log("status text:", response.statusText);
      console.log("requested data:", response.data);

      // See here to get more data.
      console.log(response);

      this.getNumberOfPlayers();

    } catch (error) {
      alert(
        `Something went wrong while fetching the games: \n${handleError(error)}`
      );
    }
  }

  async startGame() {
    const currentGameId = store.getState().lobbyReducer.gameId;
    try {
      await this.props.startGame(currentGameId);
    } catch (error) {
      alert(`Something went wrong while starting the game: \n${handleError(error)}`);
    }
  };


  render() {
    return (
      <Container>
        <GameContainer>
          <SmallLogo/>
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
            <LogoutIcon/>

          </BoxHeader>

          {!this.state.games ? <div /> : <GameTable games={this.state.games} />}

          {store.getState().lobbyReducer.isUserCreator ?
              <Button
                  onClick={() => {
                    this.startGame();
                    this.props.history.push(`/gameplay`);
                  }}
              >
                Start Game
              </Button> :
              <Button
                  onClick={() => {
                    this.props.history.push(`/gamedetails`);
                  }}
              >
                Create Game
              </Button>
          }
        </GameContainer>
      </Container>
    );
  }
}

export default withRouter(connect(null, { startGame })(Lobby));
