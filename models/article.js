'use strict';
const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');
module.exports = (sequelize) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.hasMany(models.Comment)
    }
  };
  Article.init({
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        is: /^[\w\-]+$/i
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    publishDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    publishTime: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};