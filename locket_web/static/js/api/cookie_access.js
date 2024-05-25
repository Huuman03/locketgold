
$(document).ready(function() {
    var idUserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)iduser_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (idUserCookie.length != 0) {
    window.location.href = '/post'
} 
});