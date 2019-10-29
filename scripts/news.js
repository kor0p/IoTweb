window.addEventListener('load', () =>
    window.addEventListener('online', () => {
        data_context.getByName('news', newsList => {
            if (!newsList) return;
            for (var news of newsList) {
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
        data_context.delete(key);
    })
);