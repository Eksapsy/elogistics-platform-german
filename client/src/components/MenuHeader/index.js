import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Menu, Header, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

class MenuHeader extends Component {
	constructor(props) {
		super(props);

		const {pathname} = this.props.history.location;
		const activeItem = pathname === '/' || pathname === '/dashboard' ? 'form'
			: pathname === '/database/insert-items' || pathname === '/database/import-by-excel' ? 'database'
				: '';

		this.state = {
			activeItem
		};
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick(e, {name}) {
		this.setState({
			activeItem: name
		});
		switch (name) {
			case 'form':
				this.props.history.push('/dashboard');
				break;
			case 'database':
				this.props.history.push('/database');
				break;
			default:
				this.props.history.push('/not-found');
				break;
		}
	}


	render() {
		const {activeItem} = this.state;
		return (
			<Segment>
     <Header as='h2' textAlign='center'>
       <Icon.Group size='large'>
         <Icon circular name='shop' />
         <Icon circular style={ { paddingTop: '-10px' } } corner name='mail' />
       </Icon.Group>
       ΓΕΡΜΑΝΟΣ ΠΟΙΜΕΝΙΔΗΣ
       <Header.Subheader content='Electronic Business - Product Form' />
     </Header>
     <center>
       <Button negative onClick={ () => {
                                  	axios.get('/api/logout');
                                  	window.location.reload();
                                  } }>
         Logout
       </Button>
     </center>
     <Menu stackable pointing secondary color='blue' size='massive' widths={ 3 }>
       <Menu.Item content='Form' name='form' active={ activeItem === 'form' } onClick={ this.handleItemClick } />
       <Menu.Item content='Database' name='database' active={ activeItem === 'database' } onClick={ this.handleItemClick } />
     </Menu>
   </Segment>
			);
	}
}

export default withRouter(MenuHeader);