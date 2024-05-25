function get_fr(server, path) {
    return new Promise((resolve, reject) => {
        var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        $.ajax({
            url: server + path,
            type: 'GET',
            data: {
                id_user: idUserCookie
            },
            success: function(response) {
                // Hành động sau khi nhận được phản hồi thành công từ Flask
                console.log(response.length);
                if(response.length==0){
                alert("Vui lòng kết bạn. ");
                }else{
                 // In ra phản hồi từ Flask (nếu có)
                    display_get(response);
                }
                resolve(response);
            },
            error: function(xhr, status, error) {
                // Xử lý lỗi (nếu có)
                console.error(error); // In ra lỗi (nếu có)
                reject(error);
            }
        });
    });
}

async function load() {
    // Thực hiện các hành động của bạn ở đây khi trang được tải
    const server = serverrr;
    const path = '/get_friend';

    // Gọi hàm get_fr và sử dụng promise để đợi cho kết quả
    try {
        const response = await get_fr(server, path);
        // Khi hàm get_fr đã hoàn thành, gọi hàm display_get
        
    } catch (error) {
        // Xử lý lỗi (nếu có)
        console.error(error);
    }
}

function display_get(list_friend) {
    var resultDiv = document.getElementById("userss");
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    $.each(list_friend, function(index, person) {
        let name = person[0];
        let id_user = person[1];
        var html = `<li id="${id_user}">${name}</li>`;
        $("#userss").append(html);
    });
}
$(document).ready(load())