import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function LeaderboardRow(props) {
    return (
        <TableRow key={props.user.id}>
            <TableCell component="th" scope="row" align="center">
                {" "}{props.rank}{" "}
            </TableCell>
            <TableCell align="center"> {props.user.username} </TableCell>
            <TableCell align="center"> {props.user.nrOfPlayedGames} </TableCell>
            <TableCell align="center">{props.user.totalGameScore ? props.user.totalGameScore : 0} </TableCell>
            <TableCell align="center">{props.user.totalIndividualScore ? props.user.totalIndividualScore : 0} </TableCell>
        </TableRow>
    );
}

export default LeaderboardRow;
