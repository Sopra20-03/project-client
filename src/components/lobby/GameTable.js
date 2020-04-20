import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GameRow from "./GameRow";
//redux imports
import { connect } from "react-redux";
import {
  cancelGame,
  joinGame,
  leaveGame,
} from "../../redux/actions/lobbyActions";
import { store } from "../../store";
import { handleError } from "../../helpers/api";

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
      alert(`Something went wrong while joining game: \n${handleError(error)}`);
    }
  }

  handleJoinGame = (gameId) => {
    this.joinGame(gameId);
  };

  async leaveGame() {
    try {
      await this.props.leaveGame(
        this.props.lobbyState.gameId,
        this.props.userState.user.id
      );
    } catch (error) {
      alert(
        `Something went wrong while leaving the game: \n${handleError(error)}`
      );
    }
  }

  handleLeaveGame = () => {
    this.leaveGame();
  };

  async cancelGame(gameId) {
    try {
      this.leaveGame();
      await this.props.cancelGame(gameId);
    } catch (error) {
      alert(
        `Something went wrong while cancelling the game: \n${handleError(
          error
        )}`
      );
    }
  }

  handleCancelGame = (gameId) => {
    this.cancelGame(gameId);
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
              <TableCell align="center">Creator</TableCell>
              <TableCell align="center">Players</TableCell>
              <TableCell align="center">*</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.games.map((game) => (
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
