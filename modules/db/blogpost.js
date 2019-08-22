const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Sequelize.Model {};
  BlogPost.init({
    blogId: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    releaseTime: DataTypes.DATE,
    title: DataTypes.STRING(1024),
    subtitle: DataTypes.STRING(1024),
    imagePath: DataTypes.STRING(512),
    date: DataTypes.STRING(255),
    time: DataTypes.STRING(255),
    author: DataTypes.STRING(255),
    text: {
        type: DataTypes.STRING(10000),
        set(text) {
            this.setDataValue('text', text);
            var strippedText = text.replace(/(<([^>]+)>)/ig," ");
            var shortText = strippedText.split(" ").slice(0,35).join(" ");
            this.setDataValue('teaserText', shortText + " ...");
        }
    },
    teaserText: DataTypes.STRING(2048)

  }, { sequelize, modelName: 'BlogPost' });

  return BlogPost;
}