var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('moviequiz', {
		question: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [6, 250]
			}
		},
		answer: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 20]
			}
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [2, 300]
			}
		}
	});
};