const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = 5000;
const cors = require('cors');

const app = express();

app.use(cors());




// middleware qui permet de traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/artworks", require("./routes/artwork.routes"));
app.use("/listings", require("./routes/listing.routes"));
app.use("/transactions", require("./routes/transaction.routes"));
app.use("/carts", require("./routes/cart.routes"));

connectDB()
// lancer le serveur 
app.listen(port, () => console.log("Le serveur a démarré au port " + port));