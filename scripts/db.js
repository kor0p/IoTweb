var useLocalStorage = false;

function isOnline() {
    return window.navigator.onLine;
}


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

LocalStorageDataProvider.prototype.getAll = function(callback) {
    return callback(localStorage);
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
        var newsStore = db.createObjectStore("news");
        var appealsStore = db.createObjectStore("fansAppeals");
    };

    openRequest.onsuccess = function(event) {
        console.log("Success!");
        db = event.target.result;
        data_context.add('fansAppeals', new FansAppeal())
        data_context.getByName('fansAppeals', x=>console.log('lol',x))
    };

    openRequest.onerror = function(event) {
        console.log("Error");
    };
}
window.addEventListener("load", openIndexedDB, false);

class IndexedDBDataProvider {
    constructor() {}
    add(key, value) {
        if (!db) return;
        var objectStore = db
            .transaction([key], "readwrite")
            .objectStore(key)
        objectStore.autoIncrement = true
        objectStore.add(value, 0)
    }
    addKey(key) {
        db.createObjectStore(key);
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
    getAll(callback) {
        var data = [];
        if (db) {
            for (name of openRequest.result.objectStoreNames)
                this.getByName(name, data.push)
        } else {
            console.log(db)
        }
        callback(data);
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

