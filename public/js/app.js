const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#messageOne")
const messageTwo = document.querySelector("#messageTwo")
const messageThree = document.querySelector("#messageThree")
const messageFour = document.querySelector("#messageFour")
const messageFive = document.querySelector("#messageFive")
weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    messageFive.textContent = ""
    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                
            }else{
                messageOne.textContent = "Location: " + data.Location
                messageTwo.textContent = "Temperature: "+ data.Temperature
                messageThree.textContent = "Feels Like: "+data.FeelsLike
                messageFour.textContent = "Description: "+data.Description
                messageFive.textContent = "Humidity: "+ data.Humidity + "%"
            }
        })      
    })
})