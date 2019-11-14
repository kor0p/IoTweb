let useLocalStorage = false;

function isOnline() {
    return window.navigator.onLine;
}


function sendToServer(key, data) {
    console.error("Segmentation fault (core dumped)");
    // realization will be later;

    // deleting from Data Provider
    data_context.delete(key);
}

//DATA PROVIDER;

/*
 *   LocalStorage Data Provider
 */
class LocalStorageDataProvider {
    constructor() {}

    add(key) {
        localStorage[key] = '[]';
    }

    append(key, value) {
        let arr = JSON.parse(localStorage[key]);
        arr.push(value);
        this.add(key, arr);
    }

    getByName(name, callback) {
        return callback(JSON.parse(localStorage[name]) || '');
    }

    delete(key) {
        return delete localStorage[key];
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
        db.createObjectStore("news", {keyPath: "id", autoIncrement: true})
        db.createObjectStore("fansAppeals", {keyPath: "id", autoIncrement: true})
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
    add(key) {
        return true;
        // db
        //     .transaction([key], "readwrite")
        //     .createObjectStore(key,
        //         {
        //             keyPath: "id",
        //             autoIncrement: true
        //         }
        //     )
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
    constructor() {
        this.title = 'Title';
        this.body = 'Body';
        this.url = '/images/preview.png';
    }
}

class FansAppeal {
    constructor() {
        this.body = '';
        this.date = '';
        this.time = '';
    }
}

