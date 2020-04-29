import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//Redux
import {connect} from "react-redux";

function GameHistoryRow(props) {
    console.log("Game #: ", props.game.gameId);
    return (
        <TableRow key={props.game.gameId}>
            <TableCell component="th" scope="row" align="center">
                {" "}{props.game.gameId}{" "}
            </TableCell>
            <TableCell align="center"> {props.game.gameName} </TableCell>
            <TableCell align="center"> {props.game.dateCreated} </TableCell>
            <TableCell align="center"> {props.game.gameMode} </TableCell>
            <TableCell align="center">{props.score ? props.score : 0} </TableCell>
        </TableRow>
    );
}

const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps)(GameHistoryRow);
