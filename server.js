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

mongoose.connect("mongodb://127.0.0.1/news", {useNewUrlParser: true});

    app.get("/scrape", function(req,res) {
        axios.get("https://www.nytimes.com").then(function(response) {
            let $ = cheerio.load(response.data);
            // console.log('this is the response data', response.data[0]);
            $("a").each(function(i, element) {
                let result = {};
                result.link = $(this).attr("href");
                result.title = $(this).children("div").children("h2").text();
                result.summary = $(this).children("ul").children("li").text();

            db.Article.create(result).then(function(dbArticle) {
                console.log('this is dbArticle', dbArticle);
            }).catch(function(err) {
                console.log(err)
            });
           });
           res.send("Scrape Complete");
        });
    });

    app.get("/articles", function(req, res) {
        db.Article.remove({});
        db.Article.find({}).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

app.get("/articles/:id", function(req,res) {
    db.Article.findOne({id: req.params.id}).populate("note")
    .then(function(dbArticle) {res.json(dbArticle)})
    .catch(function(err) {
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate({_id: req.params.id}), {note: dbNote._id}, {new: true}
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("app running on port: ", PORT)
});