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
    constructor(props) {
        super(props);
        this.state = {visible:true}
    }

    componentWillReceiveProps(nextProps) {
        // reset the timer if children are changed
        if (nextProps.children !== this.props.children) {
            this.setTimer();
            this.setState({visible: true});
        }
    }

    componentDidMount() {
        this.setTimer();
    }

    setTimer() {
        // clear any existing timer
        if (this._timer != null) {
            clearTimeout(this._timer)
        }

        // hide after `delay` milliseconds
        this._timer = setTimeout(function(){
            this.setState({visible: false});
            this._timer = null;
        }.bind(this), this.props.delay);
    }

    componentWillUnmount() {
        clearTimeout(this._timer);
    }

    render() {
        return (this.state.visible ?
            <MessageBoxContainer>
                <h3>{this.props.msg}</h3>
            </MessageBoxContainer>
            : <span />);
    }
}

export default MessageBox;
