var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('review', {
		game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique:true,
			validate: {
				len: [1, 250],
				isUnique: sequelize.validateIsUnique('game_id', 'already exists...')
			}
		},
		version_no: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '1.0'
		},
		ask_review: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		offer_value: {
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
				return _.pick(json, 'id', 'game_id', 'version_no', 'ask_review', 'offer_value', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'game_id', 'version_no', 'ask_review', 'offer_value', 'createdAt', 'updatedAt');
			}
		}
	}
	);
};