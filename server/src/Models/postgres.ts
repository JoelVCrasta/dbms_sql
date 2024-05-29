import { Sequelize } from "sequelize"

const sequelize = new Sequelize("dbms_sql", "postgres", "joelgres420", {
  host: "localhost",
  dialect: "postgres",
})

export default sequelize
