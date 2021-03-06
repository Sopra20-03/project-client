import React from 'react';
import styled from 'styled-components';
import { PlayerContainer } from '../game/PlayerBox';
import Colors from '../../views/design/Colors/Colors';
import butterfly from '../../views/logos/010-butterfly.png';
import Button from '../../views/design/Button';
import { ContainerRow } from '../game/Gameplay';
import IconMenu from './IconMenu';
import { api, handleError } from '../../helpers/api';
import { connect } from 'react-redux';
import { getUserDetails } from '../../redux/actions/userActions';
import userfemale from '../../views/logos/user_female.png';
import usermale from '../../views/logos/user_male.png';
import bird from '../../views/logos/001-bird.png';
import dog from '../../views/logos/002-dog.png';
import cat from '../../views/logos/003-cat.png';
import fish from '../../views/logos/004-clown-fish.png';
import iguana from '../../views/logos/005-iguana.png';
import hen from '../../views/logos/006-hen.png';
import owl from '../../views/logos/007-owl.png';
import bee from '../../views/logos/008-bee.png';
import swan from '../../views/logos/009-swan.png';
import { errorNotification, infoNotification } from '../../helpers/notifications/toasts';

const UserInfoContainer = styled.div`
  background-color: #f3ead8;
  text-align: center;
  border-radius: 5px 5px 5px 5px;
  padding: 10px;
  position: relative;
  width: 50%;
  border: 2px solid ${Colors.black};
`;

const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50% 1fr;
  grid-gap: 5px;
  margin-right: 10px;
`;

const InfoTable = styled.table`
    text-align: left;
    width: 80%;
`;

const ProfileTextInput = styled.input`
  background-color: #f3ead8;
  border: none;
  color: #0d0d0d;
  padding: 0.1rem 0.1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  width: 100%;
  border: 2px solid;
  transition: all 0.5s ease-in-out;
  border-radius: 5px;

  &::focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
    border-radius: 5px;
  }
`;


class UserInfoBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            name: null,
            username: null,
            icon: null
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            username: this.props.user.username,
            icon: this.props.user.icon ? this.props.user.icon : "male"
        })
    }

    async updateProfile() {
        try {
            const requestBody = {
                name: this.state.name,
                username: this.state.username,
                icon: this.state.icon
            };
            const response = await api.put(`/users/${this.props.user.id}`, requestBody, {
                withCredentials: true,
            });
            infoNotification("User information was updated! ✔", 2000)
            this.setState({editMode: false});
            await this.props.getUserDetails(this.props.user.id);
        } catch (error) {
            errorNotification(handleError(error));
        }
    }

    changeToEditMode() {
        this.setState({editMode: true});
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    chooseIcon() {
        switch(this.props.user.icon){
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
                return usermale;
        }
    }

    render() {
        return (
            <ContainerRow>
                <UserInfoContainer>
                    <h3 style={{"text-transform": "uppercase"}}>WELCOME {this.props.user.name} !</h3>
                    <UserInfoGrid>
                        <PlayerContainer style={{border: `2px solid ${Colors.blue}`, justifySelf: 'center', margin: 0}}>
                            {<img alt="" src={this.chooseIcon()} height="60rem" width="50rem"/>}
                            <h4 style={{margin: "0"}}>{this.props.user.username}</h4>
                        </PlayerContainer>
                        <div>
                            <InfoTable>
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
                                        <span style={Colors.textRed}>Username : </span>
                                    </td>
                                    <td>
                                        {this.state.editMode ? (
                                            <ProfileTextInput onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} type='text' placeholder='Username' defaultValue={this.props.user.username}></ProfileTextInput>
                                        ) : (
                                            this.props.user.username
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={Colors.textPink}>Name : </span>
                                    </td>
                                    <td>
                                        {this.state.editMode ? (
                                            <ProfileTextInput onChange={e => {
                                                this.handleInputChange('name', e.target.value);
                                            }} type='text' placeholder='Name' defaultValue={this.props.user.name}></ProfileTextInput>
                                        ) : (
                                            this.props.user.name
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={Colors.textViolet}>Icon : </span>
                                    </td>
                                    <td>
                                        {this.state.editMode ? (
                                            <IconMenu initialIcon={this.state.icon} handleIconSelect={e => {
                                                this.handleInputChange('icon', e.target.value);
                                            }}/>
                                        ) : (
                                            this.state.icon
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style={Colors.textBlue}>Status : </span>
                                    </td>
                                    <td>
                                        <span
                                            style={this.props.user.status === 'ONLINE' ? Colors.textGreen : Colors.textBlack}>{this.props.user.status}</span>
                                    </td>
                                </tr>
                            </InfoTable>
                        </div>
                    </UserInfoGrid>
                    {this.state.editMode ? (
                        <Button style={{margin: 10}} onClick={() => {
                            this.updateProfile();
                        }}>Update</Button>
                    ) : (
                        <Button style={{margin: 10}} onClick={() => {
                            this.changeToEditMode();
                        }}>Edit</Button>
                    )}
                </UserInfoContainer>
            </ContainerRow>
        );
    }

}

export default connect(null, { getUserDetails })(UserInfoBox);