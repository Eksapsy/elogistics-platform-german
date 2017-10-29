import React, { Component } from 'react';
import { Segment, Grid, Form, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
  }

  async onSubmit(e) {
    this.props.webActions.login(this.state.username, this.state.password);
  }

  usernameChanged(e, data) {
    this.setState({
      username: data.value
    });
  }

  passwordChanged(e, data) {
    this.setState({
      password: data.value
    });
  }

  render() {
    const {username, password} = this.state;
    return (
      <div className='login-form'>
        <style>
          { `
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
          body {
            background-color: #131418;
          }
        ` }
        </style>
        <Grid textAlign='center' style={ { height: '100%' } } verticalAlign='middle'>
          <Grid.Column style={ { maxWidth: 450 } }>
          <Header as='h2' inverted textAlign='center'>
          { '  ' }eLogistics Poimenidis
        </Header>
            <Form size='large' onSubmit={ this.onSubmit }>
              <Segment stacked>
                <Form.Input value={ username } fluid icon='user' iconPosition='left' placeholder='Username' required onChange={ this.usernameChanged } />
                <Form.Input value={ password } fluid icon='lock' iconPosition='left' placeholder='Password' type='password' required onChange={ this.passwordChanged } />
                <Form.Button color='teal' fluid size='large'>Login</Form.Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
      );
  }
}
const mapStateToProps = ({webData}) => ({
  webData
});

const mapDispatchToProps = (dispatch) => ({
  webActions: bindActionCreators(actions.webActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);