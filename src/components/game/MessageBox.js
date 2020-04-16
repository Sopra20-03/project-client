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

function MessageBox(props) {
    return (
        <MessageBoxContainer>
            <h3>{props.msg}</h3>
        </MessageBoxContainer>
    );
}

export default MessageBox;
