import React, {Component} from 'react';
import {
	Header,
	Grid,
	Dropdown,
	Button,
	Icon,
	Divider
} from 'semantic-ui-react';


const options = [
	{key: 'Lorem', value: 'Lorem', text: 'Lorem'},
	{key: 'ipsum', value: 'ipsum', text: 'ipsum'},
	{key: 'dolor', value: 'dolor', text: 'dolor'},
	{key: 'sit', value: 'sit', text: 'sit'},
	{key: 'amet', value: 'amet', text: 'amet'},
	{key: 'consectetur', value: 'consectetur', text: 'consectetur'},
	{key: 'adipiscing', value: 'adipiscing', text: 'adipiscing'},
	{key: 'elit', value: 'elit', text: 'elit'},
	{key: 'Etiam', value: 'Etiam', text: 'Etiam'},
	{key: 'ut', value: 'ut', text: 'ut'},
	{key: 'velit', value: 'velit', text: 'velit'},
	{key: 'leo', value: 'leo', text: 'leo'},
	{key: 'luctus', value: 'luctus', text: 'luctus'}
];

class MainForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div>
					<Grid centered>
						<Grid.Column width={12}>
							<Grid.Row>


								<Divider hidden/>
								<Divider/>
								<Divider horizontal>
									<Header block textAlign='center' as='h3' color='blue'>
										<Icon name='mail forward'/>
										<Header.Content>Sender</Header.Content>
									</Header>
								</Divider>

								<Grid.Column width={16}>
									<Dropdown
											placeholder='Sender' fluid search selection options={options}
									/>
								</Grid.Column>
							</Grid.Row>


							<Divider hidden/>
							<Divider/>
							<Divider horizontal>
								<Header block textAlign='center' as='h3' color='blue'>
									<Icon name='home'/>
									<Header.Content>Receiver</Header.Content>
								</Header>
							</Divider>

							<Grid.Row>
								<Grid.Column width={16}>
									<Dropdown
											placeholder='Receiver' fluid search selection options={options}
									/>
								</Grid.Column>
							</Grid.Row>


							<Divider hidden/>
							<Divider/>
							<Divider horizontal>
								<Header block textAlign='center' as='h3' color='blue'>
									<Icon name='send'/>
									<Header.Content>Courier</Header.Content>
								</Header>
							</Divider>

							<Grid.Row>
								<Grid.Column width={16}>
									<Dropdown
											placeholder='Courier' fluid search selection options={options}
									/>
								</Grid.Column>
							</Grid.Row>


							<Divider hidden/>
							<Divider/>
							<Divider horizontal>
								<Header block textAlign='center' as='h3' color='blue'>
									<Icon name='shop'/>
									<Header.Content>Products</Header.Content>
								</Header>
							</Divider>

							<Grid.Row>
									<Dropdown
											placeholder='Product' fluid multiple search selection options={options}
									/>
							</Grid.Row>
						</Grid.Column>
					</Grid>
				</div>
		);
	}
}

export default MainForm;