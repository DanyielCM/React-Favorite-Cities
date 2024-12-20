const { EntitySchema } = require("typeorm");

const Location = new EntitySchema({
  name: "Location",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    }
  },
  relations: {
    users: {
      target: "User",
      type: "many-to-many",
      mappedBy: "favoriteLocations"
    }
  }
});

module.exports = { Location };