import React from 'react';
import styled from 'styled-components';
import { BaseContainer, GameContainer } from '../../helpers/layout';
import { handleError } from '../../helpers/api';
import Button from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LogoutIcon from '../../views/design/Icons/LogoutIcon';
import GameTable from './GameTable';
import Colors from '../../views/design/Colors';
import { SmallLogo } from '../../views/logos/SmallLogo';
//Redux
import { connect } from 'react-redux';
import { getGames, startGame } from '../../redux/actions/lobbyActions';
import ProfileIcon from '../../views/design/Icons/GameHistoryIcon';
import LeaderboardIcon from '../../views/design/Icons/LeaderboardIcon';
import { ContainerRow } from '../game/Gameplay';
import PacmanLoader from 'react-spinners/PacmanLoader';
import LobbyIcon from '../../views/design/Icons/LobbyIcon';

const Container = styled (BaseContainer)`
  color: white;
  text-align: center;
`;

export const BoxHeader = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin-left: 50px;
  margin-bottom: 20px;
`;

class Lobby extends React.Component {
    constructor () {
        super ();
    }

    componentDidMount () {
        this.timer = setInterval (async () => await this.loadLobby (), 1000);
    }

    componentWillUnmount () {
        clearInterval (this.timer);
    }

    async loadLobby () {
        //1. Get Games
        await this.getGames ();

        //2. If Player has joined a game, check if the creator has started it
        if (this.props.lobbyState.joinedGame != null) {
            const game = this.props.lobbyState.gamesList.find (
              ({gameId}) => gameId === this.props.lobbyState.joinedGame.gameId
            );

            if (game.gameStatus === 'RUNNING') {
                console.log ('Loading Game');
                this.props.history.push (`/gameplay`);
            } else {
                //Game not yet started
            }
        }
    }

    //getGames
    async getGames () {
        console.log ('getGames() Lobby');
        try {
            await this.props.getGames ();
        } catch (error) {
            alert (
              `Something went wrong while fetching the games: \n${handleError (error)}`
            );
        }
    }

    async startTheGame () {
        console.log ('StartGame()');
        const currentGameId = this.props.lobbyState.gameId;
        try {
            if ((await this.props.startGame (currentGameId)) === 0) {
                this.props.history.push (`/gameplay`);
            }
        } catch (error) {
            alert (
              `Something went wrong while starting the game: \n${handleError (error)}`
            );
        }
    }

    render () {
        console.log ('Render Lobby');
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
                      <LobbyIcon/>
                      <LeaderboardIcon/>
                      <ProfileIcon/>
                      <LogoutIcon/>
                  </BoxHeader>
                  {this.props.lobbyState.gamesList.length < 1 ? (
                    <ContainerRow style={{margin: 30}}>
                        <PacmanLoader color={'#00a4ea'}/>
                    </ContainerRow>
                  ) : (
                    <GameTable games={this.props.lobbyState.gamesList}/>
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
                          this.startTheGame ();
                      }}
                    >
                        Start Game
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                          this.props.history.push (`/gamedetails`);
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
    lobbyState: state.lobbyReducer
});

export default withRouter (
  connect (mapStateToProps, {getGames, startGame}) (Lobby)
);
