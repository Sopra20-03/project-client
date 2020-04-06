import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#00a839'),
        backgroundColor: 'rgba(0,168,57,0.75)',
        '&:hover': {
            backgroundColor: '#00a839',
        },
    },
}))(Button);



function GameRow(props){

    const classes = useStyles();

   return (
        <TableRow key={props.game.gameId} className={props.usersGameId === props.game.gameId ? 'gameJoined' : undefined}>
            <TableCell component="th" scope="row" align="center"> {props.game.gameId} </TableCell>
            <TableCell align = "center" > {props.game.gameName} </TableCell>
            <TableCell align="center"> {props.game.creator} </TableCell>
            <TableCell align="center">{'4 of 5'} </TableCell>
            <TableCell align="center">{
                <ColorButton color={props.usersGameId === props.game.gameId ? '#a8260e' : '#00a839'}
                    onClick={() => {

                    }}
                >{'Play'}
                </ColorButton>}
            </TableCell>
        </TableRow>
    );
}

export default GameRow;