import { DataType, DataTypes, INTEGER } from "sequelize"
import sequelize from "./postgres"

const employees = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    dept: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dept",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
)

export default employees
