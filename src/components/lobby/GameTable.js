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
import { joinGame, leaveGame } from "../../redux/actions/lobbyActions";
import { store } from "../../store";
import {handleError} from "../../helpers/api";

class GameTable extends React.Component {
  constructor() {
    super();
  }

  async joinGame(gameId) {
    const state = store.getState();
    const currentUserId = state.userReducer.user.id;
    try {
      const requestBody = {
        userId: currentUserId
      };
      await this.props.joinGame(gameId, requestBody);
    } catch (error) {
      alert(`Something went wrong while joining game: \n${handleError(error)}`);
    }
  };

  handleJoinGame = (gameId) => {
    this.joinGame(gameId);
  };

  async leaveGame() {
    const state = store.getState();
    const currentUserId = state.userReducer.user.id;
    const currentGameId = state.lobbyReducer.gameId;
    try {
      await this.props.leaveGame(currentGameId, currentUserId);
    } catch (error) {
      alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
    }
  };

  handleLeaveGame = () => {
    this.leaveGame();
  };


  render() {
    return (
      <TableContainer style={ { maxHeight: 500}}>
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
            {console.log(this.props.games)}
            {this.props.games.map((game) => {
              return (
                  <GameRow
                      key={game.gameId}
                      game={game}
                      onJoinGame={this.handleJoinGame}
                      onLeaveGame={this.handleLeaveGame}
                  />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
}

export default connect(null, { joinGame, leaveGame })(GameTable);
