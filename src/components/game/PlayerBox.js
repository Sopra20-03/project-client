import React, {Component} from 'react';

import styled from 'styled-components';

import {chooseIcon} from "../../views/design/UserIcons";


export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  height: 6rem;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export default class PlayerBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <PlayerContainer style={{border: `2px solid ${this.props.borderColor}`}}>
                {<img alt="" src= {chooseIcon(this.props.icon)} height="60rem" width="50rem"/>}
                <h4 style={{margin: "0"}}>{this.props.userName}</h4>
            </PlayerContainer>
        );
    }
}
