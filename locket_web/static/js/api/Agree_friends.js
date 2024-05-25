function agree_friend(server, path,id) {
    const formData = new FormData();
    var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log();
    formData.append('id_friend', idUserCookie);
    formData.append('id_client', id);
    $.ajax({
        url: server + path,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            console.log(response['sucsses'])
            if (response['sucsses']==1) {
    // Thực hiện khi condition1 là true
                alert("đồng ket ban thanh cong");
} else if (response['sucsses']==0) {
    // Thực hiện khi condition1 là false và condition2 là true
    alert("đồng ý ket ban that bai");
}
        },
        error: function (xhr, status, error) {
            console.error('Request failed. error:', error);
            /*            console.error('Request failed. Status:', status);
                    console.error('Request failed. xhr:', xhr);*/
            alert("tìm bạn không thành công");
        }
    });
}

function setupMakeFriendButtonClickEvent() {
    // Lấy tất cả các button có class "confirm-friend-btn"
    var addFriendButtons = document.querySelectorAll('.confirm-friend-btn');

    // Gắn sự kiện click cho mỗi button
    addFriendButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
        var buttonId = button.id;
        if (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit nếu event tồn tại
    } else {
        console.log("loi event")
    }
    const server = serverrr;
    const path = '/agree_friend';
    agree_friend(server, path,buttonId);
        });
    });
}

