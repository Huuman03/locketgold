

function get_post(server,path){
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
        console.log(typeof response);
        display_post(response)
    },
    error: function(xhr, status, error) {
        // Xử lý lỗi (nếu có)
        console.error(error); // In ra lỗi (nếu có)
    }
});
}


function handleSubmitPost(editForm, id_post){
const content = document.getElementById('update_content_post').value;
const file = $('#update_file_image')[0].files[0];
// Kiểm tra nội dung và tệp hình ảnh
    if (content.trim() === "") {
        alert('Nội dung không được để trống');
        return;
    }

    if (!file) {
        alert('Vui lòng chọn một tệp hình ảnh');
        return;
    }
console.log(content)
console.log(file)
console.log(id_post)
const formData = new FormData();
    formData.append('content', content);
    formData.append('image', file);
    formData.append('id', id_post);
    const server=serverrr
    $.ajax({
        url: server+"/update_posts",
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            console.log(response);
            /*for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
    }*/editForm.style.display = 'none';
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


function showEditForm(id_post){
    var editForm = document.getElementById('sua');
    editForm.style.display = 'block';

var createPostButton = editForm.querySelector('#update_post');
        createPostButton.addEventListener('click', function(event) {
            event.preventDefault();
            handleSubmitPost(editForm, id_post);
        });
}
function addMenuEventListeners(postMenu, post) {

        var editButton = postMenu.querySelector('.edit');
        var deleteButton = postMenu.querySelector('.delete');
        console.log(editButton)

        editButton.addEventListener('click', function(event) {
            event.preventDefault();
            id_post=post.querySelector('.post-menu').id
            showEditForm(id_post);
            postMenu.style.display = 'none';
            // alert('Sửa bài viết: ' + id_post+this.getAttribute("name"));
            // Thêm logic sửa ở đây
        });

        deleteButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Xóa bài viết: ' + id_post+this.getAttribute("name"));
            // Thêm logic xóa ở đây
        });
    }
function display_post(list_friend){
var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
var resultDiv = document.getElementById("post-container");
while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
}



$.each(list_friend, function(index, tuple) {
    let id_user = tuple[0];
let name=tuple[1];
let img_avarta = tuple[2];
    let content = tuple[3];
    let img_post=tuple[4];
    let time = tuple[5];
    let heart = tuple[6];
    let id_post=tuple[7];
    let html=``
    if(id_user==idUserCookie){
    // Tạo HTML sử dụng template strings và nhúng biến JavaScript
     html += `
        <div class="post" >
            <div class="header">
                <img src="data:image/jpeg;base64,${img_avarta}" alt="Profile Picture">
                <div class="user-details">
                    <div class="username">${name}</div>
                    <div class="time">${time}</div>
                </div>
                <div class="ellipsis" ><button class="bacham">...
                </button></div>
            </div>
            <div class="image">
                <img src="data:image/jpeg;base64,${img_post}" alt="Post Image">
            </div>
            <div class="caption">${content}</div>
            <div class="actions">
                <button class="like-btn">
                    <i class="far fa-heart"></i>
                    <span id="like-count">${heart}</span>
                </button>
            </div>
            <div class="post-menu" id="${id_post}"">  <ul>
            <li><a href="#" class="edit" name="edit">Edit</a></li>
            <li><a href="#" class="delete" name="delete">Delete</a></li>
          </ul>
          </div>
        </div>
    `;
}else{
html +=`<div class="post" >
            <div class="header">
                <img src="data:image/jpeg;base64,${img_avarta}" alt="Profile Picture">
                <div class="user-details">
                    <div class="username">${name}</div>
                    <div class="time">${time}</div>
                </div>
                
            </div>
            <div class="image">
                <img src="data:image/jpeg;base64,${img_post}" alt="Post Image">
            </div>
            <div class="caption">${content}</div>
            <div class="actions">
                <button class="like-btn">
                    <i class="far fa-heart"></i>
                    <span id="like-count">${heart}</span>
                </button>
            </div>
          </div>
        </div>`
}
    // Thêm HTML vào phần tử có id "friendList" bằng phương thức .html() của jQuery
    $('#post-container').append(html);
    
});
bachamElements=document.querySelectorAll('.bacham')
bachamElements.forEach(function(button) {
        button.addEventListener('click', function(event) {
           // Tìm phần tử cha gần nhất có class là post
            var post = event.target.closest('.post');
            // Tìm phần tử post-menu trong phần tử cha post
            var postMenu = post.querySelector('.post-menu');
            // Kiểm tra trạng thái hiện tại của post-menu
            if (postMenu.style.display === 'block') {
                postMenu.style.display = 'none'; // Nếu đang hiển thị, ẩn đi
            } else {
                // Ẩn tất cả các menu trước khi hiển thị menu được chọn
                // Lấy vị trí của nút bacham
                var rect = button.getBoundingClientRect();
                // Tính toán vị trí của menu để hiển thị dưới chéo của nút bacham
                postMenu.style.display = 'block';
                postMenu.style.top = rect.bottom + window.scrollY + 'px';
                postMenu.style.left = rect.left + window.scrollX + 'px';
                addMenuEventListeners(postMenu, post)
            }
        });
    });
}
function load_post(){
    // Thực hiện các hành động của bạn ở đây khi trang được tải
    const server = serverrr;
    const path = '/get_post_data';
    get_post(server,path)
}
$(document).ready(load_post());
