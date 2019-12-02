// add appeals to page if exists
// else — set key appeals in storage
function setData() {
    data_context.getByName('fansAppeals',function (fansAppeals) {
        if (fansAppeals) fansAppeals.map(addAppeal);
        if (isOnline()) fansAppeals.map( appeal => sendToServer('fansAppeals', appeal));
    });
}
window.addEventListener('load', () => {
    window.addEventListener('online', setData);
    setTimeout(() => {
        setData();
        if (isOnline())
            getFromServer('fansAppeals',
                appeals => appeals.map(addAppeal)
            );
    }, 1000);
});

$('form').submit(function() {
    let now = new Date(),
        time = now.toLocaleTimeString('uk-UA').slice(0, 5),
        date = now.toLocaleDateString('uk-UA').slice(0, -4) + (now.getFullYear().toString().slice(2));
    let appeal = $('textarea')[0];
    let body = appeal.value;
    let fansAppeal = new FansAppeal(body, time, date);
    if (!isOnline()) {
        data_context.append('fansAppeals', fansAppeal);
    } else {
        addAppeal(fansAppeal);
        sendToServer('fansAppeals', fansAppeal, false);
    }
    alert('Done!');
    appeal.value = null;
    return false;
});

function addAppeal(appeal) {
    $('content .container-fluid').prepend(`
    <div class="row justify-content-center">
        <div class="col-md-2">
            <p>Anonymous<br>${appeal.time}<br>${appeal.date}</p>
        </div>
        <div class="col-md-6">
            <p>${appeal.body}</p>
        </div>
    </div>`);
}