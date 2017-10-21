import React, { Component } from 'react';
import { Segment, Grid, Form, Message, Header, Button, Icon } from 'semantic-ui-react';

class LoginForm extends Component {
  state = {  }
  render() {
    return (
      <div className='login-form'>
        <style>
          { `
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        ` }
        </style>
        <Grid textAlign='center' style={ { height: '100%' } } verticalAlign='middle'>
          <Header as='h2' color='teal' textAlign='center'>
            <Icon.Group size='large'>
              <Icon circular name='shop' />
              <Icon circular style={ { paddingTop: '-10px' } } corner name='mail' />
            </Icon.Group>
          </Header>
        </Grid>
      </div>
      );
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);