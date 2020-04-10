import React, { Component } from 'react'
import styled from 'styled-components';
import Colors from "../../views/design/Colors";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  height: 20 rem;
  background-color: white;
  border-radius: 5px;
  border: 2px solid black;
  margin: 2rem;
`;


export const Word = styled.div`
    display: flex;
    direction: row;
    justify-content: center;
    border: 2px red solid;
    border-radius: 5px;
    margin: 2px;
`;

export default class WordCard extends Component {

    render() {
        return (
            <div>
                    <CardContainer>
                        <Word>
                            <h2 style={{"margin":"0","color":"#de0006"}}>WORD 2</h2>
                        </Word>
                        <Word>
                            <h2 style={{"margin":"0","color":"#00a3e9"}}>WORD 2</h2>
                        </Word>
                        <Word>
                             <h2 style={{"margin":"0","color":"#00a839"}}>WORD 3</h2>
                        </Word>
                        <Word>
                            <h2 style={{"margin":"0","color":"#000"}}>WORD 4</h2>
                        </Word>
                        <Word>
                            <h2 style={{"margin":"0","color":"#ff0091"}}>WORD 5</h2>
                        </Word>
                    </CardContainer>
            </div>
        )
    }
}
