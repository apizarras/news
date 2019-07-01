const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const morgan = require("morgan");
const exhbrs = require("express-handlebars");
const db = require("./models");
const PORT = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/news", {useNewUrlParser: true});


app.listen(PORT, function() {
    console.log("app running on port: ", PORT)
});