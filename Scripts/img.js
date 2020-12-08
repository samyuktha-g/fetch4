class imagefetching {
    static imagefunc() {
        var request = new XMLHttpRequest();
        request.open('GET', 'image/city.jpg', true);
        request.responseType = 'blob';
        console.log("request: ", request);
        // When the request loads, check whether it was successful

        request.onload = function() {
            if (request.status === 200) {
                console.log("success");

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


        // calling Indexdb funcion to store the image file in indexeddb.
        imagefetching.indexedDB(request);
    }
    static indexedDB(req) {
        if (!'indexedDB' in window) {
            console.log(" your browser doesnt support indexDB");
            // return;
        }

        const databaseName = "imageDB";
        const storeName = 'store0';
        const DBname = window.indexedDB.open(databaseName);
        DBname.onupgradeneeded = () => {
                console.log("In indexed DB code: ");
                let db = DBname.result;
                let store = db.createObjectStore("img", { autoIncrement: true });

                console.log("store: ", store, "db: ", db);
                // let store = db.createObjectStore("Files", { autoIncrement: true });
                let index = store.createIndex("filename", "fileeName", { unique: false });
                console.log("index; ", index);
                // put method
                console.log("req: ", req.response);
                store.add(req.response);
                // let blob = req.response;
            //below returns the image and displays the image above buttons
                let myImage = new Image();
                let bloburl = URL.createObjectURL(req.response);
                myImage.src = bloburl;
                document.getElementById('here').appendChild(myImage);
                console.log("bloburl: ", bloburl);


            }
            // console.log("items: ", items);
    }

}
