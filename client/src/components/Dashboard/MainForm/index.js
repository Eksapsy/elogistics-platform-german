import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Header, Grid, Modal, Button, Icon, Divider } from 'semantic-ui-react';
import SenderSegment from './SenderSegment';
import ReceiverSegment from './ReceiverSegment';
import CourierSegment from './CourierSegment';
import ProductListInput from './ProductListInput';
import axios from 'axios';

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };

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

  async submitEmail() {
    try {
      window.location.reload();
      await axios.post('/api/send-email', {
        receiver: this.props.emailForm.receiver,
        courier: this.props.emailForm.courier,
        products: this.props.emailForm.products.map((product) => {
          return {
            id: product.name.slice(0, 8),
            name: product.name.slice(9),
            amount: product.amount
          }
        })
      });

    } catch (e) {
      console.log('Something went wrong, check for any undefined inputs');
      console.error('Exception: ', e);
    } finally {
      this.setState({
        modalOpen: false
      });
    }
  }

  render() {
    const {modalOpen} = this.state;

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
            <p><strong>Θέλετε πραγματικά να στείλετε Email στο Λογιστήριο;</strong></p>
            <p>Μετά την επιβεβαίωση, Email θα σταλθεί στο <strong>auto@gpsupplies.gr</strong> και στο <strong>λογιστήριο</strong> σχετικά με την περιγραφή της παραγγελίας.</p>
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