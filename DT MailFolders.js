dtmailfolders = function(){
    /* file: mailFolders.js
    * 
    */
    dt.mailFolders = {
        /* Method: init
        * Creates the html elements used by the tool and adds the menu command
        */
        init: function () {
    //        console.log("init");
            // Check if the dt_mailfolders div exists
            var folderdiv = document.getElementById("dt_mailFolders");
            if (folderdiv === null) {
                // Doesn't exist so create it
                var folderdiv = document.createElement("div");
                folderdiv.setAttribute("id", "dt_mailFolders");
                folderdiv.setAttribute("class", "nosee");
                folderdiv.setAttribute("title", "Mail Folders");
                document.getElementById("toolDivs").appendChild(folderdiv);
            }
            // Set the contents of it to the base contents
            folderdiv.innerHTML = '<table class="hlptbl"><tr><td><h3>Mail Folders</h3></td><td><img class="hlpicon" onclick="dt.showTool(\'#mailFoldersHelp\')" title="Mail Folders Help" src="https://assets.illyriad.net/img/buttons/secondary/about_32x32_off.png" alt="Help"></td></tr></table><input type="button" value="New Folder" name="NewInboxFolder" onclick="dt.mailFolders.getNewFolderDetails()" /><h3 id="tree_label">Mail Folders</h3><ol id="mailtree" class="tree"><li data-id="Inbox" class="folder"><label for="Inbox">Inbox</label><input type="checkbox" id="Inbox" /><ol></ol></li><li data-id="Sent" class="folder"><label for="Sent">Sent</label><input type="checkbox" id="Sent" /><ol></ol></li></ol>';
            // Check if the dt_newFolder div exists
            var folderdiv3 = document.getElementById("mailFoldersHelp");
            if (folderdiv3 === null) {
                // Doesn't exist so create it
                var folderdiv3 = document.createElement("div");
                folderdiv3.setAttribute("id", "mailFoldersHelp");
                folderdiv3.setAttribute("class", "nosee");
                folderdiv3.setAttribute("title", "Mail Folders Help");
                document.getElementById("toolDivs").appendChild(folderdiv3);
            }
            // Set the contents of it to the base contents
            folderdiv3.innerHTML = '<h3>Mail Folders System</h3><p>The Mail Folder system is designed to allow you to create a folder structure and organise in-game mails by assigning them to a folder. The folder structure starts with two permanent folders - Inbox and Sent. A folder can be opened/closed by clicking on the small +/- sign to the left of the folder icon.</p><h4>Creating/Editing Folders</h4><p>Clicking the \'New Folder\' button will open a form where you can specify the details for the folder. On the left is a dropdown list of all the current folders - select the one you want to add a sub-folder to. Next is a text box for you to type the name of the new folder (you can have multiple folders with the same name). When you\'re happy with the details click the \'Create\' button to add the folder.</p><p>Double clicking on a sub-folder name will open a popup where you can type the new name for the folder.</p><h4>Deleting Folders</h4><p>Not available at present.</p><h4>Moving Folders</h4><p>Not available at present.</p><h4>Moving Messages</h4><p>To move a message just drag it over the folder you want to put it in and drop it. The folder doesn\'t need to be open. When you drop it in the folder the display of the tool will reset back to the base display (all folders closed). I\'m working on how to keep the open/closed status of folders.</p>';
            var folderdiv2 = document.getElementById("dt_newFolder");
            if (folderdiv2 === null) {
                // Doesn't exist so create it
                var folderdiv2 = document.createElement("div");
                folderdiv2.setAttribute("id", "dt_newFolder");
                folderdiv2.setAttribute("class", "nosee");
                folderdiv2.setAttribute("title", "New Folder");
                document.getElementById("toolDivs").appendChild(folderdiv2);
            }
            // Set the contents of it to the base contents
            folderdiv2.innerHTML = '<select name="folderlist" required="" id="parentSelect"><option value="Inbox">Inbox</option><option value="Sent">Sent</option></select><input type="text" name="newfolder" value="New Folder" id="folderName"/><input type="button" value="Create" name="makeFolder" onclick="dt.mailFolders.addFolder()"/>';
            // Add the menu option to the mail menu
            var elem = document.createElement("li");
            // .nav > li:nth-child(3) > ul:nth-child(2)
            elem.innerHTML = '<span onclick="dt.mailFolders.displayMailTree()">Mail Folders</span>';
            document.querySelector("#mailTools~ul").appendChild(elem);
            dt[PlayerId].folders = [];
        },
        /* Method: displayMailTree
        * Displays the tool window and calls the methods to populate it with the 
        * folder and message details
        */
        displayMailTree: function () {
    //        console.log(arguments.callee.caller.name + " --> " + arguments.callee.name);
    //        console.log("displayMailTree");
            dt.showTool("#dt_mailFolders");
            dt[PlayerId].folders = JSON.parse(locStorage.getItem([PlayerId] + ':mailFolders'));
            if (dt[PlayerId].folders === null) {
                dt[PlayerId].folders = [];
            } else {
                this.buildTree();
            }
            this.addMessages();
            setTimeout(function () {
                dt.mailFolders.setupDragDrop();
            }, (3 * 1000));

        },

        moveMessage: function (targetId, messageId) {
    //        console.log(arguments.callee.caller.name + " --> " + arguments.callee.name);
    //        console.log("MessageId " + messageId + " moving to folder " + targetId);

            // Set the messageId property of dt[PlayerId]msgFldrs
    //        dt[PlayerId].msgFldrs[messageId] = targetId;
    //        var key = PlayerId + ':msgFldrs';
    //        locStorage.setItem(key, JSON.stringify(dt[PlayerId].msgFldrs));
    //        this.resetDisplay();

        },

        setupDragDrop: function () {
    //        console.log("setupDragDrop");
            // Make the message elements draggable
            $("#mailtree .file").draggable({
                revert: "invalid"
            });
            // Make any folder elements dropable
            $(".folder").droppable({
                accept: '.file',
                greedy: true,
                drop: function (event, ui) {
                    $(this).removeClass("ui-state-highlight");
                    var message = ui.draggable.context.dataset.id;
                    var targetFolder = event.target.dataset.id;

                    dt[PlayerId].msgFldrs[message] = targetFolder;
                    var key = PlayerId + ':msgFldrs';
                    locStorage.setItem(key, JSON.stringify(dt[PlayerId].msgFldrs));

    //                console.log("Moving: " + ui.draggable.context.dataset.id);
    //                console.log("Moving to: " + event.target.dataset.id);
                    dt.mailFolders.resetDisplay();
                },
                over: function (event, ui) {
                    $(this).addClass("ui-state-highlight");
                }
            });
            /*dropable events and bindings*/
            $("#mailtree .folder").on("drop", function (event, ui) {
                dt.mailFolders.moveMessage(event.target.dataset.id, ui.draggable.context.dataset.id);
    //            $(".folder ol").append(ui.draggable);
            });
        },
        /* Method: buildTree
        * Populate the main tool window with the current directory structure
        */
        buildTree: function () {
    //        console.log(arguments.callee.caller.name + " --> " + arguments.callee.name);
    //        console.log("buildTree");
            var mailtree = dt[PlayerId].folders;
            for (var d = 0; d < mailtree.length; d++) {
                // Get the details for each of the entries in the mailtree
                var thisFolder = this.getFolderId(mailtree[d]);
                var name = thisFolder[0];
                var folderId = thisFolder[1];
                var parent = thisFolder[2];
                var pNode = document.getElementById(parent).parentElement;
                var oList = pNode.querySelector("ol");
                this.appendFolder(name, folderId, oList);
            }
        },
        /* Method: addMessages
        * Display the details of each message in the relevant folder
        */
        addMessages: function () {
    //        console.log(arguments.callee.caller.name + " --> " + arguments.callee.name);
    //        console.log("addMessages");
            // Run the getAllMail method
            dt.mailsearch(dt.getAllMail);
        },
        /* Method: appendFolder
        * Adds the HTML for a folder to the display
        * 
        * Params:
        * name - string. The display name for the folder
        * id - string. The id for the folder.
        * oList - pointer. The <ol> tag the folder is to be put in
        */
        appendFolder: function (name, id, oList) {
    //        console.log("appendFolder");
            var newFolder = document.createElement("li");
            newFolder.innerHTML = '<label for="' + name + '">' + name + '</label> <input id="' + id + '" type="checkbox"><ol></ol>';
            newFolder.setAttribute("data-id", id);
            newFolder.classList.add("folder");
            oList.appendChild(newFolder);
            var lbl = oList.querySelector('li[data-id="' + id + '"] label');
            lbl.ondblclick = function () {
                dt.mailFolders.folderEdit(id, name, lbl);
            };
    //        console.log(lbl);
        },

        folderEdit: function (id, name, lbl) {
            for (i = 0; i < dt[PlayerId].folders.length; i++) {
                var a = this.getFolderId(dt[PlayerId].folders[i]);
                if (a[0] === name) {
                    newName = window.prompt("New folder name", name);
    //                dt[PlayerId].folders[i] = {newName};
                    var newFolder = {[newName]: {id: [a[1]], "parent": [a[2]]}};
                    dt[PlayerId].folders[i] = newFolder;
                    var key = PlayerId + ':mailFolders';
                    locStorage.setItem(key, JSON.stringify(dt[PlayerId].folders));
                    lbl.textContent = newName;
    //        this.resetDisplay();
                }
            }
    //        console.log(id);

        },
        /* Method: getNewFolderDetails
        * Show the form for adding a new folder
        */
        getNewFolderDetails: function () {
    //        console.log("getNewFolderDetails");
            // Get the current list of folders
            dt[PlayerId].folders = JSON.parse(locStorage.getItem([PlayerId] + ':mailFolders'));
            if (dt[PlayerId].folders === null) {
                dt[PlayerId].folders = [];
            }
            this.populateAddFolder();
            dt.showTool("#dt_newFolder");
        },
        /* Method: addFolder
        * Get the details of a new folder from the form and add it to the structure
        */
        addFolder: function () {
    //        console.log("addFolder");
            var parentFolder = document.getElementById("parentSelect").value;
            var newFolderName = document.getElementById("folderName").value;
            // Get the id to use for this folder
            if (dt[PlayerId].folders.length !== 0) {
                var numFolders = dt[PlayerId].folders.length;
                var lastFolder = Object.keys(dt[PlayerId].folders[numFolders - 1])[0];
                var lastFolderId = dt[PlayerId].folders[numFolders - 1][lastFolder].id[0];
                var nextFolderId = (parseInt(lastFolderId) + 1).toString(10);
            } else {
                var nextFolderId = "1";
            }
            var newFolder = {[newFolderName]: {id: [nextFolderId], "parent": [parentFolder]}};
            dt[PlayerId].folders.push(newFolder);
            var key = PlayerId + ':mailFolders';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].folders));
            this.resetDisplay();
        },
        /* Method: populateAddFolder
        * Populate the parent folder select element with the details of all current folders
        */
        populateAddFolder: function () {
    //        console.log("populateAddFolder");
            var selElement = document.getElementById("parentSelect");
            var currentFolders = JSON.parse(locStorage.getItem([PlayerId] + ':mailFolders'));
            if (currentFolders === null) {
                currentFolders = [];
            }
            // Work through each of the entries in currentFolders
            for (var f = 0; f < currentFolders.length; f++) {
                var thisFolder = this.getFolderId(currentFolders[f]);
                var newElem = document.createElement("option");
                newElem.setAttribute("value", thisFolder[1]);
                newElem.textContent = thisFolder[0];
                selElement.appendChild(newElem);
                var rubbish = "";
            }
        },
        /* Method: getFolderId
        * Extract the relevant details from a folder object
        * 
        * Returns: array of string elements
        */
        getFolderId: function (obj) {
    //        console.log("getFolderId");
            var a = [];
            a[0] = Object.keys(obj)[0];
            a[1] = obj[a[0]].id[0];
            a[2] = obj[a[0]].parent[0];
            return a;
        },
        /* Method: addMessage
        * Add a message to the relevant folder
        * 
        * Param:
        * thisMsg - object. The object straight from the database.
        * 
        */
        addMessage: function (thisMsg) {
    //        console.log(arguments.callee.caller.name + " --> " + arguments.callee.name);
    //        console.log("addMessage");
            // Extract the msgId
            var msgId = thisMsg.igmid.split("/")[3];
            var parentFldr = "";
            var title = ""; // remove '\n'
            var sender = ""; // remove '\n'
            var sent = "";
            // Check to see if there is an entry for this message in the messageFolders object.
            dt[PlayerId].msgFldrs = JSON.parse(locStorage.getItem([PlayerId] + ':msgFldrs'));
            if (dt[PlayerId].msgFldrs === null) {
                dt[PlayerId].msgFldrs = {};
            }
            if (dt[PlayerId].msgFldrs.hasOwnProperty(msgId)) {
                parentFldr = dt[PlayerId].msgFldrs[msgId];
            } else {
                parentFldr = thisMsg.defaultFolder;
            }
            title = thisMsg.title.replace('\n', '');
            sender = thisMsg.sender.replace('\n', '');
            sent = thisMsg.sent;
            var oList = document.querySelector('[data-id="' + parentFldr + '"]>ol');
            var newMessage = document.createElement("li");
            newMessage.innerHTML = '<a href="#Communication/ReadMail/' + msgId + '">' + title + '</a>';
            newMessage.setAttribute("data-id", msgId);
            newMessage.setAttribute("class", "file");
            oList.appendChild(newMessage);
            var rubbish = "";
        },
        /* Method: resetDisplay
        * Reset the display back to just the Inbox and Sent folders
        */
        resetDisplay: function () {
    //        console.log(arguments.callee.caller.name + " --> " + arguments.callee.name);
            var folderDisp = document.getElementById("dt_mailFolders");
            folderDisp.innerHTML = '<table class="hlptbl"><tr><td><h3>Mail Folders</h3></td><td><img class="hlpicon" onclick="dt.showTool(\'#mailFoldersHelp\')" title="Mail Folders Help" src="https://assets.illyriad.net/img/buttons/secondary/about_32x32_off.png" alt="Help"></td></tr></table><input type="button" value="New Folder" name="NewInboxFolder" onclick="dt.mailFolders.getNewFolderDetails()" /><h3 id="tree_label">Mail Folders</h3><ol id="mailtree" class="tree"><li data-id="Inbox" class="folder"><label for="Inbox">Inbox</label><input type="checkbox" id="Inbox" /><ol></ol></li><li data-id="Sent" class="folder"><label for="Sent">Sent</label><input type="checkbox" id="Sent" /><ol></ol></li></ol>';
            this.displayMailTree();
            var updateDiv = document.getElementById("dt_newFolder");
            updateDiv.innerHTML = '<select name="folderlist" required="" id="parentSelect"><option value="Inbox">Inbox</option><option value="Sent">Sent</option></select><input type="text" name="newfolder" value="New Folder" id="folderName"/><input type="button" value="Create" name="makeFolder" onclick="dt.mailFolders.addFolder()"/>';
            this.populateAddFolder();
        }
    };
    window.onload = function () {
        dt.mailFolders.init()
    };
}