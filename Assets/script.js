document.addEventListener("DOMContentLoaded", function() {
    var currentDate = new Date();
    var currentDayElement = document.getElementById("current-day");
    currentDayElement.textContent = currentDate.toDateString();
  
    var timeblocksElement = document.getElementById("timeblocks");
    var savedEventsElement = document.getElementById("saved-events");
    var businessHoursStart = 9;
    var businessHoursEnd = 17;
  
    for (var hour = businessHoursStart; hour <= businessHoursEnd; hour++) {
      var timeblock = document.createElement("div");
      timeblock.classList.add("timeblock");
      timeblock.id = "timeblock-" + hour;
  
      var timeLabel = document.createElement("div");
      timeLabel.classList.add("time-label");
      timeLabel.textContent = formatHour(hour);
      timeblock.appendChild(timeLabel);
  
      var eventInput = document.createElement("input");
      eventInput.type = "text";
      eventInput.classList.add("event-input");
      timeblock.appendChild(eventInput);
  
      var saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", saveEvent);
      timeblock.appendChild(saveButton);
  
      timeblocksElement.appendChild(timeblock);
    }
  
    loadSavedEvents();
  
    function formatHour(hour) {
      var amPm = hour >= 12 ? "PM" : "AM";
      var formattedHour = hour > 12 ? hour - 12 : hour;
      return formattedHour + " " + amPm;
    }
  
    function saveEvent(event) {
      var timeblock = event.target.parentNode;
      var eventInput = timeblock.querySelector(".event-input");
      var eventText = eventInput.value;
      var eventId = timeblock.id;
      var eventTime = formatHour(Number(eventId.split("-")[1]));
  
      localStorage.setItem(eventId, JSON.stringify({ text: eventText, time: eventTime }));
      addSavedEventToList(eventId, eventText, eventTime);
    }
  
    function loadSavedEvents() {
      for (var hour = businessHoursStart; hour <= businessHoursEnd; hour++) {
        var eventId = "timeblock-" + hour;
        var savedEventJSON = localStorage.getItem(eventId);
  
        if (savedEventJSON) {
          var savedEvent = JSON.parse(savedEventJSON);
          var timeblock = document.getElementById(eventId);
          var eventInput = timeblock.querySelector(".event-input");
          eventInput.value = savedEvent.text;
  
          addSavedEventToList(eventId, savedEvent.text, savedEvent.time);
        }
      }
    }
  
    function addSavedEventToList(eventId, eventText, eventTime) {
      var savedEventItem = document.createElement("li");
      savedEventItem.textContent = eventText + " - " + eventTime;
      savedEventItem.dataset.eventId = eventId;
  
      savedEventsElement.appendChild(savedEventItem);
    }
  });
  
  