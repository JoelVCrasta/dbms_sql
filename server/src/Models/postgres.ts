import { Sequelize } from "sequelize"

const sequelize = new Sequelize("openchat", "postgres", "joelgres420", {
  host: "localhost",
  dialect: "postgres",
})

export default sequelize
