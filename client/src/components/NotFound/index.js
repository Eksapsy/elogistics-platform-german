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

						<h4>Darth Vader would be proud of seeing you trying to find the Dark Secrets of this Website</h4>
						<Divider hidden/>
					</header>
				</center>
		);
	}
}