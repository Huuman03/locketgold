function get_user(server,path,id){
    
$.ajax({
    url: server+path,
    type: 'GET',             
    data: {
        id_user: id 
    },
    success: function(response) {
        // Hành động sau khi nhận được phản hồi thành công từ Flask
        console.log(response); // In ra phản hồi từ Flask (nếu có)
        display_user(response)
    },
    error: function(xhr, status, error) {
        // Xử lý lỗi (nếu có)
        console.error(error); // In ra lỗi (nếu có)
    }
});
}
function display_user(user){

let id_user = user[0];
let img_avarta=user[1];
let name = user[2];
var element = document.querySelector('.avatar2-container');
element.setAttribute('id', id_user);
// Gán dữ liệu Base64 vào thuộc tính src của phần tử img
$('.avatarinbox').attr('src', 'data:image/jpeg;base64,' + img_avarta);
/*$('.avatar2-container').attr('id', id_user);*/
// Gán dữ liệu Base64 vào thuộc tính src của phần tử img
$('#image_user2').attr('src', 'data:image/jpeg;base64,' + img_avarta);
$('#name_user').empty();
$('#name_user').append(name);


}
const myList = document.getElementById('userss');
const server =serverrr;
  const path = '/getsetting';
async function get() {
        const firstLi = myList.children[0];
        console.log(myList.children[0].id);
       get_user(server,path,firstLi.id)
}





myList.addEventListener('click', function(event) {
  const clickedItem = event.target; // Lấy phần tử được click
  if (clickedItem.tagName === 'LI') { // Kiểm tra xem phần tử có phải là thẻ `li` hay không
    // Thực hiện các hành động của bạn ở đây khi trang được tải
    console.log("Bạn đã nhấp vào:", clickedItem.id); // Xuất nội dung văn bản của thẻ `li`
    get_user(server,path,clickedItem.id)
    load_mes()
    ; // Xuất nội dung văn bản của thẻ `li`

  }
});




window.onload = function() {
    
    load()
    .then(() => get()) // Execute 'get()' after 'load()' resolves
  .then(() => load_mes()) // Execute 'load_mes()' after 'get()' resolves
  .finally(() => {
    console.log("All functions executed successfully!"); // Callback after all promises resolve
  });
};
