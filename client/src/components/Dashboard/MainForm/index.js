import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Form, Header, Grid, Dropdown, Modal, Button, Icon, Divider } from 'semantic-ui-react';
import SenderSegment from './SenderSegment';
import ReceiverSegment from './ReceiverSegment';
import CourierSegment from './CourierSegment';
import ProductListInput from './ProductListInput';

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courierValue: '',
      modalOpen: false
    };
    this.receiverAdded = this.receiverAdded.bind(this);
    this.courierChanged = this.courierChanged.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  showModal() {
    this.setState({
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  submitEmail() {}

  courierChanged(e, data) {
    this.setState({
      courierValue: data.value
    });
  }

  receiverAdded(e, data) {
    const receiver = this.props.dataBinded.receivers.find((receiver) => {
      return receiver.name === data.value;
    })

    this.setState({
      courierValue: typeof receiver.courier === 'string' ? receiver.courier : this.refs.courierDropdown.value
    });
  }

  render() {
    const {courierValue, modalOpen} = this.state;





    return (
      <Form>
        <Divider horizontal hidden/>
        <Grid centered>
          <Grid.Column width={ 12 }>
            <Grid.Row>
              <SenderSegment/>
            </Grid.Row>
            <Divider hidden/>
            <Divider/>
            <Grid.Row>
              <ReceiverSegment/>
            </Grid.Row>
            <Grid.Row>
              <CourierSegment/>
            </Grid.Row>
            <Grid.Row>
              <ProductListInput/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Divider hidden/>
        <center>
          <Button inverted color='blue' size='large' onClick={ this.showModal }>Submit</Button>
        </center>
        <Modal basic size='small' dimmer='blurring' open={ modalOpen } onClose={ this.closeModal }>
          <Header icon='mail' content='Send Order Email' />
          <Modal.Content>
            <p>Do you really want to send the Order Emails?</p>
            <p>After this confirmation an Email informing about the order is gonna be sent to both the Sender & the Receiver.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={ this.closeModal }>
              <Icon name='remove' />No
            </Button>
            <Button basic color='green' inverted onClick={ this.submitEmail }>
              <Icon name='checkmark' />Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
      );
  }
}

const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm,
  }
};

export default withRouter(connect(mapStateToProps)(MainForm));