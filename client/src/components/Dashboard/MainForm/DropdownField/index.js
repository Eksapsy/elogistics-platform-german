import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

class DropdownField extends PureComponent {
  handleChange(e, {value}) {
    this.props.input.onChange(value);
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }
  
  render() {
    const {touched, error, warning} = this.props.meta;
    return (
      <div>
        <Dropdown {...this.props.input} placeholder={ this.props.placeholder } fluid search selection options={ this.props.data } size='big' onChange={ this.handleChange.bind(this) } />
        { touched && ((error && <Header as='h5' color='red'>
                                  { error }
                                </Header>) || (warning && <span>{ warning }</span>)) }
      </div>
      );
  }
}

export default DropdownField;