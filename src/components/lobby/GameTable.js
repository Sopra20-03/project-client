import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
import styled from "styled-components";
import GameRow from "./GameRow";

const HeaderRow = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-weight: bold;
  line-height: 1.5rem;
`;

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#00a839'),
        backgroundColor: 'rgba(0,168,57,0.75)',
        '&:hover': {
            backgroundColor: '#00a839',
        },
    },
}))(Button);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function GameTable(props) {
    const classes = useStyles();
    return (

        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
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
                    {props.games.map((game) => (
                        <GameRow game={game} usersGameId={1}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default GameTable;