import React, {Component} from 'react';
import {
	Form,
	Divider,
	Header,
	Message,
	Grid,
	Button,
	Icon
} from 'semantic-ui-react';

export default class Database extends Component {
	render() {
		return (
				<Form>
					<Divider hidden/>
					<Divider horizontal>
						<Header block textAlign='center' as='h1' color='black'>
							<Icon link name='database'/>
							<Header.Content>Modify Database</Header.Content>
						</Header>
					</Divider>
					<Divider hidden/>
					<Divider horizontal>
						<Header content='Import Excel' as='h2' color='black'/>
					</Divider>
					<Message
							attached
							color='blue'
							size='large'
					>
						<Grid columns={7}>
							<Grid.Column>
								<Header>1st Column:</Header>
								Sender Names
								<Divider vertical/>
							</Grid.Column>
							<Grid.Column>
								<Header>2nd Column:</Header>
								Sender Emails
								<Divider vertical/>
							</Grid.Column>
							<Grid.Column>
								<Header>3rd Column:</Header>
								Receiver Names
								<Divider vertical/>
							</Grid.Column>
							<Grid.Column>
								<Header>4th Column:</Header>
								Receiver Emails
								<Divider vertical/>
							</Grid.Column>
							<Grid.Column>
								<Header>5th Column:</Header>
								Receiver Couriers
								<Divider vertical/>
							</Grid.Column>
							<Grid.Column>
								<Header>6th Column:</Header>
								Courier Names
								<Divider vertical/>
							</Grid.Column>
							<Grid.Column>
								<Header>7th Column:</Header>
								Product Names
								<Divider vertical/>
							</Grid.Column>
						</Grid>
					</Message>
					<Grid columns={3} centered>
						<Grid.Column width={2} className='attached fluid segment'>
							<Button content='Import' basic color='red' size='large'/>
						</Grid.Column>
						<Grid.Column width={16}>

						</Grid.Column>
					</Grid>
				</Form>
		);
	}
}