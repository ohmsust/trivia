var _ = require('underscore');
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('in_app_purchse_offer', {
		offer_id: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		offer_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		offer_value: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '10'
		},
		offer_image_url: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'www.sarkarrajstudios.com'
		},
		device_type: {
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
				return _.pick(json, 'id', 'offer_id', 'offer_active', 'offer_value', 'offer_image_url', 'device_type', 'createdAt', 'updatedAt');
			},
			toPrivateJSON: function () {
				var json = this.toJSON();
				return _.pick(json, 'id', 'offer_id', 'offer_active', 'offer_value', 'offer_image_url', 'device_type', 'createdAt', 'updatedAt');
			}
		}
	}
	);
};