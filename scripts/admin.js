$('#input').on('change', function() {
    $('.col-xxl img')[0].src = window.URL.createObjectURL(this.files[0]);
});

$('form').submit(function() {
    alert('Done!');
    $('input')[0].value = null;
    $('input')[1].value = null;
    $('textarea')[0].value = null;
    $('.col-xxl img')[0].src = 'images/preview.png';
    return false;
});