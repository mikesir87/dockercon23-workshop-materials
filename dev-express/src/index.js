const express = require("express");
const app = express();

app.get("/api/message", (request, response) => {
  response.json({
    message: "Whalecome to Docker!!!",
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));