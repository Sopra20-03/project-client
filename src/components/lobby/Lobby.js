import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner/Spinner';
import {Button} from '../../views/design/Button/Button';
import { withRouter } from 'react-router-dom';
import GameItem from "./GameItem";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Games = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const GameContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
                <h2>Just One Game Lobby! </h2>
                <p>Get all games:</p>
                {!this.state.games ? (
                    <Spinner />
                ) : (
                    <div>
                        <Games>
                            {this.state.games.map(games => {
                                return (
                                    <GameContainer key={games.id}>
                                        <GameItem game={games} />
                                    </GameContainer>
                                );
                            })}
                        </Games>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Lobby);