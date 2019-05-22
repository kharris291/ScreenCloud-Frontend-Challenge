import { Meteor } from 'meteor/meteor';
var Future = Npm.require('fibers/future');


Meteor.methods({
  'loadBankBalance': function(opts){
    console.log(opts.pin.length);

    var bankBallance = new Future();
    HTTP.call('POST', 'https://frontend-challenge.screencloud-michael.now.sh/api/pin/', {
      data: {
        "pin": opts.pin
      }
    }, function( error, response ){
      if( error ){
        bankBallance.return(error);
      } else{
        bankBallance.return(response)
      }
    }); 
    bankBallance.wait();
    
    if(bankBallance){
      return bankBallance;
    }

    
  }
})
