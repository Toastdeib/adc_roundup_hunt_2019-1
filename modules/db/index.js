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
    } 
}

module.exports.sequelize = sequelize;