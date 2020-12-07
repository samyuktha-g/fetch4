class fetchingData {



    static async fetching() {


        let response = await fetch('https://api.github.com/users/chriscoyier/repos');
        // .then(response => response.blob());

        let blob = await response.blob(); // download as Blob object
        console.log("response: ", response);
        console.log("blob: ", blob);
        // create <img> for it

        // a.href = 'position:fixed;top:10px;left:10px;width:100px';
        // document.body.append(a);

        // show it
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.innerText = 'blob link';
        // a.download = name;
        document.body.appendChild(a);

        setTimeout(() => { // hide after three seconds
            a.remove();
            URL.revokeObjectURL(a.src);
        }, 3000);
        //store in IndexedDB
        fetchingData.indexedDB(blob);
        //console.log("BLOB-", blob);
    }
    static indexedDB(req) {
        if (!'indexedDB' in window) {
            console.log(" your browser doesnt support indexDB");
            // return;
        }
        const databaseName = "FetchURL";
        const DBname = window.indexedDB.open(databaseName);
        DBname.onupgradeneeded = () => {
            let db = DBname.result;
            let store = db.createObjectStore("URL", { autoIncrement: true });
            // let store = db.createObjectStore("Files", { autoIncrement: true });
            let index = store.createIndex("Fetch-filename", "fileeName", { unique: false });
            console.log("index; ", index);
            // put method
            console.log("req: ", req);
            store.add(req);
        }
    }
}