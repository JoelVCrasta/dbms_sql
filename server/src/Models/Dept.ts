import { DataTypes } from "sequelize"
import sequelize from "./postgres"

const dept = sequelize.define(
  "depts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    dept_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

export default dept
