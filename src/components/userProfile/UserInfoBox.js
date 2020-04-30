import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {PlayerContainer} from "../game/PlayerBox";
import Colors from "../../views/design/Colors/Colors";
import butterfly from '../../views/logos/010-butterfly.png';

const UserInfoContainer = styled.div`
  background-color: #f3ead8;
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  padding: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 50% 50% 1fr;
  grid-gap: 5px;
  width: 100%;
`;


class UserInfoBox extends React.Component {

    render() {
        return (
            <UserInfoContainer>
                <PlayerContainer style={{border: `2px solid ${Colors.blue}`, justifySelf: 'center'}}>
                    {<img alt="" src= {butterfly} height="60rem" width="50rem"/>}
                    <h4 style={{margin: "0"}}>{this.props.user.userName}</h4>
                </PlayerContainer>
                User Id : {this.props.user.id}
                <br/>
                UserName : {this.props.user.username}
                <br/>
                Name : {this.props.user.name}
                <br/>
                Online Status : {this.props.user.status}

            </UserInfoContainer>

        );
    }

}

export default (UserInfoBox);