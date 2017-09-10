import React, { Component } from 'react';
import {
	Container,
	Form,
	Header,
	Message,
	Divider,
	Button,
	Icon
} from 'semantic-ui-react';
import MainForm from './MainForm/index';
import './styles.css';


export default class Dashboard extends Component {
	render() {
		return(
				<Container textAlign='center'>
					<Divider hidden/>
					<Divider horizontal>
						<Header block textAlign='center' as='h1' color='black'>
							<Icon link name='browser'/>
							<Header.Content>Fill The Form</Header.Content>
						</Header>
					</Divider>
					<Divider hidden/>

					<Form>
						<MainForm/>
						<Divider horizontal hidden/>

						<Button inverted color='blue' size='large'>Submit</Button>
					</Form>
				</Container>
		);
	}
}