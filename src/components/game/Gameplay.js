import React, {Component} from "react";
import styled from "styled-components";
import TimerInfo from "./TimerInfo";
import PointsInfo from "./PointsInfo";
import Table from "./Table";
import {api} from "../../helpers/api";
import {store} from "../../store";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import Button from "../../views/design/Button";
import RolePopup from "./RolePopup";
import AllPlayerBoxes from "./AllPlayerBoxes";
import {SmallLogo} from "../../views/logos/SmallLogo";


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
                        <SmallLogo/>
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
