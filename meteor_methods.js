var Items = new Mongo.Collection("items");

if (Meteor.isClient) {

  Template.list.helpers({
    items: function() {
      return Items.find();
    }
  });
}





// What we are going to do now, is write a Meteor method in the server that we can call from the client
// You can call a Meteor.methods function with Meteor.call or Meteor.apply

// if (Meteor.isServer) {
//   Meteor.methods({
//     createItem: function(text) { // You can also run the methods outside of hte isServer
//       Items.insert({ text:text, owner: this.userId }); // Remember that the server always has permission to do the writing.
//     } // If you're using Meteor accounts, you can use this.userId, which will give you the userId of the currently logged in user. It makes things way easier!
//   })
// }

// We can call createItem from the client by going into the console and typing in: Meteor.call("createItem", "first-item")
// Meteor.apply is slightly different, bceause we pass an array.


// you can use isSimulation to run a "stub" method on teh client, until you find out that somehting has actually been persisted to the server. I think that means it would speed up the responsiveness of the site... but I'm not sure.
Meteor.methods({
  createItem: function(text) {
    if (this.isSimulation) {
      console.log("sending", text, "to teh server")
    }
    return Items.insert({text:text}); // If you want to pass a callback to make sure the data was persisted on teh server, you would do something like the following: Meteor.call("createItem", "fourth-item", function(err,id) {console.log(id);});
  }
})

//But when is it actually useful to use meteor methods??
// If you want to be able to tell the server to do something from within the client, Meteor.methods are the way to go. The wordplay example is entirely done using meteor methods.
// For example, if you want to allow the user to sign in and create a new game (on the server), you would use meteor methods to allow him to do that. 
