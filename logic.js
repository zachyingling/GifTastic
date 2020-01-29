// Add function to update buttons, add ajax call to pull from giphy, add event listeners (one for adding an animal and one for clicking on one of the buttons on the top row)

$(document).ready(function() {
  let animals = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "goldfish",
    "bird",
    "turtle",
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

  $("#submit-button").click(function() {
    if ($("#input-box").val() === undefined) {
      return;
    } else {
      let inputValue = $("#input-box").val();
      animals.push(inputValue);
      updateButtons();
    }
  });
});
