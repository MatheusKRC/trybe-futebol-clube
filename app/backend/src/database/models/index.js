"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var config = require("../config/database");
exports["default"] = new sequelize_1.Sequelize(config);
