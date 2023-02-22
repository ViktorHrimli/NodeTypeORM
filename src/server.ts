const AppDataSource = require("./db/connectionDb");
const app = require("./index");

const main = async () => {
  try {
    AppDataSource.initialize().then(() => {
      app.listen(3000, () => {
        console.log("Server listen on port 3000");
      });
      console.log("Database connections");
    });
  } catch (error) {
    console.error(error);
    throw new Error("Fail connect to db");
  }
};

main();
