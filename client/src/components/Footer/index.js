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
          <center>
            <p>
              The use of this application is to provide the ability for the user to send an e-mail to the Logistic Team, providing an xlsx attachment informing about the order
              details.
            </p>
          </center>
          <center>
            <p>
              Contact with the developer
              <br/>
              <strong>apostolis.anastasiou.alpha@gmail.com</strong>
            </p>
          </center>
        </Segment>
      </Container>
      : <div></div>
    );
  }
}