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
    IconButton, SendIcon
} from "@livechat/ui-kit";
import MinimizeIcon from '@material-ui/icons/Minimize';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
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
  padding-bottom: 6rem;
  width: 500px;
  height: 400px;
`;

export const MiniChatContainer = styled.div`
  margin: 1em;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(255,123,0,0.5);
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid ${Colors.orange};
  width: 100px;
`;

export const TextField = styled.input`
  background-color: #f3ead8;
  border: none;
  color: #0d0d0d;
  padding: 0.2rem 0.6rem;
  margin: 0.5rem 1rem;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  width: 85%;
  border: 2px solid;
  border-radius: 5px;
`;

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messageList: null,
            minimized: false,
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
                `/games/${this.props.lobbyState.gameId}/messages`,
                requestBody,
                {
                    withCredentials: true,
                }
            );
            console.log("Message sent: ", response.data);
            this.setState({message: ''});
        } catch (error) {
            console.log(handleError(error));
        }
    };

    getTime(dateInfo) {
        let date = new Date(dateInfo);
        return date.toTimeString().substr(0, 5);
    }

    isOwner(username) {
        return username === this.props.userState.user.username;
    }

    handleInputChange(value) {
        this.setState({message: value});
    }

    onEnterPress = (event) => {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    };

    minimizeMessages = () => {
        this.setState({minimized: true});
        console.log('*********************************Minimized chat');
    };

    maximizeMessages = () => {
        this.setState({minimized: false});
    };

    render() {
        if (this.state.minimized) {
            return (
                <MiniChatContainer>
                    <ThemeProvider vars={this.state.theme.vars}>
                            <IconButton onClick={this.maximizeMessages}>
                                <ChatBubbleIcon style={{color: Colors.blue}}/>
                            </IconButton>
                    </ThemeProvider>
                </MiniChatContainer>
            )
        } else {
            return (
                <div>
                    {this.props.messageList ? (
                        <ChatContainer>
                            <ThemeProvider vars={this.state.theme.vars}>
                                <Row reverse>
                                    <IconButton onClick={this.minimizeMessages}>
                                        <MinimizeIcon style={{color: Colors.blue}}/>
                                    </IconButton>
                                </Row>
                                <MessageList active style={{backgroundColor: 'transparent', color: 'black'}}>
                                    {this.props.messageList.map((message) => (
                                        <Row reverse={this.isOwner(message.username)}>
                                            <MessageGroup avatar={chooseIcon(message.icon ? message.icon : "dog")}
                                                          isOwn={this.isOwner(message.username)}
                                                          style={{marginBottom: 0}}>
                                                <Message date={this.getTime(message.timeCreated)}
                                                         isOwn={this.isOwner(message.username)}
                                                         authorName={message.username}
                                                         style={{
                                                             backgroundColor: 'white',
                                                             borderRadius: '30px',
                                                             paddingLeft: '10px',
                                                             paddingRight: '10px',
                                                             paddingTop: '5px',
                                                             paddingBottom: '5px'
                                                         }}>
                                                    <MessageText style={{padding: 0}}>{message.text}</MessageText>
                                                </Message>
                                            </MessageGroup>
                                        </Row>
                                    ))}
                                </MessageList>
                                <TextComposer style={{backgroundColor: 'transparent', padding: '0px'}}>
                                    <Row align="center" style={{padding: '5px'}}>
                                        <TextField fill
                                                   value={this.state.message}
                                                   style={{textAlign: 'left'}}
                                                   onKeyPress={this.onEnterPress}
                                                   onChange={(e) => {
                                                       this.handleInputChange(e.target.value);
                                                   }}/>
                                        <IconButton fit onClick={this.sendMessage}>
                                            <SendIcon color={Colors.blue}/>
                                        </IconButton>

                                    </Row>
                                </TextComposer>
                            </ThemeProvider>
                        </ChatContainer>
                    ) : (<div/>)
                    }
                </div>
            )
        }
    }


}


const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps, {})(ChatBox);