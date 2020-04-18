import React, { Component } from 'react';
import { api } from '../../helpers/api';
import ClueCard from './ClueCard';
import Colors from '../../views/design/Colors/Colors';
import {store} from "../../store";

export default class Clues extends Component {
    constructor (props) {
        super (props);
        this.state = {
            clues: [],
            colors: []
        }
    }

    componentDidMount () {
        this.getClues ();
        this.setupColors();
    }

    setupColors () {
        let colors = [];
        colors.push (Colors.blue);
        colors.push (Colors.orange);
        colors.push (Colors.violet);
        colors.push (Colors.green);
        this.setState({
            colors: colors
        })
    }

    getClues () {
        let gameId = store.getState().lobbyReducer.gameId;
        let roundNum = 1;
        api.get (`/games/${gameId}/rounds/${roundNum}`, {
            withCredentials: true
        })
          .then (result => {
              this.setState ({
                  clues: result.data
              })
          })
          .catch (() => {
              this.setState ({
                  clues: ['joey', 'chandler', 'sitcom', 'coffeehouse']
              })
          })
    }

    render () {
        return (
          this.state.clues.map ((clue, index) => {
              //console.log (clue);
              //console.log (index);
              return <ClueCard borderColor={this.state.colors[index]} clue={clue}/>
          })
        )
    }
}