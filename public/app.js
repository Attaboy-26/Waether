const weatherform = document.querySelector('form')
const searchEl = document.getElementById('location')
const messageone = document.getElementById('message1')
const messagetwo = document.getElementById('message2')

weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+(searchEl.value)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.textContent = data.error
            }else {
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
            }
        })
    })
})