import React, { Component } from 'react';
import ProductRow from './ProductRow';
import './index.css';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.productRows = this.productRows.bind(this);
  }
  productRows() {
  let rows = [<ProductRow />, <ProductRow />];
    
    return (
      rows.map((row, index) => {
        return (
          row
        );
      })  
    );
  }
  render() {
    return (
      <div className='productList'>
        {this.productRows()}
      </div>
    )
  }
}