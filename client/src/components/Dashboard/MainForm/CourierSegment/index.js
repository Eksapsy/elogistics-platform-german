import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Header, Dropdown, Divider } from 'semantic-ui-react';
import uuid from 'uuid';
import * as actions from '../../../../actions';

class CourierSegment extends Component {

  courierChanged(e, data) {
    this.props.formDataActions.changeCourier(data.value);
  }

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
            <Dropdown ref='courierDropdown' placeholder='Courier' fluid search selection options={ courierNames } onChange={ this.courierChanged.bind(this) } />
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

const mapActionsToProps = (dispatch) => {
  return {
    formDataActions: bindActionCreators(actions.formDataActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(CourierSegment));