"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var _1 = require(".");
var Teams_1 = require("./Teams");
// import OtherModel from './OtherModel';
var Matches = /** @class */ (function (_super) {
    __extends(Matches, _super);
    function Matches() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Matches;
}(sequelize_1.Model));
Matches.init({
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.INTEGER
    },
    homeTeam: {
        allowNull: false,
        type: sequelize_1.INTEGER
    },
    homeTeamGoals: {
        allowNull: false,
        type: sequelize_1.INTEGER
    },
    awayTeam: {
        allowNull: false,
        type: sequelize_1.INTEGER
    },
    awayTeamGoals: {
        allowNull: false,
        type: sequelize_1.INTEGER
    },
    // teamHome: {
    //   allowNull: false,
    //   type: STRING,
    // },
    // teamAway: {
    //   allowNull: false,
    //   type: STRING,
    // },
    inProgress: {
        allowNull: false,
        type: sequelize_1.BOOLEAN
    }
}, {
    underscored: true,
    sequelize: _1["default"],
    modelName: 'Matches',
    timestamps: false
});
Matches.belongsTo(Teams_1["default"], { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams_1["default"], { foreignKey: 'awayTeam', as: 'teamAway' });
Teams_1["default"].hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatch' });
Teams_1["default"].hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatch' });
exports["default"] = Matches;
