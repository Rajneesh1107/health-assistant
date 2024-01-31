const users = require("../../controllers/users");

module.exports = (app) => {
  app.get("/users", users.getUsers);
  app.get("/users/:id", users.getUserDetails);
  app.post("/users", users.createUser);
  app.post("/users/login", users.loginUser);
  app.put("/users/:id", users.updateUser);
  app.delete("/users/:id", users.deleteUser);
};
