import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Input, Menu, Transition } from 'semantic-ui-react';

class InputNumber extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value > this.props.minimumValue ? this.props.value : this.props.minimumValue;
    this.minimumValue = typeof this.props.minimumValue === 'number' ? this.props.minimumValue : Number.MIN_SAFE_INTEGER;
    this.maximumValue = typeof this.props.maximumValue === 'number' ? this.props.maximumValue : Number.MAX_SAFE_INTEGER;
    this.state = {
      inputValue: Number.parseInt(value),
      leftArrowAnimationVisible: true,
      rightArrowAnimationVisible: true
    };
  }

  componentWillReceiveProps() {}

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
    const newValue = this.numberInput.props.value - 1;
    if (newValue >= this.minimumValue) {
      this.onChange(e, {
        ...this.numberInput.props,
        value: this.numberInput.props.value - 1
      });
    } else {
      this.toggleLeftArrowAnimationVisibility();
    }
  }

  increaseNumber(e) {
    const newValue = this.numberInput.props.value + 1;
    if (newValue <= this.maximumValue) {
      this.onChange(e, {
        ...this.numberInput.props,
        value: this.numberInput.props.value + 1
      });
    } else {
      this.toggleRightArrowAnimationVisibility();
    }
  }

  onChange(e, data) {
    if (data.value >= this.minimumValue && data.value <= this.maximumValue) {
      this.setState({
        inputValue: Number.parseInt(data.value)
      });
      this.props.onChange(e, data);
    } else if (data.value < this.minimumValue) {
      this.toggleLeftArrowAnimationVisibility();
    } else if (data.value > this.maximumValue) {
      this.toggleRightArrowAnimationVisibility();
    }

  }

  render() {
    const {leftArrowAnimationVisible, rightArrowAnimationVisible} = this.state;

    const amountArrowsLabel = (
    <Menu compact size='tiny'>
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
      <Input type='number' value={ this.state.inputValue } label={ amountArrowsLabel } labelPosition='right' placeholder='Amount' size='tiny' onChange={ this.onChange.bind(this) } onKeyPress={ this.props.onKeyPress }
        style={ { width: '128px' } } ref={ (input) => {
                                             this.numberInput = input
                                           } } />
      );
  }
}

export default withRouter(InputNumber);