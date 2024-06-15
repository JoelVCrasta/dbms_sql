import { DataTypes } from "sequelize"
import sequelize from "./postgres"

const Employee = sequelize.define(
  "employees",
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
)

export default Employee
