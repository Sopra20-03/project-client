import React, { Component } from 'react';

import styled from 'styled-components';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import GameStates from '../../redux/reducers/gameStates';

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

export default class ClueCard extends Component {

    constructor (props) {
        super (props);
    }

    componentDidMount () {
        this.setState({
            choice: null,
            curState: GameStates.SELECT_WORD
        });
    }

    handleChange = (event) => {
        console.log (event.target.value);
        console.log (this.props);
        this.setState ({
            choice: event.target.value
        });
        //Just for testing/trying purposes
        console.log (`Game State: ${this.state.curState}`);
        let curiState = this.state.curState.value;
        console.log (`OOOOOOO ${GameStates[curiState].value} OOOOOOOOOO`);

    };

    render () {
        return (
          <div>
              <CardContainer style={{border: `2px solid ${this.props.borderColor}`}}>
                  {this.props.clue}
                  {/*<FormControl component="fieldset">
                      <RadioGroup
                        onChange={this.handleChange}
                      >
                          <FormControlLabel value="true" control={<Radio/>} label="Valid"/>
                          <FormControlLabel value="false" control={<Radio/>} label="Invalid"/>
                      </RadioGroup>
                  </FormControl>*/}
              </CardContainer>
          </div>
        );
    }

}
