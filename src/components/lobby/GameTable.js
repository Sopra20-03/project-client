import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from "styled-components";
import GameRow from "./GameRow";

class GameTable extends React.Component {
    state = {
        selectedGameId: ''
    };

    handleJoinGame = (gameId) => {
        this.setState({selectedGameId: gameId})
    };

    handleLeaveGame = (gameId) => {
        this.setState({selectedGameId: ''})
    };

    render() {
        return (
            <TableContainer>
                <Table style={{minWidth: 650}} size="small" aria-label="a dense table">
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
                        {this.props.games.map((game) => (
                            <GameRow game={game} selectedGameId={this.state.selectedGameId} onJoinGame={this.handleJoinGame} onLeaveGame={this.handleLeaveGame}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default GameTable;