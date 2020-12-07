class imagefetching {
    static imagefunc() {
        var request = new XMLHttpRequest();
        request.open('GET', 'image/city.jpg', true);
        request.responseType = 'blob';
        console.log("request: ", request);
        // When the request loads, check whether it was successful
        request.onload = function() {
            if (request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                //resolve(request.response);
            } else {
                // If it fails, reject the promise with a error message
                reject(new Error('Image didn\'t load successfully; error code:' + request.statusText));
            }
        };

        request.onerror = function() {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(new Error('There was a network error.'));
        };

        // Send the request
        request.send();

        console.log("response2: ", request.response);
        var img = document.createElement('img');
        img.src = "https://images.unsplash.com/photo-1556629538-fc3eba61504e?auto=format&fit=crop&w=1300&q=80";
        document.getElementById('here').appendChild(img);
        // down.innerHTML = "Image Element Added.";

        // calling Indexdb funcion to store the image file in indexeddb.
        imagefetching.indexedDB(request);
    }
    static indexedDB(req) {
        if (!'indexedDB' in window) {
            console.log(" your browser doesnt support indexDB");
            // return;
        }
        const databaseName = "imageDB";
        const DBname = window.indexedDB.open(databaseName);
        DBname.onupgradeneeded = () => {
            let db = DBname.result;
            let store = db.createObjectStore("img", { autoIncrement: true });
            // let store = db.createObjectStore("Files", { autoIncrement: true });
            let index = store.createIndex("filename", "fileeName", { unique: false });
            console.log("index; ", index);
            // put method
            console.log("req: ", req.response);
            store.add(req.response);
        }
    }

}