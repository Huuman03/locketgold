function create_send(user){
    var inbox = document.getElementById('inbox');
    let message = user["message"];
let sender_id=user["sender_id"];
let receiver_id = user["receiver_id"];
let html = `
        <div class="down">
        <div class="mycontent" >${message}</div>
      </div>
    `;

$('.inbox').append(html);
inbox.scrollTop = inbox.scrollHeight; 
}

function create_receive(user){
    var inbox = document.getElementById('inbox');
     let message = user["message"];
let sender_id=user["sender_id"];
let receiver_id = user["receiver_id"];
let html = `
        <div class="down">
        <img src="#" class="avatarinbox"> 
        <div class="yourcontent" >${message}</div>
      </div>
    `;

$('.inbox').append(html);
// Lấy thẻ ảnh gốc bằng ID
setTimeout(function() {
    const originalImg = document.getElementById('image_user1');
        
        // Lấy thẻ ảnh đích bằng class
        const targetImg = document.querySelectorAll('.avatarinbox');

        console.log(originalImg)
        console.log(targetImg.length -1)
        
        console.log(targetImg[targetImg.length -1])
            // Sao chép thuộc tính src của ảnh gốc sang ảnh đích
            targetImg[targetImg.length -1].src = originalImg.src;
}, 0);
        
        
inbox.scrollTop = inbox.scrollHeight; 

}
var socket = io.connect(serverrr);

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('message', function(msg) {
    if (msg) {
        const element = document.querySelector('.avatar2-container');
        var receiver_id = element.id; // Replace with actual receiver ID
        var sender_id = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var id_receiver=msg["receiver_id"];
        var id_sender=msg["sender_id"];
        console.log(sender_id,id_receiver)
       if(sender_id==id_receiver && receiver_id==id_sender){
        create_receive(msg)
        
       }

    } else {
        console.error('Có lỗi khi gửi tin nhắn:', msg.error);
    }
});

$('#send').on('click', function() {
    var message = document.getElementById('message');
    var message_input=message.value.trim()
    if(message_input.length>0){
        const element = document.querySelector('.avatar2-container');
        var receiver_id = element.id;; // Replace with actual receiver ID
        var sender_id = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const messageObject= { sender_id: sender_id, receiver_id: receiver_id, message: message_input }
        console.log()
        
        socket.emit('message', messageObject);
        
        message.value = '';
        create_send(messageObject)
}
    });
