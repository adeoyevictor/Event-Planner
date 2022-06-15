let form = document.querySelector(".event-form");
let eventName = document.getElementById("eventName");
let eventDate = document.getElementById("eventDate");
let eventTime = document.getElementById("eventTime");
let addButton = document.getElementById("submit");

form.addEventListener("submit",(event) =>{
 event.preventDefault()
 const eventNameValue = eventName.value
 const eventDateValue = eventDate.value
 const eventTimeValue = eventTime.value
console.log(eventNameValue,eventDateValue,eventTimeValue)

})
