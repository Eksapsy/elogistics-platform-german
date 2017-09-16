import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	Segment,
	Menu,
	Header,
	Icon
} from 'semantic-ui-react';

class MenuHeader extends Component {
	constructor(props) {
		super(props);

		const { pathname } = this.props.history.location;
		const activeItem =
				pathname === '/' || pathname === '/dashboard' ? 'Form'
						: pathname === '/database/insert-items' || pathname === '/database/import-by-excel' ? 'Database'
								: '';

		this.state = { activeItem };
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick(e, { name} ) {
		this.setState({ activeItem: name });
		switch(name) {
			case 'Form':
				this.props.history.push('/dashboard');
				break;
			case 'Database':
				this.props.history.push('/database');
				break;
		}
	}


	render() {
		const { activeItem, contextRef } = this.state;
		return(
				<Segment>

					<Header as='h2' textAlign='center' >
						<Icon.Group size='large'>
							<Icon circular name='shop'/>
							<Icon circular style={{paddingTop: '-10px'}} corner name='mail'/>
						</Icon.Group>
						ΓΕΡΜΑΝΟΣ ΠΟΙΜΕΝΙΔΗΣ

						<Header.Subheader
								as='h4'
								content='Electronic Business - Product Form'
						/>
					</Header>

						<Menu stackable pointing secondary color='blue' size='massive' widths={3}>
							<Menu.Item name='Form' active={activeItem === 'Form'} onClick={this.handleItemClick}/>
							<Menu.Item name='Database' active={activeItem === 'Database'} onClick={this.handleItemClick}/>
						</Menu>
				</Segment>
		);
	}
}

export default withRouter(MenuHeader);