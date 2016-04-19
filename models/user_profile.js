var _ = require('underscore');


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('profile', {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 250]
			}
		},
		middlename: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [2, 250]
			}
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			deafultValue: false,
			validate: {
				len: [2, 250]
			}
		},
		university: {
			type: DataTypes.STRING,
			allowNull: false,
			deafultValue: false,
			validate: {
				len: [2, 250]
			}
		},
		department: {
			type: DataTypes.STRING,
			allowNull: false,
			deafultValue: false,
			validate: {
				len: [2, 250]
			}
		},
		registration_no: {
			type: DataTypes.STRING,
			allowNull: false,
			deafultValue: false,
			validate: {
				len: [2, 250]
			}
		}
	});
};