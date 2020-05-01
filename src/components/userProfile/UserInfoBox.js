import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {PlayerContainer} from "../game/PlayerBox";
import Colors from "../../views/design/Colors/Colors";
import butterfly from '../../views/logos/010-butterfly.png';
import Button from "../../views/design/Button";
import {ContainerRow} from "../game/Gameplay";

const UserInfoContainer = styled.div`
  background-color: #f3ead8;
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  padding: 10px;
  position: relative;
  width: 35%;
  margin-bottom: 2rem;
  margin-top: 1rem;
  border: 2px solid ${Colors.black};
`;

const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50% 1fr;
  grid-gap: 5px;
`;

const InfoTable = styled.div`
    text-align: left;
`;


class UserInfoBox extends React.Component {

    render() {
        return (
            <ContainerRow>
                <UserInfoContainer>
                    <h3>WELCOME {this.props.user.name} !</h3>
                    <UserInfoGrid>
                        <PlayerContainer style={{border: `2px solid ${Colors.blue}`, justifySelf: 'center'}}>
                            {<img alt="" src={butterfly} height="60rem" width="50rem"/>}
                            <h4 style={{margin: "0"}}>{this.props.user.username}</h4>
                        </PlayerContainer>
                        <div>
                            <table style={{textAlign: 'left'}}>
                                <tr>
                                    <td style={{width: '55%'}}>
                                        <span style={Colors.textOrange}>User Id : </span>
                                    </td>
                                    <td>
                                        {this.props.user.id}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={Colors.textRed}>Name : </span>
                                    </td>
                                    <td>
                                        {this.props.user.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={Colors.textPink}>Icon : </span>
                                    </td>
                                    <td>
                                        Butterfly
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={Colors.textViolet}>Status : </span>
                                    </td>
                                    <td>
                                        <span
                                            style={this.props.user.status === 'ONLINE' ? Colors.textGreen : Colors.textBlack}>{this.props.user.status}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </UserInfoGrid>
                    <Button>Edit</Button>
                </UserInfoContainer>
            </ContainerRow>
        );
    }

}

export default (UserInfoBox);