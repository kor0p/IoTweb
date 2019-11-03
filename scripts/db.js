var useLocalStorage = false;

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

LocalStorageDataProvider.prototype.getByName = function(name, callback) {
    return callback(JSON.parse(localStorage[name]) || '');
};

LocalStorageDataProvider.prototype.delete = function(key) {
    return delete localStorage[key];
};


window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
/*
 *   IndexedDB Data Provider
 */

var db;
var openRequest;

function openIndexedDB() {
    //open a connection to the datastore
    openRequest = indexedDB.open('IoT', 4);

    openRequest.onupgradeneeded = function(event) {
        console.log("Upgrading...");
        db = event.target.result;
        var newsStore = db.createObjectStore("news", { keyPath: "title" });
        var appealsStore = db.createObjectStore("fansAppeals", { keyPath: "title" });
    };

    openRequest.onsuccess = function(event) {
        console.log("Success!");
        db = event.target.result;
        init();
    };

    openRequest.onerror = function(event) {
        console.log("Error");
    };
}
window.addEventListener("load", openIndexedDB, false);

class IndexedDBDataProvider {
    constructor() {}
    add(key, value) {
        db
            .transaction([key], "readwrite")
            .objectStore(key)
            .add(value);
    }
    addKey(key) {
        db.createObjectStore(key, { keyPath: "title" });
    }
    getByName(name, callback) {
        var res = [];
        db
            .transaction([name], "readwrite")
            .objectStore(name)
            .openCursor()
            .onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    res.push(cursor.value);
                    cursor.continue();
                } else {
                    return callback(res);
                }
            };
    }
    delete(key) {
        db
            .transaction([key], "readwrite")
            .deleteObjectStore(key);
    }
}



//DATA CONTEXT;
var data_context = useLocalStorage ? new LocalStorageDataProvider() : new IndexedDBDataProvider();

var News = function() {};
News.prototype.title = 'Title';
News.prototype.body = 'Body';
News.prototype.url = '/images/preview.png';

var FansAppeal = function() {};
FansAppeal.prototype.body = '';
FansAppeal.prototype.date = '';
FansAppeal.prototype.time = '';