let news = new News();

window.addEventListener('load', () =>
    window.addEventListener('online', () => setTimeout(
        data_context.getByName('news', newsList => {
            if (isOnline()) sendToServer('news', newsList)
        }), 1000)
    )
);

$('#file').on('change', function() {
    let file = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = e => {
        news.url = reader.result;
    };
    $('.col-xxl img')[0].src = window.URL.createObjectURL(file);
});

$('#title').on('change', function() {
    news.title = this.value;
});

$('#body').on('change', function() {
    news.body = this.value;
});

$('form').submit(function() {
    if (isOnline()) sendToServer('news', news, false);
    else data_context.append('news', news);
    news = new News();
    $('#file')[0].value = null;
    $('#title')[0].value = null;
    $('#body')[0].value = null;
    $('.col-xxl img')[0].src = 'images/preview.png';
    alert('Done!');
    return false;
});