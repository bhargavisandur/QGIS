const adminQueries = require('./adminQueries');
const userQueries = require('./userQueries');
const crimeCellQueries = require('./crimeCellQueries');
const orphanageQueries = require('./orphanageQueries');
// List of all admin queries
const createAdmin = adminQueries.createAdmin;
const createOrphan = adminQueries.createOrphan;
const createCrimeCell = adminQueries.createCrimeCell;
const displayRescued=adminQueries.displayRescued;
const getAdmin=adminQueries.getAdmin;

// List of all user queries
const addVictimData = userQueries.addVictimData;
const createUser = userQueries.createUser;
const getUser = userQueries.getUser;
const getCrimeCell = crimeCellQueries.getCrimeCell;
const getOrphanage = orphanageQueries.getOrphanage;
const displayMap=orphanageQueries.displayMap;
const displayCrime=crimeCellQueries.displayCrime;

module.exports = {
    createAdmin,
    createOrphan,
    createCrimeCell,
    addVictimData,
    createUser,
    getUser,
    getCrimeCell,
    getOrphanage,
    displayMap,
    displayCrime,
    displayRescued,
    getAdmin
};
