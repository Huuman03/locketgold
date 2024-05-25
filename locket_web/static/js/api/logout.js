const button_logout = document.getElementById('logout');

function logoutPost(server, path) {

    $.ajax({
        url: server + path,
        type: 'POST',
        success: function(response) {
            alert("Đăng xuất thành công ");
            console.log(response);
            window.location.href = '/'; // Chuyển hướng đến URL khác
            /*for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);

    }*/
        },
        error: function(xhr, status, error) {
            console.error('Request failed. error:', error);
/*            console.error('Request failed. Status:', status);
        console.error('Request failed. xhr:', xhr);*/
            alert("Đăng xuất không được");
        }
    });
}

async function click_up(event) {
    if (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit nếu event tồn tại
    }else{
        console.log("loi event")
    }
    const server = serverrr;
    const path = '/logout';
    logoutPost(server, path);
}

button_logout.addEventListener('click', click_up);
