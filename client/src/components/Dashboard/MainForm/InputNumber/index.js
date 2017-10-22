import React, { Component } from 'react';
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

  increaseAmount(e, data) {
    this.onChange(e, {
      value: Number(this.props.input.value) + 1
    });
  }

  decreaseAmount(e, data) {
    this.onChange(e, {
      value: Number(this.props.input.value) - 1
    });
  }

  onChange(e, data) {
    const value = Number(data.value);
    if ((value >= this.state.minimumValue && value <= this.state.maximumValue) || data.value === '') {
      this.props.input.onChange(value);
      if (this.props.onChange) {
        this.props.onChange(e, data);
      }
    } else if (value < this.state.minimumValue) {
      this.toggleLeftArrowAnimationVisibility();
      this.props.input.onChange(this.state.minimumValue);
    } else if (value > this.state.maximumValue) {
      this.toggleRightArrowAnimationVisibility();
      this.props.input.onChange(this.state.maximumValue);
    }

  }

  render() {
    const {leftArrowAnimationVisible, rightArrowAnimationVisible} = this.state;

    const amountArrowsLabel = (
    <Menu compact size='tiny'>
      <Menu.Item as='a' onClick={ this.decreaseAmount.bind(this) }>
        <Transition animation='bounce' duration={ 500 } visible={ leftArrowAnimationVisible }>
          <Icon name='chevron left' size='small' />
        </Transition>
      </Menu.Item>
      <Menu.Item as='a' onClick={ this.increaseAmount.bind(this) }>
        <Transition animation='bounce' duration={ 500 } visible={ rightArrowAnimationVisible }>
          <Icon name='chevron right' size='small' />
        </Transition>
      </Menu.Item>
    </Menu>
    );

    return (
      <Input {...this.props.input} type='number' action={ amountArrowsLabel } placeholder='Amount' size='tiny' onChange={ this.onChange.bind(this) } style={ { width: '50%' } }
      />
      );
  }
}

export default InputNumber;