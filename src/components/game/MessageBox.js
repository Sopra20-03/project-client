import React from "react";
import Colors from "../../views/design/Colors";
import styled from "styled-components";

export const MessageBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  background-color: white;
  border-radius: 20px;
  margin: 2rem;
  padding-left: 30px;
  padding-right: 30px;
  border: 2px solid ${Colors.black};
`;

class MessageBox extends React.Component {
  render() {
    return (
      <div>
        <MessageBoxContainer>
          <h3>{this.props.msg}</h3>
        </MessageBoxContainer>
      </div>
    );
  }
}

export default MessageBox;
