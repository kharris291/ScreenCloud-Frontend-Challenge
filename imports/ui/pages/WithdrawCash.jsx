import React, { Component } from 'react';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class WithdrawCash extends Component {
	constructor(props) {
		super(props);

		this.state = this.props.state;

		this.handleChange = this.handleChange.bind(this);
		this.updateBalance = this.updateBalance.bind(this);
		this.addInState = this.addInState.bind(this);
	}
	
	handleChange(e, { name, value }) {
		this.setState({ [name]: value });
	}

	updateBalance(){
		var amountAvailTwenty = (this.state.withdrawAmount)%20;
		var amountAvailFive = (this.state.withdrawAmount)%5;
		if(amountAvailFive == 0 ){
			var newBalance= (this.state.balance - this.state.withdrawAmount)
			if(newBalance >= -100){
				var numberOf20sToWithdraw = ((this.state.withdrawAmount - amountAvailTwenty)/20)

			//get a list of the notes
			var notesAvailable = this.state.availableNotes[0];

			var balanceToPutBack = 0;
			var amountAvailTemp = 0;
			var notesAvailableToTake = 0;
			//get the number of 20s that could fill up your withdrawal from availability
			if(notesAvailable.twenties > 0){
				var numberAvailToTake = notesAvailable.twenties - numberOf20sToWithdraw;
				//ensure there's enough notes to take
				if(numberAvailToTake <0){
					notesAvailableToTake = notesAvailable.twenties;
					notesAvailable.twenties = 0;
					balanceToPutBack = numberAvailToTake * -1;
					amountAvailTemp = balanceToPutBack * 20 + amountAvailTwenty;
					amountAvailTwenty = amountAvailTemp;
				}else{
					notesAvailable.twenties = numberAvailToTake
				}
			}else{
				amountAvailTwenty = this.state.withdrawAmount;
			}
			//repeat process for 10s
			//Todo make this into a fuction rather than repeating similar code
			var amountAvailTen = (amountAvailTwenty)%10;
			var continuewithWidthal = true;
			if(amountAvailTwenty > 0){
				var numberOfTensToWithdraw = ((this.state.withdrawAmount - amountAvailTen)/10)

				numberAvailToTake = notesAvailable.tens - numberOfTensToWithdraw;

				if(numberAvailToTake < 0){

					notesAvailableToTake = notesAvailable.tens
					notesAvailable.tens = 0

					balanceToPutBack = numberAvailToTake * -1
					amountAvailTemp= balanceToPutBack * 10 +amountAvailTen

					amountAvailTen = amountAvailTemp;
				}else{
					notesAvailable.tens = numberAvailToTake
				}
			}

			//repeat for fives
			if(amountAvailTen > 0){
				var numberOfFivesToWithdraw = ((this.state.withdrawAmount - amountAvailTen)/10)
				
				amountAvailFive = (amountAvailTen)%5;
				numberAvailToTake = notesAvailable.fives - numberOfFivesToWithdraw;

				if(numberAvailToTake <0){
					notesAvailableToTake = notesAvailable.fives
					notesAvailable.fives = 0
					balanceToPutBack = numberAvailToTake * -1
					amountAvailTemp= balanceToPutBack * 5 +amountAvailFive
					amountAvailFive = amountAvailTemp;
					continuewithWidthal = false;

				}else{
					notesAvailable.fives = numberAvailToTake

				}
			}

			this.setState({ availableNotes: [notesAvailable] })
			
			this.setState({ balance: (this.state.balance - this.state.withdrawAmount) });
			this.addInState(this.state.withdrawAmount )
			this.props.updateBalance(newBalance);
			this.setState({error: ''})
		}else{
			//find the closest amount available to withdraw
			var amountAvilToWidthdraw = (
				this.state.balance < 0 ? 
				(
					Math.floor((this.state.balance + 100)/5)*5
					) : (
					Math.floor((100 + this.state.balance)/5)*5
					)
					);
			
			var errr = "You have an overdraft of £100. You currently have " + this.state.balance + " and can withdraw a max of " + amountAvilToWidthdraw
			this.setState({error: errr})
		}
	}else{
		var errr = "Amount to withdaw isn't available. Number must be a divisible of five"
		this.setState({error: errr})
	}
}
// add item to state
addInState(balance){
	var today =new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	if(dd<10) dd='0'+dd;
	if(mm<10) mm='0'+mm;

	var date = today.getFullYear() + '-' + mm + '-' + dd + "T" +
	today.getHours()+ "-" + today.getMinutes() +"-" +today.getSeconds();

	var item={
		amounts: this.state.withdrawAmount,
		date: date
	}
	const newListItems = this.state.amountWithdrawn.concat(item);
	this.setState({amountWithdrawn: newListItems})
	this.props.addInStateParent({
		amounts: this.state.withdrawAmount,
		date: date
	});
}
//render content for withdrawing money
render() {
	const { error } = this.state
	{/* build the list of amount and when that have been withdraw the amount */}
	var amountWithdrawnMapping = this.state.amountWithdrawn.map(((amountWithdrawn, index) =>(
		<MessageListsTemplate amount={amountWithdrawn} ind={index}/>
		)
	))

	return (
		<Container>
			<Grid textAlign="center" verticalAlign="middle" centered columns={2}>
				<Grid.Column >
					<div className="row">
						<div>
							<Header as="h2" textAlign="center">
								You currently have £{this.state.balance}
							</Header>
							<Form onSubmit={this.updateBalance}>
								<Segment stacked>
								<Form.Input
									label="How much would you like to WithdrawCash?"
									iconPosition="left"
									name="withdrawAmount"
									placeholder="Withdraw"
									onChange={this.handleChange}
									/>
								<Form.Button content="Withdraw" />
							</Segment>
						</Form>
						<div className='column'>
							<Message>
								<Message.Header>Previous Withdrawals</Message.Header>
								{ amountWithdrawnMapping }
							</Message>
						</div>
						{error === "" ? '' : <div><Message error header="Invalid amount." content={error} /></div>}
						</div>
					</div>
				</Grid.Column>
			</Grid>
		</Container>
		)
	}
}




class MessageListsTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.amount;
	}
	// each individual amount and date of withdrawal
	render(){ 
		return(
			<Message.List key={this.props.ind}>
				<Message.Item> Amount: £{this.state.amounts}. Date: {this.state.date}  </Message.Item>
			</Message.List>

			)
	}    
}



export default WithdrawCash;
