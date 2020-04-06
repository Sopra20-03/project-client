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

function createData(id, name, creator, players, button) {
    return { id, name, creator, players, button};
}

const rows = [
    createData(1, 'game1', 'tay1', '4 of 5', 'Play'),
    createData(2, 'game2', 'tay1', '4 of 5', 'Play'),
    createData(3, 'game3', 'tay1', '3 of 5', 'Play'),
    createData(4, 'game4', 'tay1', '2 of 5', 'Play'),
    createData(5, 'game5', 'tay1', '1 of 5', 'Play'),
];

export default function GameTable({ games }) {
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
                    {games.map((game) => (
                        <TableRow key={games.gameId}>
                            <TableCell component="th" scope="row" align="center">
                                {game.gameId}
                            </TableCell>
                            <TableCell align="center">{game.gameName}</TableCell>
                            <TableCell align="center">{game.creator}</TableCell>
                            <TableCell align="center">{'4 of 5'}</TableCell>
                            <TableCell align="center">{<ColorButton color='#00a839'>{'Play'}</ColorButton>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}