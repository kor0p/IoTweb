var input = document.querySelector('#input');
var preview = document.querySelector('.col-xxl img');
input.addEventListener('change', function() {
    var file = input.files[0];
    console.log(file);
    console.log(window);
    preview.src = window.URL.createObjectURL(file);
});