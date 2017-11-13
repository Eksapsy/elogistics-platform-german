import React, { PureComponent } from 'react';
import ProductItem from './ProductItem';
import AddProductComponent from '../AddProductComponent';

class ProductList extends PureComponent {
  render() {

    return (
      <ul style={ { listStyle: 'none', width: '100%' } }>
        <li>
          <AddProductComponent fields={ this.props.fields } />
        </li>
        { this.props.fields.map((product, index) => {
            return (
              <li>
                <ProductItem namePrefix={ product } index={ index } fields={ this.props.fields } />
              </li>
              );
          }) }
      </ul>
      );
  }
}

export default ProductList;