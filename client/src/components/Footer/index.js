import React, { Component } from 'react';
import { Container, Segment, Header, Divider } from 'semantic-ui-react';

export default class Footer extends Component {
  render() {
    return (
    this.props.isAuth ?
      <Container>
        <Segment inverted style={ { padding: '5em 20em' } }>
          <Divider horizontal>
            <Header as='h3' inverted>GERMANOS POIMENIDIS</Header>
          </Divider>
          <p>This application form is provided to help the process of sending products to the according receiver and the sender.</p>
        </Segment>
      </Container>
      : <div></div>
    );
  }
}