const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    link: 
    {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;