import React, { Component } from 'react';
import './index.css';

export default class ProductRow extends Component {
  render() {
    return (
      <div className='productRow'>
        <span className='column productID'>id</span>
        <span className='column productName'>name</span>
        <span className='column productStorage'>15</span>
        <span className='column productOrder'>45</span>
        <span className='column productWholeSale'>123</span>
        <span className='column productRetail'>49</span>
      </div>
    )
  }
}
