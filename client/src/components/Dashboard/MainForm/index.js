import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Form, Header, Grid, Dropdown, Modal, Button, Icon, Divider,
} from 'semantic-ui-react';

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

	courierChanged(e, data) {
		this.setState({
			courierValue: data.value
		});
	}

	receiverAdded(e, data) {
		const receiver = this.props.emailForm.receivers.find((receiver) => {
			return receiver.name === data.value;
		})

		this.setState({
			courierValue: typeof receiver.courier === 'string' ? receiver.courier : this.refs.courierDropdown.value
		});
	}

	render() {
		const {courierValue, modalOpen} = this.state;

		const senderNames = this.props.emailForm.senders.map((sender) => {
			return {
				key: uuid(),
				value: sender.name,
				text: sender.name
			};
		});
		const receiverNames = this.props.emailForm.receivers.map((receiver) => {
			return {
				key: uuid(),
				value: receiver.name,
				text: receiver.name
			};
		});
		const courierNames = this.props.emailForm.couriers.map((courier) => {
			return {
				key: uuid(),
				value: courier.name,
				text: courier.name
			};
		});
		const productNames = this.props.emailForm.products.map((product) => {
			return {
				key: uuid(),
				value: product.id + '-' + product.name,
				text: product.id + '-' + product.name,
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
         <Divider hidden/>
         <Divider/>
         <Divider horizontal>
           <Header block textAlign='center' as='h3' color='blue'>
             <Icon name='shop' />
             <Header.Content>Products</Header.Content>
           </Header>
         </Divider>
         <Grid.Row>
           <Dropdown placeholder='Product' fluid multiple search selection options={ productNames } />
         </Grid.Row>
       </Grid.Column>
     </Grid>
     <Divider hidden/>
     <Button inverted color='blue' size='large' onClick={ this.showModal }>Submit</Button>
     <Modal basic size='small' dimmer='blurring' open={ modalOpen } onClose={ this.closeModal }>
       <Header icon='email' content='Send Order Email' />
       <Modal.Content>
         <p>Do you really want to send the Order Emails?</p>
         <p>After this confirmation an Email informing about the order is gonna be sent to both the Sender & the Receiver.</p>
       </Modal.Content>
       <Modal.Actions>
         <Button basic color='red' inverted onClick={ this.closeModal }>
           <Icon name='remove' />No
         </Button>
         <Button basic color='green' inverted>
           <Icon name='checkmark' />Yes
         </Button>
       </Modal.Actions>
     </Modal>
   </Form>
			);
	}
}

const mapStateToProps = ({emailForm}) => {
	return {
		emailForm
	}
};

export default connect(mapStateToProps)(MainForm);