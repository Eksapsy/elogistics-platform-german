import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Segment, Divider, Header, Icon, Dropdown, Input, Menu, Transition } from 'semantic-ui-react';
import uuid from 'uuid';
import * as actions from '../../../../actions';
import './styles.css'

class ProductListInput extends Component {

  addProductItem(data) {
    console.log('====================================');
    console.log('added item!');
    console.log('====================================');
  }

  handleKeyPressOnAddComponent(e, data) {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('====================================');
      console.log(e);
      console.log('====================================');
      this.addProductItem(data);
    }
  }

  renderList() {

    let ui_items = [];
    for (let i = 0; i < this.props.emailForm.productList; i++) {
      ui_items.add(
        <Grid.Column width={ 16 }>
          <Segment color='blue'>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Dropdown placeholder='Product' fluid search selection options={ [] } size='big' />
              </Grid.Column>
              <Grid.Column width={ 4 }>
                <InputNumber updateValue={ this.updateAmount.bind(this) } />
              </Grid.Column>
            </Grid.Row>
          </Segment>
        </Grid.Column>
      );
    }

    return ui_items;
  }

  render() {


    return (
      <div>
        <Grid>
          <Grid.Row>
            <Divider hidden/>
            <Divider/>
            <Divider horizontal>
              <Header block textAlign='center' as='h3' color='blue'>
                <Icon name='shop' />
                <Header.Content>Products</Header.Content>
              </Header>
            </Divider>
          </Grid.Row>
          { this.renderList() }
          <AddProductComponent {...this.props} onKeyPress={ this.handleKeyPressOnAddComponent.bind(this) } onFilled={ this.addProductItem.bind(this) } />
        </Grid>
      </div>
      );
  }
}

class AddProductComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productValue: '',
      amountValue: 1
    };
  }

  onProductChange(e, data) {
    console.log('====================================');
    console.log('state value before: ', this.state.productValue);
    console.log('=================');
    this.setState({
      productValue: data.value
    });
    console.log('=================');
    console.log('state value after: ', this.state);
    console.log('====================================');

    this.handleChange();
  }

  onAmountChange(e, data) {
    this.setState({
      amountValue: data.value
    });
  }

  handleChange() {
    console.log('this.state.productValue:', this.state.productValue);
    if (this.state.productValue) {

      try {

        this.props.onFilled();
      } catch (e) {
        console.log('Error: ', e.message);
      }
    }
  }

  render() {
    const productNames = this.props.dataBinded.products.map((product) => {
      return {
        key: uuid(),
        value: product.id + '-' + product.name,
        text: product.id + '-' + product.name,
      };
    });

    return (
      <Grid.Column width={ 16 }>
        <Segment color='red'>
          <Grid.Row>
            <Grid.Column width={ 12 } floated='left'>
              <Dropdown placeholder='Product' fluid search selection options={ productNames } size='big' onChange={ this.onProductChange.bind(this) } />
            </Grid.Column>
            <Grid.Column width={ 4 }>
              <InputNumber onChange={ this.onAmountChange.bind(this) } onKeyPress={ this.props.onKeyPress } minimumValue={ 1 } />
            </Grid.Column>
          </Grid.Row>
        </Segment>
      </Grid.Column>
      );
  }
}

class InputNumber extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value > this.props.minimumValue || this.props.minimumValue || 0;
    this.state = {
      inputValue: value || 0,
      minimumValue: this.props.minimumValue || Number.MIN_SAFE_INTEGER,
      maximumValue: this.props.maximumValue || Number.MAX_SAFE_INTEGER,
      leftArrowAnimationVisible: true,
      rightArrowAnimationVisible: true
    }
  }


  toggleLeftArrowAnimationVisibility() {
    this.setState({
      leftArrowAnimationVisible: !this.state.leftArrowAnimationVisible
    });
  }

  toggleRightArrowAnimationVisibility() {
    this.setState({
      rightArrowAnimationVisible: !this.state.rightArrowAnimationVisible
    });
  }

  decreaseNumber(e) {
    if (this.state.inputValue > this.state.minimumValue) {
      this.setState({
        inputValue: Number(this.state.inputValue) - 1
      });
    } else {
      this.toggleLeftArrowAnimationVisibility();
    }

    this.props.onChange(e, this.state.inputValue);
  }

  increaseNumber(e) {
    if (this.state.inputValue < this.state.maximumValue) {
      this.setState({
        inputValue: Number(this.state.inputValue) + 1
      });
    } else {
      this.toggleRightArrowAnimationVisibility();
    }

    this.props.onChange(e, this.state.inputValue);
  }

  onChange(e, data) {

    this.setState({
      inputValue: Number(data.value)
    });
    this.props.onChange(e, data);
  }

  render() {
    const {leftArrowAnimationVisible, rightArrowAnimationVisible} = this.state;

    const amountArrowsLabel = (
    <Menu compact>
      <Menu.Item as='a' onClick={ this.decreaseNumber.bind(this) }>
        <Transition animation='bounce' duration={ 500 } visible={ leftArrowAnimationVisible }>
          <Icon name='chevron left' size='small' />
        </Transition>
      </Menu.Item>
      <Menu.Item as='a' onClick={ this.increaseNumber.bind(this) }>
        <Transition animation='bounce' duration={ 500 } visible={ rightArrowAnimationVisible }>
          <Icon name='chevron right' size='small' />
        </Transition>
      </Menu.Item>
    </Menu>
    );

    return (
      <Input type='number' value={ this.state.inputValue } label={ amountArrowsLabel } labelPosition='right' placeholder='Amount' size='small' onChange={ this.onChange.bind(this) }
        onKeyPress={ this.props.onKeyPress } />
      );
  }
}


const mapStateToProps = ({dataBinded, emailForm}) => {
  return {
    dataBinded,
    emailForm
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dataActions: bindActionCreators(actions.dataActions, dispatch),
    formDataActions: bindActionCreators(actions.formDataActions, dispatch)
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ProductListInput);