//ajax calls and dynamic html
function displayArticles(data) {
    $.getJSON("/articles", function(data) {
        console.log("display articles: ", data)
        for(i=0;i<data.length; i++) {
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>")
        }
    });
};


$("#scrape").on("click", function() {
    $("#articles").empty();
    $.getJSON("/scrape", function(data) {
        displayArticles(data);
    });
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    let dataId = $(this).attr("data-id");
    console.log("this is dataID: ", dataId)
    $.ajax({
        method: "GET",
        url: "/articles/" + dataId
    }).then(function(data) {
        console.log('this the data: ', data);
        $("#notes").append("<div class='card'>");
        $("#notes").append("<div class='card-body'>" + "<h5 class='card-title'>" + data.title + "</h5>");
        $("#notes").append("<input id='titleinput'")
        $("#notes").append("<textarea id='bodyinput' class='card-text'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "id='save-note'>Save Note</button>");

        if(data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});

$(document).on("click", "#save-note", function() {
    let dataId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + dataId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(function(data) {
        console.log(data);
    });
    $("#titleinput").val("");
    $("#bodyinput").val("");
})

