import React, {Component} from 'react';
import styled from 'styled-components';

import WordCard from './WordCard';
import WhiteTextField from './InputField';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {api, handleError} from '../../helpers/api';
import {ContainerRow} from './Gameplay';
import {store} from '../../store';
import Colors from '../../views/design/Colors';
import MessageBox from './MessageBox';
import Clues from './Clues';

export const GameTable = styled.div`
  display: flex;
  flex-direction: column;
  /**width: fit-content;
  height: fit-content;**/
  background-color: #F8F3EB;
  border-radius: 200px;
  border: 3px solid #CAB48A;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 850px;
  height: fit-content;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
`;

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.getRounds();
        this.state = {
            guessInput: '',
            isGuessCorrect: '',
            showVerifyGuessPopup: false,
            activeRound: '',
            gamePhase: '',
            wordCard: '',
        };
    }

    async getRounds() {
        let gameId = store.getState().lobbyReducer.gameId;
        try {
            console.log("***API CALL - GET ROUNDS***");
            const response = await api.get(`/games/${gameId}/rounds`, {
                withCredentials: true,
            });
            let activeRound = response.data.find(x => x.roundStatus === 'RUNNING');
            console.log("Current Round Id: ", activeRound.roundId);
            console.log("Current Round Num: ", activeRound.roundNum);
            this.getRound(activeRound.roundId);
            this.setState({activeRound: activeRound});
        } catch (error) {
            alert(`Something went wrong while getting rounds: \n${handleError(error)}`);
        }
    }

    async getRound(currentRoundId) {
        let gameId = store.getState().lobbyReducer.gameId;
        try {
            console.log("***API CALL - GET ROUND***");
            const response = await api.get(`/games/${gameId}/rounds/${currentRoundId}`, {
                withCredentials: true,
            });
            this.setState({wordCard: response.data.wordCard});
            console.log("Current Round: ", this.state.wordCard);
        } catch (error) {
            alert(`Something went wrong while getting round: \n${handleError(error)}`);
        }
    }

    async submitGuess() {
        const gameId = store.getState().lobbyReducer.gameId;
        const currentPlayerId = this.props.player.playerId;
        try {
            console.log("***API CALL - SUBMIT GUESS***");
            const requestBody = {
                word: this.state.guessInput,
            };
            const response = await api.post(`/games/${gameId}/players/${currentPlayerId}/guess`, requestBody, {
                withCredentials: true,
            });
            this.setState({isGuessCorrect: response.data.isValid});
            console.log("Is guess valid?: ", this.state.isGuessCorrect);
        } catch (error) {
            alert(`Something went wrong during the guess submission: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    createMessage(gamePhase) {
        if (gamePhase === 'ROUND_ANNOUNCEMENT')
            return `Round ${this.state.activeRound.roundNum} of 13`;
        else if (gamePhase === 'ROLE_ASSIGNMENT')
            return this.props.player === null ? "Role cannot be assigned" : `You are the ${this.props.player.role}`;
        else if (gamePhase === 'WAITING_FOR_CLUES')
            return "Players are writing clues...";
        else if (gamePhase === 'WAITING_FOR_GUESS')
            return "Waiting for guesser to guess word...";
        else if (gamePhase === 'GUESS_VALIDATION')
            return this.state.isGuessCorrect === null ? "Guess cannot be determined" :
                (this.state.isGuessCorrect ? "Guess was CORRECT" : "Guess was INCORRECT");
        else if (gamePhase === 'GAME_OVER')
            return "Game Over";
        else
            return "This is the default message";
    };

    render() {

        return (
            <div>
                <GameTable>
                    <ContainerRow>
                        <Clues/>
                    </ContainerRow>
                    <ContainerRow style={{justifyContent: "center"}}>
                        <WordCard wordCard={this.state.wordCard}/>
                    </ContainerRow>
                    <ContainerRow>
                        <MessageBox msg={this.createMessage('ROLE_ASSIGNMENT')}/>
                    </ContainerRow>
                    <ContainerRow style={{justifyContent: "center"}}>
                        <WhiteTextField
                            label="Guess here..."
                            variant="filled"
                            id="guess"
                            onChange={(e) => {
                                this.handleInputChange("guessInput", e.target.value);
                            }}
                        />
                        <CheckCircleOutlineIcon style={{fontSize: 60, color: Colors.green}} onClick={() => {
                            this.submitGuess()
                        }}></CheckCircleOutlineIcon>
                    </ContainerRow>
                </GameTable>


            </div>

        );
    }
}
