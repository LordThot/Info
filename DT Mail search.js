/* File: mailsearch.js
 * 
 */
dtmailsearch = function(){
    dt.mail = {
        setup: function () {
    //		dt.mailsearch(dt.msgFind);
            dt.showTool("#mailSearchHtml");
        },
    };
    //// Do the setup/initialization
    dt.mailsearch = function mailsearch(callback) {

    //No support? Go in the corner and pout.
        if (!indexedDBOk) {
            return;
        }

    //	var openRequest = indexedDB.open("igm", 6);

        var openRequest = indexedDB.open(PlayerId, 7);
        /* Method: onupgradeneeded
        * Create or upgrade an indexed database.
        */
        openRequest.onupgradeneeded = function (e) {
            var thisDB = e.target.result;
    //        console.log("running onupgradeneeded");
            if (!thisDB.objectStoreNames.contains("inbox")) {
                // Create the store with the igmid as the key
                var os = thisDB.createObjectStore("inbox", {keyPath: 'igmid'});
                os.createIndex("igmid", "igmid", {unique: true});

    //I want to get by sender later
                os.createIndex("sender", "sender", {unique: false});
    //I want to get by individual words in the title
                os.createIndex("tags", "tags", {unique: false, multiEntry: true});
    //I want to get by date sent
                os.createIndex("sent", "sent", {unique: false});
    // I want to get by 'in' or 'out'
                os.createIndex("box", "box", {unique: false});
    // I want to get by holding folder            
                os.createIndex("folder", "folder", {unique: false});
            }
            dt.mdb = e.target.result;
        };
    //	openRequest.onsuccess(callback());
        openRequest.onsuccess = function (e) {
    //        console.log("running onsuccess");
            dt.mdb = e.target.result;
            if(callback){
                callback();
            }
        };
        openRequest.onerror = function (e) {
            window.alert('Error opening the database.');
            dt.mdb = null;
    //Do something for the error
        };
    };
    indexedDBOk = function indexedDBOk() {
        return "indexedDB" in window;
    };
    dt.getAllMail = function getAllMail() {
        var c = 0;
        var allMail = [];
        var transaction = dt.mdb.transaction(["inbox"], "readonly");
        var objectStore = dt.mdb.transaction(["inbox"], "readonly").objectStore("inbox");
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                // Got a message so call the addMessage method
                dt.mailFolders.addMessage(cursor.value);
                cursor.continue();
            } else {
    //			alert("Got all notes: " + allMail);
            }
    //        if (allMail.length > 0) {
    //            populateMailStructure(allMail);
    //        }
        };
        var rubbish = "";
    };
    //	return allNotes;
    function populateMailStructure(allMail){
    dt[PlayerId].allMail = [];
        for(m=0;m<allMail.length;m++){
            var thisMail = allMail[m];
            var k = Object.keys(thisMail);
            if(!thisMail.hasOwnProperty("folder")){
                thisMail.folder = "Inbox";
    //            console.log("Folder set for "+thisMail.igmid);
                // Here I need to call the update method.
            }
            dt[PlayerId].allMail.push(thisMail);
        }
    //    console.log(allMail);
    }
    dt.scanMail = function scanMail() {
        var msg = "Scanning Mail.";
        dt.logEntry(msg);
        if(document.querySelector("#radioSorter span:nth-child(1)").textContent === "From"){
            baseFolder="Inbox";
        }else{
            baseFolder="Sent";
        }

        var messageRows = document.querySelector('#messages').querySelectorAll('tr');
    //	var messageRows = $("table:first-of-type",messageTable);
        for (var i = 0; i < messageRows.length; ++i) {
            var elems = $("td", messageRows[i]);
            var sender = elems[2].textContent;
            var title = elems[3].textContent;
            var igmid = elems[3].getElementsByTagName('a')[0].getAttribute('href');
            var sent = elems[4].textContent;
            var twords = title.toLowerCase().match(/\S+/g);
            var swords = sender.toLowerCase().match(/\S+/g);
            var c = twords.concat(swords);
            var d = c.filter(function (item, pos) {
                return c.indexOf(item) == pos
            });
            var igm = {igmid: igmid, defaultFolder: baseFolder, sender: sender, title: title, sent: sent, tags: d};
    //        console.log("About to add " + title);
            var transaction = dt.mdb.transaction(["inbox"], "readwrite");
            var store = transaction.objectStore("inbox");

            var request = store.put(igm);
            request.onerror = function (e) {
                alert("Sorry, couldn't add the igm for some reason.");
                console.log("Error", e.target.error.name);
    //            console.dir(e.target);
    //some type of error handler
            };
        }
        var msg = "Mail scan finished.";
        dt.logEntry(msg);

    };
    function getMessage(e) {
        var key = document.querySelector("#key").value;
        if (key === "")
            return;

        var transaction = dt.mdb.transaction(["inbox"], "readonly");
        var store = transaction.objectStore("inbox");

        var request = store.get(key);

        request.onsuccess = function (e) {

            var result = e.target.result;
    //        console.dir(result);
            if (result) {
                var s = "&lt;h2>Key " + key + "&lt;/h2>&lt;p>";
                for (var field in result) {
                    s += field + "=" + result[field] + "&lt;br/>";
                }
                document.querySelector("#status").innerHTML = s;
            } else {
                document.querySelector("#status").innerHTML = "&lt;h2>No match&lt;/h2>";
            }
        };
    };
    dt.processSelectedMsgs = function processSelectedMsgs() {
        var tbl = document.querySelector("#msgListTbl");
        var checkBoxes = tbl.querySelectorAll("input[type=checkbox]");
        var marked = [];
        for (i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked === true) {
                marked.push(checkBoxes[i].value);
            }
        }
        var e = document.getElementById("actionType");
        var selOpt = e.options[e.selectedIndex].value;
    //	var selOpt = tbl.querySelector("#actionType").selectedValue;
        switch (selOpt) {
            case 'delete':
                var confMsg = 'You are about to delete ' + marked.length + ' message(s). Are you sure?';
                if (window.confirm(confMsg)) {
                    var transaction = dt.mdb.transaction(["inbox"], "readwrite");
                    var store = transaction.objectStore("inbox");
                    for (i = 0; i < marked.length; i++) {
                        var request = store.delete(marked[i]);
                    }
                }
                break;
            case 'export':
                var outArray = [];
                for (i = 0; i < marked.length; i++) {
                    var transaction = dt.mdb.transaction(["inbox"], "readwrite");
                    var store = transaction.objectStore("inbox");
                    var request = store.get(parseInt(marked[i]));
                    request.onsuccess = function (e) {
                        outArray.push(e.target.result);
                    }
                    request.onerror = function () {
                        var rubbish = '';
                    }
                    var rubbish = '';
                }
                var rubbish = '';
    //			var exp = {};
    //			var outArray = [];
    //			var objectStore = dt.db.transaction(["notes"], "readonly").objectStore("notes");
    //			objectStore.openCursor().onsuccess = function (event) {
    //				var cursor = event.target.result;
    //				if (cursor) {
    ////					if (marked.indexOf(cursor.primaryKey.toString()) > -1) {
    ////					exp[cursor.primaryKey] = cursor.value;
    //					exp[cursor.primaryKey.toString()] = cursor.value;
    ////					}
    //					cursor.continue();
    //				}
    //				else {
    ////					var expString = JSON.stringify(exp);
    ////					var rubbish = '';
    //			alert("Got all notes");
    //				}
    //			};
    ////				var rubbish = '';
    //			for (i = 0; i < marked.length; i++) {
    //				outArray.push(exp[marked[i]]);
    //			}
                window.alert(JSON.stringify(outArray));
                var rubbish = '';
                break;
        }
    //	dt.getNote();
    };
    dt.msgFind = function msgFind(e) {
        if(!dt.mdb){
            dt.mailsearch();
        }
    //	document.querySelector("#dt_input").innerHTML = 'Tag Search: <input type="text" id="tagSearch" placeholder="Tag"><br/><input id="msgNote" type="button" value="Find" name="findMsg" onclick="dt.findMsgs()">';
    //	document.querySelector("#dt_input").setAttribute('class', 'see');
        
        dt.showTool("#mailSearchHtml");
        dt.removeRows(document.querySelector("#msgListTbl"));
        if(e){dt.findMsgs(e)};
    };
    dt.findMsgs = function findMsgs(e) {
        var resultsdiv = document.querySelector("#resultsTable");
    //	document.querySelector("#dt_output").innerHTML = msgSearchResTbl;
    //	document.querySelector("#dt_output").setAttribute('class', 'see');
        if(e){
            var tag = e;
        }else{
        var tag = document.querySelector("#mailTagSearch").value;
    }
        if (tag == "")
            return;
        tag = tag.toLowerCase();
        var transaction = dt.mdb.transaction(["inbox"], "readonly");
        var store = transaction.objectStore("inbox");
        var index = store.index("tags");
    //Make the range depending on what type we are doing
        var range = IDBKeyRange.only(tag);
        var s = '';
        var tbl = document.querySelector("#msgListTbl");
        dt.removeRows(tbl);
        var tblbdy = document.querySelector("#msgListTbl tbody");
        // objectStore.openCursor(null,'prev').onsuccess = function(event) {
        index.openCursor(range, 'prev').onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                s += "<h2>Key " + cursor.key + "</h2><p>";
                for (var field in cursor.value) {
                    s += field + "=" + cursor.value[field] + "<br/>";
                }
                s += "</p>";
                dt.s = s;
                var row = tblbdy.insertRow(-1);
                var cell = row.insertCell(0);
                dt.addElement2(cell, 'input', ['type', 'id', 'value'], ['checkbox', 'cbox' + cursor.primaryKey, cursor.primaryKey]);
                cell = row.insertCell(1);
                cell.innerHTML = cursor.value['sender'];
                cell = row.insertCell(2);
                var thelink = '<a href="' + cursor.primaryKey + '">' + cursor.value["title"] + '</a>';
                cell.innerHTML = thelink; //'<a href='+cursor.value['title']+'>'+cursor.value['title']+'</a>';
                cell.setAttribute('data-pik', cursor.primaryKey);
                cell.setAttribute('onclick', 'href="' + cursor.primaryKey + '"');
                cell = row.insertCell(3);
                cell.innerHTML = cursor.value['sent'];
                cursor.continue();
            }
        };
    };

}