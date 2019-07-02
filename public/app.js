//ajax calls and dynamic html
$.getJSON("/articles", function(data) {
    console.log("jquery display articles: ", data)
    for(i=0;i<data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>")
    }
});

