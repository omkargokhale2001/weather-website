const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

// message1.textContent = 'From JS'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent = "Loading..."
    message2.textContent = ""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            message1.textContent = data.forecast
            message2.textContent = "-" + data.place
        }
        else{
            message1.textContent = data.error
        }
    })
})
    
})