var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dav-todo-api.sqlite'
	});
}



var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.app_users = sequelize.import(__dirname + '/models/app_users.js');
db.reviews = sequelize.import(__dirname + '/models/reviews.js');
db.trivia = sequelize.import(__dirname + '/models/trivia.js');
db.moviequiz = sequelize.import(__dirname + '/models/moviequiz.js');
db.profile = sequelize.import(__dirname + '/models/user_profile.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;