import React from 'react';
import styled from 'styled-components';

import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Button from "../../views/design/Button";
import { withRouter } from 'react-router-dom';

import GameTable from "./GameTable";
import Colors from "../../views/design/Colors";
import {FormHeader} from "../login/Login";

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

const LobbyContainer = styled.div`
    margin-top: 2em;
    --webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 5px 5px 5px 5px;
    background: #ffffff;
    padding: 1.2rem;
    width: 90%;
    width: 60%;
    position: relative;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
`;

class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null
        };
    }

    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    async componentDidMount() {
        try {
            const response = await api.get('/games');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned games and update the state.
            this.setState({ games: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <LobbyContainer>
                    <BoxHeader>
                        <span style={Colors.textOrange}>G</span>
                        <span style={Colors.textRed}>a</span>
                        <span style={Colors.textPink}>m</span>
                        <span style={Colors.textViolet}>e </span>
                        <span style={Colors.textBlue}>L</span>
                        <span style={Colors.textGreen}>o</span>
                        <span style={Colors.textYellow}>b</span>
                        <span style={Colors.textBlack}>b</span>
                        <span style={Colors.textOrange}>y</span>
                    </BoxHeader>

                    {!this.state.games ? (
                        <div/>
                    ) : (
                        <GameTable games={this.state.games}/>
                    )}

                    <Button
                        onClick={() => {
                            this.props.history.push(`/gamedetails`);
                        }}
                    >
                        Create Game
                    </Button>

                    <Button
                        onClick={() => {
                            this.logout();
                        }}
                    >
                        Logout
                    </Button>


                </LobbyContainer>

            </Container>
        );
    }
}

export default withRouter(Lobby);