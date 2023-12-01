// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var root = $('#root');
  // var currentDay = dayjs('2023-11-30 13:23');
  currentDay = dayjs();
  var timeBlocksContainer = $('#time-block-container');
  const hoursOfDay = 9; 
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentTime = currentDay.hour();
  console.log(currentTime);

  for(let i = 0; i < 9; i++) {
    var currTimeBlock = timeBlocksContainer.children('div').eq(i);
    var selectedTime = Number(currTimeBlock.attr('id').slice(5));
    console.log(selectedTime);

    if (currentTime > selectedTime) {
      // If selectedTime is in the past, display color of timeblocks in grey 
      currTimeBlock.addClass('past');
    } else if (currentTime === selectedTime) {
      // If selectedTime is the current hour, display color of timeblock in red
      currTimeBlock.addClass('present');
    } else {
      // if selectedTime is in the future, display color of timeblocks in green
      currTimeBlock.addClass('future');
    }
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  // $(`#currentDay`).text(dayjs().format('dddd, MMMM DD | HH:mm'));
  $('#currentDay').text(currentDay.format('MMM D, YYYY | HH:mm'));
});
