'use strict';//tum fonksiyonlar icin gecerli yap

var kullaniciGiris = document.querySelector('#username-page');
var mesajSayfasi = document.querySelector('#chat-page');
var kullaniciFormu = document.querySelector('#usernameForm');
var mesajFormu = document.querySelector('#messageForm');
var mesajInput = document.querySelector('#message');
var chatAlani = document.querySelector('#messageArea');

var stompClient = null;
var username = null;

function connect(event) {
    username = document.querySelector('#name').value.trim();
    if (username) {
        /*
          kullanici adı sayfası ile mesaj sayfasi birbirinden ayrilacak
         */
        kullaniciGiris.classList.add('hidden');
        mesajSayfasi.classList.remove('hidden');
        var socket = new SockJS('/kanal');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    stompClient.subscribe('/konu/public', onMessageReceived);

    stompClient.send("/app/global.register",
        {},
        JSON.stringify({fromUser: username, type: 'katil'})
    )

}

function onError(error) {
    connectingElement.textContent = 'Hata';
}


function send(event) {
    var messageContent = mesajInput.value.trim();

    if (messageContent && stompClient) {
        var message = {
            fromUser: username,
            text: mesajInput.value,
            type: 'mesaj'
        };
        stompClient.send("/app/global.send", {}, JSON.stringify(message));
        mesajInput.value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if (message.type === 'katil') {
        message.text = message.fromUser + ' hosgeldin!';
    } else if (message.type === 'ayril') {
        message.text = message.fromUser + 'ayrıldı';
    } else {
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.fromUser);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.text);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    chatAlani.appendChild(messageElement);
    chatAlani.scrollTop = messageArea.scrollHeight;
}

usernameForm.addEventListener('submit', connect, true);//
mesajFormu.addEventListener('submit', send, true);