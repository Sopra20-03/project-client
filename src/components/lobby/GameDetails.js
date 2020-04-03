import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {Button} from '../../views/design/Button/Button';
import Game from "../shared/models/Game";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const FormContent = styled.div`
    --webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 5px 5px 5px 5px;
    background: #ffffff;
    padding: 1.2rem;
    width: 90%;
    maxwidth: 450px;
    position: relative;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const FormHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin: auto;
`;

const TextInput = styled.input`
    background-color: #f3ead8;
  border: none;
  color: #0d0d0d;
  padding: 0.5rem 0.8rem;
  margin: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 85%;
  border: 2px solid;
  transition: all 0.5s ease-in-out;
  border-radius: 5px;

  &::focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
    border-radius: 5px;
  }
`;

const textOrange = {
    color: '#ff7b00'
};

const textRed = {
    color: '#de0006'
};

const textPink = {
    color: '#ff0091'
};

const textViolet = {
    color: '#80228f'
};

const textBlue = {
    color: '#00a3e9'
};

const textGreen = {
    color: '#00a839'
};

const textYellow = {
    color: '#ffd700'
};

const textBlack = {
    color: '#000000'
};

/**
 * @Class
 */
class GameDetails extends React.Component {
    /**
     * The initial state is defined in the constructor. The state is a JS object containing two fields: gameName and creator
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            gameName: null
        };
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new game is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async createGame() {
        try {
            //Make sure current user is included as the creator on the server side
            const requestBody = JSON.stringify({
                gameName: this.state.gameName
            });
            const response = await api.post('/games', requestBody);

            // Get the returned game and update a new object.
            const game = new Game(response.data);

            // Game creation successfully worked --> navigate to the route /lobby in the GameRouter
            this.props.history.push(`/lobby`);
        } catch (error) {
            alert(`Something went wrong during the game creation: \n${handleError(error)}`);
        }
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is gameName, this statement is the equivalent to the following one:
        // this.setState({'gameName': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <FormContent>
                        <FormHeader>
                            <span style={textOrange}>G</span>
                            <span style={textRed}>a</span>
                            <span style={textPink}>m</span>
                            <span style={textViolet}>e </span>
                            <span style={textBlue}>D</span>
                            <span style={textGreen}>e</span>
                            <span style={textYellow}>t</span>
                            <span style={textBlack}>a</span>
                            <span style={textOrange}>i</span>
                            <span style={textRed}>l</span>
                            <span style={textPink}>s</span>
                        </FormHeader>

                        <TextInput onChange={e => {this.handleInputChange('gameName', e.target.value);}} type='text' placeholder='Game Name'></TextInput>
                        <Button>Create Game</Button>
                    </FormContent>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameDetails);
