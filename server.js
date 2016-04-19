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
	res.send(' Todo API Root');
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
// POST /trivia/add
// =======================================================================================

app.post('/trivia', function(req, res) {
	var body = _.pick(req.body, 'question', 'answer', 'image');

	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}, function(e) {
		res.status(400).json();
	});
});



// =======================================================================================
// GET /trivia/:id
// =======================================================================================
app.get('/trivia/:id', function(req, res) {
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

// =======================================================================================
// GET /trivia/view/all
// =======================================================================================


// =======================================================================================
// DEL /trivia/remove/:id
// =======================================================================================


// =======================================================================================
// PUT /trivia/update/:id
// =======================================================================================





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