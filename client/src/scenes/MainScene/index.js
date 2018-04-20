import React, { Component } from 'react'
import Footer from '../../components/Footer'
import ProductList from '../../components/ProductList';
import './index.css';

export default class MainScene extends Component {
  render() {
    return (
      <div id='mainScene'>
        <ProductList/>
      </div>
    )
  }
}
