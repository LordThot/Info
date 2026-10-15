dtidb11 = function () {
  // Do the setup/initialization
  dt.notes = function notes(callback, param) {
    //No support? Go in the corner and pout.
    if (!indexedDBOk) {
      return;
    }

    var openRequest = indexedDB.open("dt_notes", 6);
    /* Method: onupgradeneeded
     * Create or upgrade an indexed database.
     */
    openRequest.onupgradeneeded = function (e) {
      //        console.log("dt.notes.openRequest.onupgradeneeded");
      //        console.trace();
      var thisDB = e.target.result;
      //        console.log("running onupgradeneeded");
      if (!thisDB.objectStoreNames.contains("notes")) {
        var os = thisDB.createObjectStore("notes", { autoIncrement: true });
        //I want to get by title later
        os.createIndex("title", "title", { unique: false });
        //I want to get by individual tags later
        os.createIndex("tags", "tags", { unique: false, multiEntry: true });
        // I want to be able to search by complete coords and by a range on either X or Y
        os.createIndex("coords", "coords", { unique: false });
        os.createIndex("x", "x", { unique: false });
        os.createIndex("y", "y", { unique: false });
      }
      dt.db = e.target.result;
    };
    //	openRequest.onsuccess(callback());
    openRequest.onsuccess = function (e) {
      //        console.log("dt.notes.openRequest.onsuccess");
      //        console.trace();
      dt.db = e.target.result;
      if (param !== "undefined") {
        callback(param);
      } else {
        callback();
      }
    };
    openRequest.onerror = function (e) {
      //        console.log("dt.notes.openRequest.onerror");
      //        console.trace();
      window.alert("Error opening the database.");
      dt.db = null;
      //Do something for the error
    };
  };

  indexedDBOk = function indexedDBOk() {
    //        console.log("dt.notes.indexedDBOk");
    //        console.trace();
    return "indexedDB" in window;
  };
  dt.populateTownList = function populateTownList(node) {
    //        console.log("dt.populateTownList");
    //        console.trace();
    for (var i = 0; i < dt[PlayerId].towns.list.length; i++) {
      var townId = dt[PlayerId].towns.list[i];
      var thisOpt = dt.addElement2(
        node,
        "option",
        ["value", "textContent"],
        [townId]
      );
      thisOpt.textContent = dt[PlayerId].towns[townId].name;
    }
  };
  /* Function: addNote
   * Add a note to the notes indexedDB
   */
  dt.addNote = function addNote(e) {
    //        console.log("dt.addNote");
    //        console.trace();
    document.querySelector("#dt_noteEdit").innerHTML = "";
    document.querySelector("#addNoteHtml").innerHTML = dt.noteEntry;

    dt.showTool("#addNoteHtml");

    var townSel = document.querySelector("#noteTown");
    dt.populateTownList(townSel);
    // if a parameter was passed use it as the coords
    if (e) {
      document.querySelector("#noteCoords").value = e;
    }
  };

  dt.getAllNotes = function getAllNotes() {
    //        console.log("dt.getAllNotes");
    //        console.trace();
    var tbl = document.querySelector("#noteListTbl");
    dt.removeRows(tbl);
    var tbdy = tbl.querySelector("tbody");
    dt.showTool("#notesResultsHtml");
    var c = 0;
    var allNotes = [];
    //	var transaction = dt.db.transaction(["notes"], "readonly");
    var objectStore = dt.db
      .transaction(["notes"], "readonly")
      .objectStore("notes");
    objectStore.openCursor().onsuccess = function (event) {
      //		var tbl = document.querySelector("#noteListTbl");
      var cursor = event.target.result;
      if (cursor) {
        var row = tbdy.insertRow(-1);
        var cell = row.insertCell(0);
        dt.addElement2(
          cell,
          "input",
          ["type", "id", "value"],
          ["checkbox", "cbox" + cursor.primaryKey, cursor.primaryKey]
        );
        cell = row.insertCell(1);
        cell.innerHTML = cursor.value["title"];
        cell.setAttribute("data-pik", cursor.primaryKey);
        cell.setAttribute("onclick", "dt.showPopUp(" + cursor.primaryKey + ")");
        cell.setAttribute("title", "Click to view");
        cell = row.insertCell(2);
        if (cursor.value["town"] != "") {
          if (!dt[PlayerId].towns.hasOwnProperty([cursor.value.town])) {
            town = "Foreign";
          } else {
            town = dt[PlayerId].towns[cursor.value["town"]].name;
          }
        } else {
          town = "None";
        }
        //            cell.innerHTML = cursor.value['town'];
        cell.innerHTML = town;
        cell = row.insertCell(3);
        cell.innerHTML =
          '<span class="name" data="l=' +
          cursor.value.coords +
          '">[' +
          cursor.value.coords +
          "]</span>";

        allNotes.push(cursor.value);
        cursor.continue();
      } else {
      }
    };
  };

  dt.storeNote = function storeNote(e) {
    //        console.log("dt.storeNote");
    //        console.trace();
    var town = $("#noteTown").val();
    var coords = document.querySelector("#noteCoords").value;
    if (coords !== null) {
      var coordArray = coords.split("|");
      var x = coordArray[0];
      var y = coordArray[1];
    } else {
      var x = "";
      var y = "";
    }
    var coords = document.querySelector("#noteCoords").value;
    var title = document.querySelector("#noteTitle").value;
    var body = document.querySelector("#noteBody").value;
    var tags = document.querySelector("#noteTags").value.split(",");
    for (i = 0; i < tags.length; i++) {
      tags[i] = tags[i].trim();
    }
    //    console.log("About to add " + title);
    var transaction = dt.db.transaction(["notes"], "readwrite");
    var store = transaction.objectStore("notes");
    var note = {
      town: town,
      coords: coords,
      x: x,
      y: y,
      title: title,
      body: body,
      created: new Date(),
      tags: tags,
    };

    //Perform the add
    var request = store.add(note);
    request.onerror = function (e) {
      alert("Sorry, couldn't add the note for some reason.");
      //        console.log("Error", e.target.error.name);
      //        console.dir(e.target);
      //some type of error handler
    };

    request.onsuccess = function (e) {
      //        console.log("Woot! Note added");
      var popup = document.querySelector("#addNoteHtml");
      $(popup).dialog("close");
      //		dt_input.innerHTML = '';
    };
  };

  dt.noteFind = function noteFind(e) {
    //        console.log("dt.noteFind");
    //        console.trace();
    dt.showTool("#noteFindHtml");
  };

  dt.popupNotesByCoords = function (coords) {
    //        console.log("dt.popupNotesByCoords");
    //        console.trace();
    var coords = dt.thisPopUp.coords;
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("coords");
    var range = IDBKeyRange.only(coords);
    var count = 0;
    dt.thisPopUp.notes = [];
    var thisNote = {};
    index.openCursor(range).onsuccess = function (e) {
      var result = e.target.result;
      dt.thisPopUp.notes.push(result);
      result ? ++count && result.continue() : console.log(count);
    };
    dt.thisPopUp.noteCount = count;
    dt.updatePopUpOptions(coords);
  };

  dt.updatePopUpOptions = function (coords) {
    //        console.log("dt.updatePopUpOptions");
    //        console.trace();
    // Get the td that holds the options in the popup
    // html body div#WzTtDiV div#WzBoDy table tbody tr td#WzBoDyI div.popup div.m
    // html body div#WzTtDiV div#WzBoDy table tbody tr td#WzBoDyI div.popup div.m

    // Check if this is on the world map or not and set the parent element accordingly.
    var parent = document.querySelector(
      ".m > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)"
    );

    if (parent === null) {
      parent = document.querySelector(".m");
    }
    let stdOpts = true;
    dt.addElement2(parent, "hr", [], []);
    // Check for any of the standard options that are missing and add them
    let pText = parent.textContent;
    let coordArray = coords.split("|");
    if (!pText.includes("Harvest Resources")) {
      // Need to add the harvesting option
      // <div><a style="color:orange" class="harvestPopup" data-x="628" data-y="-3294" href="#/Trade/Orders/628/-3294?ActionTypeID=2">Harvest Resources</a></div>
      var newDiv = dt.addElement2(parent, "div", [], []);
      var newLink = dt.addElement2(
        newDiv,
        "a",
        ["class", "data-x", "data-y", "href", "style"],
        [
          "harvestPopup",
          coordArray[0],
          coordArray[1],
          "#/Trade/Orders/" +
            coordArray[0] +
            "/" +
            coordArray[1] +
            "?ActionTypeID=2",
          "color:orange",
        ]
      );
      newLink.textContent = "Harvest Resources";
      stdOpts = false;
    }
    if (!pText.includes("Send Diplomats")) {
      // Need to add the diplo option
      // <div><a style="color:orange" href="#/Diplomatic/Orders/628/-3294">Send Diplomats</a></div>
      var newDiv = dt.addElement2(parent, "div", [], []);
      var newLink = dt.addElement2(
        newDiv,
        "a",
        ["href", "style"],
        [
          "#/Diplomatic/Orders/" + coordArray[0] + "/" + coordArray[1],
          "color:orange",
        ]
      );
      newLink.textContent = "Send Diplomats";
      stdOpts = false;
    }
    if (!pText.includes("Send Army")) {
      // Need to add the army option
      // <div><a style="color:orange" href="#/Military/Orders/628/-3294">Send Army</a></div>
      var newDiv = dt.addElement2(parent, "div", [], []);
      var newLink = dt.addElement2(
        newDiv,
        "a",
        ["href", "style"],
        [
          "#/Military/Orders/" + coordArray[0] + "/" + coordArray[1],
          "color:orange",
        ]
      );
      newLink.textContent = "Send Army";
      stdOpts = false;
    }
    if (stdOpts === false) {
      dt.addElement2(parent, "hr", [], []);
    }
    // Add the 'Add Note' option
    var newDiv = dt.addElement2(parent, "div", [], []);
    if (parent.tagName !== "td" && parent.tagName !== "TD") {
      var extras = document.querySelector(".extrasPopup");
      parent.insertBefore(newDiv, extras);
    }
    var newLink = dt.addElement2(
      newDiv,
      "a",
      ["onclick", "class", "title"],
      [
        "dt.notes(dt.addNote,'" + coords + "')",
        "dt-popup-option",
        "Add new DurcNote",
      ]
    );
    newLink.textContent = "Add Note";
    // Build the view option
    var newDiv = dt.addElement2(parent, "div", [], []);
    if (parent.tagName !== "td" && parent.tagName !== "TD") {
      var extras = document.querySelector(".extrasPopup");
      parent.insertBefore(newDiv, extras);
    }
    var newLink = dt.addElement2(
      newDiv,
      "a",
      ["onclick", "class", "title"],
      [
        "dt.notes(dt.findByCoords,'" + coords + "')",
        "dt-popup-option",
        "Get any notes for this location",
      ]
    );
    if (dt.thisPopUp.noteCount > 0) {
      newLink.textContent = "Find Notes(" + dt.thisPopUp.count + ")";
    } else {
      newLink.textContent = "Find Notes";
    }
    // Add the 'View Mails' option
    var t = "[" + coords + "]";
    var rubbish = "";
    var newDiv = dt.addElement2(parent, "div", [], []);
    if (parent.tagName !== "td" && parent.tagName !== "TD") {
      var extras = document.querySelector(".extrasPopup");
      parent.insertBefore(newDiv, extras);
    }
    var newLink = dt.addElement2(
      newDiv,
      "a",
      ["onclick", "class", "title"],
      [
        "dt.msgFind('" + t + "')",
        "dt-popup-option",
        "Get any IGMs for this location",
      ]
    );
    newLink.textContent = "Find IGMs";
    // Add the 'View Notifications' option
    var t = "[" + coords + "]";
    var rubbish = "";
    var newDiv = dt.addElement2(parent, "div", [], []);
    if (parent.tagName !== "td" && parent.tagName !== "TD") {
      var extras = document.querySelector(".extrasPopup");
      parent.insertBefore(newDiv, extras);
    }
    var newLink = dt.addElement2(
      newDiv,
      "a",
      ["onclick", "class", "title"],
      [
        "dt.notificationsFind('" + t + "')",
        "dt-popup-option",
        "Get any Notifications for this location",
      ]
    );
    newLink.textContent = "Find Notifications";

    var dummy = "";
  };

  dt.notificationsFind = function notificationsFind(coords) {
    tdiv = document.querySelector("#dtNotifs");
    while (tdiv.firstChild) {
      tdiv.removeChild(tdiv.firstChild);
    }
    var n = document.querySelector("#Notifications");
    var nc = n.children;
    //console.log(nc.length);
    for (i = 0; i < nc.length; i++) {
      if (nc[i].innerText.includes(coords)) {
        //        console.log(nc[i].innerText);
        var np = dt.addElement2(tdiv, "p", [], []);
        np.innerHTML = nc[i].innerHTML;
      }
    }
    dt.showTool("#dtNotifs");
    var rubbish = "";
  };
  //};
  /* Function: findByCoords
   * Find and list any notes that are associated with the supplied map coords.
   *
   * Parameter:
   * coords - string. A string holding the coords to search for. This should be in
   *                  the format (-)x|(-)y
   *
   */
  dt.findByCoords = function findByCoords(coords) {
    //        console.log("dt.findByCoords");
    //        console.trace();
    dt.showTool("#notesResultsHtml");
    if (coords == "") return;
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("coords");
    //Make the range depending on what type we are doing
    var range = IDBKeyRange.only(coords);
    var s = "";
    var tbl = document.querySelector("#noteListTbl");
    dt.removeRows(tbl);
    var tBdy = tbl.querySelector("tbody");
    index.openCursor(range).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        s += "<h2>Key " + cursor.key + "</h2><p>";
        for (var field in cursor.value) {
          s += field + "=" + cursor.value[field] + "<br/>";
        }
        s += "</p>";
        dt.s = s;
        var row = tBdy.insertRow(-1);
        var cell = row.insertCell(0);
        dt.addElement2(
          cell,
          "input",
          ["type", "id", "value"],
          ["checkbox", "cbox" + cursor.primaryKey, cursor.primaryKey]
        );
        cell = row.insertCell(1);
        cell.innerHTML = cursor.value["title"];
        cell.setAttribute("data-pik", cursor.primaryKey);
        cell.setAttribute("onclick", "dt.showPopUp(" + cursor.primaryKey + ")");
        cell = row.insertCell(2);
        if (cursor.value["town"] != "") {
          town = dt[PlayerId].towns[cursor.value["town"]].name;
        } else {
          town = "None";
        }
        //            cell.innerHTML = cursor.value['town'];
        cell.innerHTML = town;
        cell = row.insertCell(3);
        cell.innerHTML =
          '<span class="name" data="l=' +
          cursor.value.coords +
          '">[' +
          cursor.value.coords +
          "]</span>";
        cursor.continue();
      }
    };
  };
  /* Function: countVisible2
   * Find any notes that are associated with the locations visible in the current
   * world map view then add a button to show them.
   *
   */
  dt.countVisible2 = function countVisible2() {
    //        console.log("dt.countVisible2");
    //    console.trace();
    // Calculate the current map extents.
    var xCoords = [
      "" + (mapData.x + mapData.zoom),
      "" + (mapData.x - mapData.zoom),
    ].sort();
    var yCoords = [
      "" + (mapData.y + mapData.zoom),
      "" + (mapData.y - mapData.zoom),
    ].sort();
    // Get notes in the x range
    dt.xMatches = [];
    //    console.log("dt.xMatches cleared ",dt.xMatches);
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("x");
    var rangeValue = IDBKeyRange.bound(xCoords[0], xCoords[1]);

    index.openCursor(rangeValue).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        //      console.log(cursor);
        dt.xMatches.push(cursor.primaryKey);
        //            console.log("dt.xMatches ",dt.xMatches);
        //      console.log(cursor.value['x']);
        //      console.log(cursor.value);
        cursor.continue();
      } else {
        // Get notes in the y range
        dt.yMatches = [];
        var transaction = dt.db.transaction(["notes"], "readonly");
        var store = transaction.objectStore("notes");
        var index = store.index("y");
        var rangeValue = IDBKeyRange.bound(yCoords[0], yCoords[1]);

        index.openCursor(rangeValue).onsuccess = function (e) {
          var cursor = e.target.result;
          if (cursor) {
            //      console.log(cursor);
            dt.yMatches.push(cursor.primaryKey);
            //      console.log(cursor.value['x']);
            //      console.log(cursor.value);
            cursor.continue();
          } else {
            var combined = 0;
            for (x = 0; x < dt.xMatches.length; x++) {
              for (y = 0; y < dt.yMatches.length; y++) {
                if (dt.yMatches[y] === dt.xMatches[x]) {
                  combined = combined + 1;
                }
              }
            }
            if (!document.getElementById("visibleNotes")) {
              // Add the 'Save Trade' button to the headLinks menu bar
              var parent = document.querySelector(".subLinks");
              dt.addElement2(
                parent,
                "input",
                ["id", "value", "class", "type", "onclick", "style"],
                [
                  "visibleNotes",
                  "Visible Notes",
                  "see",
                  "button",
                  "dt.notes(dt.showVisible)",
                  "float: right;",
                ]
              );
            }
            var visNotes = document.getElementById("visibleNotes");
            visNotes.value = "Visible Notes: " + combined;
            //if (dt[PlayerId].mapDisplay.noteDisplay.onoff == "on") {
            dt.canvasNotes();
            //dt.mapTools.getVisTowns();
            //}
          }
        };
      }
    };
  };

  dt.showVisible = function showVisible() {
    //        console.log("dt.showVisible");
    //        console.trace();
    // Calculate the current map extents.
    var xCoords = [
      "" + (mapData.x + mapData.zoom),
      "" + (mapData.x - mapData.zoom),
    ].sort();
    var yCoords = [
      "" + (mapData.y + mapData.zoom),
      "" + (mapData.y - mapData.zoom),
    ].sort();
    // Get notes in the x range
    dt.xMatches = [];
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("x");
    var rangeValue = IDBKeyRange.bound(xCoords[0], xCoords[1]);

    index.openCursor(rangeValue).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        dt.xMatches.push(cursor.primaryKey);
        cursor.continue();
      } else {
        // Get notes in the y range
        dt.yMatches = [];
        var transaction = dt.db.transaction(["notes"], "readonly");
        var store = transaction.objectStore("notes");
        var index = store.index("y");
        var rangeValue = IDBKeyRange.bound(yCoords[0], yCoords[1]);

        index.openCursor(rangeValue).onsuccess = function (e) {
          var cursor = e.target.result;
          if (cursor) {
            dt.yMatches.push(cursor.primaryKey);
            cursor.continue();
          } else {
            var combined = [];
            for (x = 0; x < dt.xMatches.length; x++) {
              for (y = 0; y < dt.yMatches.length; y++) {
                if (dt.yMatches[y] === dt.xMatches[x]) {
                  combined.push(dt.xMatches[x]);
                }
              }
            }
            dt.showTool("#notesResultsHtml");
            var tbl = document.querySelector("#noteListTbl");
            dt.removeRows(tbl);
            var tBdy = tbl.querySelector("tbody");

            var objectStore = dt.db
              .transaction(["notes"], "readonly")
              .objectStore("notes");
            objectStore.openCursor().onsuccess = function (event) {
              var cursor = event.target.result;
              if (cursor) {
                if (combined.includes(cursor.primaryKey)) {
                  var row = tBdy.insertRow(-1);
                  var cell = row.insertCell(0);
                  dt.addElement2(
                    cell,
                    "input",
                    ["type", "id", "value"],
                    ["checkbox", "cbox" + cursor.primaryKey, cursor.primaryKey]
                  );
                  cell = row.insertCell(1);
                  cell.innerHTML = cursor.value["title"];
                  cell.setAttribute("data-pik", cursor.primaryKey);
                  cell.setAttribute(
                    "onclick",
                    "dt.showPopUp(" + cursor.primaryKey + ")"
                  );
                  cell.setAttribute("title", "Click to view");
                  cell = row.insertCell(2);
                  if (cursor.value["town"] != "") {
                    town = dt[PlayerId].towns[cursor.value["town"]].name;
                  } else {
                    town = "None";
                  }
                  //            cell.innerHTML = cursor.value['town'];
                  cell.innerHTML = town;
                  cell = row.insertCell(3);
                  cell.innerHTML =
                    '<span class="name" data="l=' +
                    cursor.value.coords +
                    '">[' +
                    cursor.value.coords +
                    "]</span>";

                  //                            allNotes.push(cursor.value);
                }
                cursor.continue();
              } else {
                //			alert("Got all notes: " + allNotes);
              }
            };
          }
        };
      }
    };
  };

  dt.canvasNotes = function canvasNotes() {
    //    console.log("dt.canvasNotes");
    //    console.trace();
    // Calculate the current map extents.
    var xCoords = [
      "" + (mapData.x + mapData.zoom),
      "" + (mapData.x - mapData.zoom),
    ].sort();
    var yCoords = [
      "" + (mapData.y + mapData.zoom),
      "" + (mapData.y - mapData.zoom),
    ].sort();
    // Get notes in the x range
    dt.xMatches = [];
    dt.visNotesX = {};
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("x");
    var rangeValue = IDBKeyRange.bound(xCoords[0], xCoords[1]);

    index.openCursor(rangeValue).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        thisMatch = [cursor.primaryKey, cursor.value["coords"]];
        dt.visNotesX[cursor.primaryKey] = {
          x: cursor.value["x"],
          y: cursor.value["y"],
        };
        dt.xMatches.push(cursor.primaryKey);
        cursor.continue();
      } else {
        // Get notes in the y range
        dt.yMatches = [];
        var transaction = dt.db.transaction(["notes"], "readonly");
        var store = transaction.objectStore("notes");
        var index = store.index("y");
        var rangeValue = IDBKeyRange.bound(yCoords[0], yCoords[1]);

        index.openCursor(rangeValue).onsuccess = function (e) {
          var cursor = e.target.result;
          if (cursor) {
            //                    dt.yMatches.push({id: [cursor.primaryKey], x: cursor.value['x'], y: cursor.value['y']})
            dt.yMatches.push(cursor.primaryKey);
            cursor.continue();
          } else {
            var matchBoth = dt.arrayIntersect(dt.xMatches, dt.yMatches);
            if (matchBoth.length > 0) {
              //                        for (i = 0; i < matchBoth.length; i++) {
              dt.drawNotes(matchBoth);
              //                        }
            }
          }
        };
      }
    };
  };

  dt.arrayIntersect = function arrayIntersect(a, b) {
    return [...new Set(a)].filter((x) => new Set(b).has(x));
  };

  /* Function: drawNotes
   *  Function to position the symbol that shows the location of notes on the map
   *
   *  Parameter:
   *  combined - array. Holds the id of any notes that are visible on the current world map view.
   */
  dt.drawNotes = function drawNotes(combined) {
    //    console.log(combined);
    var canvas = document.getElementById("noteDisplay");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    var zoom = mapData.zoom;
    var cx = mapData.x;
    var cy = mapData.y;
    var sFactor = 500 / (zoom * 2 + 1);
    tx = cx - zoom;
    ty = cy - zoom;

    var rubbish = "";

    for (var i = 0; i < combined.length; i++) {
      thisNote = dt.visNotesX[combined[i]];
      x = thisNote.x;
      y = thisNote.y;
      xCol = zoom + (x - cx);
      yCol = zoom - (y - cy);
      dx = x - tx;
      dy = y - ty;
      dt.drawSym3(ctx, xCol, yCol, sFactor);
    }
  };

  dt.drawSym3 = function (ctx, x, y, sFactor) {
    ctx.beginPath();
    //    ctx.strokeStyle = 'red';
    ctx.strokeStyle = dt[PlayerId].mapDisplay.noteDisplay.colour;
    //    ctx.fillStyle = 'rgba(255, 51, 0, 1)';
    ctx.fillStyle = dt[PlayerId].mapDisplay.noteDisplay.colour;
    ctx.save();
    ctx.translate(x * sFactor + 1, y * sFactor + 1);
    ctx.fillRect(0, 0, sFactor, sFactor);
    var lWidth = sFactor * 0.8;
    ctx.clearRect(lWidth, lWidth, sFactor - 2 * lWidth, sFactor - 2 * lWidth);
    ctx.restore();
    ctx.stroke();
    var rubbish = "";
  };

  dt.drawCircle = function (ctx, x, y, sFactor) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "rgba(255, 51, 0, 1)";
    ctx.lineWidth = sFactor * 0.1;
    ctx.save();
    ctx.translate((x + 0.5) * sFactor + 1, (y + 0.5) * sFactor + 1);
    ctx.arc(0, 0, 10.5 * sFactor, 0, 2 * Math.PI);
    ctx.restore();
    ctx.stroke();
    var rubbish = "";
  };

  dt.drawCircle2 = function (ctx, x, y, sFactor, rad, col) {
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.fillStyle = col; //'rgba(255, 51, 0, 1)';
    ctx.lineWidth = sFactor * 0.1;
    ctx.save();
    ctx.translate((x + 0.5) * sFactor + 1, (y + 0.5) * sFactor + 1);
    ctx.arc(0, 0, rad * sFactor, 0, 2 * Math.PI);
    ctx.restore();
    ctx.stroke();
    var rubbish = "";
  };

  /* Function: countByVisible
   * Find any notes that are associated with the locations visible in the current
   * world map view.
   *
   */
  dt.countByVisible = function countByVisible() {
    //        console.log("dt.countByVisible");
    //        console.trace();
    // Calculate the current map extents.
    var xCoords = [
      "" + (mapData.x + mapData.zoom),
      "" + (mapData.x - mapData.zoom),
    ];
    var yCoords = [
      "" + (mapData.y + mapData.zoom),
      "" + (mapData.y - mapData.zoom),
    ];
    // Make sure the values are sorted in numerical order
    if (xCoords[1] < xCoords[0]) {
      xCoords.reverse();
    }
    if (yCoords[1] < yCoords[0]) {
      yCoords.reverse();
    }
    // We now need to do 2 separate range filters (one on x and one on y) and
    // generate a count of those notes that appear in both results.
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("x");
    var xRange = IDBKeyRange.bound(xCoords[0], xCoords[1]);
    // X range matches
    xMatches = [];
    var index = store.index("x");

    index.openCursor(xRange).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        xMatches.push(cursor.key);
      }
    };
    var yRange = IDBKeyRange.bound(yCoords[0], yCoords[1]);
    // Y range matches
    yMatches = [];
    var index = store.index("y");

    index.openCursor(yRange).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        yMatches.push(cursor.key);
      }
    };
    // Now get those entries in the xMatches that are also in the ymatches
    var combined = 0;
    for (i = 0; i < xMatches.length; i++) {
      if (yMatches.includes(xMatches[i])) {
        combined = combined + 1;
      }
    }
    //    console.log("Visible notes: " + combined);
  };

  dt.getNote = function getNote(e) {
    //        console.log("dt.getNote");
    //        console.trace();
    var tbl = document.querySelector("#noteListTbl");
    dt.removeRows(tbl);

    dt.showTool("#notesResultsHtml");
    var tag = document.querySelector("#noteTagSearch").value;
    if (tag == "") return;
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("tags");
    //Make the range depending on what type we are doing
    var range = IDBKeyRange.only(tag);
    var s = "";
    var tbl = document.querySelector("#noteListTbl");
    index.openCursor(range).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        s += "<h2>Key " + cursor.key + "</h2><p>";
        for (var field in cursor.value) {
          s += field + "=" + cursor.value[field] + "<br/>";
        }
        s += "</p>";
        dt.s = s;
        var row = tbl.insertRow(-1);
        var cell = row.insertCell(0);
        dt.addElement2(
          cell,
          "input",
          ["type", "id", "value"],
          ["checkbox", "cbox" + cursor.primaryKey, cursor.primaryKey]
        );
        cell = row.insertCell(1);
        cell.innerHTML = cursor.value["title"];
        cell.setAttribute("data-pik", cursor.primaryKey);
        cell.setAttribute("onclick", "dt.showPopUp(" + cursor.primaryKey + ")");
        cell = row.insertCell(2);
        if (cursor.value["town"] != "") {
          town = dt[PlayerId].towns[cursor.value["town"]].name;
        } else {
          town = "None";
        }
        //            cell.innerHTML = cursor.value['town'];
        cell.innerHTML = town;
        cell = row.insertCell(3);
        cell.innerHTML =
          '<span class="name" data="l=' +
          cursor.value.coords +
          '">[' +
          cursor.value.coords +
          "]</span>";
        cursor.continue();
      }
    };
  };

  dt.processSelected = function processSelected() {
    //        console.log("dt.processSelected");
    //        console.trace();
    var tbl = document.querySelector("#noteListTbl");
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
      case "delete":
        var confMsg =
          "You are about to delete " +
          marked.length +
          " message(s). Are you sure?";
        if (window.confirm(confMsg)) {
          var transaction = dt.db.transaction(["notes"], "readwrite");
          var store = transaction.objectStore("notes");
          for (i = 0; i < marked.length; i++) {
            var request = store.delete(parseInt(marked[i]));
          }
        }
        break;
      case "export":
        var outArray = [];
        for (i = 0; i < marked.length; i++) {
          var transaction = dt.db.transaction(["notes"], "readwrite");
          var store = transaction.objectStore("notes");
          var request = store.get(parseInt(marked[i]));
          request.onsuccess = function (e) {
            outArray.push(e.target.result);
          };
          request.onerror = function () {
            var rubbish = "";
          };
          var rubbish = "";
        }
        var rubbish = "";
        window.alert(JSON.stringify(outArray));
        var rubbish = "";
        break;
    }
    //	dt.getNote();
  };

  dt.importNotes = function importNotes() {
    //        console.log("dt.importNotes");
    //        console.trace();
    var importVal = prompt("Paste the exported note text here.");
    importVal = importVal.trim();
    var importObjs = JSON.parse(importVal);
    var transaction = dt.db.transaction(["notes"], "readwrite");
    var store = transaction.objectStore("notes");
    var req;
    if (store) {
      req = store.add(importObjs);
      req.onsuccess = function (ev) {
        window.alert("Notes imported.");
      };
      req.onerror = function (ev) {
        window.alert("Note import failed.");
      };
      //		}
    }
  };
  /* Function: restoreNotes
   * Restore notes from a backup file.
   */
  dt.restoreNotes = function restoreNotes() {
    //        console.log("dt.restoreNotes");
    //        console.trace();
    // noteBackupRestoreHtml
    dt.showTool("#noteBackupRestoreHtml");
    document.querySelector("input[type=file]").value = "";
  };
  function loadFile() {
    //        console.log("loadFile");
    //        console.trace();
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var importVal = reader.result;
      importVal = importVal.trim();
      var importObjs = JSON.parse(importVal);
      var keys = Object.keys(importObjs);
      for (let value of keys) {
        var thisNote = importObjs[value];
        var transaction = dt.db.transaction(["notes"], "readwrite");
        var store = transaction.objectStore("notes");
        var req;
        thisKey = parseInt(value);
        req = store.put(thisNote, thisKey);
        req.onerror = function (ev) {
          window.alert("Note import failed.");
        };
        req.onsuccess = function (ev) {
          //            console.log("Note id "+value+" restored");
          //            console.trace();
          $("#noteBackupRestoreHtml")
            .closest(".ui-dialog-content")
            .dialog("close");
        };
      }
    };
    reader.readAsText(file);
  }
  dt.delNote = function delNote(key) {
    //        console.log("dt.delNote");
    //        console.trace();
    var confMsg = "You are about to delete this message. Are you sure?";
    if (window.confirm(confMsg)) {
      var transaction = dt.db.transaction(["notes"], "readwrite");
      var store = transaction.objectStore("notes");
      var request = store.delete(key);
    }
    dt.showPopUp(key);
    dt.getNote();
  };

  dt.expNote = function expNote(existkey) {
    //        console.log("dt.expNote");
    //        console.trace();
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var request = store.get(existkey);
    request.onsuccess = function () {
      alert(JSON.stringify(request.result));
    };
    request.onerror = function () {
      window.alert("problem getting note to edit");
    };
  };

  dt.editNote = function editNote(existkey) {
    //        console.log("dt.editNote");
    //        console.trace();
    var transaction = dt.db.transaction(["notes"], "readwrite");
    var store = transaction.objectStore("notes");
    var request = store.get(existkey);
    request.onsuccess = function () {
      document.querySelector("#addNoteHtml").innerHTML = "";
      document.querySelector("#dt_noteEdit").innerHTML = dt.noteEntry;
      dt.showTool("#dt_noteEdit");
      document.querySelector("#key").value = existkey;
      dt.populateTownList(document.querySelector("#noteTown"));
      if (request.result["town"] !== "null") {
        document.querySelector(
          '#noteTown option[value="' + request.result["town"] + '"]'
        ).selected = true;
      }
      if (request.result["coords"] !== "") {
        document.querySelector("#noteCoords").value = request.result["coords"];
      }
      if (request.result["title"] !== "") {
        document.querySelector("#noteTitle").value = request.result["title"];
      }
      if (request.result["body"] !== "") {
        document.querySelector("#noteBody").textContent =
          request.result["body"];
      }
      if (request.result["tags"].join(",") !== "") {
        document.querySelector("#noteTags").value =
          request.result["tags"].join(",");
      }
      document
        .querySelector("#dt_storeNote")
        .setAttribute("onclick", "dt.updateNote(" + existkey + ")");
    };
    request.onerror = function () {
      window.alert("problem getting note to edit");
    };
  };

  dt.updateNote = function updateNote(key) {
    //        console.log("dt.updateNote");
    //        console.trace();
    var town = $("#noteTown").val();
    var coords = document.querySelector("#noteCoords").value;
    if (coords !== null) {
      var coordArray = coords.split("|");
      var x = coordArray[0];
      var y = coordArray[1];
    } else {
      var x = "";
      var y = "";
    }
    var title = document.querySelector("#noteTitle").value;
    var body = document.querySelector("#noteBody").value;
    var tags = document.querySelector("#noteTags").value.split(",");
    for (i = 0; i < tags.length; i++) {
      tags[i] = tags[i].trim();
    }
    //    console.log("About to update " + title);
    var transaction = dt.db.transaction(["notes"], "readwrite");
    var store = transaction.objectStore("notes");
    if (town == null) {
      town = "";
    }
    var note = {
      town: town,
      coords: coords,
      x: x,
      y: y,
      title: title,
      body: body,
      created: new Date(),
      tags: tags,
    };

    //Perform the update
    var request = store.put(note, key);
    request.onerror = function (e) {
      alert("Sorry, couldn't update the note for some reason.");
      //        console.log("Error", e.target.error.name);
      //        console.dir(e.target);
      //some type of error handler
    };

    request.onsuccess = function (e) {
      //        console.log("Woot! Note updated");
      dt.showPopUp(key);
      $("#dt_noteEdit").closest(".ui-dialog-content").dialog("close");
    };
  };

  dt.showPopUp = function showPopUp(pid) {
    //        console.log("dt.showPopUp");
    //        console.trace();
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var request = store.get(pid);
    request.onsuccess = function (e) {
      var newDiv = document.querySelector("#dt_noteDisplay");
      if (request.result) {
        if (request.result["town"] != "") {
          town = dt[PlayerId].towns[request.result["town"]].name;
        } else {
          town = "None";
        }

        var tbl =
          '<table border="1" style="margin-bottom: 10px; margin-right:10px">\n\
<tr><td class="formlabel">Town</td><td>' +
          town +
          '</td></tr>\n\
<tr><td class="formlabel">Map Coordinates</td><td>' +
          request.result["coords"] +
          '</td></tr>\n\
<tr><td class="formlabel">Body</td><td>' +
          request.result["body"] +
          '</td></tr>\n\
<tr><td class="formlabel">Tags</td><td>' +
          request.result["tags"] +
          '</td></tr>\n\
</table><input type="button" onclick="dt.editNote(' +
          pid +
          ')" name="dt_editNote" value="Edit"><input type="button" onclick="dt.delNote(' +
          pid +
          ')" name="dt_delNote" value="Del"><input type="button" value="Exp" name="dt_expNote" onclick="dt.expNote(' +
          pid +
          ')">';
        newDiv.innerHTML = "<h4>" + request.result["title"] + "</h4>" + tbl;
      } else {
        document.querySelector("#dt_noteDisplay").innerHTML = "Note Deleted.";
      }
      $(document).ready(function () {
        dt.showTool("#dt_noteDisplay");
        var rubbish = "";
      });
    };
    request.onerror = function (e) {
      window.alert("Couldnt display the note.");
    };
  };

  dt.hidePopUp = function hidePopUp() {
    //        console.log("dt.hidePopUp");
    //        console.trace();
    document.querySelector("#dt_noteDisplay").innerHTML = "";
    document.querySelector("#dt_noteDisplay").setAttribute("class", "nosee");
  };
  dt.backupNotes2 = function backupNotes2() {
    //        console.log("dt.backupNotes2");
    //        console.trace();
    if (!dt.db) return;

    db = dt.db;
    var fileName = document.querySelector("#backupfName").value;
    if (fileName === "") {
      var fileName = "notesBackup.json";
    }
    var allNotesObj = {};
    var allNotes = [];
    var objectStore = dt.db
      .transaction(["notes"], "readonly")
      .objectStore("notes");
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        allNotesObj[cursor.primaryKey] = cursor.value;
        allNotes.push(cursor.value);
        cursor.continue();
      } else {
        //            console.log(fileName);
        //            console.log(allNotes);
        dt.saveNotes(allNotesObj, fileName);
      }
    };
  };

  dt.saveNotes = function (data, filename) {
    //        console.log("dt.saveNotes");
    //        console.trace();
    if (!data) {
      //            console.error('Notes Backup: No data');
      return;
    }
    //        console.log(filename);
    if (!filename) filename = "notesBackup.json";

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], { type: "text/json" }),
      e = document.createEvent("MouseEvents"),
      a = document.createElement("a");

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    e.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.dispatchEvent(e);
  };
  dt.backupNotes = function backupNotes() {
    //        console.log("dt.backupNotes");
    //        console.trace();
    if (!dt.db) return;
    db = dt.db;
    var link = $("#exportLink");
    //Ok, so we begin by creating the root object:
    var data = {};
    for (var i = 0; i < db.objectStoreNames.length; i++) {
      //thanks to http://msdn.microsoft.com/en-us/magazine/gg723713.aspx

      var objectstore = db.objectStoreNames[i];
      //        console.log(objectstore);

      var transaction = db.transaction([objectstore], "readonly");
      var content = [];

      transaction.onerror = function (event) {
        // Don't forget to handle errors!
        //            console.dir(event);
      };

      var handleResult = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          content.push({ key: cursor.key, value: cursor.value });
          cursor.continue();
        }
      };

      var objectStore = transaction.objectStore(objectstore);
      objectStore.openCursor().onsuccess = handleResult;
    }

    var dataToStore = content;
    //serialize it
    dt.serializedData = JSON.stringify(dataToStore);
    dt.showTool("#downloadform");
  };

  function onDownload(dataToDownload) {
    //        console.log("onDownload");
    //        console.trace();
    document.location =
      "data:Application/octet-stream," + encodeURIComponent(dataToDownload);
  }

  dt.noteDisplay =
    '<div class="nosee" id="displayNoteTbl" width="100%"><table border="1"  width="100%"><colgroup><tr><col width="50%"><col width="50%"></tr></colgroup><tr><td class="formlabel">Town</td><td class="formlabel">Map Coordinates</td></tr><tr><td></td><td></td></tr><tr><td class="formlabel" colspan="2">Title</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr><tr><td class="formlabel" colspan="2">Tags</td></tr><tr><td colspan="2"></td></tr></table><input type="button" value="Edit" name="dt_editNote" onclick="dt.editNote(id)"><input type="button" value="Del" name="dt_delNote" onclick="dt.delNote(id)"><input type="button" value="Exp" name="dt_expNote" onclick="dt.expNote(id)"></div>';
  // The floating div
  dt.floating1 =
    '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span id="ui-dialog-title-3" class="ui-dialog-title">durcTools2 Notes</span><a class="ui-dialog-titlebar-close ui-corner-all" href="#" role="button"></a></div><div id="dt_window1_content" class="dt_notes oddeven ui-dialog-content ui-widget-content" style="overflow-x: hidden; overflow-y: scroll; white-space: normal; word-wrap: break-word; height: 330px; width: auto; min-height: 0px;" scrolltop="0" scrollleft="0"></div><div class="ui-resizable-handle ui-resizable-n"></div><div class="ui-resizable-handle ui-resizable-e"></div><div class="ui-resizable-handle ui-resizable-s"></div><div class="ui-resizable-handle ui-resizable-w"></div><div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se ui-icon-grip-diagonal-se" style="z-index: 1001;"></div><div class="ui-resizable-handle ui-resizable-sw" style="z-index: 1002;"></div><div class="ui-resizable-handle ui-resizable-ne" style="z-index: 1003;"></div><div class="ui-resizable-handle ui-resizable-nw" style="z-index: 1004;"></div>';

  // The table to display the summary of notes
  dt.noteTbl =
    '<div id="noteTable"><div id="noteListTblHdr"><table border="1"><colgroup><col width="165px"><col width="90px"><col width="70px"></colgroup><thead><tr><th>Title</th><th>Updated</th><th>&nbsp;</th></tr></thead><tbody></tbody></table></div><div id="noteListtbl"><table width="100%" border="1" id="noteListTbl"><colgroup><col width="165px"><col width="90px"><col width="70px"></colgroup><tbody id="noteListBody"></tbody></table></div></div>';
  // The form for adding a new note
  dt.noteEntry =
    '<div id="newNoteTbl" width="100%"><input id="key" type="hidden"><table border="1"  width="100%"><tr><td class="formlabel">Town (optional)</td></tr><tr><td><select name="noteTown" id="noteTown"><option value="" selected>Select a town</option></select></td></tr><tr><td class="formlabel">Map Coordinates (optional)</td></tr><tr><td><input class="myinp" type="text" class="form-control" id="noteCoords" placeholder="xxx|(-)yyy"></td></tr><tr><td class="formlabel">Title</td></tr><tr><td><input class="myinp" type="text" class="form-control" required="" id="noteTitle"></td></tr><tr><td class="formlabel">Body</td></tr><tr><td><textarea class="form-control" required="" id="noteBody" cols="35" rows="10"></textarea></td></tr><tr><td class="formlabel">Tags (comma separated - optional)</td></tr><tr><td><input class="myinp" type="text" class="form-control" id="noteTags"></td></tr></table><input id="dt_storeNote" type="button" value="Save" name="dt_storeNote" onclick="dt.storeNote()"></div>';

  dt.noteSearchResTbl =
    '<div id="resultsTable"><h4>Note Search Results Table</h4><div><table border="1" id="noteListTbl"><colgroup><col width="35px"><col width="165px"><col width="90px"><col width="70px"></colgroup><thead><tr><th>Sel</th><th>Title</th><th>Town</th><th>Coords</th></tr></thead><tbody></tbody></table></div><p>With selected: <select name="actionType" id="actionType"><option value="delete">Delete</option></select>\t<input type="button" value="Go" name="dt_processChecked" onclick="dt.processSelected()"></div>';
};
