import React, { Component } from 'react';
import {Table, Icon, Form} from 'semantic-ui-react';
import './index.css';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='productList'>
        <Table celled>
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

    <Table.Body>
      <Table.Row>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row positive>
        <Table.Cell>Jimmy</Table.Cell>
        <Table.Cell>
          <Icon name='checkmark' />
            Approved
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row negative>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="AMOUNT"/>
        </Table.Cell>
        <Table.Cell>
          <Form.Input placeholder="ORDER"/>
        </Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
        <Table.Cell>No Name Specified</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </div>
    )
  }
}