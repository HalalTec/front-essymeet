const socket = io("https://essymeet.onrender.com")
const msg = document.getElementById('send-message')
const input = document.getElementById('input-message')
const container = document.querySelector('.messageContainer')
const logIn = document.getElementById('form')



logIn.addEventListener('submit', (e) => { 
    e.preventDefault()
    const user = document.querySelector('.username').value
    console.log(user);
    appendMessage('You join', 'sender')
    socket.emit('new-user', user)
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.container').style.display = 'block'

})



socket.on("chat-message", data => {
    appendMessage(`${data.name}: ${data.message}`, 'receiver')
})

socket.on("user-connected", name => {
    appendMessage(`${name} has joined the chat`, 'receiver')
})

socket.on("user-disconnected", name => {
    appendMessage(`${name} disconnected`, 'receiver')
})

msg.addEventListener('submit', e => {
    e.preventDefault()
    const message = input.value
    socket.emit('send-chat-message', message)
    appendMessage(`You: ${message}`, 'sender')
    input.value = ''
    scrollToLastItem()

})

function appendMessage  (message, user) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.classList.add(user)
    messageElement.innerText = message
    container.append(messageElement)
}

function scrollToLastItem() {
    const lastItem = container.lastElementChild;

    if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}