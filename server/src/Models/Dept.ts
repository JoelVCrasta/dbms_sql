import { DataTypes } from "sequelize"
import sequelize from "./postgres"

const Dept = sequelize.define(
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

export default Dept
