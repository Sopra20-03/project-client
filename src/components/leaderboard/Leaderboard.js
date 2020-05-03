import React from "react";
import styled from "styled-components";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import {api, handleError} from "../../helpers/api";
import Button from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import LeaderboardTable from "./LeaderboardTable";
import Colors from "../../views/design/Colors";
import {SmallLogo} from "../../views/logos/SmallLogo";
import PacmanLoader from 'react-spinners/PacmanLoader';
import {ContainerRow} from "../game/Gameplay";
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

class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            sortedUsers: [],
        };
    }

    componentDidMount() {
        this.timer = setInterval(async () => await this.getUsers(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    //getUsers
    async getUsers() {
        console.log("***API CALL - GET USERS***");
        try {
            const response = await api.get("/users", {withCredentials: true,});
            this.setState({sortedUsers: response.data.sort((a, b) => a.id < b.id)});
            console.log("Sorted users: ", this.state.sortedUsers);
        } catch (error) {
            alert(
                `Something went wrong while fetching the users: \n${handleError(error)}`
            );
        }
    }

    render() {
        return (
            <Container>
                <GameContainer>
                    <SmallLogo/>
                    <BoxHeader>
                        <span style={Colors.textOrange}>L</span>
                        <span style={Colors.textRed}>e</span>
                        <span style={Colors.textPink}>a</span>
                        <span style={Colors.textViolet}>d</span>
                        <span style={Colors.textBlue}>e</span>
                        <span style={Colors.textGreen}>r</span>
                        <span style={Colors.textYellow}>b</span>
                        <span style={Colors.textBlack}>o</span>
                        <span style={Colors.textOrange}>a</span>
                        <span style={Colors.textRed}>r</span>
                        <span style={Colors.textPink}>d</span>
                        <LobbyIcon />
                        <LeaderboardIcon />
                        <ProfileIcon />
                        <LogoutIcon/>
                    </BoxHeader>
                    {this.state.sortedUsers.length < 1 ? (
                        <ContainerRow style={{margin: 30}}><PacmanLoader/></ContainerRow>
                    ) : (
                        <LeaderboardTable users={this.state.sortedUsers}/>
                    )}
                </GameContainer>
            </Container>
        );
    }
}

export default withRouter(Leaderboard);
