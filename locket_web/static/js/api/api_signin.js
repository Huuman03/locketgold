const button_login = document.getElementById('button_login');

function signInPost(server, path) {
    const username_login = document.getElementById('login-username').value;
    const password_login = document.getElementById('login-password').value;
    console.log("nguoi dung"+username_login)
    const formData = new FormData();
    formData.append('username', username_login);
    formData.append('password', password_login);
    $.ajax({
        url: server + path,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            console.log(response);
            window.location.href = '/post'; // Chuyển hướng đến URL khác
            /*for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);

    }*/
        },
        error: function(xhr, status, error) {
            console.error('Request failed. error:', error);
/*            console.error('Request failed. Status:', status);
        console.error('Request failed. xhr:', xhr);*/
            alert("Đăng nhập tài khoản mật khẩu không đúng");
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
    const path = '/signin';
    signInPost(server, path);
}

button_login.addEventListener('click', click_up);
