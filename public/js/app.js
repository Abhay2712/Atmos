console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#message3')
const message4 = document.querySelector('#message4')
const message5 = document.querySelector('#message5')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = (data.error)
            } else {
                message1.textContent = (data.location)
                message2.textContent = (data.forecast)
                message3.textContent = (data.rainfall)
                message4.textContent = (data.wind)
                message5.textContent = (data.cloud)
            }
        })
    })
})