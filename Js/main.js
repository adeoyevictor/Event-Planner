let form = document.querySelector('.event-form')
let eventName = document.getElementById('eventName')
let eventDate = document.getElementById('eventDate')
let eventTime = document.getElementById('eventTime')
let addButton = document.getElementById('submit')
let eventList = document.querySelector('.event-list')
let eventListContainer = document.querySelector('.event-list-container')
let clearEventBtn = document.querySelector('.clear-events')

const addEvent = () => {
  const eventNameValue = eventName.value
  const eventDateValue = eventDate.value
  const eventTimeValue = eventTime.value
  const id = new Date().getTime().toString()
  const element = document.createElement('li')
  let attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<span class='event-name'>${eventNameValue}</span> <span class='event-date'>${eventDateValue}</span> <span class='event-time'>${eventTimeValue}</span><button type='button' class='edit-btn'>Edit</button><button type='button' class='delete-btn'>Delete</button>`

  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')

  deleteBtn.addEventListener('click', (e) => {
    const targetElement = e.currentTarget.parentElement
    eventList.removeChild(targetElement)
  })

  editBtn.addEventListener('click', (e) => {
    element.classList.add('hidden')
    const targetElement = e.currentTarget.parentElement

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
      saveEvent(targetElement, newElement)
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
    eventList.appendChild(newElement)
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

// clearEventBtn.addEventListener('click', () => {
//   console.log('clicked')
//   eventListContainer.removeChild(eventList)
// })
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
const saveEvent = (targetElement, newElement) => {
  const newName = newElement.children[0].value
  const newDate = newElement.children[1].value
  const newTime = newElement.children[2].value
  targetElement.querySelector('.event-name').innerHTML = newName
  targetElement.querySelector('.event-date').innerHTML = newDate
  targetElement.querySelector('.event-time').innerHTML = newTime

  targetElement.classList.remove('hidden')
  newElement.classList.add('hidden')
  // console.log(nameValue)
}
