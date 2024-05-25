const button_register = document.getElementById('button_register');
function applyCSS(cssData) {
    var container = document.getElementById("container");
    container.classList.remove("right-panel-active"); // Xóa lớp right-panel-active
}
function signUpPost(server, path) {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;
    const full_name = document.getElementById('register-full_name').value;
    const date_of_birth = document.getElementById('register-date_of_birth').value;
    const gender = document.getElementById('gender').value;
/*    console.log("nguoi dung"+username)
    console.log("email"+email)*/
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('full_name', full_name);
    formData.append('date_of_birth', date_of_birth);
    formData.append('gender', gender);
    formData.forEach(function(value, key){
    console.log(key);
});
    $.ajax({
        url: server + path,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            applyCSS(response);
            console.log(response);
            for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
    }

    alert("Đăng ký thành công");


        },
        error: function(xhr, status, error) {
            console.error('Request failed. error:', error);
console.error('Request failed. Status:', status);
        console.error('Request failed. xhr:', xhr);
        
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
    const path = '/signup';
    // Lấy các giá trị từ các trường nhập liệu
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const email = document.getElementById("register-email").value;
    const fullName = document.getElementById("register-full_name").value;
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("register-date_of_birth").value;

    // Kiểm tra xem có trường nào chưa được điền không
    if (!username || !password || !email || !fullName || gender === "none" || !dob) {
        // Hiển thị thông báo
        alert("Vui lòng nhập đủ thông tin.");
        // Ngăn chặn việc submit form
        return false;
    
}
else{
    signUpPost(server, path);
}
    
}

button_register.addEventListener('click', click_up);


