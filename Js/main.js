//const {user, events} = require("./database")

let form = document.querySelector(".event-form");
let eventName = document.getElementById("eventName");
let eventDate = document.getElementById("eventDate");
let eventTime = document.getElementById("eventTime");
let addButton = document.getElementById("submit");
//let userName = document.querySelector(".userName");
let eventList = document.querySelector(".event-list");


const addEvent = () => {
    const eventNameValue = eventName.value
    const eventDateValue = eventDate.value
    const eventTimeValue = eventTime.value
    const id = new Date().getTime().toString()
    const element = document.createElement("li")
    let attr = document.createAttribute("data-id")
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `<p>${eventNameValue}</p> <p>${eventDateValue}</p> <p>${eventTimeValue}</p>`
    eventList.appendChild(element)
    console.log(element)
    addToLocalStorage(id, eventNameValue, eventDateValue, eventTimeValue)
    setBackToDefault()
    // events.push(
    //     {
    //         id,
    //         userName,
    //         eventName:eventNameValue,
    //         eventDate:eventDateValue, 
    //         eventTime:eventTimeValue
    //     }
    // )
    // console.log(events)
}

form.addEventListener("submit",(event) =>{
 event.preventDefault()
 addEvent()
 //console.log(eventNameValue,eventDateValue,eventTimeValue)
})

const setBackToDefault = () => {
    eventName.value = ""
    eventDate.value = ""
    eventTime.value = ""
}

const addToLocalStorage = (id, eventNameValue, eventDateValue, eventTimeValue) => {
    const event = {id, eventNameValue, eventDateValue, eventTimeValue}
    let events = getLocalStorage()
    events.push(event)
    localStorage.setItem("eventList", JSON.stringify(event))
}

const getLocalStorage = () =>{
    return localStorage.getItem("eventList")? JSON.parse(localStorage.getItem("eventList")) : []
}