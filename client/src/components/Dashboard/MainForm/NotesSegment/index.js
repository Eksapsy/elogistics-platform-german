import React, { Component } from 'react';
import { Field } from 'redux-form'
import { Grid, Header, Divider, TextArea } from 'semantic-ui-react';

class NotesSegment extends Component {
  state = {  }
  render() {
    return (
      <div>
        <Divider horizontal>
          <Header block textAlign='center' as='h3' color='blue'>
            <Header.Content>Notes</Header.Content>
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Field name='notes' component={ InputNotes } placeholder='Receiver' />
          </Grid.Column>
        </Grid.Row>
        <Divider hidden/>
        <Divider/>
      </div>
      );
  }
}

class InputNotes extends Component {
  render() {
    return (
      <div>
        <TextArea autoHeight placeholder='Write your notes here ...' rows={ 4 } {...this.props.input}/>
      </div>
    )
  }
}

export default NotesSegment;