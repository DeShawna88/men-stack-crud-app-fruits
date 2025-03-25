const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// Here is where we import modules
// We begin by loading Express
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// Import the Fruit model
const Fruit = require("./models/fruit.js");

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

  

// // GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  
  // GET /fruits/new
// app.get("/fruits/new", (req, res) => {
//     res.send("This route sends the user a form page!");
//   });

// GET /fruits
// app.get("/fruits", (req, res) => {
//     res.send("Welcome to the index page!");
//   });

// app.get("/fruits", async (req, res) => {
//     const allFruits = await Fruit.find();
//     console.log(allFruits);
//     res.send("Welcome to the index page!");
// });
  
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });
  

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

// app.get("/fruits/:fruitId", (req, res) => {
//     res.send(
//       `This route renders the show page for fruit id: ${req.params.fruitId}!`
//     );
// });
  
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  // res.send(`This route renders the show page for fruit id: ${req.params.fruitId}!`);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});


// server.js

// POST /fruits
// app.post("/fruits", async (req, res) => {
//     console.log(req.body);
//     res.redirect("/fruits/new");
//   });
  
// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  });

// app.delete("/fruits/:fruitId", (req, res) => {
//     res.send("This is the delete route");
// });

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

  // GET localhost:3000/fruits/:fruitId/edit
// app.get("/fruits/:fruitId/edit", async (req, res) => {
//   const foundFruit = await Fruit.findById(req.params.fruitId);
//   console.log(foundFruit);
//   res.send(`This is the edit route for ${foundFruit.name}`);
// });

app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
