//ajax calls and dynamic html

function displayArticles(data) {
    $.getJSON("/articles", function(data) {
        console.log("display articles: ", data)
        for(i=0;i<data.length; i++) {
            $("#articles").append(
                "<h3 data-id='" + data[i]._id + "'>" + data[i].title + "</h3>" + "<br />" + "<a href='data[i].link'>" + data[i].link + "</a>" + "<br />" + "<p data-id='" + data[i]._id + "'>" + data[i].summary + "</p>")
        }
    });
};


$("#scrape").on("click", function() {
    $("#articles").empty();
    displayArticles();
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
        $("#notes").append("<form><div class='form-group'>");
        $("#notes").append("<h5 class='card-title'>" + data.title + "</h5>");
        $("#notes").append("<label for='formGroupExampleInput'>Give Your Note a Title</label>");
        $("#notes").append("<input type='text' class='form-control' id='titleinput' placeholder='Note Title'></div>");
        $("#notes").append("<div class='form-group'>")
        $("#notes").append("<label for='formGroupExampleInput2'>Your Notes:</label>");
        $("#notes").append("<textarea id='bodyinput' class='form-control' id='formGroupExampleInput2' placeholder='Notes Go Here'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='save-note'>Save Note</button>");
        $("#notes").append("</div></form>");

        console.log('this is note', note);
        if(data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
            res.render({notes: data});
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

