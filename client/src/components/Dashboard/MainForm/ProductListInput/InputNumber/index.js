import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Input, Menu, Transition } from 'semantic-ui-react';

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
    if (this.state.inputValue > this.state.minimumValue) {
      this.onChange(e, {
        ...this.numberInput.props,
        value: this.numberInput.props.value - 1
      });
    } else {
      this.toggleLeftArrowAnimationVisibility();
    }
  }

  increaseNumber(e) {
    if (this.state.inputValue < this.state.maximumValue) {
      this.onChange(e, {
        ...this.numberInput.props,
        value: this.numberInput.props.value + 1
      });
    } else {
      this.toggleRightArrowAnimationVisibility();
    }
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
        onKeyPress={ this.props.onKeyPress } ref={ (input) => {
                                                     this.numberInput = input
                                                   } } />
      );
  }
}

export default withRouter(InputNumber);