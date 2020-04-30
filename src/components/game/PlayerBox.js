import React, { Component } from 'react';

import styled from 'styled-components';

import usermale from '../../views/logos/user_male.png';
import userfemale from '../../views/logos/user_female.png';
import robot from '../../views/logos/robot.png';
import bird from '../../views/logos/001-bird.png';
import dog from '../../views/logos/002-dog.png';
import cat from '../../views/logos/003-cat.png';
import fish from '../../views/logos/004-clown-fish.png';
import iguana from '../../views/logos/005-iguana.png';
import hen from '../../views/logos/006-hen.png';
import owl from '../../views/logos/007-owl.png';
import bee from '../../views/logos/008-bee.png';
import swan from '../../views/logos/009-swan.png';
import butterfly from '../../views/logos/010-butterfly.png';


export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
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

    chooseIcon() {
        switch(this.props.icon){
            case "female":
                return userfemale;
            case "male":
                return usermale;
            case "bird":
                return bird;
            case "dog":
                return dog;
            case "cat":
                return cat;
            case "fish":
                return fish;
            case "iguana":
                return iguana;
            case "hen":
                return hen;
            case "owl":
                return owl;
            case "bee":
                return bee;
            case "swan":
                return swan;
            case "butterfly":
                return butterfly;
            default:
                return robot;
        }
    }

    render() {
        return (
            <PlayerContainer style={{border: `2px solid ${this.props.borderColor}`}}>
                {<img alt="" src= {this.chooseIcon()} height="60rem" width="50rem"/>}
                <h4 style={{margin: "0"}}>{this.props.userName}</h4>
            </PlayerContainer>
        );
    }
}
