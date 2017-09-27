import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import { Form, Divider, Header, Message, Grid, List, Checkbox, Icon } from 'semantic-ui-react';

export default class ImportExcelComponent extends Component {
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

  onDrop(files) {
    superagent.post('/api/upload')
      .attach('file', files[0])
      .field('replaceOldDatabase', this.state.replaceOldDatabase)
      .end((err, res) => {
        if (err) console.log(err);
      });
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
            <p><strong>
                  								Importing excel should be done by an expert!
                  							</strong></p>
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
          <Grid columns={ 4 }>
            <Grid.Column>
              <Divider vertical/>
              <Header>Sender Sheet</Header>
              <p>Senders</p>
            </Grid.Column>
            <Grid.Column>
              <Divider vertical/>
              <Header>Receiver Sheet</Header>
              <p>Receivers</p>
            </Grid.Column>
            <Grid.Column>
              <Divider vertical/>
              <Header>Courier Sheet</Header>
              <p>Couriers</p>
            </Grid.Column>
            <Grid.Column>
              <Divider vertical/>
              <Header>Product Sheet</Header>
              <p>Products</p>
            </Grid.Column>
          </Grid>
        </Message>
        <center>
          <Dropzone name='file' multiple={ false } accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onDrop={ this.onDrop }>
            Drop Excel Files here
          </Dropzone>
          <Header as='h4' color='green' content='' />
        </center>
        <Message attached='bottom' color='blue' size='small'>
          <Grid columns={ 4 }>
            <Grid.Row>
              <Grid.Column width={ 16 }>
                <Header block as='h4' color='red' content='RED covered fields are REQUIRED in the sheet' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <List as='ol'>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>NAME</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>EMAIL</Header>
                  </List.Item>
                </List>
                <Divider vertical/>
              </Grid.Column>
              <Grid.Column>
                <List as='ol'>
                  <List.Item as='li' value='➡'>ID</List.Item>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>NAME</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>EMAIL</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>COURIER</List.Item>
                  <List.Item as='li' value='➡'>VAT NUMBER</List.Item>
                  <List.Item as='li' value='➡'>ADDRESS</List.Item>
                  <List.Item as='li' value='➡'>ZIP CODE</List.Item>
                  <List.Item as='li' value='➡'>LOCATION</List.Item>
                  <List.Item as='li' value='➡'>PHONE #1</List.Item>
                  <List.Item as='li' value='➡'>PHONE #2</List.Item>
                </List>
                <Divider vertical/>
              </Grid.Column>
              <Grid.Column>
                <List as='ol'>
                  <List.Item as='li' value='➡'>
                    <Header as='h5' color='red'>NAME</Header>
                  </List.Item>
                  <List.Item as='li' value='➡'>EMAIL</List.Item>
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
                  <List.Item as='li' value='➡'>RETAIL PRICE</List.Item>
                  <List.Item as='li' value='➡'>WHOLE PRICE</List.Item>
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
