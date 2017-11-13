import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form';
import { Grid, Divider, Header } from 'semantic-ui-react';
import ProductList from './ProductList';
import './styles.css'

class ProductListSegment extends PureComponent {

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Divider hidden/>
            <Divider/>
            <Divider horizontal>
              <Header block textAlign='center' as='h3' color='blue'>
                <Header.Content>Products</Header.Content>
              </Header>
            </Divider>
          </Grid.Row>
          <Grid.Row width={ 16 }>
            <FieldArray name='productList' component={ ProductList } />
          </Grid.Row>
        </Grid>
      </div>
      );
  }
}

export default ProductListSegment;