import React from "react";
import Button from "../../views/design/Button";
import styled from "styled-components";

const Popup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
`;

const PopupContent = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
`;

class RolePopup extends React.Component {

  render() {
    return (
      <Popup>
        <PopupContent>
          <p>You are a {this.props.role} for this round.</p>
          <Button onClick={this.props.closePopup}>Close Popup</Button>
        </PopupContent>
      </Popup>
    )
  }f
}

export default RolePopup;