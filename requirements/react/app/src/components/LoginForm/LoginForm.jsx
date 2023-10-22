import React from "react";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: String,
      password: String,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
	  if (event.target.name === "log_field")
		  this.setState({ login: event.target.value });
	  else
		  this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    alert('login = ' + this.state.login + ' pass = ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Login: <br/>
          <input type="text" name="log_field" value={this.state.login} onChange={this.handleInputChange} />
        </label>
        <br /><br />
        <label>
          Password: <br/>
          <input type="password" name="pass_field" value={this.state.password} onChange={this.handleInputChange} />
        </label>
		<br /><br />
		<input type="submit" value="      Login      "/>
      </form>
    );
  }
}
