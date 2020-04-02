import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {Button} from '../../views/design/Button';
import JustOneGame from "../shared/models/JustOneGame";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  webkit-borderRadius: 1em;
  background: #ffffff;
  boxShadow: '0 30px 60px 0 rgba(0,0,0,0.3)';
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  WebkitBorderRadius: 10px 10px 10px 10px;
  borderRadius: 5px 5px 5px 5px;
  padding: 1.2rem;
  width: 90%;
  maxWidth: 450px;
  position: relative;
  boxShadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  textAlign: center;
`;

const FormTitle = styled.div`
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(243, 234, 216);
  color: black;
`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * @Class
 */
class CreateGame extends React.Component {
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
            const game = new JustOneGame(response.data);

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
                    <FormTitle>Create Game Form</FormTitle>
                    <Form>
                        <Label>Game Name</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('gameName', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.gameName}
                                width="50%"
                                onClick={() => {
                                    this.createGame();
                                }}
                            >
                                Create Game
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(CreateGame);
