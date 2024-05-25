function get_friendship(server,path){
    var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
$.ajax({
    url: server+path,
    type: 'GET',             
    data: {
        id_user: idUserCookie 
    },
    success: function(response) {
        // Hành động sau khi nhận được phản hồi thành công từ Flask
        console.log(response); // In ra phản hồi từ Flask (nếu có)
        display_friendship(response)
        setupMakeFriendButtonClickEvent()
    },
    error: function(xhr, status, error) {
        // Xử lý lỗi (nếu có)
        console.error(error); // In ra lỗi (nếu có)
    }
});
}
function display_friendship(list_friend){

var resultDiv = document.getElementById("friendRequest");
while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
}
$.each(list_friend, function(index, tuple) {
    let id_friendship = tuple[0];
    let friend_id=tuple[1];
    let full_name = tuple[2];
    let image_base64 = tuple[3];

    // Tạo HTML sử dụng template strings và nhúng biến JavaScript
    let html = `
        <li class="friend">
            <img class="friend-avatar" src="data:image/jpeg;base64,${image_base64}" alt="Friend Avatar">
            <div class="friend-details">
                <div class="friend-name" id="${id_friendship}">${full_name}</div>
                <button class="confirm-friend-btn" id="${friend_id}">Click me</button>
            </div>
        </li>
    `;

    // Thêm HTML vào phần tử có id "friendList" bằng phương thức .html() của jQuery
    $('#friendRequest').append(html);
});

}
$(document).ready(function() {
    // Thực hiện các hành động của bạn ở đây khi trang được tải
    const server = serverrr;
    const path = '/c_friendship';
    get_friendship(server,path)
});