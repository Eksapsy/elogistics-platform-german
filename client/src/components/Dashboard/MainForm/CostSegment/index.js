import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Segment, Divider, Form, Header } from 'semantic-ui-react';
import InputNumber from '../InputNumber';


const required = value => value ? undefined : 'Required!';

class CostSegment extends Component {
  render() {
    return (
      <Form.Field required>
        <div>
          <Divider horizontal>
            <Header as='h3' content='Cost' color='blue' block/>
          </Divider>
          <Segment color='blue' style={ { width: '18em', margin: 'auto' } }>
            <Field name='costValue' value={ 0 } component={ InputNumber } placeholder='Total Cost' fluid label='€' labelPosition='left' minimumValue={ 0 }
              validate={ [required] } />
          </Segment>
        </div>
      </Form.Field>
      );
  }
}

export default CostSegment;