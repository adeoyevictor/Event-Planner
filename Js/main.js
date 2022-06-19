let form = document.querySelector('.event-form')
let eventName = document.getElementById('eventName')
let eventDate = document.getElementById('eventDate')
let eventTime = document.getElementById('eventTime')
let addButton = document.getElementById('submit')
let eventList = document.querySelector('.event-list')
let eventListContainer = document.querySelector('.event-list-container')
let clearEventBtn = document.querySelector('.clear-events')
let userName = document.querySelector(".userName")
let alert = document.querySelector(".alert")

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 3000);
}
//const today = new Date().toISOString.split("T")[0]
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
let today = new Date()
today = formatDate(today)
console.log(today)
eventDate.setAttribute("min",today)
userName.innerHTML = localStorage.getItem('user') ? localStorage.getItem('user') : `Echo`
//Functions 
function getEvents() {
  const userName = localStorage.getItem('user')
  let eventList = getLocalStorage()
  eventList = eventList.filter(event => {
    return event.userName == userName
  })
  if (eventList.length > 0) {
    eventList.forEach(function (event) {
      createListItem(
        event.id,
        event.eventNameValue,
        event.eventDateValue,
        event.eventTimeValue
      )
    })
  }
}
const deleteEvent=(id)=> {
  let eventList = getLocalStorage();
// let eventList = localStorage.getItem('eventList');
  eventList = eventList.filter( (event)=> {
    if (event.id !== id) {
      return event;
    }
  });

  localStorage.setItem("eventList", JSON.stringify(eventList));
}
const editEvent=(id, name, date, time)=> {
  let eventList = getLocalStorage();

  eventList = eventList.map( (event)=> {
    if (event.id === id) {
      event.eventNameValue = name
      event.eventDateValue = date
      event.eventTimeValue = time
    }
    return event;
  });

  localStorage.setItem("eventList", JSON.stringify(eventList));
}
const setBackToDefault = () => {
  eventName.value = ''
  eventDate.value = ''
  eventTime.value = ''
}

const createListItem = (id, name, date, time) => {
  const element = document.createElement('li')
  element.classList.add('event-item')
  let attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<span class='event-name'>${name}</span> <span class='event-date'>${date}</span> <span class='event-time'>${time}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`

  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    eventList.removeChild(targetElement)
    deleteEvent(id)
    console.log(targetElement)
  })

  editBtn.addEventListener('click', (e) => {
    element.classList.add('hidden')
    const targetElement = e.currentTarget.parentElement
    const oldElement = targetElement

    const nameValue = targetElement.querySelector('.event-name')
    const dateValue = targetElement.querySelector('.event-date')
    const timeValue = targetElement.querySelector('.event-time')

    // eventName.value = nameValue.innerHTML
    // eventDate.value = dateValue.innerHTML
    // eventTime.value = timeValue.innerHTML

    const newElement = document.createElement('form')
    newElement.classList.add('save-form')
    newElement.addEventListener('submit', (e) => {
      e.preventDefault()
      saveEvent(oldElement, newElement)
    })
    newElement.innerHTML = `  
       
        <input type="text" id="editEventName" value=${nameValue.innerHTML} required />
        <input type="date" id="editEventDate" value=${dateValue.innerHTML} required />
        <input type="time" id="editEventTime" value=${timeValue.innerHTML} required />
        <button type="submit" class="save-btn">Save</button>`
        newElement.children[1].setAttribute("min", today)
    const newName = newElement.children[0].value
    const newDate = newElement.children[1].value
    const newTime = newElement.children[2].value
    const saveBtn = newElement.querySelector('.save-btn')
    saveBtn.classList.add('save-btn')
    console.log(newName, newDate, newTime)
    element.parentNode.replaceChild(newElement, element)
  })
  eventList.appendChild(element)
}

const addEvent = () => {
  const eventNameValue = eventName.value
  const eventDateValue = eventDate.value
  const eventTimeValue = eventTime.value
  const id = new Date().getTime().toString()
  const element = document.createElement('li')
  element.classList.add('event-item')
  let attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<span class='event-name'>${eventNameValue}</span> <span class='event-date'>${eventDateValue}</span> <span class='event-time'>${eventTimeValue}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`

  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    eventList.removeChild(targetElement)
    deleteEvent(id)
    displayAlert("Event Deleted","danger")
  })

  editBtn.addEventListener('click', (e) => {
    // element.classList.add('hidden')
    const targetElement = e.currentTarget.parentElement
    const oldElement = targetElement

    const nameValue = targetElement.querySelector('.event-name')
    const dateValue = targetElement.querySelector('.event-date')
    const timeValue = targetElement.querySelector('.event-time')

    // eventName.value = nameValue.innerHTML
    // eventDate.value = dateValue.innerHTML
    // eventTime.value = timeValue.innerHTML

    const newElement = document.createElement('form')
    newElement.classList.add('save-form')
    newElement.addEventListener('submit', (e) => {
      e.preventDefault()
      saveEvent(oldElement, newElement)
    })
    newElement.innerHTML = `  
       
        <input type="text" id="editEventName" value=${nameValue.innerHTML} required />
        <input type="date" id="editEventDate" value=${dateValue.innerHTML} required />
        <input type="time" id="editEventTime" value=${timeValue.innerHTML} required />
        <button type="submit" class="save-btn">Save</button>`
    // const newName = newElement.children[0].value
    // const newDate = newElement.children[1].value
    // const newTime = newElement.children[2].value
    const saveBtn = newElement.querySelector('.save-btn')
    saveBtn.classList.add('save-btn')
    element.parentNode.replaceChild(newElement, element)
  })
  eventList.appendChild(element)
  console.log(element)
displayAlert("Event added to the list","success" )
  addToLocalStorage(id, eventNameValue, eventDateValue, eventTimeValue)
  setBackToDefault()
}


const addToLocalStorage = (
  id,
  eventNameValue,
  eventDateValue,
  eventTimeValue
) => {
  const userName = localStorage.getItem('user')
  const event = { id, userName, eventNameValue, eventDateValue, eventTimeValue }
  let events = getLocalStorage()
  events.push(event)
  localStorage.setItem('eventList', JSON.stringify(events))
}

const getLocalStorage = () => {
  return localStorage.getItem('eventList')
    ? JSON.parse(localStorage.getItem('eventList'))
    : []
}

const saveEvent = (oldElement, newElement) => {
  const newName = newElement.children[0].value
  const newDate = newElement.children[1].value
  const newTime = newElement.children[2].value
  const id = oldElement.dataset.id
  oldElement.querySelector('.event-name').innerHTML = newName
  oldElement.querySelector('.event-date').innerHTML = newDate
  oldElement.querySelector('.event-time').innerHTML = newTime
  newElement.parentNode.replaceChild(oldElement, newElement)
  displayAlert("Event Edited","success")
  // element.parentNode.replaceChild(newElement, element)
  editEvent(id, newName, newDate, newTime)

}
//

window.addEventListener("DOMContentLoaded", getEvents);

form.addEventListener('submit', (event) => {
  event.preventDefault()
  addEvent()
})

clearEventBtn.addEventListener('click', () => {
  const userName = localStorage.getItem('user')
  const events = document.querySelectorAll(".event-item")
  if (events.length > 0) {
    events.forEach(function (event) {
      eventList.removeChild(event)
    })
  }
  let newEventList = getLocalStorage('eventList')
  newEventList = newEventList.filter((event)=>{
    return event.userName !== userName
  })
  displayAlert("Events Cleared","danger")
  localStorage.setItem('eventList', JSON.stringify(newEventList))  
})