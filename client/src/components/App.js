import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MenuHeader from './MenuHeader/index';
import Dashboard from './Dashboard/index';
import Database from './Database/index';
import NotFound from './NotFound/index';
import Footer from './Footer/index';
import {
	Container,
	Segment,
	Divider,
	Icon
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

export default class App extends Component {
	render() {
		return (
				<Container textAlign='justified' style={{marginTop: '3em', marginBottom: '2em'}}>
					<BrowserRouter>
						<div>
							<MenuHeader/>

							<Segment>
								<Switch>
									<Redirect exact from='/' to='/dashboard'/>
									<Route path='/dashboard' component={Dashboard}/>
									<Route path='/database' component={Database}/>
									<Route path='*' component={NotFound}/>
								</Switch>
							</Segment>

							<Footer/>
						</div>
					</BrowserRouter>
				</Container>
		);
	}
}