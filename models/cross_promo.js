var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cross_promo', {
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
		level_no: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '1.0'
		},
		device_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: false
		},
		promo_game_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		appstore_url: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 250]
			}
		},
		promo_image_url: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1, 250]
			}
		}
	},
	 {
		instanceMethods:  {
			toPublicJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'game_id', 'level_no', 'cross_promo_id', 'device_type', 'promo_game_id', 'appstore_url', 'promo_image_url', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'game_id', 'level_no', 'cross_promo_id', 'device_type', 'promo_game_id', 'appstore_url', 'promo_image_url', 'createdAt', 'updatedAt');
			}
		}
	}
	);
};