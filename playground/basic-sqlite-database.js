var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname +'/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type:Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull:false,
		deafultValue: false
	}
});

sequelize.sync( {
	fource:true
}).then(function () {
	console.log('Everything is sync');

	Todo.findById(3).then(function(todo) {
		if (todo) {
			console.log(todo.toJSON());
		}else {
			console.log('Todo not found');
		}
	}).catch(function(e){
		console.log(e);	
	});

	// Todo.create({
	// 	description: 'Do nothing',
	// 	completed: false
	// }).catch(function (e) {
	// 	console.log(e);
	// });
});