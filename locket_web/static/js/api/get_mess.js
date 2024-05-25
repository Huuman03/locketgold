



function get_mess(server, path) {
        return new Promise((resolve, reject) => {
            setTimeout( () => {const element = document.querySelector('.avatar2-container');
            var receiver_id = element.id;
            var sender_id = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            
            console.log(element);
            console.log(element.id);
            console.log({
                sender_id: sender_id,
                receiver_id: receiver_id
            });
            $.ajax({
                url: server + path,
                type: 'GET',
                data: {
                    sender_id: sender_id,
                    receiver_id: receiver_id
                },
                success: function (response) {
                    // Hành động sau khi nhận được phản hồi thành công từ Flask
                    console.log(response); // In ra phản hồi từ Flask (nếu có)
                    console.log(typeof response);
                    display_getmess(response)
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    // Xử lý lỗi (nếu có)
                    console.error(error); // In ra lỗi (nếu có)
                    reject(error);
                }
            });} , 500);
            
        });
    }
function display_getmess(list_mess) {
    const element = document.querySelector('.avatar2-container');
    var receiver_user = element.id;
    var sender_user = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var resultDiv = document.getElementById("inbox");
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    let html=``
    $.each(list_mess, function (index, object) {
        let sender_id = object[0];
       let receiver_id=object[1];
      let mess = object[2];
      if(sender_id=sender_user&&receiver_id==receiver_user){
        html+=`
        <div class="down">
        <div class="mycontent" >${mess}</div>
      </div>
    `
      }else{
        html+=`
        <div class="down">
        <img src="#" class="avatarinbox"> 
        <div class="yourcontent" >${mess}</div>
      </div>
    `
      }

      });
$('.inbox').append(html);

    const originalImg = document.getElementById('image_user1');
        
        // Lấy thẻ ảnh đích bằng class
        const targetImgs = document.querySelectorAll('.avatarinbox');

            // Sao chép thuộc tính src của ảnh gốc sang ảnh đích
            targetImgs.forEach(targetImg => {
            targetImg.src = originalImg.src;
        });

}
async function load_mes() {
    // Thực hiện các hành động của bạn ở đây khi trang được tải
    const server =serverrr;
    const path = '/getmess';
    try {
        const response = await get_mess(server, path);

    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
    }
}

