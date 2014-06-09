// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

// Export a function, so that we can pass 
// the app and io instances from the app.js file:

module.exports = function(app, io, passport){

	app.get('/', function(req, res){

		// Render views/home.html
		res.render('index', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	app.get('/createevent', function(req,res){
		// Render the create event page
		// Allow users to upload a powerpoint file
		
		// Render views/home.html
		res.render('createevent', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	app.get('/event-item', function(req,res){
		
		// Render views/home.html
		res.render('event-item', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// TEMPLATES
	// =====================================
	app.get('/templates/sidebar', function(req, res){
	
		// Render views/templates/sidebar.ejs
		res.render('templates/sidebar', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/'
		}));

	// route for logging out
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login', { message: req.flash('loginMessage') }); 
	});
	
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup', { message: req.flash('signupMessage') });
	});	

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.post('/createevent', function(req,res){
	
		// upload a PowerPoint file to Amazon S3
		
		// wait for the PowerPoint file to be converted
		
		// Generate a random string for the event URL
		var EventID = Math.round((Math.random() * 1000000));
		// redirect the user to the new event room
		res.redirect('/event/'+EventID);
	});
	
	app.get('/event/:eventname', function(req,res){
		
		// Render the event hosting interface
		res.render('event');
	});

	app.get('/create', function(req,res){

		// Generate unique id for the room
		var id = Math.round((Math.random() * 1000000));

		// Redirect to the random room
		res.redirect('/chat/'+id);
	});

	app.get('/chat/:id', function(req,res){

		// Render the chat.html view
		res.render('chat');
	});

	/*
	// Initialize a new socket.io application, named 'chat'
	var chat = io.of('/socket').on('connection', function (socket) {

		// When the client emits the 'load' event, reply with the 
		// number of people in this chat room

		socket.on('load',function(data){

			if(chat.clients(data).length === 0 ) {

				socket.emit('peopleinchat', {number: 0});
			}
			else if(chat.clients(data).length === 1) {

				socket.emit('peopleinchat', {
					number: 1,
					user: chat.clients(data)[0].username,
					avatar: chat.clients(data)[0].avatar,
					id: data
				});
			}
			else if(chat.clients(data).length >= 2) {

				chat.emit('tooMany', {boolean: true});
			}
		});

		// When the client emits 'login', save his name and avatar,
		// and add them to the room
		socket.on('login', function(data) {

			// Only two people per room are allowed
			if(chat.clients(data.id).length < 2){

				// Use the socket object to store data. Each client gets
				// their own unique socket object

				socket.username = data.user;
				socket.room = data.id;
				socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});

				// Tell the person what he should use for an avatar
				socket.emit('img', socket.avatar);


				// Add the client to the room
				socket.join(data.id);

				if(chat.clients(data.id).length == 2) {

					var usernames = [],
						avatars = [];

					usernames.push(chat.clients(data.id)[0].username);
					usernames.push(chat.clients(data.id)[1].username);

					avatars.push(chat.clients(data.id)[0].avatar);
					avatars.push(chat.clients(data.id)[1].avatar);

					// Send the startChat event to all the people in the
					// room, along with a list of people that are in it.

					chat.in(data.id).emit('startChat', {
						boolean: true,
						id: data.id,
						users: usernames,
						avatars: avatars
					});
				}

			}
			else {
				socket.emit('tooMany', {boolean: true});
			}
		});

		// Somebody left the chat
		socket.on('disconnect', function() {

			// Notify the other person in the chat room
			// that his partner has left

			socket.broadcast.to(this.room).emit('leave', {
				boolean: true,
				room: this.room,
				user: this.username,
				avatar: this.avatar
			});

			// leave the room
			socket.leave(socket.room);
		});


		// Handle the sending of messages
		socket.on('msg', function(data){

			// When the server receives a message, it sends it to the other person in the room.
			socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
		});
		*/
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
