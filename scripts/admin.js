var news = new News();

// set news if not setted
data_context.getAll(function(res) {
    if (res.news) return;
    data_context.add('news', []);
});

$('#file').on('change', function() {
    console.log(this.files[0]);
    var file = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = e => {
        news.url = reader.result;
    };
    // news.url = file; //.slice(5);
    $('.col-xxl img')[0].src = window.URL.createObjectURL(file);
});

$('#title').on('change', function() {
    news.title = this.value;
});

$('#body').on('change', function() {
    news.body = this.value;
});

$('form').submit(function() {
    if (!isOnline()) data_context.append('news', news);
    news = new News();
    $('#file')[0].value = null;
    $('#title')[0].value = null;
    $('#body')[0].value = null;
    $('.col-xxl img')[0].src = 'images/preview.png';
    alert('Done!');
    return false;
});