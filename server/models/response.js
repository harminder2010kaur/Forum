'use strict';
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    tid: DataTypes.INTEGER,
    topic: DataTypes.TEXT,
    response: DataTypes.TEXT,
    response_by: DataTypes.STRING
  }, {});
  Response.associate = function(models) {
    // associations can be defined here
  };
  return Response;
};