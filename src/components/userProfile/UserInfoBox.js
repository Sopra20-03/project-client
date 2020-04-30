import React from "react";
import styled from "styled-components";

class UserInfoBox extends React.Component {

    render() {
        return (
            <div>
                User Id : {this.props.user.id}
                <br/>
                UserName : {this.props.user.username}
                <br/>
                Name : {this.props.user.name}
                <br/>
                Online Status : {this.props.user.status}
            </div>
        );
    }

}

export default (UserInfoBox);