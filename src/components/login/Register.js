import React from 'react';
import {withRouter} from 'react-router-dom';
import {BaseContainer, LoginContainer} from '../../helpers/layout';
import {FormContainer, FormHeader, Link, TextInput} from './Login';
import Colors from '../../views/design/Colors';
import Button from '../../views/design/Button';
import {handleError} from '../../helpers/api';
import PropTypes from 'prop-types';
//Redux
import {connect} from 'react-redux';
import {registerUser} from '../../redux/actions/userActions';
import {LargeLogo} from '../../views/logos/LargeLogo';
import {errorNotification, successNotification} from '../../helpers/notifications/toasts';

class Register extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            name: null,
            username: null,
            password: null,
            validUsername: true
        }
    }

    onEnterPress = (event) => {
        if (event.key === 'Enter') {
            this.register();
        }
    };

    async register () {
        if (!this.state.validUsername) {
            errorNotification ('Your username is too long. The maximum character limit is 20.');
        }
        else {
            try {
                const requestBody = {
                    name: this.state.name,
                    username: this.state.username,
                    password: this.state.password
                };
                await this.props.registerUser (requestBody);
                successNotification (`Registration successful! Welcome ${requestBody.name}`, 3000);
                this.props.history.push (`/login`);
            } catch (error) {
                this.props.history.push (`/register`);
                errorNotification (handleError (error));

            }
        }
    }

    handleInputChange (key, value) {
        this.setState ({[key]: value});
        if (key === 'username' && value.length > 20)
            this.setState({validUsername: false});
        else if (key === 'username')
            this.setState({validUsername: true})
    }

    render () {
        return (
          <BaseContainer>
              <LargeLogo/>
              <FormContainer>
                  <LoginContainer>
                      <FormHeader>
                          <span style={Colors.textOrange}>R</span>
                          <span style={Colors.textRed}>e</span>
                          <span style={Colors.textPink}>g</span>
                          <span style={Colors.textViolet}>i</span>
                          <span style={Colors.textBlue}>s</span>
                          <span style={Colors.textGreen}>t</span>
                          <span style={Colors.textYellow}>e</span>
                          <span style={Colors.textBlack}>r</span>
                      </FormHeader>
                      <TextInput onChange={e => {
                          this.handleInputChange ('name', e.target.value);
                      }} type='text' placeholder='Name'></TextInput>
                      <TextInput onChange={e => {
                          this.handleInputChange ('username', e.target.value);
                      }} type='text' placeholder='Username'></TextInput>
                      <TextInput onChange={e => {
                          this.handleInputChange ('password', e.target.value);
                      }} type='password' placeholder='Password' onKeyPress={this.onEnterPress}
                      ></TextInput>
                      <br></br>
                      <Button
                        disabled={!this.state.name || !this.state.username || !this.state.password}
                        onClick={() => {
                            this.register ();
                        }}>Register</Button>
                      <br></br>
                      <Link href="/login">Already have an account?<br/> Login here!</Link>
                  </LoginContainer>
              </FormContainer>
          </BaseContainer>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
};
export default withRouter (connect (null, {registerUser}) (Register));