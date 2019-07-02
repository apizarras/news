//ajax calls and dynamic html
$.getJSON("/articles", function(data) {
    console.log("jquery display articles: ", data)
    for(i=0;i<data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>")
    }
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    let dataId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + dataId
    }).then(function(data) {
        $("#notes").append("<div class='card'>" + "<div class='card-header'>" + data.title + "</div>");
        $("#notes").append("<div class='card-body'>" + "<h5 class='card-title'>Sample Title</h5>");
        $("#notes").append("<p class='card-text'>Your Notes About Article Go Here</p>");
        $("#notes").append("<button id='save-note'>Save Note</button>")
    });
});

