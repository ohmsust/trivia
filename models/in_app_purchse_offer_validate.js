var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('in_app_purchse_offer_validate', {
		offer_validation_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		user_ifa: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '10'
		},
		offer_id: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'www.sarkarrajstudios.com'
		},
		offer_taken: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		offer_rewarded: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	 {
		instanceMethods:  {
			toPublicJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'offer_validation_id', 'user_ifa', 'game_id', 'offer_id', 'offer_taken', 'offer_rewarded', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'offer_validation_id', 'user_ifa', 'game_id', 'offer_id', 'offer_taken', 'offer_rewarded', 'createdAt', 'updatedAt');
			}
		}
	}
	);
};