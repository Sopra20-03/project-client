import styled from "styled-components";
import React from "react";
import {
    ThemeProvider,
    Avatar,
    Message, MessageButton,
    MessageButtons,
    MessageGroup,
    MessageList,
    MessageMedia,
    MessageText,
    MessageTitle
} from "@livechat/ui-kit";

export const ChatContainer = styled.div`
  margin-top: 2em;
  left: 25%;
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  background: #ffffff;
  padding: 1.2rem;
  width: 50%;
  position: relative;
`;

export default function ChatBox(props) {
    const theme = {
        vars: {
            'primary-color': '#427fe1',
            'secondary-color': '#fbfbfb',
            'tertiary-color': '#fff',
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
            },
        },
    }

    return (
        <ChatContainer>
            <ThemeProvider vars={theme.vars}>
            <div style={{ height: 200 }}>
                <MessageList active>
                    <MessageGroup
                        avatar={props.icon}
                        onlyFirstWithMeta
                        style={{margin:0}}
                    >
                        <Message date="21:38" authorName="tay">
                            <MessageText style={{padding:0}}>Hi! Ready to play?</MessageText>
                        </Message>
                    </MessageGroup>
                    <MessageGroup onlyFirstWithMeta style={{margin:0}}>
                        <Message date="21:38" isOwn={true} authorName="trev">
                            <MessageText style={{padding:0}}>
                                Yeah, let's do this!
                            </MessageText>
                        </Message>
                        <Message date="21:38" isOwn={true} authorName="trev">
                            <MessageText style={{padding:0}}>I am definitely going to win</MessageText>
                        </Message>
                    </MessageGroup>
                    <MessageGroup
                        avatar={props.icon}
                        onlyFirstWithMeta
                        style={{margin:0}}
                    >
                        <Message authorName="luc" date="21:37">
                            <MessageText style={{padding:0}}>We'll see about that!</MessageText>
                        </Message>
                        <Message
                            authorName="luc"
                            date="21:39"
                        >
                            <MessageText style={{padding:0}}>
                                I've played this game a bunch of times before.
                            </MessageText>
                        </Message>
                    </MessageGroup>
                </MessageList>
            </div>
            </ThemeProvider>
        </ChatContainer>
    );
}