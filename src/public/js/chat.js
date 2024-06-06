console.log('Front conectado');

const socket = io();
console.log(socket);

const chatbox = document.getElementById('chatbox');

chatbox.addEventListener('keyup',(event) =>{
    if(event.key === 'Enter'){
        socket.emit('message',chatbox.value);
        chatbox.value = '';
    }
})

socket.on('log',data => {
    console.log(data)
    const logs = document.getElementById('messagesLog');
    let messages = '';
    data.forEach(message => {
        messages += `${socket.id} dice: ${message} <br/>`
    })
    logs.innerHTML = messages;
})