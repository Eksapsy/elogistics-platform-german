import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Divider, Header, Input } from 'semantic-ui-react';
import * as actions from '../../../../actions';

class CostSegment extends Component {
  onChange(e, data) {
    this.props.formDataActions.changeCost(data.value);
  }
  render() {
    return (
      <div>
        <Divider horizontal>
          <Header as='h3' content='Cost' color='blue' block/>
        </Divider>
        <Segment color='blue' style={ { width: '12em', margin: 'auto' } }>
          <Input placeholder='Total Cost' fluid label='€' labelPosition='right' onChange={ this.onChange.bind(this) } />
        </Segment>
      </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  formDataActions: bindActionCreators(actions.formDataActions, dispatch)
});

export default connect(null, mapDispatchToProps)(CostSegment);