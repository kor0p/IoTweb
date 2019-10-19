$('form').submit(function() {
    var now = new Date();
    var appeal = $('textarea')[0];
    $('content .container-fluid').prepend(`
    <div class="row justify-content-center">
        <div class="col-md-2">
            <p>Anonymous<br>${now.toLocaleTimeString('uk-UA').slice(0, 5)}<br>${
                now.toLocaleDateString('uk-UA').slice(0,-4)+(new Date().getFullYear().toString().slice(2))
            }</p>
        </div>
        <div class="col-md-6">
            <p>${appeal.value}</p>
        </div>
    </div>`);
    alert('Done!');
    setTimeout(function() {
        console.log(appeal);
    });
    appeal.value = null;
    return false;
});