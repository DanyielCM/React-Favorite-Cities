const { DataSource } = require("typeorm");
const { User } = require("@/entity/User");
const { Location } = require("@/entity/Location");


const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Location],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  module.exports = { AppDataSource };