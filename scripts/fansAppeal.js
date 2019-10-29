// add appeals to page if exists
// else — set key appeals in storage
data_context.getAll(function(res) {
    if (res.fansAppeals) {
        var fansAppeals = JSON.parse(res.fansAppeals);
        for (var appeal of fansAppeals) {
            addAppeal(appeal);
        }
    } else {
        data_context.add('fansAppeals', []);
    }
});

$('form').submit(function() {
    var now = new Date(),
        time = now.toLocaleTimeString('uk-UA').slice(0, 5),
        date = now.toLocaleDateString('uk-UA').slice(0, -4) + (now.getFullYear().toString().slice(2));
    var appeal = $('textarea')[0];
    if (!isOnline()) {
        fansAppeal = new FansAppeal();
        fansAppeal.body = appeal.value;
        fansAppeal.time = time;
        fansAppeal.date = date;
        data_context.append('fansAppeals', fansAppeal);
    }
    addAppeal({
        body: appeal.value,
        time: time,
        date: date
    });
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