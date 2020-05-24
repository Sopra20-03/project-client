import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GameRow from './GameRow';
//redux imports
import { connect } from 'react-redux';
import { cancelGame, joinGame, leaveGame } from '../../redux/actions/lobbyActions';
import { handleError } from '../../helpers/api';
import { errorNotification, infoNotification, successNotification } from '../../helpers/notifications/toasts';

class GameTable extends React.Component {
  constructor() {
    super();
  }

  async joinGame(gameId) {
    try {
      const requestBody = {
        userId: this.props.userState.user.id,
      };
      await this.props.joinGame(gameId, requestBody);
    } catch (error) {
      errorNotification(
        `Something went wrong while joining game: \n${handleError(error)}`
      );
    }
  }

  handleJoinGame = (gameId) => {
    this.joinGame(gameId);
    successNotification ('Joined game! It will start soon 😎', 3000);
  };

  async leaveGame() {
    try {
      await this.props.leaveGame(
        this.props.lobbyState.gameId,
        this.props.userState.user.id
      );
    } catch (error) {
      errorNotification(
        `Something went wrong while leaving the game: \n${handleError(error)}`
      );
    }
  }

  handleLeaveGame = () => {
    this.leaveGame();
    infoNotification ('Left game');
  };

  async cancelGame(gameId) {
    try {
      await this.props.cancelGame(gameId);
    } catch (error) {
      errorNotification(
        `Something went wrong while cancelling the game: \n${handleError(
          error
        )}`
      );
    }
  }

  handleCancelGame = (gameId) => {
    this.cancelGame(gameId).then(() => {
      infoNotification("Game canceled", 2000);
    });
  };

  render() {
    console.log("GameTable");
    console.log(this.props.games);

    return (
      <TableContainer style={{ maxHeight: 400 }}>
        <Table
          style={{ minWidth: 650 }}
          size="small"
          aria-label="dense table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Game Id</TableCell>
              <TableCell align="center">Game Name</TableCell>
              <TableCell align="center">Game Mode</TableCell>
              <TableCell align="center">Creator</TableCell>
              <TableCell align="center">Players</TableCell>
              <TableCell align="center">*</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.games
              .filter((x) => x.gameStatus === "INITIALIZED")
              .map((game) => (
                <GameRow
                  key={game.gameId}
                  game={game}
                  numPlayers={game.playerCount}
                  onJoinGame={this.handleJoinGame}
                  onLeaveGame={this.handleLeaveGame}
                  onCancelGame={this.handleCancelGame}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  userState: state.userReducer,
});

export default connect(mapStateToProps, { joinGame, leaveGame, cancelGame })(
  GameTable
);
