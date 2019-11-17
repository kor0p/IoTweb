const DOMAIN = 'http://localhost:3000/';
let useLocalStorage = true;

function isOnline() {
    return window.navigator.onLine;
}


function sendToServer(key, data, del=true) {
    if (data.body) {
        let req = new XMLHttpRequest();
        req.open("POST", DOMAIN + key, true)
        req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.onreadystatechange = console.log;
        req.send(JSON.stringify(data));
    }
    if (!del) return;
    // deleting from Data Provider
    data_context.delete(key);
}

function getFromServer(key, callback) {
    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', DOMAIN+key, true);
    req.onload  = () => req.status === 200 ? callback(req.response) : console.log(req.response)
    req.send(null);
}

//DATA PROVIDER;

/*
 *   LocalStorage Data Provider
 */
class LocalStorageDataProvider {
    constructor() {}

    append(key, value) {
        let arr = JSON.parse(localStorage[key]);
        arr.push(value);
        localStorage[key] = JSON.stringify(arr);
    }

    getByName(name, callback) {
        return callback(JSON.parse(localStorage[name] || '[]'));
    }

    delete(key) {
        localStorage[key] = '[]';
    }
}


window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
/*
 *   IndexedDB Data Provider
 */

let db;
let openRequest;

function openIndexedDB() {
    //open a connection to the datastore
    openRequest = indexedDB.open('IoT', 4);

    openRequest.onupgradeneeded = function(event) {
        console.log("Upgrading...");
        db = event.target.result;
        if (useLocalStorage) {
            localStorage["news"] = localStorage["fansAppeals"] = '[]';
        } else {
            db.createObjectStore("news", {keyPath: "id", autoIncrement: true});
            db.createObjectStore("fansAppeals", {keyPath: "id", autoIncrement: true});
        }
    };

    openRequest.onsuccess = function(event) {
        console.log("Success!");
        db = event.target.result;
    };

    openRequest.onerror = function(event) {
        console.log("Error");
    };
}
window.addEventListener("load", openIndexedDB);
// openIndexedDB()

class IndexedDBDataProvider {
    constructor() {}
    append(key, value) {
        // console.log(db)
        if (!db) return;
        // let objectStore = db
        //     .transaction([key], "readwrite")
        //     .objectStore(key)
        // objectStore.autoIncrement = true
        // objectStore.add(value)
        console.log('add:', key, value)
        db
            .transaction([key], "readwrite")
            .objectStore(key)
            .add(value)
    }
    getByName(name, callback) {
        let res = [];
        db
            .transaction([name], "readwrite")
            .objectStore(name)
            .openCursor()
            .onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    res.push(cursor.value);
                    cursor.continue();
                } else {
                    return callback(res);
                }
            };
    }
    delete(key) {
        try {
            db
                .transaction([key], "readwrite")
                .objectStore(key)
                .clear();
        } catch (e) {
            console.log(db, key)
        }
    }
}



//DATA CONTEXT
let data_context = useLocalStorage ? new LocalStorageDataProvider() : new IndexedDBDataProvider();

class News {
    constructor(title, body, url) {
        this.title = title || 'Title';
        this.body = body || 'Body';
        this.url = url || '/images/preview.png';
    }
}

class FansAppeal {
    constructor(body, date, time) {
        this.body = body || '';
        this.date = date || '';
        this.time = time || '';
    }
}

