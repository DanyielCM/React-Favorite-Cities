// const { EntitySchema } = require("typeorm");

// const User = new EntitySchema({
//   name: "User",
//   columns: {
//     id: {
//       type: "int",
//       primary: true,
//       generated: true,
//     },
//     name: {
//       type: "varchar",
//     },
//     locations: {
//       type: "varchar",
//     },
//   },
// });

// module.exports = { User };

const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    email: {
      type: "varchar"
    },
    name: {
      type: "varchar"
    }
  },
  relations: {
    favoriteLocations: {
      target: "Location",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
      eager: true
    }
  }
});

module.exports = { User };