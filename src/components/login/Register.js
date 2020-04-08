import React from "react";
import {withRouter} from "react-router-dom";
import {BaseContainer} from "../../helpers/layout";
import {FormContainer, FormContent, FormHeader, Link, TextInput} from "./Login";
import Colors from "../../views/design/Colors";
import Button from "../../views/design/Button";
import User from "../shared/models/User";
import {api, handleError} from "../../helpers/api";

class Register extends React.Component {


  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      password: null
    }
  }

  async register() {
    try {
      const requestBody = JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      });

      const response = await api.post('/users', requestBody);
      console.log(response.data);

      const user = new User(response.data);

      localStorage.setItem('token', user.token);

      this.props.history.push(`/lobby`);
    } catch (error) {
      alert(handleError(error));
    }
  }

  handleInputChange(key, value) {
    this.setState({[key]: value});
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <FormContent>
            <FormHeader>
              <span style={Colors.textOrange}>R</span>
              <span style={Colors.textRed}>e</span>
              <span style={Colors.textPink}>g</span>
              <span style={Colors.textViolet}>i</span>
              <span style={Colors.textBlue}>s</span>
              <span style={Colors.textGreen}>t</span>
              <span style={Colors.textYellow}>e</span>
              <span style={Colors.textBlack}>r </span>
              <span style={Colors.textOrange}>N</span>
              <span style={Colors.textRed}>o</span>
              <span style={Colors.textPink}>w</span>
            </FormHeader>
            <TextInput onChange={e => {
              this.handleInputChange('name', e.target.value);
            }} type='text' placeholder='Name'></TextInput>
            <TextInput onChange={e => {
              this.handleInputChange('username', e.target.value);
            }} type='text' placeholder='Username'></TextInput>
            <TextInput onChange={e => {
              this.handleInputChange('password', e.target.value);
            }} type='password' placeholder='Password'></TextInput>
            <br></br>
            <Button
              disabled={!this.state.name || !this.state.username || !this.state.password}
              onClick={() => {
                this.register();
              }}>Register</Button>
            <br></br>
            <Link href="/login">Already have an account? Login here!</Link>
          </FormContent>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Register);