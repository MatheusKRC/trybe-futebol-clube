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
// import OtherModel from './OtherModel';
var Teams = /** @class */ (function (_super) {
    __extends(Teams, _super);
    function Teams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Teams;
}(sequelize_1.Model));
// Teams.hasMany(Matches, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Teams.hasMany(Matches, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
Teams.init({
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.INTEGER
    },
    teamName: {
        allowNull: false,
        type: sequelize_1.STRING
    }
}, {
    underscored: true,
    sequelize: _1["default"],
    modelName: 'teams',
    timestamps: false
});
exports["default"] = Teams;
