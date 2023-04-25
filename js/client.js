const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

var audio = new Audio('bell.mp3')

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }
}

// runs this event when form is submitted
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    // first we want to display our message
    append(`You: ${message}`,'right');
    // sends msg to server that i sent the message
    socket.emit('send',message);
    messageInput.value = '';
})

const nm = prompt("Enter your name");
socket.emit('new-user-joined',nm);

socket.on('user-joined',nm=>{
    append(`${nm} has joined the chat`,'left');
})

// when server sends recieve message
socket.on('recieve',data=>{
    append(`${data.nm}: ${data.message}`,'left');
})

// when server sends left mesg
socket.on('left',nm=>{
    append(`${nm} left the chat`,'left');
})