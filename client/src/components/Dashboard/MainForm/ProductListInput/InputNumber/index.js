import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Icon, Input, Menu, Transition } from 'semantic-ui-react';

class InputNumber extends Component {
  constructor(props) {
    super(props);

    const minimumValue = typeof this.props.minimumValue === 'number' ? this.props.minimumValue : Number.MIN_SAFE_INTEGER;
    const maximumValue = typeof this.props.maximumValue === 'number' ? this.props.maximumValue : Number.MAX_SAFE_INTEGER;

    this.state = {
      minimumValue,
      maximumValue,
      leftArrowAnimationVisible: true,
      rightArrowAnimationVisible: true
    };
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

  onChange(e, data) {
    const value = Number(data.value);
    if ((value >= this.state.minimumValue && value <= this.state.maximumValue) || data.value === '') {
      if (this.props.onChange) {
        this.props.onChange(e, data);
      }
    } else if (value < this.state.minimumValue) {
      this.toggleLeftArrowAnimationVisibility();
    } else if (value > this.state.maximumValue) {
      this.toggleRightArrowAnimationVisibility();
    }

  }

  render() {
    const {leftArrowAnimationVisible, rightArrowAnimationVisible} = this.state;

    const amountArrowsLabel = (
    <Menu compact size='tiny'>
      <Menu.Item as='a'>
        <Transition animation='bounce' duration={ 500 } visible={ leftArrowAnimationVisible }>
          <Icon name='chevron left' size='small' />
        </Transition>
      </Menu.Item>
      <Menu.Item as='a'>
        <Transition animation='bounce' duration={ 500 } visible={ rightArrowAnimationVisible }>
          <Icon name='chevron right' size='small' />
        </Transition>
      </Menu.Item>
    </Menu>
    );

    return (
      // Enable this when amountArrowsLabel is fixed.
      <Input type='number' value={ this.props.value } action={ amountArrowsLabel } placeholder='Amount' size='tiny' onChange={ this.onChange.bind(this) } onKeyPress={ this.props.onKeyPress }
        style={ { width: '128px' } } />
      // <Input type='number' value={ this.props.value } placeholder='Amount' size='tiny' onChange={ this.onChange.bind(this) } onKeyPress={ this.props.onKeyPress } style={ { width: '256px' } }
      // />
      );
  }
}

export default InputNumber;