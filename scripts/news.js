data_context.getAll(function(res) {
    if (isOnline()) return sendToServer(res);
    if (!res.news) return;

    var news_list = JSON.parse(res.news);
    for (var news of news_list) {
        console.log(news);
        $('content .row').prepend(`
            <div class="col-sm">
                <div>
                    <img src="${news.url}">
                </div>
                <h3>${news.title}</h3>
                <p>${news.body}</p>
            </div>
        `);
    }
});