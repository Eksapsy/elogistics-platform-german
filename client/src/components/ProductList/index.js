import React, { Component } from 'react';
import {Table, Sticky, Form} from 'semantic-ui-react';
import './index.css';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    const { products } = props;
    
    this.state = { products: products || [] };
  }

  productsTable() {
    let headers = (
        <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>PRODUCT</Table.HeaderCell>
              <Table.HeaderCell>AMOUNT</Table.HeaderCell>
              <Table.HeaderCell>ORDER</Table.HeaderCell>
              <Table.HeaderCell>RETAIL</Table.HeaderCell>
              <Table.HeaderCell>WHOLESALE</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
    let productRows = [];

    productRows.push(this.state.products.map((product, index) => {
      return (
        <Table.Row>
          <Table.Cell width={2}>{product.id}</Table.Cell>
          <Table.Cell width={2} singleLine>{product.name}</Table.Cell>
          <Table.Cell width={1}>
            <Form.Input placeholder="Amount" value={product.amount} size='tiny'/>
          </Table.Cell>
          <Table.Cell width={1}>
            <Form.Input placeholder="Order" value={product.order}/>
          </Table.Cell>
          <Table.Cell textAlign='right' width={2}>{product.retail}€</Table.Cell>
          <Table.Cell textAlign='right' width={2}>{product.wholesale}€</Table.Cell>
        </Table.Row>
      );
    }));

    return (
      <Table celled columns={10} sortable basic>
        {headers}
        <Table.Body>
          {productRows.map((product, index) => {
            return (
              product
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  render() {
    return (
      <div className='productList'>
        {this.productsTable()}
      </div>
    )
  }
}