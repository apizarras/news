const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const morgan = require("morgan");
const exhbrs = require("express-handlebars");
const db = require("./models");
const PORT = 3000;
const cheerio = require("cheerio");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/news", {useNewUrlParser: true});

    app.get("/scrape", function(req,res) {
        axios.get("https://www.nytimes.com").then(function(response) {
            let $ = cheerio.load(response.data);
            console.log('this is the response data', response.data);
            $("article h2").each(function(i, element) {
                let result = {};
                result.title = $(this).children("h2").text();
                result.link = $(this).children("a").attr("href");

            db.Article.create(result).then(function(dbArticle) {
                console.log('this is dbArticle', dbArticle);
            }).catch(function(err) {
                console.log(err)
            });
           });
           res.send("Scrape Complete");
        });

    });

app.listen(PORT, function() {
    console.log("app running on port: ", PORT)
});