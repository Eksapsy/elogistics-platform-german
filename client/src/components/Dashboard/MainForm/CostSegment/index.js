import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Segment, Divider, Form, Header } from 'semantic-ui-react';
import InputNumber from '../InputNumber';

class CostSegment extends Component {
  render() {
    return (
      <Form.Field required>
        <div>
          <Divider horizontal>
            <Header as='h3' content='Cost' color='blue' block/>
          </Divider>
          <Segment color='blue' style={ { width: '18em', margin: 'auto' } }>
            <Field name='costValue' component={ InputNumber } placeholder='Total Cost' fluid label='€' labelPosition='left' minimumValue={ 0 } />
          </Segment>
        </div>
      </Form.Field>
      );
  }
}

export default CostSegment;