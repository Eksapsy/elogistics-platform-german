import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Dropdown, Divider } from 'semantic-ui-react';
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
            <Icon name='send' />
            <Header.Content>Courier</Header.Content>
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Dropdown ref='courierDropdown' placeholder='Courier' fluid search selection options={ courierNames } onChange={ this.courierChanged } />
          </Grid.Column>
        </Grid.Row>
      </div>
      );
  }
}

const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm,
  }
};


export default withRouter(connect(mapStateToProps, null)(CourierSegment));