import React, { Component } from 'react';
import {
	Divider
} from 'semantic-ui-react';

export default class NotFound extends Component {
	render() {
		return(
				<center>
					<header>
						<Divider hidden/>
						<Divider horizontal>
							<h1>Page Not Found</h1>
						</Divider>
						<Divider hidden/>
					</header>
				</center>
		);
	}
}