import React, { Component } from 'react';

import styled from 'styled-components';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';

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
        });
    }

    handleChange = (event) => {
        console.log (event.target.value);
        console.log (this.props);
        this.props.clue.valid = event.target.value;
        this.setState ({
            choice: event.target.value
        });

    };

    render () {
        return (
            this.props.role === 'GUESSER' ? (
                <CardContainer style={{border: `2px solid ${this.props.borderColor}`}}>
                    {this.props.clue}
                </CardContainer>
                ) : (
                <div>
              <CardContainer style={{border: `2px solid ${this.props.borderColor}`}}>
                  {this.props.clue}
                  <FormControl component="fieldset">
                      <RadioGroup
                        onChange={this.handleChange}
                      >
                          <FormControlLabel value="true" control={<Radio/>} label="Valid"/>
                          <FormControlLabel value="false" control={<Radio/>} label="Invalid"/>
                      </RadioGroup>
                  </FormControl>
              </CardContainer>
          </div>)
        );
    }

}
