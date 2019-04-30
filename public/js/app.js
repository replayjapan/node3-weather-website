// console.log('Client side Javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data=>{
//         console.log(data)
//     }))
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
// messageOne.textContent = ''
const messageTwo = document.querySelector('#message-2')
// messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading....'
messageTwo.textContent = ''
    const location = search.value


    fetch('http://localhost:3000/weather?address='+location).then((response => {
    response.json().then((data)=>{
        if (data.error) {
            messageOne.textContent = data.error
        } else 
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
}))

})




// fetch('http://localhost:3000/weather?address=Boston').then((response => {
//     response.json().then((data)=>{
//         if (data.error) {
//             console.log(data.error)
//         } else 
//         {console.log(data.location)
//         console.log(data.forecast)}
//     })
// }))


// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const location = search.value
//     console.log(location)

// })