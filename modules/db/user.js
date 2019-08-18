const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Sequelize.Model {};
  User.init({
    attendeeId: {type: DataTypes.INTEGER, primaryKey: true},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    displayNameFormat: {
      type: DataTypes.ENUM('Unknown', 'FirstNameLastName', 'FirstInitialLastName', 'Anonymous', 'Custom'),
      defaultValue: 'Unknown'
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        var displayNameFormat = this.getDataValue('displayNameFormat');
        console.log(this.getDataValue('displayNameFormat'));
        var firstName = this.getDataValue('firstName');
        var lastName = this.getDataValue('lastName');
        if (!firstName) firstName = "";
        if (!lastName) lastName = "";
        if (displayNameFormat == 'FirstNameLastName'){
          return firstName + " " + lastName;
        }
        else if (displayNameFormat == 'FirstInitialLastName') {
          return firstName.charAt(0) + ". " + lastName;
        }
        else if (displayNameFormat == 'Custom')
          return firstName;
        else
          return 'Anonymous';
      },
      set(name) {
        this.setDataValue('displayNameFormat', 'Custom');
        this.setDataValue('firstName', name);
        this.setDataValue('lastName', "");
      }
    },
    solution1: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution2: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution3: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution4: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution5: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution6: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution7: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution8: {type: DataTypes.BOOLEAN, defaultValue: false},
    solution9: {type: DataTypes.BOOLEAN, defaultValue: false},
    prizeLevel: DataTypes.ENUM('none', 'bluesticker', 'yellowsticker', 'starsticker'),
    score: DataTypes.INTEGER,
    hasClaimedSticker: DataTypes.BOOLEAN,
  }, { sequelize, modelName: 'User' });
  User.sync({force: true}); //TODO: Remove this.  This wipes the user list on each start, which is good for dev.

  return User;
}

//TODO:  THe rest of this file is utility functions for working with Users.
//This had to be restructured to support another feature, so they're disabled for now.
//These will need to be ported into the sequelize.import() structure above, or into the db/index.js file.

//adding fake users to the databases
//DEV ONLY - REMOVE
// let users = [
//     {userId: 1, firstName: 'Sam', lastName: 'Mendis', displayNameFormat:'Anonymous', cookie:"none",  solution1: 0, solution2: 0, solution3: 0, solution4: 0, solution5: 0, solution6: 0, solution7: 0, solution8: 0, solution9: 0,  prizeLevel: 'none',score: 0, hasClaimedSticker: 0},
//     {userId: 2, firstName: 'Bob', lastName: 'TheBuilder',displayNameFormat:'Anonymous', cookie:"none",solution1: 0, solution2: 0, solution3: 0, solution4: 0, solution5: 0, solution6: 0, solution7: 0, solution8: 0, solution9: 0, prizeLevel: 'none',score: 0, hasClaimedSticker: 0},
//     {userId: 3, firstName: 'Clark', lastName: 'Kent',displayNameFormat:'Anonymous', cookie:"none", solution1: 0, solution2: 0, solution3: 0, solution4: 0, solution5: 0, solution6: 0, solution7: 0, solution8: 0, solution9: 0, prizeLevel: 'none',score: 0, hasClaimedSticker: 0},
//     {userId: 4, firstName: 'John', lastName: 'Smith',displayNameFormat:'Anonymous', cookie:"none", solution1: 0, solution2: 0, solution3: 0, solution4: 0, solution5: 0, solution6: 0, solution7: 0, solution8: 0, solution9: 0, prizeLevel: 'none',score: 0, hasClaimedSticker: 0},
//     {userId: 5, firstName: 'Jane', lastName: 'Joe',displayNameFormat:'Anonymous', cookie:"none", solution1: 0, solution2: 0, solution3: 0, solution4: 0, solution5: 0, solution6: 0, solution7: 0, solution8: 0, solution9: 0, prizeLevel: 'none',score: 0, hasClaimedSticker: 0},
//     ];
//   sequelize.sync({force:true}).then(() => {
//     user.bulkCreate(users, {validate: true}).then(()=>{ 
//     console.log('added row created');
//   }).catch((error)=> {
//     console.log('failed to create notes');
//     console.log(err);
//   });
// });

// async function deleteUser(id) {
//     let n = await user.destroy({ where: { userId: id } });
//     console.log(`number of deleted rows: ${n}`);
// }
// //NOTE: SLM need to create this function 
// async function createUser(fName, lName) {
//   //let n = await user.createUser({ where: { userId: id } });
//   console.log(`created new user: ${n}`);
// }

// //findUserbyPK
// async function getUserFromDatabase( userId) {
//     const row = user.findByPk(userId);
//         console.log(row.firstName);
//     return row;
// }

//   module.exports = 
// {
// // external function to remove a row
// deleteUser: (userId) => 
//     {
//         console.log("Deleting row");
//         deleteUser(userId);
//     },
// // external function to remove a row
// createUser: (firstName, lastName) => 
//     {
//         console.log("creating new user in the database");
//         createUser(firstName, lastName);
//     },
// // external functions to get a row from the database
// getUser: (userId) => 
//     {
//         console.log("getting user from database");
//         return getUserFromDatabase(userId);
//     },  
// external function to remove a row
/*deleteBlogPost: (blogId) => 
    {
        console.log("Deleting row");
        //deleteBlogPost(blogId);
    },
// external function to create a row
createBlogPost: () => 
    {
        console.log("creating new user in the database");
        //createBlogPost();
    },
// external functions to get a row from the database
getBlogPost: (blogId) => 
    {
        console.log("getting blog post");
        return getBlogPostFromDatabase(blogId);
    },*/  
// };