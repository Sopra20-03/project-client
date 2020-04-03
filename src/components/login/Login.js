import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import User from '../shared/models/User';
import {withRouter} from 'react-router-dom';
import {Button} from '../../views/design/Button/Button';

const FormContainer = styled.div`
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
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      name: null,
      username: null
    };
  }

  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        name: this.state.name
      });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({[key]: value});
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {
  }

  render() {
    return (
        <BaseContainer>
          <FormContainer>
            <FormContent>
              <FormHeader>
                <span style={textOrange}>L</span>
                <span style={textRed}>o</span>
                <span style={textPink}>g</span>
                <span style={textViolet}>i</span>
                <span style={textBlue}>n </span>
                <span style={textGreen}>N</span>
                <span style={textYellow}>o</span>
                <span style={textBlack}>w</span>
              </FormHeader>

              <TextInput onChange={e => {this.handleInputChange('name', e.target.value);}} type='text' placeholder='Name'></TextInput>
              <TextInput onChange={e => {this.handleInputChange('username', e.target.value);}} type='text' placeholder='Username'></TextInput>
              <TextInput onChange={e=> {this.handleInputChange('password', e.target.value);}} type='password' placeholder='Password'></TextInput>
              <Button>Login</Button>
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
    export default withRouter(Login);
