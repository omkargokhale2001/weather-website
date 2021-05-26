const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#message3')
const message4 = document.querySelector('#message4')
const message5 = document.querySelector('#message5')
// message1.textContent = 'From JS'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent = "Loading..."
    message3.textContent = ""
    message4.textContent = ""
    message5.textContent = ""
    message2.textContent = ""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            message1.textContent = data.forecast.line1
            message3.textContent = data.forecast.line2
            message4.textContent = data.forecast.line3
            message5.textContent = data.forecast.line4
            message2.textContent = "-" + data.place
        }
        else{
            message1.textContent = data.error
        }
    })
})
    
})