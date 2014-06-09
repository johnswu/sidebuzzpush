// app/models/event.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our event model
var eventSchema = mongoose.Schema({

	eventName     : String,
	isPublic     : Boolean,
	eventStartDate     : Date,
	eventStartTime     : String,
	eventEndDate     : Date,
	eventEndTime     : String,
	createdBy : String,
	currentPushID : Number,
	eventPushes : {
		eventPushID : Number,
		eventPushName : String,
		eventPushOrder : Number,
		URL : String
	}
});

// methods ======================
// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);
