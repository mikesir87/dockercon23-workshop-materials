const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

let server;
const MONGO_URL = process.env.MONGO_URL ?? "mongodb://mongo:27017";

console.log("URL", MONGO_URL);
const mongoClient = new MongoClient(MONGO_URL);
mongoClient.connect().then(() => {  
  console.log("Connected to the Mongo database");
  const gifCollection = mongoClient.db("test").collection("gifs");

  app.use(express.urlencoded());
  app.use(express.static(__dirname + "/static"));
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/views");

  app.get("/", async (req, res) => {
    const cursor = gifCollection.aggregate([{ $sample: { size : 1 }}]);
    const data = await cursor.next();
    const imageUrl = (data) ? data.url : "https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif";
    res.render("index", { imageUrl, message: "Hello DockerCon!" });
  });

  app.post("/add-meme", async (req, res) => {
    const newDocument = { url : req.body.url, default: false };
    await gifCollection.insertOne(newDocument);
    res.redirect("/");
  });

  server = app.listen(3000, () => console.log("Listening on port 3000"));
});

// Gracefully shutdown on SIGTERM (container engine) and SIGUSR2 (nodemon)
function shutdown() {
  if (mongoClient)
    mongoClient.close();
  if (server)
    server.close();
  process.exit();
}
process.on("SIGTERM", shutdown);
process.on("SIGUSR2", shutdown);