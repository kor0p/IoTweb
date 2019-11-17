function setData() {
    data_context.getByName('news',function (newsList) {
        if (!newsList) return;
        setNews(newsList);
        if (!isOnline()) return;
        sendToServer('news', newsList);
        getFromServer('news', setNews)
    });
}

window.addEventListener('load', () => {
    window.addEventListener('online', setData);
    setTimeout(setData, 1000);
});

function setNews(newsList) {
    newsList.map( news =>
        $('content .row').prepend(`
            <div class="col-sm">
                <div>
                    <img src="${news.url}">
                </div>
                <h3>${news.title}</h3>
                <p>${news.body}</p>
            </div>
        `)
    )
}
