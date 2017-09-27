import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ImportExcelComponent from './ImportExcelComponent/index';
import InsertItemsForm from './InsertItemsForm/index';
import { Menu, Popup, Divider, Icon, Header } from 'semantic-ui-react';

class Database extends Component {
	render() {
		return (
			<div>
     <DatabaseHeader/>
     <DatabaseMenu {...this.props}/>
     <Route path='/database/insert-items' component={ InsertItemsForm } />
     <Route path='/database/import-by-excel' component={ ImportExcelComponent } />
   </div>
			);
	}
}

class DatabaseHeader extends Component {
	render() {
		const header = (
		<Header block textAlign='center' as='h1' color='black'>
    <Icon link name='database' />
    <Header.Content>Modify Database</Header.Content>
  </Header>
		);
		return (
			<div>
     <Divider hidden/>
     <Divider horizontal>
       <Popup inverted trigger={ header } content='Click to download Excel' />
     </Divider>
     <Divider hidden/>
   </div>
			);
	}
}

class DatabaseMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'Insert Single Items'
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	handleMenuClick(e, {name}) {
		this.setState({
			activeItem: name
		});
		switch (name) {
			case 'Insert Single Items':
				this.props.history.push('/database/insert-items');
				break;
			case 'Import Excel':
				this.props.history.push('/database/import-by-excel');
				break;
		}
	}

	render() {
		const {activeItem} = this.state;

		return (
			<div>
     <Menu stackable pointing color='blue' size='large' widths={ 2 }>
       <Menu.Item name='Insert Single Items' active={ activeItem === 'Insert Single Items' } onClick={ this.handleMenuClick } />
       <Menu.Item name='Import Excel' active={ activeItem === 'Import Excel' } onClick={ this.handleMenuClick } />
     </Menu>
     <Divider horizontal hidden/>
     <Divider horizontal hidden/>
   </div>
			);
	}
}

export default Database;