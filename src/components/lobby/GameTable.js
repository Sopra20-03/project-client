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

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#00a839'),
        backgroundColor: '#00a839',
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

export default function DenseTable() {
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
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" align="center">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.creator}</TableCell>
                            <TableCell align="center">{row.players}</TableCell>
                            <TableCell align="center">{<ColorButton color='#00a839'>{row.button}</ColorButton>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}