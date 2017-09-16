import React, {Component} from 'react';
import {
	Form,
	Divider,
	Header,
} from 'semantic-ui-react';

export default class InsertItemsForm extends Component {
	render() {
		return (
				<div>
					<Form>
						<Divider horizontal>
							<Header as='h2' content='Insert Items'/>
						</Divider>
					</Form>
				</div>
		);
	}
}