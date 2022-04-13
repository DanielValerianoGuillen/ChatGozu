$(function () {
  // conexión del lado del cliente socket.io
    const socket = io.connect();

    // obteniendo elementos DOM de la interfaz de chat
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    // obteniendo elementos DOM de la interfaz NicknameForm
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    
    // obteniendo el contenedor de nombres de usuario DOM
    const $users = $('#usernames');

    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html(`
            <div class="alert alert-danger">Ese nombre de author ya existe.</div>`);
            }
        });
        $nickname.val('');
    });
    // events
    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), data => {
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
    });
    socket.on('new message', data => {
        $chat.append(`<p class="msg"><b>${data.nick}</b>: ${data.msg}</p>`);
    });
    socket.on('usernames', data => {
        let html = '';
        for (i = 0; i < data.length; i++) {
            html += `<p> ${data[i]}</p>`;
        }
        $users.html(html);
    });

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}</b>: ${data.msg}</p>`);
    });
    socke.on('carga los viejos mensajes',msgs=>{
        for (let i = 0; i < msgs.length; i++) {
            dipararmensaje(msgs[i]);
            
        }
    })
    function dipararmensaje(data){
        $chat.append(`<p class="msg"><b>${data.nick}</b>: ${data.msg}</p>`);
    }
});