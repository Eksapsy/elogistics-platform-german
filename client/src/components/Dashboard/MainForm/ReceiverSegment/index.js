import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { formValueSelector, change, Field } from 'redux-form'
import { Grid, Header, Divider } from 'semantic-ui-react';
import DropdownField from '../DropdownField';
import uuid from 'uuid';
import _ from 'lodash';

const required = value => value ? undefined : 'Required'
class ReceiverSegment extends Component {
  receiverChanged(e, data) {
    const {receivers, couriers} = this.props.dataBinded;
    const receiver = _.find(receivers, {
      name: data
    });
    const courierFound = _.find(couriers, {
      name: receiver.courier
    });

    // Now ... if we found a courier according to the receiver's preferences, let's make a change to that field!
    if (courierFound) {
      this.props.dispatch(change('orderForm', 'courierName', receiver.courier))
    }

  }
  render() {
    const receiverNames = this.props.dataBinded.receivers.map((receiver) => {
      return {
        key: uuid(),
        value: receiver.name,
        text: receiver.name
      };
    });
    return (
      <div>
        <Divider horizontal>
          <Header block textAlign='center' as='h3' color='blue'>
            <Header.Content>Receiver</Header.Content>
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Field name='receiverName' component={ DropdownField } placeholder='Receiver' data={ receiverNames } validate={ [required] } onChange={ this.receiverChanged.bind(this) }
            />
          </Grid.Column>
        </Grid.Row>
        <Divider hidden/>
        <Divider/>
      </div>
      );
  }
}

const selector = formValueSelector('orderForm');
const mapStateToProps = (state) => {
  const {dataBinded} = state;
  return {
    dataBinded,
    receiverName: selector(state, 'receiverName')
  }
};

export default withRouter(connect(mapStateToProps)(ReceiverSegment));