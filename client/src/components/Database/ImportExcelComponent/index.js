import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import { Form, Divider, Header, Message, Grid, List, Checkbox, Icon } from 'semantic-ui-react';
import * as actions from '../../../actions';

class ImportExcelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replaceOldDatabase: true
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleCheckboxChange(e, state) {
    const {checked} = state;
    this.setState({
      replaceOldDatabase: checked
    });
  }

  renderDatabaseChangeWarning() {

    if (this.state.replaceOldDatabase === false) {
      return (
        <Header as='h4' color='red' content='I hope you are sure about that' />
        );
    }
  }

  async onDrop(files) {
    if (files.length > 0) {
      this.openLoading();

      await superagent.post('/api/upload')
        .attach('file', files[0])
        .field('replaceOldDatabase', this.state.replaceOldDatabase)
        .catch(err => {
          console.error('Error on attempt to upload xlsx file');
          console.error(err);
        }).then(() => {
        this.closeLoading();
        window.location.reload();
      });
    } else {
      this.props.webActions.error('Invalid File!', false);
    }
  }

  closeLoading() {
    this.props.webActions.toggleLoader(false);
  }

  openLoading() {
    this.props.webActions.toggleLoader(true);
  }

  render() {
    return (
      <Form>
        <Divider horizontal>
          <Header block content='Import Excel' as='h2' color='black' />
        </Divider>
        <Message>
          <center>
            <Message.Header>
              <Header as='h3' color='red'>
                <Icon name='warning sign' /> DON'T USE THIS IF YOU'RE NOT ADVISED TO USE IT!
              </Header>
            </Message.Header>
            <p><strong>Importing excel should be done by an expert!</strong></p>
          </center>
        </Message>
        <Message>
          <center>
            <Header content='Replace old database' as='h3' color='blue' />
            <Checkbox toggle fitted onChange={ this.handleCheckboxChange } defaultChecked/>
            { this.renderDatabaseChangeWarning() }
          </center>
        </Message>
        <Divider/>
        <Message attached color='blue' size='large'>
          <Grid columns={ 3 }>
            <Grid.Column>
              <center>
                <Divider vertical/>
                <Header>Receiver Sheet</Header>
                <p>Receivers</p>
              </center>
            </Grid.Column>
            <Grid.Column>
              <center>
                <Divider vertical/>
                <Header>Courier Sheet</Header>
                <p>Couriers</p>
              </center>
            </Grid.Column>
            <Grid.Column>
              <center>
                <Divider vertical/>
                <Header>Product Sheet</Header>
                <p>Products</p>
              </center>
            </Grid.Column>
          </Grid>
        </Message>
        <center>
          <Dropzone name='file' multiple={ false } onDrop={ this.onDrop }>
            Drop Excel Files here
          </Dropzone>
          <Header as='h4' color='green' content='' />
        </center>
        <Message attached='bottom' color='blue' size='small'>
          <Grid columns={ 3 }>
            <Grid.Row>
              <Grid.Column width={ 16 }>
                <Header block as='h4' color='red' content='RED covered fields are REQUIRED in the sheet' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List as='ol'>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>ID</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>NAME</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>EMAIL</List.Item>
                  <List.Item as='li' value='➡'>COURIER</List.Item>
                  <List.Item as='li' value='➡'>VAT NUMBER</List.Item>
                  <List.Item as='li' value='➡'>DOY NUMBER</List.Item>
                  <List.Item as='li' value='➡'>ADDRESS</List.Item>
                  <List.Item as='li' value='➡'>ZIP CODE</List.Item>
                  <List.Item as='li' value='➡'>LOCATION</List.Item>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>PHONE #1</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>PHONE #2</List.Item>
                </List>
                <Divider vertical/>
              </Grid.Column>
              <Grid.Column>
                <List as='ol'>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>NAME</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>LOCATION</List.Item>
                  <List.Item as='li' value='➡'>PHONE</List.Item>
                </List>
                <Divider vertical/>
              </Grid.Column>
              <Grid.Column>
                <List as='ol'>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>ID</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>NAME</Header>
                  </List.Item>
                </List>
                <Divider vertical/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Message>
      </Form>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  webActions: bindActionCreators(actions.webActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ImportExcelComponent);