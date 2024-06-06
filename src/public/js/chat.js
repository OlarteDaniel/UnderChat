const socket = io();
const chatbox = document.getElementById('chatbox');
let username ;

Swal.fire({
    title:"Identificate",
    icon:"question",
    input:"text",
    inputValidator: (value) =>{
        if(!value){
            return "Ingrese un nombre!!!";
        }
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(response => {
    username = response.value;
})


chatbox.addEventListener('keyup',(event) =>{
    if(event.key === 'Enter'){
        socket.emit('message',{username:username,message:chatbox.value});
        chatbox.value = '';
    }
})

socket.on('log',data => {
    const logs = document.getElementById('messagesLog');
    let messages = '';
    data.forEach(logItem => {
        messages += `${logItem.username} dice: ${logItem.message} <br/>`
    })
    logs.innerHTML = messages;
})