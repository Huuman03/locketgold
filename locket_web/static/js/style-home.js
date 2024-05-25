
document.addEventListener("DOMContentLoaded", function() {
  var dropdownToggle = document.getElementById("dropdown-toggle");
  var dropdownMenu = document.getElementById("dropdown-menu");

  dropdownToggle.addEventListener("click", function(event) {
    dropdownToggle.classList.toggle('open'); // Thêm hoặc xóa class 'open'
    if (dropdownToggle.classList.contains('open')) {
      dropdownMenu.style.visibility = "visible";
      dropdownMenu.style.opacity = "1";
    } else {
      dropdownMenu.style.visibility = "hidden";
      dropdownMenu.style.opacity = "0";
    }
  });

  // Hide dropdown menu when clicking outside of it
  document.addEventListener("click", function(event) {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.visibility = "hidden";
      dropdownMenu.style.opacity = "0";
      dropdownToggle.classList.remove('open');
    }
  });
});

// hienthi from dang bai
var toggleButton = document.getElementById("toggleButton");
var postForm = document.getElementById("postForm");

// Thêm sự kiện click cho nút "Hiển thị Form"
toggleButton.addEventListener("click", function(event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài nút
    postForm.classList.toggle("active"); // Thêm hoặc xóa lớp active để hiển thị hoặc ẩn form
});

// Thêm sự kiện click cho toàn bộ trang
document.addEventListener('click', function(event) {
    // Kiểm tra xem phần tử được click có phải là form hay nút "Hiển thị Form" hay không
    var isClickInsideForm = postForm.contains(event.target) || toggleButton.contains(event.target);
    // Nếu không phải, form sẽ tự động ẩn đi
    if (!isClickInsideForm) {
        postForm.classList.remove("active");
    }
});

/*setTimeout ( expression, timeout );
    get=document.querySelectorAll('.bacham')
    console.log(get)
    console.log("get")
*/


window.addEventListener('scroll', function(event) {
  event.preventDefault();
});