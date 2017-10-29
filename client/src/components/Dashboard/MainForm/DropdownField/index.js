import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class DropdownField extends Component {
  handleChange(e, {value}) {
    this.props.input.onChange(value);
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    return (
      <div>
        <Dropdown {...this.props.input} placeholder={ this.props.placeholder } fluid search selection options={ this.props.data } size='big' onChange={ this.handleChange.bind(this) } />
      </div>
      );
  }
}

export default DropdownField;