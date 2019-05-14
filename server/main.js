import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';


var Future = Npm.require('fibers/future');

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }
});

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
