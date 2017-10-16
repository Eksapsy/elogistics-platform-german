import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Grid, Segment, Divider, Header, Icon, Dropdown } from 'semantic-ui-react';
import * as actions from '../../../../actions';
import uuid from 'uuid';
import AddProductComponent from './AddProductComponent';
import InputNumber from './InputNumber';
import _ from 'lodash';
import './styles.css'

class ProductListInput extends Component {



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
          <FieldArray name='productList' component={} />
          </Grid.Row>
          <Grid.Row width={ 16 }>
            {/* Add Component */}
          </Grid.Row>
        </Grid>
      </div>
      );
  }
}

class ProductList extends Component {
  render() {
    
  }
}


const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm,
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dataActions: bindActionCreators(actions.dataActions, dispatch),
    formDataActions: bindActionCreators(actions.formDataActions, dispatch)
  }
}

export default reduxForm({ form: 'productListSegment' })(withRouter(connect(mapStateToProps, mapActionsToProps)(ProductListInput)));