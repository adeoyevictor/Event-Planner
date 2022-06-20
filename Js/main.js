let form = document.querySelector('.event-form')
let eventName = document.getElementById('eventName')
let eventDate = document.getElementById('eventDate')
let eventTime = document.getElementById('eventTime')
let addButton = document.getElementById('submit')
let eventList = document.querySelector('.event-list')
let eventListContainer = document.querySelector('.event-list-container')
let clearEventBtn = document.querySelector('.clear-events')
let userName = document.querySelector('.userName')
let alert = document.querySelector('.alert')

let allBtn = document.querySelector('.filter-tab').children[0]
let completedBtn = document.querySelector('.filter-tab').children[1]
let pendingBtn = document.querySelector('.filter-tab').children[2]

function displayAlert(text, action) {
  alert.textContent = text
  alert.classList.add(`alert-${action}`)
  // remove alert
  setTimeout(function () {
    alert.textContent = ''
    alert.classList.remove(`alert-${action}`)
  }, 3000)
}
//const today = new Date().toISOString.split("T")[0]
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
let today = new Date()
today = formatDate(today)
console.log(today)
eventDate.setAttribute('min', today)
userName.innerHTML = localStorage.getItem('user')
  ? localStorage.getItem('user')
  : `Echo`
//Functions
function getEvents() {
  const events = document.querySelectorAll('.event-item')
  if (events.length > 0) {
    events.forEach(function (event) {
      eventList.removeChild(event)
    })
  }
  const userName = localStorage.getItem('user')
  let newEventList = getLocalStorage()
  newEventList = newEventList.filter((event) => {
    return event.userName == userName
  })
  if (newEventList.length > 0) {
    newEventList.forEach(function (event) {
      createListItem(
        event.id,
        event.eventNameValue,
        event.eventDateValue,
        event.eventTimeValue,
        event.completed
      )
    })
  }
}
function getPendingEvents() {
  const events = document.querySelectorAll('.event-item')
  if (events.length > 0) {
    events.forEach(function (event) {
      eventList.removeChild(event)
    })
  }
  const userName = localStorage.getItem('user')
  let newEventList = getLocalStorage()
  newEventList = newEventList.filter((event) => {
    return event.userName == userName && event.completed == false
  })
  if (newEventList.length > 0) {
    newEventList.forEach(function (event) {
      createListItem(
        event.id,
        event.eventNameValue,
        event.eventDateValue,
        event.eventTimeValue,
        event.completed
      )
    })
  }
}
function getCompletedEvents() {
  const events = document.querySelectorAll('.event-item')
  if (events.length > 0) {
    events.forEach(function (event) {
      eventList.removeChild(event)
    })
  }
  const userName = localStorage.getItem('user')
  let newEventList = getLocalStorage()
  newEventList = newEventList.filter((event) => {
    return event.userName == userName && event.completed == true
  })
  if (newEventList.length > 0) {
    newEventList.forEach(function (event) {
      createListItem(
        event.id,
        event.eventNameValue,
        event.eventDateValue,
        event.eventTimeValue,
        event.completed
      )
    })
  }
}
const deleteEvent = (id) => {
  let eventList = getLocalStorage()
  // let eventList = localStorage.getItem('eventList');
  eventList = eventList.filter((event) => {
    if (event.id !== id) {
      return event
    }
  })

  localStorage.setItem('eventList', JSON.stringify(eventList))
}
const toggleCompleted = (id) => {
  let eventList = getLocalStorage()
  // let eventList = localStorage.getItem('eventList');
  eventList = eventList.map((event) => {
    if (event.id == id) {
      event.completed = !event.completed
    }
    return event
  })

  localStorage.setItem('eventList', JSON.stringify(eventList))
}
const editEvent = (id, name, date, time) => {
  let eventList = getLocalStorage()

  eventList = eventList.map((event) => {
    if (event.id === id) {
      event.eventNameValue = name
      event.eventDateValue = date
      event.eventTimeValue = time
    }
    return event
  })

  localStorage.setItem('eventList', JSON.stringify(eventList))
}
const setBackToDefault = () => {
  eventName.value = ''
  eventDate.value = ''
  eventTime.value = ''
}

const createListItem = (id, name, date, time, completed) => {
  const element = document.createElement('li')
  element.classList.add('event-item')
  let attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<input type="checkbox" name="completed" class="completed" id="${id}" /> <span class='event-name'>${name}</span> <span class='event-date'>${date}</span> <span class='event-time'>${time}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`
  if (completed) {
    element.children[0].setAttribute('checked', completed)
  }
  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')
  const completeBtn = element.querySelector('.completed')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    eventList.removeChild(targetElement)
    deleteEvent(id)
    displayAlert('Event Deleted', 'danger')
  })

  completeBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    const currentTab = localStorage.getItem('currentTab')
    toggleCompleted(id)
    if (currentTab == 'completed' && !targetElement.children[0].checked) {
      eventList.removeChild(targetElement)
    }
    if (currentTab == 'pending' && targetElement.children[0].checked) {
      eventList.removeChild(targetElement)
    }
    displayAlert('Event Updated', 'success')
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
    newElement.children[1].setAttribute('min', today)
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
  element.innerHTML = `<input type="checkbox" name="completed" class="completed" id="${id}" /> <span class='event-name'>${eventNameValue}</span> <span class='event-date'>${eventDateValue}</span> <span class='event-time'>${eventTimeValue}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`

  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')
  const completeBtn = element.querySelector('.completed')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    eventList.removeChild(targetElement)
    deleteEvent(id)
    displayAlert('Event Deleted', 'danger')
  })

  completeBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    const currentTab = localStorage.getItem('currentTab')
    toggleCompleted(id)
    if (currentTab == 'completed' && !targetElement.children[0].checked) {
      eventList.removeChild(targetElement)
    }
    if (currentTab == 'pending' && targetElement.children[0].checked) {
      eventList.removeChild(targetElement)
    }
    displayAlert('Event Updated', 'success')
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

    const saveBtn = newElement.querySelector('.save-btn')
    saveBtn.classList.add('save-btn')
    element.parentNode.replaceChild(newElement, element)
  })
  eventList.appendChild(element)
  console.log(element)
  displayAlert('Event added to the list', 'success')
  addToLocalStorage(id, eventNameValue, eventDateValue, eventTimeValue, false)
  setBackToDefault()
}

allBtn.addEventListener('click', () => {
  localStorage.setItem('currentTab', 'all')
  const oldTab = document.querySelector('.active')
  oldTab.classList.remove('active')
  allBtn.classList.add('active')
  getEvents()
})

completedBtn.addEventListener('click', () => {
  localStorage.setItem('currentTab', 'completed')
  const oldTab = document.querySelector('.active')
  oldTab.classList.remove('active')
  completedBtn.classList.add('active')
  getCompletedEvents()
})

pendingBtn.addEventListener('click', () => {
  localStorage.setItem('currentTab', 'pending')
  const oldTab = document.querySelector('.active')
  oldTab.classList.remove('active')
  pendingBtn.classList.add('active')
  getPendingEvents()
})
const addToLocalStorage = (
  id,
  eventNameValue,
  eventDateValue,
  eventTimeValue,
  completed
) => {
  const userName = localStorage.getItem('user')
  const event = { id, userName, eventNameValue, eventDateValue, eventTimeValue, completed }
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
  displayAlert('Event Edited', 'success')
  // element.parentNode.replaceChild(newElement, element)
  editEvent(id, newName, newDate, newTime)
}


window.addEventListener('DOMContentLoaded', getEvents)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  addEvent()
})

clearEventBtn.addEventListener('click', () => {
  const userName = localStorage.getItem('user')
  const events = document.querySelectorAll('.event-item')
  if (events.length > 0) {
    events.forEach(function (event) {
      eventList.removeChild(event)
    })
  }
  let newEventList = getLocalStorage('eventList')
  newEventList = newEventList.filter((event) => {
    return event.userName !== userName
  })
  displayAlert('Events Cleared', 'danger')
  localStorage.setItem('eventList', JSON.stringify(newEventList))
})
