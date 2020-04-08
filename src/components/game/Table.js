import React, { Component } from 'react'
import styled from 'styled-components';

import WordCard from "./WordCard"

import Player from './Player';
import GuessCard from './GuessCard';

export const Container = styled.div`
    display: flex;
    flex-direction: column
    width: fit-content
    height: fit-content;
    background-color: #00a839;
    border-radius: 100px;
    border: 2px solid black;
`;

export const ContainerRow = styled.div`
    display: flex;
    flex-direction: row;
`;


export default class Table extends Component {
    render() {
        return (
            <div>
                <Container>
                    <ContainerRow>
                        <Player />
                        <Player />
                        <Player />
                        <Player />
                    </ContainerRow>

                    <ContainerRow>
                        <GuessCard />
                        <GuessCard />
                        <GuessCard />
                        <GuessCard />
                    </ContainerRow>

                    <ContainerRow style={{"justify-content":"center"}}>
                        <WordCard />
                    </ContainerRow>
                </Container>
            </div>
        )
    }
}
