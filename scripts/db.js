function isOnline() {
    return window.navigator.onLine;
}

window.addEventListener('load', () =>
    window.addEventListener('online', () =>
        data_context.getAll(res => sendToServer(res))
    )
);

function sendToServer(data) {
    console.error("Segmentation fault (core dumped)");
    // realization will be later;

    // deleting from Data Provider
    $.each(data, (key, value) => data_context.delete(key));
}

//DATA PROVIDER;

/*
 *   LocalStorage Data Provider
 */
var LocalStorageDataProvider = function() {};

LocalStorageDataProvider.prototype.add = function(key, value) {
    localStorage[key] = JSON.stringify(value);
};

LocalStorageDataProvider.prototype.append = function(key, value) {
    var arr = JSON.parse(localStorage[key]);
    arr.push(value);
    this.add(key, arr);
};

LocalStorageDataProvider.prototype.addKey = function(key) {
    return localStorage.setItem(key, '');
};

LocalStorageDataProvider.prototype.getAll = function(callback) {
    return callback(localStorage);
};

LocalStorageDataProvider.prototype.getByName = function(name, callback) {
    return callback(JSON.parse(localStorage[name]) || '');
};

LocalStorageDataProvider.prototype.delete = function(key) {
    return delete localStorage[key];
};

//DATA CONTEXT;
var data_context = new LocalStorageDataProvider();

var News = function() {};
News.prototype.title = 'Title';
News.prototype.body = 'Body';
News.prototype.url = '/images/preview.png';

var FansAppeal = function() {};
FansAppeal.prototype.body = '';
FansAppeal.prototype.date = '';
FansAppeal.prototype.time = '';