const express = require("express");
const cors = require("cors");

const app = express();

// middleware before routing
app.use(cors());
app.use(express.json());

// route /api/posts to ./routes/api/posts
const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

// handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public"));

  // handle single page application
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

// host on port
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
