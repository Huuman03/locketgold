
const button_search = document.getElementById('search_friend');

function display_friend(list_friend){

var resultDiv = document.getElementById("friendList");
while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
}
$.each(list_friend, function(index, tuple) {
    let id_user = tuple[0];
    let username = tuple[2];
    let image_base64 = tuple[1];

    // Tạo HTML sử dụng template strings và nhúng biến JavaScript
    let html = `
        <li class="friend">
            <img class="friend-avatar" src="data:image/jpeg;base64,${image_base64}" alt="Friend Avatar">
            <div class="friend-details">
                <div class="friend-name">${username}</div>
                <button class="add-friend-btn" id="${id_user}">Click me</button>
            </div>
        </li>
    `;

    // Thêm HTML vào phần tử có id "friendList" bằng phương thức .html() của jQuery
    $('#friendList').append(html);
});

}
function cr_post(server, path) {
    const search = document.getElementById('search').value;
    console.log("haha"+search);
    if(search.length =! 0){
    const formData = new FormData();
    var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    formData.append('search', search);
    formData.append('id_client', idUserCookie);
    $.ajax({
        url: server + path,
        contentType: false,
        processData: false,
        type: 'POST',
        data: formData,
        success: function (response) {
            display_friend(response)
            setupFriendButtonClickEvent()
        },
        error: function (xhr, status, error) {
            console.error('Request failed. error:', error);
            /*            console.error('Request failed. Status:', status);
                    console.error('Request failed. xhr:', xhr);*/
            alert("tìm bạn không thành công");
        }
    });
}else{
    alert("vui lòng nhập tên tìm kiếm ");
}
}

async function click_up(event) {
    if (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit nếu event tồn tại
    } else {
        console.log("loi event")
    }
    const server = serverrr;
    const path = '/search';
    cr_post(server, path);
}


button_search.addEventListener('click', click_up);
