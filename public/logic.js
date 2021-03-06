// add ajax call to pull from giphy, add event listeners (one for clicking on one of the buttons on the top row)

$(document).ready(function() {
  let animals = [
    "dog",
    "cat",
    "cooking",
    "donald trump",
    "coronavirus",
    "video games",
    "computers",
    "penguin"
  ];
  updateButtons();

  function updateButtons() {
    $(".buttons").empty();
    for (let i = 0; i < animals.length; i++) {
      let newButton = $("<input type='button' class='button'>");
      newButton.attr("value", animals[i]);
      $(".buttons").append(newButton);
    }
  }

  $("#submit-button").on("click", function(e) {
    e.preventDefault();
    if ($("#input-box").val() === "" || animals.includes($("#input-box").val())) {
      return false;
    } else {
      let inputValue = $("#input-box").val();
      animals.push(inputValue);
      updateButtons();
      gifSearch(inputValue);
    }
  });

  // Code to get the data in the button value to go to the giphy api and display the different gifs using the button's value
  $(document).on("click", ".button", function() {
    let searchParameter = $(this).val();
    gifSearch(searchParameter);
  });

  // to pause gif image on click via data-states
  $(document).on("click", ".gif-image", function() {
    if ($(this).attr("data-state") === "animate") {
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-still"));
    } else {
      $(this).attr("data-state", "animate");
      $(this).attr("src", $(this).attr("data-animate"));
    }
  });

  function gifSearch (searchParameter) {
    $.ajax({
      url: "/api/gifs/" + searchParameter,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $(".gifs").empty();
      for (let i = 0; i < 10; i++) {
        let newDiv = $("<div class='gif-box'>");
        newDiv.append("<h2>Rating: " + response.data[i].rating + "</h2>");
        newDiv.append(
          "<img src='" +
            response.data[i].images.downsized.url +
            "' alt='" +
            searchParameter +
            " gif' class='gif-image' data-state='animate' data-animate='" +
            response.data[i].images.downsized.url +
            "' data-still='" +
            response.data[i].images.downsized_still.url +
            "'/>"
        );
        $(".gifs").append(newDiv);
      }
      let clearDiv = $("<div class='clear'>")
      $(".gifs").append(clearDiv);
      if($("#gifContainer").height() > 120){
        $("#gifContainer").css("padding-bottom", "70px");
      }
    });
  }
});