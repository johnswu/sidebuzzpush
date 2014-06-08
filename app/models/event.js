// app/models/event.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our event model
var eventSchema = mongoose.Schema({

    event            : {
        eventID       : Number,
		eventName     : String,
        eventDate     : String,
		currentPushID : Number,
		eventPushes {
			eventPushID : Number,
			eventPushName : String,
			eventPushOrder : Number,
			URL : String
		}
    }
});

// methods ======================
// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);
