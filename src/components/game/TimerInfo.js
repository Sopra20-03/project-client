import styled from 'styled-components';

import React, { Component } from 'react'

export const TimerInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    border: 2px black solid;
    border-radius: 5px;
    background-color: white;
    align-items: center;
    margin: 2px;
    padding: 5px;
`;

export default class TimerInfo extends Component {
    render() {
        return (
            <div>
                <TimerInfoContainer>
                    <h1 style={{"margin":"0px"}}>2:00</h1>
                    <h3 style={{"margin":"0px"}}>Round 1 of 13</h3>
                        
                </TimerInfoContainer>
            </div>
        )
    }
}
