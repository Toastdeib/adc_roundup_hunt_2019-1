/* This file contains the main interface into sequlize
 * It defines and imports all of the models internally,
 * and exposes utility functions for those models.
 * Avoid needing to export the models.
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'adcHuntDb.sqlite'
});

// load models

var models = {};
models.user = sequelize.import('User', require(__dirname + '/user'));

//validating communcation to the database 
sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
});

/* User Management */
module.exports.User = {
    findUser: async (attendeeId) => {
        var user = await models.user.findByPk(parseInt(attendeeId));
        return user;
    },
    createUser: async (attendeeId, first, last) => {
        var user = await models.user.findOrCreate(
            { 
                where: { attendeeId: parseInt(attendeeId) },
                defaults: {firstName:first, lastName: last}
            });
        return user[1];
    },
    checkExists: async (attendeeId) => {
        var count = await models.user.count({ where: { attendeeId: parseInt(attendeeId) } });
        if (count != 0) {
            return true;
        }
        return false;
    },
    deleteUser: async (attendeeId) => {
        var numDestroyed = await models.user.destroy(
        {
            where: { attendeeId: parseInt(attendeeId) }
        });
        return numDestroyed;
    },
    setFullName: async (attendeeId, fullName) => {
        var numUpdated = await models.user.update(
        {
            fullName: fullName
        },
        {
            where: { attendeeId: parseInt(attendeeId) }
        });
        return (numUpdated[0] > 0);
    },
    setDisplayNameFormat: async (attendeeId, displayNameFormat) => {
        if (displayNameFormat != 'Unknown' &&
            displayNameFormat != 'FirstNameLastName' &&
            displayNameFormat != 'FirstInitialLastName' &&
            displayNameFormat != 'Anonymous') {
                return false;
            }
            
        var numUpdated = await models.user.update(
        {
            displayNameFormat: displayNameFormat
        },
        {
            where: { attendeeId: parseInt(attendeeId) }
        });
        return (numUpdated[0] > 0);
    },
    submitPassword: async (attendeeId, solutionId, password) => {
        var passwords = ["password1","password2","password3","password4","password5","password6"];
        if (solutionId > 0 && 
            solutionId <= passwords.length && 
            password.toLowerCase() == passwords[solutionId-1]) {
            //Correct password - update in table
            var updateStruct;
            if (solutionId == 1)
                updateStruct = {solution1: true};
            else if (solutionId == 2)
                updateStruct = {solution2: true};
            else if (solutionId == 3)
                updateStruct = {solution3: true};
            else if (solutionId == 4)
                updateStruct = {solution4: true};
            else if (solutionId == 5)
                updateStruct = {solution5: true};
            else if (solutionId == 6)
                updateStruct = {solution6: true};
            else if (solutionId == 7)
                updateStruct = {solution7: true};
            else if (solutionId == 8)
                updateStruct = {solution8: true};
            else if (solutionId == 9)
                updateStruct = {solution9: true};
            if (updateStruct) {
                var numUpdated = await models.user.update(
                    updateStruct,
                    {
                        where: { attendeeId: parseInt(attendeeId) }
                    });
                return (numUpdated[0] > 0);
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

module.exports.sequelize = sequelize;