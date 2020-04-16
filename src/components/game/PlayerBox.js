import React, {Component} from "react";

import styled from "styled-components";

import usermale from "../../views/logos/user_male.png";
import userfemale from "../../views/logos/user_female.png";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export default class PlayerBox extends Component {

    render() {
        let userIcon = {};
        if (this.props.gender === 'female') {
            userIcon = <img src= {userfemale} height="60rem" width="50rem"/>
        }
        else {
            userIcon = <img src= {usermale} height="60rem" width="50rem"/>
        }

        return (
            <PlayerContainer style={{border: `2px solid ${this.props.borderColor}`}}>
                {userIcon}
                <h4 style={{margin: "0"}}>{this.props.userName}</h4>
            </PlayerContainer>
        );
    }
}
