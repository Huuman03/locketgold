
function getDateTime() {
// Tạo một đối tượng Date mới, đại diện cho thời gian hiện tại
var currentDate = new Date();

// Lấy thông tin ngày, tháng, năm, giờ, phút và giây
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 - 11)
var year = currentDate.getFullYear();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();

// Tạo một chuỗi đại diện cho ngày giờ
var datetimeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
return datetimeString
}


console.log(getDateTime())
const create_post = document.getElementById('create_post');
function cr_post(server, path) { 
    const content = document.getElementById('content_post').value;
    const file = $('#file_image')[0].files[0];
    var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(content);
    console.log(getDateTime());
    console.log(file);
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', file);
    formData.append('date', getDateTime());
    formData.append('id', idUserCookie);
    $.ajax({
        url: server + path,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            console.log(response);
            /*for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
    }*/
            load()
        },
        error: function(xhr, status, error) {
            console.error('Request failed. error:', error);
/*            console.error('Request failed. Status:', status);
        console.error('Request failed. xhr:', xhr);*/
            alert("lỗi tạo bài viết");
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
    const path = '/create_posts';
    cr_post(server, path);
}
create_post.addEventListener('click', click_up);


