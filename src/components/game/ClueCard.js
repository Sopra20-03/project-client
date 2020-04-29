import React, { Component } from 'react';

import styled from 'styled-components';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { api, handleError } from '../../helpers/api';

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5px;
  padding-left: 5px;
  margin: auto;
  min-width: 7rem;
  min-height: 3rem;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
`;

class ClueCard extends Component {

    constructor (props) {
        super (props);
    }

    componentDidMount () {

    }

    vote = (event) => {
        console.log ('OOOOO API Call - Put Clues OOOOOO');
        console.log (event.target.value);
        console.log (this.props.gameState.gameId);
        console.log (this.props.gameState.roundNum);
        console.log (this.props.clue);
        api.put (`/games/${this.props.gameState.gameId}/rounds/${this.props.gameState.roundNum}/clues/${this.props.clue.clueId}`,
          {
              vote: event.target.value
          },
          {
              withCredentials: true
          })
          .then (() => {
              this.setState ({
                  voted: true
              })
          })
          .catch ((e) => {
              alert(handleError(e));
          });
        console.log (this.props.gameState.clues);
    };

    render () {
        return (
          (this.props.role === 'GUESSER') ? (
            <CardContainer style={this.props.clue.isValid ? {border: `2px solid ${this.props.borderColor}`} : {border: `6px solid red`}}>
                {this.props.clue.isValid ? this.props.clue.word : ''}
            </CardContainer>
          ) : (
            <div>
                <CardContainer style={this.props.clue.isValid ? {border: `2px solid ${this.props.borderColor}`} : {border: `6px solid red`}}>

                    {this.props.clue.word}
                    <br/>
                    {0 === 0 ?
                      <FormControl component="fieldset">
                          <RadioGroup
                            onClick={this.vote}
                          >
                              <FormControlLabel value="true" control={<Radio/>} label="Valid"/>
                              <FormControlLabel value="false" control={<Radio/>} label="Invalid"/>
                          </RadioGroup>
                      </FormControl> :
                      <div/>}
                </CardContainer>
            </div>)
        );
    }
}

const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer
});

export default connect (mapStateToProps, {}) (ClueCard);
