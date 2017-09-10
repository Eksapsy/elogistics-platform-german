import React, { Component } from 'react';
import {
	Container,
	Segment,
	Header,
	Divider
} from 'semantic-ui-react';

export default class Footer extends Component {
	render() {
		return(
				<Segment inverted style={{padding: '5em 20em'}}>
					<Container>
						<Divider horizontal><Header as='h3' inverted>GERMANOS POIMENIDIS</Header></Divider>
						<p>This application form is provided to help the process of sending products to the according receiver
							and the sender.</p>
					</Container>
				</Segment>
		);
	}
}