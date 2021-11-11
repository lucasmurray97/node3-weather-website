console.log("Client side javascript file")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#messageOne")
const messageTwo = document.querySelector("#messageTwo")
const messageThree = document.querySelector("#messageThree")
weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                
            }else{
                messageOne.textContent = "Location: " + data.Location
                messageTwo.textContent = "Temperature: "+ data.Temperature
                messageThree.textContent = "Feels Like: "+data.FeelsLike
            }
        })      
    })
})