var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_users', {
		user_fia: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		current_level: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		sessions: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		in_app_purchases: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		user_country: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		}
	},
	 {
		instanceMethods:  {
			toPublicJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'user_fia', 'game_id', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'user_fia', 'game_id', 'current_level', 'sessions', 'in_app_purchases', 'user_country','createdAt', 'updatedAt');
			}
		}
	}
	);
};