import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LeaderboardRow from "./LeaderboardRow";

class LeaderboardTable extends React.Component {
  constructor() {
    super();
  }

  render() {
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
              <TableCell align="center">Ranking</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center"># Games Played</TableCell>
              <TableCell align="center">Team Score</TableCell>
              <TableCell align="center">Individual Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.users.map((user, index) => (
              <LeaderboardRow
                key={user.id}
                user={user}
                rank={index+1}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default LeaderboardTable;
