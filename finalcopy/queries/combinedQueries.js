const adminQueries = require('./adminQueries');
const userQueries = require('./userQueries');
const crimeCellQueries = require('./crimeCellQueries');
const orphanageQueries = require('./orphanageQueries');
// List of all admin queries
const createAdmin = adminQueries.createAdmin;
const createOrphan = adminQueries.createOrphan;
const createCrimeCell = adminQueries.createCrimeCell;

// List of all user queries
const addVictimData = userQueries.addVictimData;
const createUser = userQueries.createUser;
const getUser = userQueries.getUser;
const getCrimeCell = crimeCellQueries.getCrimeCell;
const getOrphanage=orphanageQueries.getOrphanage;

module.exports = {
    createAdmin,
    createOrphan,
    createCrimeCell,
    addVictimData,
    createUser,
    getUser,
    getCrimeCell,
    getOrphanage
};
