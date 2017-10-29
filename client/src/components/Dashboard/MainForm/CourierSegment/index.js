import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Grid, Header, Divider } from 'semantic-ui-react';
import DropdownField from '../DropdownField';
import uuid from 'uuid';

class CourierSegment extends Component {
  render() {
    const courierNames = this.props.dataBinded.couriers.map((courier) => {
      return {
        key: uuid(),
        value: courier.name,
        text: courier.name
      };
    });
    return (
      <div>
        <Divider horizontal>
          <Header block textAlign='center' as='h3' color='blue'>
            <Header.Content>Courier</Header.Content>
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Field name='courierName' component={ DropdownField } placeholder='Courier' data={ courierNames } />
          </Grid.Column>
        </Grid.Row>
      </div>

      );
  }
}

const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
  }
};

export default withRouter(connect(mapStateToProps)(CourierSegment));