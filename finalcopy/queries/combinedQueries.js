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
const rescuedbyMecc=crimeCellQueries.rescuedbyMe;
const rescuedMalecc=crimeCellQueries.rescuedMale;
const rescuedFemalecc=crimeCellQueries.rescuedFemale;
const rescuedPwdcc=crimeCellQueries.rescuedPwd;
const rescuedbyMeo=orphanageQueries.rescuedbyMe;
const rescuedMaleo=orphanageQueries.rescuedMale;
const rescuedFemaleo=orphanageQueries.rescuedFemale;
const rescuedPwdo=orphanageQueries.rescuedPwd;
const rescuedlt5o=orphanageQueries.rescuedlt5;
const rescuedlt10o=orphanageQueries.rescuedlt10;
const rescuedlt15o=orphanageQueries.rescuedlt15;

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
    getAdmin,
    rescuedbyMecc,
    rescuedMalecc,
    rescuedFemalecc,
    rescuedPwdcc,
    rescuedbyMeo,
    rescuedFemaleo,
    rescuedMaleo,
    rescuedPwdo,rescuedlt5o,
    rescuedlt10o,
    rescuedlt15o
};
