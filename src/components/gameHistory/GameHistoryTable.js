import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GameHistoryRow from "./GameHistoryRow";
//redux imports
import { connect } from "react-redux";

class GameHistoryTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("GameHistoryTable");
    console.log("User Games 2 - ", this.props.games)

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
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Game Mode</TableCell>
              <TableCell align="center">Team Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.games.map((game) => (
              <GameHistoryRow
                key={game.gameId}
                game={game}
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

export default connect(mapStateToProps)(
  GameHistoryTable
);
