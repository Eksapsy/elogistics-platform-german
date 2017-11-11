import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ImportExcelComponent from './ImportExcelComponent/index';
import InsertItemsForm from './InsertItemsForm/index';
import { Container, Segment, Menu, Popup, Divider, Icon, Header } from 'semantic-ui-react';
import axios from 'axios';
import FileDownload from 'react-file-download';

class Database extends Component {
	render() {
		return (
			<Container textAlign='justified' style={ { marginTop: '3em', marginBottom: '2em' } }>
     <div>
       <Segment color='yellow'>
         <DatabaseHeader/>
         <DatabaseMenu {...this.props}/>
         <Route path='/database/insert-items' component={ InsertItemsForm } />
         <Route path='/database/import-by-excel' component={ ImportExcelComponent } />
       </Segment>
     </div>
   </Container>
			);
	}
}

class DatabaseHeader extends Component {
	onDownloadExcelIconClick(e) {
		e.preventDefault();
		axios.get('/api/downloadexcel').then(response => {
			FileDownload(response.data, 'elogisticsExport.xlsx');
		});
	}
	render() {
		const header = (

		<Header block textAlign='center' as='h1' color='black'>
    <a href='/api/downloadexcel'>
      <Icon link name='database' style={ { textShadow: '1px 1px 1px rgba(120,120,120,0.6)' } } />
    </a>
    <Header.Content>Modify Database</Header.Content>
  </Header>

		);
		return (
			<div>
     <Divider hidden/>
     <Divider horizontal>
       <Popup inverted trigger={ header } content='Click to download Excel' position='top left' />
     </Divider>
     <Divider hidden/>
   </div>
			);
	}
}

class DatabaseMenu extends Component {
	constructor(props) {
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	componentWillMount() {
		switch (this.props.location.pathname) {
			case '/database/insert-items':
				this.state = {
					activeItem: 'Insert Single Items'
				};
				break;
			case '/database/import-by-excel':
				this.state = {
					activeItem: 'Import Excel'
				};
				break;
			default:
				this.props.history.push('/database/insert-items');
				this.state = {
					activeItem: 'Insert Single Items'
				};
				break;
		}
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
			default:
				this.props.history.push('/not-found');
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

const mapActionsToProps = (dispatch) => {
	return {
		dataActions: bindActionCreators(actions.dataActions, dispatch)
	};
};

export default connect(null, mapActionsToProps)(Database);