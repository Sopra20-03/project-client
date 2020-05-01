import React from "react";
import styled from "styled-components";

import {BaseContainer, GameContainer} from "../../helpers/layout";
import {api, handleError} from "../../helpers/api";
import Button from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import GameHistoryTable from "./GameHistoryTable";
import Colors from "../../views/design/Colors";
import {SmallLogo} from "../../views/logos/SmallLogo";
//Redux
import {connect} from "react-redux";
import {getGames} from "../../redux/actions/lobbyActions";
import {ContainerRow} from "../game/Gameplay";
import PacmanLoader from "react-spinners/PacmanLoader";
import LeaderboardIcon from "../../views/design/Icons/LeaderboardIcon";
import ProfileIcon from "../../views/design/Icons/GameHistoryIcon";
import LobbyIcon from "../../views/design/Icons/LobbyIcon";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const BoxHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin: auto;
  margin-bottom: 20px;
`;

class GameHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            userGames: [],
        };
    }

    componentDidMount() {
        this.timer = setInterval(async () => await this.loadGameHistory(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async loadGameHistory() {
        //1. Get Games
        await this.getGames();
        //2. Filter down to only games this user was a player in
        this.props.lobbyState.gamesList.map((game) => (
            this.getPlayers(game)
        ));
    }

    async getPlayers(game) {
        const playerInGame = (p) => p.userId===this.props.userState.user.id;
        const gameAlreadyInList = this.state.userGames.some(g => game.gameId === g.gameId);
        try {
            const response = await api.get(`/games/${game.gameId}/players`, {
                withCredentials: true,
            });
            console.log("***API CALL - Get Players*** ");
            console.log("GameId: ", game.gameId, "PlayerInGame?: ", response.data.some(playerInGame));
            console.log("GameAlreadyInList: ", gameAlreadyInList);
            if (response.data.some(playerInGame) && !gameAlreadyInList)
                this.state.userGames.push(game);
        } catch (error) {
            alert(`Something went wrong while fetching the players: \n${handleError(error)}`);
        }
    }

    //getGames
    async getGames() {
        console.log("getGames() Game History");
        try {
            await this.props.getGames();
        } catch (error) {
            alert(
                `Something went wrong while fetching the games: \n${handleError(error)}`
            );
        }
    }

    render() {
        console.log("Render Game History");
        return (
            <Container>
                <GameContainer>
                    <SmallLogo/>
                    <BoxHeader>
                        <span style={Colors.textOrange}>G</span>
                        <span style={Colors.textRed}>a</span>
                        <span style={Colors.textPink}>m</span>
                        <span style={Colors.textViolet}>e </span>
                        <span style={Colors.textBlue}>H</span>
                        <span style={Colors.textGreen}>i</span>
                        <span style={Colors.textYellow}>s</span>
                        <span style={Colors.textBlack}>t</span>
                        <span style={Colors.textOrange}>o</span>
                        <span style={Colors.textRed}>r</span>
                        <span style={Colors.textPink}>y</span>
                        <LobbyIcon />
                        <LeaderboardIcon />
                        <ProfileIcon />
                        <LogoutIcon/>
                    </BoxHeader>
                    {this.state.userGames.length < 1 ? (
                        <ContainerRow style={{margin: 30}}><PacmanLoader/></ContainerRow>
                    ) : (
                        <GameHistoryTable games={this.state.userGames}/>
                    )}
                </GameContainer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    userState: state.userReducer,
    lobbyState: state.lobbyReducer,
});

export default withRouter(
    connect(mapStateToProps, {getGames})(GameHistory)
);
