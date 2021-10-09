'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Article, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Comment.init({
    fullName: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    updatedAt: false,
    paranoid: true
  });
  return Comment;
};