import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Header, Grid, Message, Modal, Button, Icon, Divider } from 'semantic-ui-react';
import { reduxForm, formValueSelector } from 'redux-form';
// import validation from './validation'
import SenderSegment from './SenderSegment';
import ReceiverSegment from './ReceiverSegment';
import CourierSegment from './CourierSegment';
import CostSegment from './CostSegment';
import ProductListSegment from './ProductListSegment';
import axios from 'axios';
import _ from 'lodash';

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
        sender: this.props.webData.profile.displayName,
        receiver: _.find(this.props.dataBinded.receivers, {
          name: this.props.receiver
        }),
        courier: this.props.courier,
        products: this.props.productList.map((product) => {
          return {
            id: product.name.slice(0, 8),
            name: product.name.slice(9),
            amount: product.amount
          }
        }),
        cost: this.props.cost
      });

    } catch (e) {
      console.error('Something went wrong, check for any undefined inputs');
      console.error('Exception: ', e);
    } finally {
      this.setState({
        modalOpen: false
      });
    }
  }

  allFieldsFilled() {
    return this.props.receiver && this.props.courier && this.props.cost && this.props.productList;
  }

  render() {
    const {modalOpen} = this.state;
    const {pristine, submitting} = this.props;

    return (
      <Form onSubmit={ this.showModal }>
        <Divider horizontal hidden/>
        <Grid centered>
          <Grid.Column width={ 12 }>
            <Grid.Row>
              <Message info>
                <Message.Header>
                  Email
                </Message.Header>
                <Message.Content>
                  <center>Email is sent by</center>
                  <Header textAlign='center' as='h4' content='auto@gpsupplies.gr' block/>
                </Message.Content>
              </Message>
            </Grid.Row>
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
              <CostSegment/>
            </Grid.Row>
            <Grid.Row>
              <ProductListSegment/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Divider hidden/>
        <center>
          <Form.Button type='submit' inverted color='blue' size='large' disabled={ pristine || submitting || !this.allFieldsFilled() }>Submit</Form.Button>
        </center>
        <Modal basic size='small' dimmer='blurring' open={ modalOpen } onClose={ this.closeModal }>
          <Header icon='mail' content='Send Order Email' />
          <Modal.Content>
            <p><strong>Θέλετε πραγματικά να στείλετε Email στο Λογιστήριο;</strong></p>
            <p>Μετά την επιβεβαίωση, Email θα σταλθεί στο <strong>auto@gpsupplies.gr</strong> και στο <strong>λογιστήριο</strong> σχετικά με την περιγραφή της παραγγελίας.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button type='button' basic color='red' inverted onClick={ this.closeModal }>
              <Icon name='remove' />No
            </Button>
            <Button type='button' basic color='green' inverted onClick={ this.submitEmail }>
              <Icon name='checkmark' />Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
      );
  }
}
const orderFormSelector = formValueSelector('orderForm');
const mapStateToProps = (state) => {
  const {dataBinded, webData} = state;
  return {
    dataBinded,
    webData,
    receiver: orderFormSelector(state, 'receiverName'),
    courier: orderFormSelector(state, 'courierName'),
    cost: orderFormSelector(state, 'costValue'),
    productList: orderFormSelector(state, 'productList')
  }
};

export default reduxForm({
  form: 'orderForm'
})(withRouter(connect(mapStateToProps)(MainForm)));