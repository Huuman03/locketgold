


function get_user(server,path){
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
        display_post(response)
    },
    error: function(xhr, status, error) {
        // Xử lý lỗi (nếu có)
        console.error(error); // In ra lỗi (nếu có)
    }
});
}
function display_post(list_friend){

var resultDiv = document.getElementById("post-container");
while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
}
let id_user = list_friend[0][0];
let name=list_friend[0][1];
let img_avarta = list_friend[0][2];

// Gán dữ liệu Base64 vào thuộc tính src của phần tử img
$('#image_user1').attr('src', 'data:image/jpeg;base64,' + img_avarta);

// Gán dữ liệu Base64 vào thuộc tính src của phần tử img
$('#image_user2').attr('src', 'data:image/jpeg;base64,' + img_avarta);
$('#name_user').append(name);


}
function load(){
    // Thực hiện các hành động của bạn ở đây khi trang được tải
    const server = serverrr;
    const path = '/get_post_data';
    get_user(server,path)
}
$(document).ready(load());
