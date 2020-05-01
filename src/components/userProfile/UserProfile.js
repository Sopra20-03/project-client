import React from "react";
import styled from "styled-components";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import {api, handleError} from "../../helpers/api";
import { withRouter } from "react-router-dom";
import Button from "../../views/design/Button";
import Colors from "../../views/design/Colors";

//Redux
import { connect } from "react-redux";
import {SmallLogo} from "../../views/logos/SmallLogo";
import LeaderboardIcon from "../../views/design/Icons/LeaderboardIcon";
import GameHistoryIcon from "../../views/design/Icons/GameHistoryIcon";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import GameHistoryTable from "../gameHistory/GameHistoryTable";
import {ContainerRow} from "../game/Gameplay";
import PacmanLoader from "react-spinners/PacmanLoader";
import {getGames} from "../../redux/actions/lobbyActions";
import UserInfoBox from "./UserInfoBox";
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



class UserProfile extends React.Component {
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
        return (
            <Container>
            <GameContainer>
                <SmallLogo />
                <BoxHeader>
                    <span style={Colors.textOrange}>P</span>
                    <span style={Colors.textRed}>r</span>
                    <span style={Colors.textPink}>o</span>
                    <span style={Colors.textViolet}>f</span>
                    <span style={Colors.textBlue}>i</span>
                    <span style={Colors.textGreen}>l</span>
                    <span style={Colors.textYellow}>e</span>
                    <LobbyIcon />
                    <LeaderboardIcon />
                    <GameHistoryIcon />
                    <LogoutIcon />
                </BoxHeader>

                <UserInfoBox user = {this.props.userState.user}/>

                <h1>Game History</h1>
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

export default withRouter(connect(mapStateToProps, {getGames})(UserProfile));