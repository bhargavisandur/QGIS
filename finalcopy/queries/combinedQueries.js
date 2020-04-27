const adminQueries = require('./adminQueries');
const userQueries = require('./userQueries');
const crimeCellQueries = require('./crimeCellQueries');
const orphanageQueries = require('./orphanageQueries');
// List of all admin queries
const createAdmin = adminQueries.createAdmin;
const createOrphan = adminQueries.createOrphan;
const createCrimeCell = adminQueries.createCrimeCell;
const displayRescued = adminQueries.displayRescued;
const getAdmin = adminQueries.getAdmin;
const displayCC=adminQueries.displayCC;
const displayO=adminQueries.displayO;

// List of all user queries
const addVictimData = userQueries.addVictimData;
const createUser = userQueries.createUser;
const getUser = userQueries.getUser;
const getCrimeCell = crimeCellQueries.getCrimeCell;
const getOrphanage = orphanageQueries.getOrphanage;
const displayMap = orphanageQueries.displayMap;
const displayCrime = crimeCellQueries.displayCrime;
const rescuedbyMecc = crimeCellQueries.rescuedbyMe;
const rescuedbyMeccMap = crimeCellQueries.rescuedbyMeMap;
const rescuedMalecc = crimeCellQueries.rescuedMale;
const rescuedMaleccMap = crimeCellQueries.rescuedMaleMap;
const rescuedFemalecc = crimeCellQueries.rescuedFemale;
const rescuedFemaleccMap = crimeCellQueries.rescuedFemaleMap;
const rescuedPwdcc = crimeCellQueries.rescuedPwd;
const rescuedPwdccMap = crimeCellQueries.rescuedPwdMap;
const rescuedlt5cc = crimeCellQueries.rescuedlt5;
const rescuedlt10cc = crimeCellQueries.rescuedlt10;
const rescuedlt15cc = crimeCellQueries.rescuedlt15;
const rescuedbyMeo = orphanageQueries.rescuedbyMe;
const rescuedbyMeoMap = orphanageQueries.rescuedbyMeMap;
const rescuedMaleo = orphanageQueries.rescuedMale;
const rescuedMaleoMap = orphanageQueries.rescuedMaleMap;
const rescuedFemaleo = orphanageQueries.rescuedFemale;
const rescuedFemaleoMap = orphanageQueries.rescuedFemaleMap;
const rescuedPwdo = orphanageQueries.rescuedPwd;
const rescuedPwdoMap = orphanageQueries.rescuedPwdMap;
const rescuedlt5o = orphanageQueries.rescuedlt5;
const rescuedlt10o = orphanageQueries.rescuedlt10;
const rescuedlt15o = orphanageQueries.rescuedlt15;

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
    rescuedbyMeccMap,
    rescuedMalecc,
    rescuedMaleccMap,
    rescuedFemalecc,
    rescuedFemaleccMap,
    rescuedPwdcc,
    rescuedPwdccMap,
    rescuedbyMeo,
    rescuedbyMeoMap,
    rescuedFemaleo,
    rescuedFemaleoMap,
    rescuedMaleo,
    rescuedMaleoMap,
    rescuedPwdo,
    rescuedPwdoMap,
    rescuedlt5o,
    rescuedlt10o,
    rescuedlt15o,
    rescuedlt5cc,
    rescuedlt10cc,
    rescuedlt15cc,
    displayCC,
    displayO
};
