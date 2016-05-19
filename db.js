var Sequelize = require('sequelize');
require('sequelize-isunique-validator')(Sequelize);
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

db.user = sequelize.import(__dirname + '/models/user.js');
db.app_users = sequelize.import(__dirname + '/models/app_users.js');
db.cross_promo = sequelize.import(__dirname + '/models/cross_promo.js');
db.cross_promo_validate = sequelize.import(__dirname + '/models/cross_promo_validate.js');
db.cross_promo_validate = sequelize.import(__dirname + '/models/in_app_purchse_offer.js');
db.cross_promo_validate = sequelize.import(__dirname + '/models/in_app_purchse_offer_validate.js');
db.reviews = sequelize.import(__dirname + '/models/reviews.js');
db.game_info = sequelize.import(__dirname + '/models/game_info.js');
db.trivia = sequelize.import(__dirname + '/models/trivia.js');
db.profile = sequelize.import(__dirname + '/models/user_profile.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;