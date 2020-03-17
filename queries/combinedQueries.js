const adminQueries = require('./adminQueries');
const userQueries = require('./userQueries');

// List of all admin queries
const createAdmin = adminQueries.createAdmin;

// List of all user queries
const addVictimData = userQueries.addVictimData;

module.exports = {
	createAdmin,
	addVictimData
}