let form = document.querySelector('.event-form')
let eventName = document.getElementById('eventName')
let eventDate = document.getElementById('eventDate')
let eventTime = document.getElementById('eventTime')
let addButton = document.getElementById('submit')
let eventList = document.querySelector('.event-list')
let eventListContainer = document.querySelector('.event-list-container')
let clearEventBtn = document.querySelector('.clear-events')
let userName = document.querySelector(".userName")

userName.innerHTML = localStorage.getItem('user') ? localStorage.getItem('user') : `Echo`
window.addEventListener("DOMContentLoaded", getEvents);
function getEvents() {
  let eventList = getLocalStorage();

  if (eventList.length > 0) {
    eventList.forEach(function (event) {
      createListItem(event.id, event.eventNameValue,event.eventDateValue,event.eventTimeValue
        );

    });

    // container.classList.add("show-container");
  }
}

const createListItem = (id, name, date, time) =>{
  const element = document.createElement('li')
  element.classList.add("event-item")
  let attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<span class='event-name'>${name}</span> <span class='event-date'>${date}</span> <span class='event-time'>${time}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`

  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    eventList.removeChild(targetElement)
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
console.log(userName.innerHTML);
const addEvent = () => {
  const eventNameValue = eventName.value
  const eventDateValue = eventDate.value
  const eventTimeValue = eventTime.value
  const id = new Date().getTime().toString()
  const element = document.createElement('li')
   element.classList.add("event-item")
  let attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<span class='event-name'>${eventNameValue}</span> <span class='event-date'>${eventDateValue}</span> <span class='event-time'>${eventTimeValue}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`

  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
     console.log("clicked",e.currentTarget)
    eventList.removeChild(targetElement)
    
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
    const newName = newElement.children[0].value
    const newDate = newElement.children[1].value
    const newTime = newElement.children[2].value
    const saveBtn = newElement.querySelector('.save-btn')
    saveBtn.classList.add('save-btn')
    console.log(newName, newDate, newTime)
    element.parentNode.replaceChild(newElement, element)
  })
  eventList.appendChild(element)
  console.log(element)

  addToLocalStorage(id, eventNameValue, eventDateValue, eventTimeValue)
  setBackToDefault()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  addEvent()
})

clearEventBtn.addEventListener('click', () => {
  const events = document.querySelectorAll(".event-item")
  if (events.length > 0) {
    events.forEach(function (event) {
      eventList.removeChild(event)
    })
  }
  localStorage.removeItem('eventList')
  


  
})
const setBackToDefault = () => {
  eventName.value = ''
  eventDate.value = ''
  eventTime.value = ''
}

const addToLocalStorage = (
  id,
  eventNameValue,
  eventDateValue,
  eventTimeValue
) => {
  const event = { id, eventNameValue, eventDateValue, eventTimeValue }
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
  oldElement.querySelector('.event-name').innerHTML = newName
  oldElement.querySelector('.event-date').innerHTML = newDate
  oldElement.querySelector('.event-time').innerHTML = newTime
  newElement.parentNode.replaceChild(oldElement, newElement)
  // element.parentNode.replaceChild(newElement, element)
  oldElement.classList.remove('hidden')
  newElement.classList.add('hidden')
  // console.log(nameValue)
}
