var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cross_promo_validate', {
		game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		cross_promo_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		user_ifa: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '1.0'
		},
		offer_taken: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		offer_completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		promo_game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
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
				return _.pick(json, 'id', 'game_id', 'cross_promo_id', 'user_ifa', 'offer_taken', 'offer_completed', 'promo_game_id', 'offer_value', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'game_id', 'cross_promo_id', 'user_ifa', 'offer_taken', 'offer_completed', 'promo_game_id', 'offer_value', 'createdAt', 'updatedAt');
			}
		}
	}
	);
};