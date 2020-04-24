import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function LeaderboardRow(props) {
    return (
        <TableRow key={props.user.id}>
            <TableCell component="th" scope="row" align="center">
                {" "}{props.user.id}{" "}
            </TableCell>
            <TableCell align="center"> {props.user.username} </TableCell>
            <TableCell align="center"> {props.user.dateCreated} </TableCell>
            <TableCell align="center">{props.user.score ? props.user.score : 0} </TableCell>
        </TableRow>
    );
}

export default LeaderboardRow;
