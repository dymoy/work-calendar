// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDay = dayjs();
  var currentTime = currentDay.hour();
  var timeBlocksContainer = $('#time-block-container');

  // Apply the past, present, or future class to each time block by comparing the id to the current hour
  function colorTimeBlocks() {
    for(let i = 0; i < 9; i++) {
      // Get the corresponding child under #time-block-container div
      var currTimeBlock = timeBlocksContainer.children('div').eq(i);
      // Store the hour within the ID of the current timeblock 
      var selectedTime = Number(currTimeBlock.attr('id').slice(5));
  
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
  }

  // When the page renders, display any saved events onto the calendar
  function renderLastSaved() {
    // For each textarea element, get the parent's id attribute to search local storage
    $('textarea').each(function() {
      var parentName = $(this).parent().attr('id');
      // Set the textarea content as the value saved in local storage
      $(this).val(localStorage.getItem(parentName));
    })
  }
  
  // This function will save any events in the textarea element of the corresponding time block into local storage
  function handleSave(event) {
    var eventParentEl = event.target;

    // Keep going up the DOM tree until the parent timeblock div is selected. 
    while(eventParentEl.tagName != 'DIV') {
      eventParentEl = eventParentEl.parentElement;
    }

    var timeBlockID = eventParentEl.id;
    var textToSave = eventParentEl.children[1].value;
    
    // Checks to see if text was inputted into the textarea 
    if (textToSave === '') {
      alert('No event was entered.');
    } else {
      // Save the textarea content into local storage using the hour-x as the ID
      localStorage.setItem(timeBlockID, textToSave);

      // Call to render last saved content 
      renderLastSaved();

      // Alert the user that the new event has been saved. 
      alert("New event saved!");
    } 
  }

  // Display the current date in the header of the page
  $('#currentDay').text(currentDay.format('dddd, MMM D, YYYY | h:mm A'));
  colorTimeBlocks();
  renderLastSaved();
  
  // Add a listener for click events on the save button
  timeBlocksContainer.on('click', '.saveBtn', handleSave);
});
