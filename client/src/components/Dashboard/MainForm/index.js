import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Form, Header, Grid, Dropdown, Modal, Button, Icon, Divider } from 'semantic-ui-react';
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

    const senderNames = this.props.dataBinded.senders.map((sender) => {
      return {
        key: uuid(),
        value: sender.name,
        text: sender.name
      };
    });
    const receiverNames = this.props.dataBinded.receivers.map((receiver) => {
      return {
        key: uuid(),
        value: receiver.name,
        text: receiver.name
      };
    });
    const courierNames = this.props.dataBinded.couriers.map((courier) => {
      return {
        key: uuid(),
        value: courier.name,
        text: courier.name
      };
    });

    return (
      <Form>
        <Divider horizontal hidden/>
        <Grid centered>
          <Grid.Column width={ 12 }>
            <Grid.Row>
              <Divider hidden/>
              <Divider/>
              <Divider horizontal>
                <Header block textAlign='center' as='h3' color='blue'>
                  <Icon name='mail forward' />
                  <Header.Content>Sender</Header.Content>
                </Header>
              </Divider>
              <Grid.Column width={ 16 }>
                <Dropdown placeholder='Sender' fluid search selection options={ senderNames } />
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>
            <Divider/>
            <Divider horizontal>
              <Header block textAlign='center' as='h3' color='blue'>
                <Icon name='home' />
                <Header.Content>Receiver</Header.Content>
              </Header>
            </Divider>
            <Grid.Row>
              <Grid.Column width={ 16 }>
                <Dropdown placeholder='Receiver' fluid search selection options={ receiverNames } onChange={ this.receiverAdded } />
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>
            <Divider/>
            <Divider horizontal>
              <Header block textAlign='center' as='h3' color='blue'>
                <Icon name='send' />
                <Header.Content>Courier</Header.Content>
              </Header>
            </Divider>
            <Grid.Row>
              <Grid.Column width={ 16 }>
                <Dropdown value={ courierValue } ref='courierDropdown' placeholder='Courier' fluid search selection options={ courierNames } onChange={ this.courierChanged }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <ProductListInput/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Divider hidden/>
        <Button inverted color='blue' size='large' onClick={ this.showModal }>Submit</Button>
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

const mapStateToProps = ({dataBinded, emailForm, components}) => {
  return {
    dataBinded,
    emailForm,
    components
  }
};

export default withRouter(connect(mapStateToProps)(MainForm));