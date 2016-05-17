var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcrypt');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNext = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	// res.sendfile('./public/index.html');
	res.sendFile(__dirname + '/public/index.html');
})

// =======================================================================================
// POST /users
// =======================================================================================

app.post('/users', function(req, res){
	var body = _.pick(req.body, 'email', 'password');

	db.user.create(body).then(function (user){
		res.json(user.toPublicJSON());
	}, function(e){
		res.status(400).json(e);
	});
});


// =======================================================================================
// POST /users/login
// =======================================================================================

app.post('/users/login', function(req, res){
	var body = _.pick(req.body, 'email', 'password');

	if (typeof body.email !== 'string' || typeof body.password !== 'string') {
		res.status(400).send();
	}

		db.user.findOne({
			where: {
				email: body.email
			}
		}).then (function (user) {
			if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
				return res.status(401).send();

			}
			res.json(user.toPublicJSON());
		}, function (e) {
			res.status(500).send();
		})

});

// =======================================================================================
// POST /app_users
// =======================================================================================

app.post('/app_users', function(req, res){
	var body = _.pick(req.body, 'user_fia', 'game_id', 'current_level', 'sessions', 'in_app_purchases', 'user_country');

	db.app_users.create(body).then(function (app_users){
		res.json(app_users.toPublicJSON());
	}, function(e){
		res.status(400).json(e);
	});
});

// =======================================================================================
// GET /app_users/:user_fia/:game_id
// =======================================================================================

app.get('/app_users/:user_fia/:game_id', function(req, res){
	// var body = _.pick(req.body, 'user_fia', 'game_id', 'current_level', 'sessions', 'in_app_purchases', 'user_country');

	var user_fia = req.params.user_fia;
	var game_id = req.params.game_id;
	
	var attributes = {};

	console.log(req.params.user_fia, req.params.game_id);

	var selector = { where: {
						user_fia: user_fia,
						game_id: game_id 
						} 
					};


	db.app_users.findOne(selector).then(function(app_users) {
			if (app_users) {
				res.json(app_users.toPrivateJSON());
			} else {
				res.status(404).send();
			}
		}, function() {
			res.status(500).send();
		});
});


// =======================================================================================
// POST /app_users
// =======================================================================================

app.put('/app_users', function(req, res){
	var body = _.pick(req.body, 'user_fia', 'game_id', 'current_level', 'sessions', 'in_app_purchases', 'user_country');

	var user_fia = body.user_fia;
	var game_id = body.game_id;

	
	var attributes = {};

	if (body.hasOwnProperty('current_level')) {
		attributes.current_level = body.current_level;
	}

	if (body.hasOwnProperty('sessions')) {
		attributes.sessions = body.sessions;
	}

	if (body.hasOwnProperty('in_app_purchases')) {
		attributes.in_app_purchases = body.in_app_purchases;
	}

	if (body.hasOwnProperty('user_country')) {
		attributes.user_country = body.user_country;
	}

	var selector = { where: {
						user_fia: user_fia,
						game_id: game_id 
						} 
					};


	db.app_users.findOne(selector).then(function(app_users) {
			if (app_users) {
				app_users.update(attributes, selector).then(function(app_users) {
					res.json(app_users.toPublicJSON());
				}, function(e) {
					res.status(400).json(e);
				});
			} else {
				res.status(404).send();
			}
		}, function() {
			res.status(500).send();
		});
});



// =======================================================================================
// POST /review
// =======================================================================================

app.post('/reviews', function(req, res){
	var body = _.pick(req.body, 'game_id', 'version_no', 'ask_review', 'offer_value');

	console.log(req.params.game_id, req.params.version_no);

	db.reviews.create(body).then(function(reviews) {
			if (reviews) {
				res.json(reviews.toPrivateJSON());
			} else {
				res.status(404).send();
			}
		}, function() {
			res.status(500).send();
		});
});

// =======================================================================================
// DEL /review
// =======================================================================================

app.delete('/reviews/:game_id', function(req, res){

	var game_id = req.params.game_id;
	
	console.log(req.params.game_id, req.params.version_no);

	var selector = { where: {
						game_id: game_id 
						} 
					};

	db.reviews.destroy(selector).then(function(reviews) {
			if (rowsDeleted == 0) {
				res.status(404).json({
				error: 'No todo with id'
			});
			} else {
				res.status(204).send();
			}
		}, function() {
			res.status(500).send();
		});
});


// =======================================================================================
// GET /review
// =======================================================================================

app.get('/reviews/:game_id', function(req, res){

	var game_id = req.params.game_id;
	
	console.log(req.params.game_id, req.params.version_no);

	var selector = { where: {
						game_id: game_id 
						} 
					};

	db.reviews.findOne(selector).then(function(reviews) {
			if (reviews) {
				res.json(reviews.toPrivateJSON());
			} else {
				res.status(404).send();
			}
		}, function() {
			res.status(500).send();
		});
});


// =======================================================================================
// PUT /review
// =======================================================================================

app.put('/reviews', function(req, res){

	var body = _.pick(req.body, 'game_id', 'version_no', 'ask_review', 'offer_value');

	var game_id = body.game_id;
	
	var attributes = {};

	console.log(req.params.game_id, req.params.version_no);


	if (body.hasOwnProperty('version_no')) {
		attributes.version_no = body.version_no;
	}

	if (body.hasOwnProperty('ask_review')) {
		attributes.ask_review = body.ask_review;
	}

	if (body.hasOwnProperty('offer_value')) {
		attributes.offer_value = body.offer_value;
	}


	var selector = { where: {
						game_id: game_id 
						} 
					};

	db.reviews.findOne(selector).then(function(reviews) {
			if (reviews) {
				reviews.update(attributes, selector).then(function(reviews) {
					res.json(reviews.toPublicJSON());
				}, function(e) {
					res.status(400).json(e);
				});
			} else {
				res.status(404).send();
			}
		}, function() {
			res.status(500).send();
		});
});


// =======================================================================================
// GET /trivia/:id
// =======================================================================================
app.get('/trivia/:id', function(req, res) {
	var triviaId = parseInt(req.params.id, 10);

	db.trivia.findById(triviaId).then(function(trivia) {
		if (!!trivia) {
			res.json(trivia.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});

// =======================================================================================
// GET /trivia/view/all
// =======================================================================================


// =======================================================================================
// DEL /trivia/remove/:id
// =======================================================================================


// =======================================================================================
// PUT /trivia/update/:id
// =======================================================================================




// =======================================================================================
// POST /moviequiz/add
// =======================================================================================

app.post('/moviequiz', function(req, res) {
	var body = _.pick(req.body, 'question', 'answer', 'image');

	db.moviequiz.create(body).then(function(moviequiz) {
		res.json(moviequiz.toJSON());
	}, function(e) {
		res.status(400).json();
	});
});



// =======================================================================================
// GET /moviequiz/:id
// =======================================================================================
app.get('/moviequiz/:id', function(req, res) {
	var moviequizId = parseInt(req.params.id, 10);

	db.moviequiz.findById(moviequizId).then(function(moviequiz) {
		if (!!moviequiz) {
			res.json(moviequiz.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});


// =======================================================================================
// GET /moviequiz/all
// =======================================================================================

app.get('/moviequiz/:id', function(req, res) {
	var moviequizId = parseInt(req.params.id, 10);

	db.moviequiz.findById(moviequizId).then(function(moviequiz) {
		if (!!moviequiz) {
			res.json(moviequiz.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});




app.delete('/moviequiz/:id', function(req, res) {
	var moviequizId = parseInt(req.params.id, 10);

	db.moviequiz.destroy({
		where: {
			id: moviequizId
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted === 0) {
			res.status(404).json({
				error: 'No moviequiz with id'
			});
		} else {
			res.status(204).send();
		}
	}, function() {
		res.status(500).send();
	});

});


// GET /todos?completed=false&q=work
app.get('/todos', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('completed') && query.completed === 'true') {
		where.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.description = {
			$like: '%' + query.q + '%'
		};

		console.log(query.q);
	}

	db.todo.findAll({
		where: where
	}).then(function(todos) {
		res.json(todos);
	}, function(e) {
		res.status(500).send();
	});
});




// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);

	db.todo.findById(todoId).then(function(todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});



// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}, function(e) {
		res.status(400).json();
	});
});

// GET /profile
app.get('/profile', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.firstname = {
			$like: '%' + query.q + '%'
		};

		console.log(query.q);
	}

	db.profile.findAll({
		where: where
	}).then(function(todos) {
		res.json(todos);
	}, function(e) {
		res.status(500).send();
	});
});

// POST /profile
app.post('/profile', function(req, res) {
	var body = _.pick(req.body, 'firstname', 'middlename', 'lastname', 'university', 'department', 'registration_no');

	db.profile.create(body).then(function(profile) {
		res.json(profile.toJSON());
	}, function(e) {
		res.status(400).json();
	});
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);

	db.todo.destroy({
		where: {
			id: todoId
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted === 0) {
			res.status(404).json({
				error: 'No todo with id'
			});
		} else {
			res.status(204).send();
		}
	}, function() {
		res.status(500).send();
	});

	// var matchedTodo = _.findWhere(todos, {
	// 	id: todoId
	// });

	// if (!matchedTodo) {
	// 	res.status(404).json({
	// 		"error": "no todo found with that id"
	// 	});
	// } else {
	// 	todos = _.without(todos, matchedTodo);
	// 	res.json(matchedTodo);
	// }
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	// var matchedTodo = _.findWhere(todos, {
	// 	id: todoId
	// });
	var body = _.pick(req.body, 'description', 'completed');
	var attributes = {};

	if (body.hasOwnProperty('completed')) {
		attributes.completed = body.completed;
	}

	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	}

	db.todo.findById(todoId).then(function(todo) {

		if (todo) {
			todo.update(attributes).then(function(todo) {
				res.json(todo.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});

	// if (!matchedTodo) {
	// 	return res.status(404).send();
	// }

	// if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
	// 	validAttributes.completed = body.completed;
	// } else if (body.hasOwnProperty('completed')) {
	// 	return res.status(400).send();
	// }

	// if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
	// 	validAttributes.description = body.description;
	// } else if (body.hasOwnProperty('description')) {
	// 	return res.status(400).send();
	// }

	// _.extend(matchedTodo, validAttributes);
	// res.json(matchedTodo);
});









db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Server started at port ' + PORT + ' ... ... ...')
	});
});