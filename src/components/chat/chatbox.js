import styled from "styled-components";
import React, {Component} from "react";
import {
    ThemeProvider,
    Avatar,
    Message,
    MessageGroup,
    MessageList,
    MessageText,
    TextComposer,
    Row,
    SendButton,
    EmojiIcon,
    IconButton, SendIcon
} from "@livechat/ui-kit";
import {TextInput} from "../login/Login";
import {api, handleError} from "../../helpers/api";
import {connect} from "react-redux";
import userIcons, {chooseIcon} from '../../views/design/UserIcons';
import Colors from "../../views/design/Colors/Colors";

export const ChatContainer = styled.div`
  margin: 1em;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(255,123,0,0.5);
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid ${Colors.orange};
  padding: 1.2rem;
  padding-bottom: 5rem;
  width: 500px;
  height: 400px;
`;

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messageList: null,
            theme: {
                vars: {
                    'primary-color': '#427fe1',
                    'secondary-color': '#ffe90f',
                    'tertiary-color': '#a8260e',
                    'avatar-border-color': 'blue',
                },
                AgentBar: {
                    Avatar: {
                        size: '30px',
                        border: '1px solid blue',
                        backgroundColor: 'white',
                        padding: '2px'
                    },
                    css: {
                        backgroundColor: 'var(--secondary-color)',
                        borderColor: 'var(--avatar-border-color)',
                    }
                },
                Message: {
                    Avatar: {
                        size: '30px',
                        border: '1px solid blue',
                        backgroundColor: 'white',
                        padding: '2px'
                    },
                    css: {
                        fontWeight: 'bold',
                        backgroundColor: 'red',
                    },
                },
            },
        };
    }

    componentDidMount() {
    }

    sendMessage = async () => {
        const requestBody = {
            username: this.props.userState.user.username,
            icon: this.props.userState.user.icon,
            text: this.state.message
        };
        try {
            const response = await api.post(
                `/games/${this.props.gameState.gameId}/messages`,
                requestBody,
                {
                    withCredentials: true,
                }
            );
            console.log("Message sent: ", response.data);
            //TODO: CLEAR MESSAGE BOX AFTER MESSAGE SENT

        } catch (error) {
            console.log(handleError(error));
        }
    };

    getTime(dateInfo) {
        let date = new Date(dateInfo);
        return date.getHours() + ":" + date.getMinutes();
    }

    handleInputChange(value) {
        this.setState({message: value});
    }

    render() {
        return (
            <div>
                {this.props.messageList ? (
                    <ChatContainer>
                        <ThemeProvider vars={this.state.theme.vars}>
                                <MessageList active style={{backgroundColor: 'transparent'}}>
                                    {this.props.messageList.map((message) => (
                                        <MessageGroup avatar={chooseIcon(message.icon ? message.icon : "dog")}
                                                      isOwn={message.username === this.props.userState.user.username}
                                                      style={{marginBottom: 0}}>
                                            <Message date={this.getTime(message.timeCreated)}
                                                     isOwn={message.username === this.props.userState.user.username}
                                                     authorName={message.username}>
                                                <MessageText style={{padding: 0, backgroundColor: 'white'}}>{message.text}</MessageText>
                                            </Message>
                                        </MessageGroup>
                                    ))}
                                </MessageList>
                                <TextComposer style={{backgroundColor: 'transparent'}}>
                                    <Row align="center">
                                        <TextInput fill
                                                   onChange={(e) => {
                                                       this.handleInputChange(e.target.value);
                                                   }}/>
                                        <IconButton fit onClick={this.sendMessage}>
                                            <SendIcon color={Colors.blue} />
                                        </IconButton>

                                    </Row>
                                </TextComposer>
                        </ThemeProvider>
                    </ChatContainer>
                ) : (<div/>)
                }
            </div>
        )
            ;
    }

}


const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps, {})(ChatBox);