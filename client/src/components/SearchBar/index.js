import React, { Component } from 'react';
import { Menu, Search } from 'semantic-ui-react';
// import './index.css';

export default class SearchBar extends Component {
  render() {
    return (
        <Menu>
          <Menu.Item position='right'>
            <Search/>
          </Menu.Item>
        </Menu>
    )
  }
}
