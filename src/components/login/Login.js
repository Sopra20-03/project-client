import React from 'react';
import styled from 'styled-components';
import { BaseContainer, LoginContainer } from '../../helpers/layout';
import { handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import Button from '../../views/design/Button';
import Colors from '../../views/design/Colors';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { LargeLogo } from '../../views/logos/LargeLogo';

export const FormContainer = styled.div`
  margin-top: 6em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

export const FormContent = styled.div`
  margin-top: 2em;
  left: 10em;
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  background: #ffffff;
  padding: 1.2rem;
  width: 35%;
  position: relative;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const FormHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin: auto;
`;

export const TextInput = styled.input`
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

export const Link = styled.a`
  text-decoration: none;
  transition: .5s;
  &:hover {
    font-size: 20px;
    font-weight: bold;
  }
`;

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
    constructor () {
        super ();
        this.state = {
            username: null,
            password: null
        };
    }

    onEnterPress = (event) => {
            if (event.key === 'Enter') {
                this.login();
            }
    };

    login = async() => {
        try {
            const formData = new FormData ();
            formData.append ('username', this.state.username);
            formData.append ('password', this.state.password);

            await this.props.loginUser (formData);

            this.props.history.push (`/lobby`);
        } catch (error) {
            alert (`Something went wrong during the login: \n${handleError (error)}`);
        }
    };

    handleInputChange (key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState ({[key]: value});
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount () {
    }

    render () {
        return (
          <BaseContainer>
              <LargeLogo/>
              <FormContainer>
                  <LoginContainer>
                      <FormHeader>
                          <span style={Colors.textOrange}>L</span>
                          <span style={Colors.textRed}>o</span>
                          <span style={Colors.textPink}>g</span>
                          <span style={Colors.textViolet}>i</span>
                          <span style={Colors.textBlue}>n </span>
                          <span style={Colors.textGreen}>N</span>
                          <span style={Colors.textYellow}>o</span>
                          <span style={Colors.textBlack}>w</span>
                      </FormHeader>

                      <TextInput
                        onChange={(e) => {
                            this.handleInputChange ('username', e.target.value);
                        }}
                        type="text"
                        placeholder="Username"
                      ></TextInput>
                      <TextInput
                        onChange={(e) => {
                            this.handleInputChange ('password', e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        onKeyPress={this.onEnterPress}
                      ></TextInput>
                      <br></br>
                      <Button
                        disabled={!this.state.username || !this.state.password}
                        onClick={this.login}
                      >
                          Login
                      </Button>
                      <br></br>
                      <Link href="/register">
                          Don't have an account yet?<br/> Register here!
                      </Link>
                  </LoginContainer>
              </FormContainer>
          </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};
export default withRouter (connect (null, {loginUser}) (Login));
