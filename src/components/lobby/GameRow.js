import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
//Redux
import { connect } from "react-redux";

const PlayButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#00a839"),
    backgroundColor: "rgba(0,168,57,0.75)",
    "&:hover": {
      backgroundColor: "#00a839",
    },
  },
}))(Button);

const LeaveButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#de0006"),
    backgroundColor: "rgba(222,0,6,0.59)",
    "&:hover": {
      backgroundColor: "#de0006",
    },
  },
}))(Button);

function GameRow(props) {
  const thisGameSelected = props.lobbyState.gameId === props.game.gameId;
  const gameChosen = props.lobbyState.gameId > 0;
  const userIsCreator = props.lobbyState.isUserCreator;
  let rowButton;

  if (userIsCreator && thisGameSelected) {
    rowButton = (
      <LeaveButton onClick={() => props.onCancelGame(props.game.gameId)}>
        Delete
      </LeaveButton>
    );
  } else if (thisGameSelected) {
    rowButton = (
      <LeaveButton onClick={() => props.onLeaveGame(props.game.gameId)}>
        Leave
      </LeaveButton>
    );
  } else if (gameChosen) {
    rowButton = <PlayButton disabled>Join</PlayButton>;
  } else {
    rowButton = (
      <PlayButton onClick={() => props.onJoinGame(props.game.gameId)}>
        Join
      </PlayButton>
    );
  }

  return (
    <TableRow
      key={props.game.gameId}
      className={thisGameSelected ? "gameJoined" : undefined}
    >
      <TableCell component="th" scope="row" align="center">
        {" "}
        {props.game.gameId}{" "}
      </TableCell>
      <TableCell align="center"> {props.game.gameName} </TableCell>
      <TableCell align="center"> {props.game.creatorUsername} </TableCell>
      <TableCell align="center">{props.numPlayers} </TableCell>
      <TableCell align="center">{rowButton} </TableCell>
    </TableRow>
  );
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  userState: state.userReducer,
});

export default connect(mapStateToProps)(GameRow);
