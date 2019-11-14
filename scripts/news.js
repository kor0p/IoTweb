function setData() {
    data_context.getByName('news',function (news_list) {
        if (!news_list) return;
        for (let news of news_list) {
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
        if (isOnline()) sendToServer('news', news_list);
    });
}

window.addEventListener('load', () => {
    window.addEventListener('online', setData);
    setData();
});
