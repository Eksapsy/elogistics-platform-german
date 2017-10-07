import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Input, Menu, Transition } from 'semantic-ui-react';

class InputNumber extends Component {
  constructor(props) {
    super(props);

    let value = 0;
    this.minimumValue = typeof this.props.minimumValue === 'number' ? this.props.minimumValue : Number.MIN_SAFE_INTEGER;
    this.maximumValue = typeof this.props.maximumValue === 'number' ? this.props.maximumValue : Number.MAX_SAFE_INTEGER;
    if (typeof this.props.value === 'number' && this.props.value >= this.minimumValue && this.props.value <= this.maximumValue) {
      value = this.props.value;
    } else if (this.props.minimumValue) {
      value = this.props.minimumValue;
    }
    this.state = {
      inputValue: Number.parseInt(value, 10),
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

  decreaseNumber(e) {
    const newValue = this.numberInput.props.value - 1;
    if (newValue >= this.minimumValue) {
      this.onChange(e, {
        value: newValue
      });
    } else {
      this.toggleLeftArrowAnimationVisibility();
    }
  }

  increaseNumber(e) {
    const newValue = this.numberInput.props.value + 1;
    if (newValue >= this.minimumValue) {
      this.onChange(e, {
        value: newValue
      });
    } else {
      this.toggleRightArrowAnimationVisibility();
    }
  }

  onChange(e, data) {
    console.log('event', e);
    if (e.target.value >= this.minimumValue && e.target.value <= this.maximumValue) {
      this.setState({
        inputValue: Number.parseInt(data.value, 10)
      });
      try {
        this.props.onChange(e);
      } catch (e) {}
    } else if (e.target.value < this.minimumValue) {
      this.toggleLeftArrowAnimationVisibility();
    } else if (e.target.value > this.maximumValue) {
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
      // Enable this when amountArrowsLabel is fixed.
      // <Input type='number' value={ this.state.inputValue } action={ amountArrowsLabel } placeholder='Amount' size='tiny' onChange={ this.onChange.bind(this) } onKeyPress={ this.props.onKeyPress }
      //   style={ { width: '128px' } } ref={ (input) => {
      //                                        this.numberInput = input
      //                                      } } />
      <Input type='number' value={ this.state.inputValue } placeholder='Amount' size='tiny' onChange={ this.onChange.bind(this) } onKeyPress={ this.props.onKeyPress } style={ { width: '256px' } }
        ref={ (input) => {
                this.numberInput = input
              } } />
      );
  }
}

export default withRouter(InputNumber);