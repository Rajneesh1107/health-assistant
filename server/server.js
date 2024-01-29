require("dotenv").config({ silent: true });
const cors = require("cors");
const express = require("express");
const connectToMongo = require("./lib/db/mongo");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(cors());

// Dynamically load all routes

fs.readdirSync(`${__dirname}/routes/api`).map((file) => {
  require(`./routes/api/${file}`)(app);
});

// console.log(__dirname);

app.listen(process.env.PORT, async () => {
  await connectToMongo();
  console.log(`server is running at port ${process.env.PORT}`);
});
