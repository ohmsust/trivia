var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('game_info', {
		game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '1.0'
		},
		current_version: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '1.0'
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Trivia',
			validate: {
				len: [1, 250]
			}
		},
		in_app_purchase: {
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
				return _.pick(json, 'id', 'game_id', 'name', 'current_version', 'category', 'in_app_purchase', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'game_id', 'name', 'current_version', 'category', 'in_app_purchase', 'createdAt', 'updatedAt');
			}
		}
	}
	);
};