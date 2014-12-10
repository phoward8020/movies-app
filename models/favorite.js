"use strict";

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    imdbCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Favorite;
};
