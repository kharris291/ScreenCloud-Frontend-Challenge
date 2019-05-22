import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WithdrawCash from '/imports/ui/pages/WithdrawCash';
import BankLogin from '/imports/ui/BankLogin';
import TopHeader from '/imports/ui/Component/TopHeader';

// This is the default semantic css but can be replaced by a customized version
import 'semantic-ui-css/semantic.css'

class App extends Component {
	constructor(props) {
		super(props);

		var today =new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		if(dd<10) dd='0'+dd;
		if(mm<10) mm='0'+mm;

		var date = today.getFullYear() + '-' + mm + '-' + dd + "T" +
			today.getHours()+ "-" + today.getMinutes() +"-" +today.getSeconds();
		this.state = {
			balance: 0,
			error: '',
			pin: '',
			signedIn: 'false',
			currentPage: '/',
			availableNotes:[
				{
					fives:4,
					tens:15,
					twenties:7 
				}
			
			],
			withdrawAmount : 0,
			amountWithdrawn:[
				{
					amounts:0,
					date: date
				}
			]
		};
    	this.updateState = this.updateState.bind(this);
    	this.updateBalance = this.updateBalance.bind(this);
    	this.addInState = this.addInState.bind(this);

	}

	updateState(name, value){
		this.setState({ [name]: value });
	}

	updateBalance(value){
		this.setState({ balance: (value) });

	}


	addInState = (attrs) => {
		var listAmt = this.state.amountWithdrawn;
		var today =new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		if(dd<10) dd='0'+dd;
		if(mm<10) mm='0'+mm;

		var date = today.getFullYear() + '-' + mm + '-' + dd + "T" +
			today.getHours()+ "-" + today.getMinutes() +"-" +today.getSeconds();
        
        const newListItems = this.state.amountWithdrawn.concat(attrs);
        
        this.setState({
            amountWithdrawn: newListItems,
        });
    };

	render() {
		const routes = [
			{
				path: "/",
				Components: BankLogin,
				key: "home",
				content: this.state
			},
			{
				path: "/bankBalance",
				Components: BankLogin,
				key: "bankBalance",
				content: this.state
			}
			,
			{
				path: "/withdrawCash",
				Components: WithdrawCash,
				key: "withdrawCash",
				content: this.state
			}
		];

		var current = this.state;
		const isLogged = this.state.signedIn === "true";
		return (
			<Router>
				<div className="itemsheight">
					<TopHeader state={this.state} />
					<Switch>
						<Route exact path='/' render={(props) => ( 
							<BankLogin {...props}  state={this.state} updateState={this.updateState}  key="1" /> 
						)} />
						<Route path='/bankBanlance' render={(props) => (
							<BankLogin {...props}  state={this.state} updateState={this.updateState}  key="2" /> 
						)} />
						<Route path='/withdrawCash' render={(props) => (
							<WithdrawCash {...props}  state={this.state} addInStateParent={this.addInState} updateBalance={this.updateBalance}  key="3" /> 
						)}  />
					</Switch>
				</div>
			</Router>
		);
	}
}
export default App;



