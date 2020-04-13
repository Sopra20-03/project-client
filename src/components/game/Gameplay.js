import React, { Component } from 'react'
import styled from 'styled-components';

import Player from "./Player"
import TimerInfo from "./TimerInfo"
import PointsInfo from "./PointsInfo"
import Table from "./Table"

import Colors from "../../views/design/Colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  border-radius: 5px;
  border: 2px solid black;
  min-width: fit-content;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default class Gameplay extends Component {
    render() {
        return (
            <div>
                <Container>
                    <div>
                    </div>
                    <TableContainer>
                        <Table />
                    </TableContainer>

                    <InfoContainer>
                        <PointsInfo />
                        <div></div>
                        <TimerInfo />
                    </InfoContainer>
                </Container>    
            </div>
        )
    }
}
