// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var root = $('#root');
  var currentDay = dayjs('2023-11-30 13:23');
  // currentDay = dayjs();
  var timeBlocksContainer = $('#time-block-container');
  const hoursOfDay = 9; 

  renderLastSaved();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function handleSave(event) {
    var eventParentEl = event.target;

    while(eventParentEl.tagName != 'DIV') {
      eventParentEl = eventParentEl.parentElement;
    }

    var timeBlockID = eventParentEl.id;
    var textToSave = eventParentEl.children[1].value;
    
    localStorage.setItem(timeBlockID, textToSave);

    renderLastSaved();
  }

  timeBlocksContainer.on('click', '.saveBtn', handleSave);
  
  // Apply the past, present, or future class to each time block by comparing the id to the current hour. 
  var currentTime = currentDay.hour();

  for(let i = 0; i < 9; i++) {
    // Get the corresponding child under #time-block-container div
    var currTimeBlock = timeBlocksContainer.children('div').eq(i);
    // Store the hour within the ID of the current timeblock 
    var selectedTime = Number(currTimeBlock.attr('id').slice(5));
    // console.log(selectedTime);

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
  
  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  function renderLastSaved() {
    // For each textarea element, get the parent's id attribute to search local storage
    $('textarea').each(function() {
      var parentName = $(this).parent().attr('id');
      // Set the textarea content as the value saved in local storage
      $(this).val(localStorage.getItem(parentName));
    })
  }
  
  // Display the current date in the header of the page.
  $('#currentDay').text(currentDay.format('MMM D, YYYY | HH:mm'));
});
