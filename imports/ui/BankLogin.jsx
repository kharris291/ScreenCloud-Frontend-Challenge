import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class BankLogin extends Component {
   constructor(props) {
    super(props);

    this.state=this.props.state;
    this.retrieveBalance = this.retrieveBalance.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  retrieveBalance() {
    var test = 0;
    test = Meteor.call('loadBankBalance', this.state, (error, result) => {
        if (result.value.response != undefined) {
          console.warn("There was an error sending the message.", "", result.value.response.data.error);
          this.setState({
            error: result.value.response.data.error,
          });
          return;
        }
        if (result.value.response == undefined) {
          this.setState({
            balance: result.value.data.currentBalance
          });
          this.setState({
            signedIn: "true"
          });
          this.props.updateState("balance", this.state.balance );
          this.props.updateState("signedIn", this.state.signedIn );
          if(this.state.error != ""){
            this.setState({error: ''});
          }
        } 
      }
    );
  }

  render() {
    if( this.state.balance == 0){
      const { error } = this.state
      
      return (
         <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column >
              <div className="row">
                <div>
                  <Header as="h2" textAlign="center">
                    Welcome Micheal. Please enter your pin.
                  </Header>
                  <Form onSubmit={this.retrieveBalance}>
                    <Segment stacked>
                      <Form.Input
                        label="pin"
                        icon="lock"
                        iconPosition="left"
                        name="pin"
                        placeholder="pin"
                        type="password"
                        onChange={this.handleChange}
                        />
                      <Form.Button content="Submit" />
                    </Segment>
                  </Form>
                  {error === "" ? '' : <div><Message error header="Login was not successful, Enter correct pin." content={error} /></div>}
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        )
    } else {
      return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column >
              <div className="row border">
                <div>
                  <Header as="h2" textAlign="center">
                    Welcome Micheal. You've entered your pin correctly.
                  </Header>
                  <Message as="h2" >
                    <p>You're balance is £{this.state.balance}</p>
                  </Message>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      )
    }
  }
}

export default BankLogin;
