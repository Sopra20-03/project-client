import React, {Component} from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import Table from "./Table";
import {api, handleError} from "../../helpers/api";
import {store} from "../../store";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import Button from "../../views/design/Button";
import RolePopup from "./RolePopup";
import AllPlayerBoxes from "./AllPlayerBoxes";


const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;


export default class Gameplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: store.getState().lobbyReducer.gameId,
            userId: store.getState().userReducer.user.id,
            players: [],
            opponents: [],
            loggedInPlayer: null,
            showRolePopup: false,
        }
    }

    toggleRolePopup() {
        this.setState({
            showRolePopup: !this.state.showRolePopup
        });
    }

    async getPlayerUsername(userId) {
        try {
            console.log("***API CALL : GET USER***");
            const response = await api.get(`/users/${userId}`, {
                withCredentials: true,
            });
            this.state.players.find(x => x.userId === userId).username = response.data.username;
        }
        catch (error) {
            alert(`Something went wrong getting player username: \n${handleError(error)}`);
        }
    };

    getUsernames() {
        const playersWithUsernames = this.state.players;
        playersWithUsernames.map((player) => (
            this.getPlayerUsername(player.userId)
        ));
        this.setState({players: playersWithUsernames});
        const opponents = this.state.players.filter( x => x.userId !== this.state.userId );
        this.setState({opponents: opponents});
        console.log("Players after getUsernames: ", this.state.players);
        console.log("Opponents after getUsernames: ", this.state.opponents);
    }

    componentDidMount() {
        console.log("***API CALL - GET PLAYERS***");
        //api.get(`/games/${this.state.gameId}/players`, {
        api.get(`/games/1/players`, {           // NEEDS TO BE UPDATED TO LOAD CURRENT GAME ID
            withCredentials: true,
        })
            .then(result => {
                let players = [];
                result.data.forEach((element) => {
                    players.push(element);
                    if (element.userId === this.state.userId) {
                        this.setState({
                            loggedInPlayer: element
                        });
                        console.log("Logged In Player: ", this.state.loggedInPlayer);
                    }
                });
                this.setState({
                    players: players
                });
                console.log("All players: ", this.state.players);

                const opponents = this.state.players.filter( x => x.userId !== this.state.userId );
                this.setState( {
                    opponents: opponents
                });
                console.log("All opponents: ", this.state.opponents);
            })
            .catch(error => {
                    console.log(error);
                    alert(`Couldn't load players. \n${error}`);
                }
            )
    };

    render() {
        return (
            <div>
                <BaseContainer>
                    <GameContainer>
                        <div></div>

                        <AllPlayerBoxes opponents={this.state.opponents}/>

                        <TableContainer>
                            <Table player={this.state.loggedInPlayer} players={this.state.players}/>
                        </TableContainer>

                        <InfoContainer>
                            <PointsInfo/>
                            <Button onClick={() => {
                                this.toggleRolePopup()
                            }}>Toggle Role</Button>
                            {this.state.showRolePopup ?
                                <RolePopup role={this.props.player.role}
                                           closePopup={this.toggleRolePopup.bind(this)}/> : null}
                            <TimerInfo/>
                        </InfoContainer>

                    </GameContainer>
                </BaseContainer>
            </div>
        );
    }
}
