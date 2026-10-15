/* File: military8.js
 * Defines the methods for collecting and displaying the data about military 
 * units belonging to a player.
 */
dtmilitary = function(){
    dt.milErrors = [];
    dt.military = {
        colourArmies: function(){
            var tbls = document.querySelectorAll(".info>fieldset form > table:nth-child(7)");
    //        console.log(tbls);
            var dist = this.getArmyTravelDist();
            for(i=0;i<tbls.length;i++){
                var thisArmy = tbls[i];
    //            console.log(thisArmy);
                var speed = thisArmy.querySelectorAll("td")[3].getAttribute("data");
    //            console.log(dist,speed);
                var dur = (dist/speed) * 60 * 60;
    //            console.log("secs: ",dur);
                if(dur !==Infinity){
                    var t = thisArmy.querySelectorAll("td")[3];
                    t.className = "yellowB";
                    // Between 12hrs and 24hrs travel time
                    if (dur < 43200) {
                        // Less than 12hrs travel time
                        t.className = "greenB";
                    }
                    if (dur > 86400) {
                        // Over 12hrs travel time
                        t.className = "redB";
                    }
                }
            }
        },
        
        getArmyTravelDist: function(){
            var tX = document.getElementsByName("SendX")[0].value;
            var tY = document.getElementsByName("SendY")[0].value;
            var sX =  dt[PlayerId].towns[CurrentTown].x;
            var sY =  dt[PlayerId].towns[CurrentTown].y;
    //  console.log(tX,tY,sX,sY);
            var dist = Math.hypot(tX-sX,tY-sY);
    //  console.log(dist);
            return dist;
        },
        

        getMilProdSchedule: function (xhr, event) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var infodivs = d.querySelectorAll("div.info");
            var yr = new Date(event.timeStamp).getUTCFullYear();
            var bldgs = this.milProdWorker(infodivs, yr);
            this.updateMilProdStatus(bldgs);
        },
        milProdWorker: function (infodivs, yr) {
            var numInfos = infodivs.length;
            var bldgs = {};
            if (numInfos > 1) {
                var dParts = this.gameTimeToParts();
                var thisBldg = {"id": null, "name": null, "items": {}};
                thisBldg.id = "8";
                thisBldg.name = "Barracks";
                bldgs[thisBldg.id] = thisBldg;
                var rows = infodivs[1].getElementsByTagName("tr");
                for (var r = 0; r < rows.length; r++) {
                    var tds = rows[r].getElementsByTagName("td");
                    var item = {"id": null, "name": null, "complete": null};
                    if (tds.length > 0) {
                        item.id = tds[0].textContent;
                        item.name = tds[1].textContent;
                        item.complete = tds[6].textContent;
                        item.remain = tds[7].textContent;
                        var remainParts = this.remainingParts(item.remain);
                        var doneUTC = new Date(Date.UTC(dParts.year, dParts.month, dParts.date, dParts.hour, dParts.mins, dParts.secs));
                        doneUTC.setSeconds(doneUTC.getSeconds() + parseInt(remainParts.secs));
                        doneUTC.setMinutes(doneUTC.getMinutes() + parseInt(remainParts.mins));
                        doneUTC.setHours(doneUTC.getHours() + parseInt(remainParts.hrs));
                        doneUTC.setDate(doneUTC.getDate() + parseInt(remainParts.days));
                        var doneLOCAL = new Date();
                        doneLOCAL.setSeconds(doneLOCAL.getSeconds() + parseInt(remainParts.secs));
                        doneLOCAL.setMinutes(doneLOCAL.getMinutes() + parseInt(remainParts.mins));
                        doneLOCAL.setHours(doneLOCAL.getHours() + parseInt(remainParts.hrs));
                        doneLOCAL.setDate(doneLOCAL.getDate() + parseInt(remainParts.days));
                        item.doneLocal = doneLOCAL;
                        item.doneUTC = doneUTC.toISOString();
                        bldgs[thisBldg.id].items[item.id] = item;
                        bldgs[thisBldg.id].lastItem = item.id;
                    }
                }
            }
            return bldgs;
        },
        updateMilProdStatus: function (bldgs) {
            var townProd = dt[PlayerId].towns[CurrentTown].prod.mil;
            var k = Object.keys(bldgs);
            for (i = 0; i < k.length; i++) {
                if (!townProd[k[i]]) {
                    townProd[k[i]] = {};
                }
                var items = bldgs[k[i]].items;
                iks = Object.keys(bldgs[k[i]].items);
                switch (iks.length) {
                    case 0:
                        townProd[k[i]].Building = bldgs[k[i]].name;
                        townProd[k[i]].endsAt = "Empty";
                        townProd[k[i]].item = "";
                        townProd[k[i]].doneUTC = "";
                        townProd[k[i]].doneLocal = "";
                        break;
                    case 1:
                        townProd[k[i]].Building = bldgs[k[i]].name;
                        townProd[k[i]].endsAt = bldgs[k[i]].items[iks[0]].complete
                        townProd[k[i]].item = bldgs[k[i]].items[iks[0]].name;
                        townProd[k[i]].doneUTC = bldgs[k[i]].items[iks[0]].doneUTC;
                        townProd[k[i]].doneLocal = bldgs[k[i]].items[iks[0]].doneLocal;
                        break;
                    default:
                        townProd[k[i]].Building = bldgs[k[i]].name;
                        townProd[k[i]].endsAt = bldgs[k[i]].items[bldgs[k[i]].lastItem].complete;
                        townProd[k[i]].item = bldgs[k[i]].items[bldgs[k[i]].lastItem].name;
                        townProd[k[i]].doneUTC = bldgs[k[i]].items[bldgs[k[i]].lastItem].doneUTC;
                        townProd[k[i]].doneLocal = bldgs[k[i]].items[bldgs[k[i]].lastItem].doneLocal;
                        break;
                }
            }
            var key = CurrentTown + ':prod';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].prod));
            var rubbish = '';
        },
        remainingParts: function (remain) {
            var togo = {"days": 0, "hrs": 0, "mins": 0, "secs": 0};
            var rParts = remain.split(" ");
            var numParts = rParts.length;
            for (i = 0; i < numParts; i++) {
                if (~rParts[i].indexOf("s")) {
                    // Seconds
                    togo.secs = rParts[i].replace("s", "");
                }
                if (~rParts[i].indexOf("m")) {
                    // Minutes
                    togo.mins = rParts[i].replace("m", "");
                }
                if (~rParts[i].indexOf("h")) {
                    // Hours
                    togo.hrs = rParts[i].replace("h", "");
                }
                if (~rParts[i].indexOf("d")) {
                    // Days
                    togo.days = rParts[i].replace("d", "");
                }
            }
            return togo;
        },
        gameTimeToParts: function (gameTime) {
            var dParts = {};
            var gameTime = document.getElementById('serverDate').textContent;
            // Days of week
            var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            // Short month names
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            // Split the gameTime into the constituent parts
            var sDateParts = gameTime.split(' ');
            // Check to see if the game time has a day name and proceed accordingly
            if (weekDays.indexOf(sDateParts[0]) > -1) {
                if (sDateParts[3] == "") {
                    var sTimeParts = sDateParts[4].split(':');
                    var day = weekDays.indexOf(sDateParts[0]);
                    dParts.date = parseInt(sDateParts[1]);
                    dParts.month = months.indexOf(sDateParts[2]);
                } else {
                    var sTimeParts = sDateParts[3].split(':');
                    var day = weekDays.indexOf(sDateParts[0]);
                    dParts.date = parseInt(sDateParts[1]);
                    dParts.month = months.indexOf(sDateParts[2]);
                }
            } else {
                var sTimeParts = sDateParts[2].split(':');
                dParts.date = parseInt(sDateParts[0]);
                dParts.month = months.indexOf(sDateParts[1]);
            }
            dParts.hour = parseInt(sTimeParts[0]);
            dParts.mins = parseInt(sTimeParts[1]);
            dParts.secs = parseInt(sTimeParts[2]);
            // Get the current year
            var now = new Date;
            dParts.year = now.getUTCFullYear();
            return dParts;
        },
        /* Method: addOccupyMax
        * Adds a button to each of the army feldsets on the Military Orders page. 
        * This button will call setOccupyMax when clicked.
        */
        addOccupyMax: function () {
            var fsets = document.getElementsByName('holdFieldset');
            for (var i = 0; i < fsets.length; i++) {
                var cell = fsets.item(i).querySelector('td');
                if (!cell.querySelector(".maxb")) {
                    dt.addElement2(cell, 'input', ['onclick', 'class', 'value', 'type'], ['dt.military.setOccupyMax(' + i + ')', 'maxb', 'Max', 'button']);
                }
            }
        },
        /* Method: setOccupyMax
        * Sets the occupy time to the maximum for the current army.
        * 
        * Parameter:
        * fset - integer. The index in the NodeList of fieldsets for the current army.
        */
        setOccupyMax: function (fset) {
            var fsets = document.getElementsByName('holdFieldset');
            var cell = fsets.item(fset).querySelector('td');
            var days = cell.querySelector('select[name="holdDays"');
            var hours = cell.querySelector('select[name="holdHours"');
            var mins = cell.querySelector('select[name="holdMins"');
            mins.options.selectedIndex = 59;
            hours.options.selectedIndex = 23;
            days.options.selectedIndex = 14;
        },
        /* Function: procUid
        * Process a uid to get a unit type and level
        * 
        * Parameter:
        * uid - string. The unit id in the format i=5|72
        * 
        * Returns: array. The level and type in an array [uLvl, uType]
        */
        procUid: function (uid) {
            bits = uid.split('|');
            var unitId = parseInt(bits[1]);
            var uType = "Tournament";
            // Level
            if (dt.unitLvls.t1.indexOf(unitId) > -1) {
                var uLvl = 't1';
            } else {
                if (dt.unitLvls.t2.indexOf(unitId) > -1) {
                    var uLvl = 't2';
                } else {
                    var uLvl = 'tournament';
                }
            }
            // Type
            if (dt.unitTypes.spear.indexOf(unitId) > -1) {
                var uType = 'spear';
            }
            if (dt.unitTypes.inf.indexOf(unitId) > -1) {
                var uType = 'inf';
            }
            if (dt.unitTypes.bow.indexOf(unitId) > -1) {
                var uType = 'range';
            }
            if (dt.unitTypes.cav.indexOf(unitId) > -1) {
                var uType = 'cav';
            }
            if (dt.unitTypes.siege.indexOf(unitId) > -1) {
                var uType = 'siege';
            }
            return [uLvl, uType];
        },
        /* Function: scanMilOverview
        * Gather troop information from the Military Overview page.
        * The data is all contained in fieldsets and the legend of the fieldset defines 
        * what type of info is in there.
        */
        scanMilOverview: function (xhr) {
            dt.milErrors = [];
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            // log the scan start
            var msg = "Scanning Military Overview - " + dt[PlayerId].towns[CurrentTown].name;
            dt.logEntry(msg);
            d.innerHTML = xhr.responseText;
            var infodiv = d.getElementsByClassName("info")[0];
            dt.military.clearCurrentTownUnits();
            var units = dt[PlayerId].towns[CurrentTown].mil.units;
            // Get all the fieldsets
            var fieldsets = docfrag.querySelectorAll("div.info fieldset");
            var numFieldsets = fieldsets.length;
            // Step through the fieldsets
            for (var i = 0; i < numFieldsets; i++) {
                var thisFieldset = fieldsets[i];
                var legendtag = thisFieldset.querySelector("first-child");
                // Identify what type of content this fieldset has by getting the textContent of the first child
                var tc = thisFieldset.children[0].textContent;
                if (tc.indexOf('Commanders') !== -1) {
                    fType = "Commanders";
                }
                if (tc.indexOf('Army:') !== -1) {
                    fType = "Armies";
                }
                if (tc.indexOf('Your Unit Pool') !== -1) {
                    fType = "Your Unit Pool";
                }
                if (tc === 'Unit Pool') {
                    fType = "Unit Pool";
                }
                if (tc.indexOf('TOTALS') !== -1) {
                    fType = "Totals";
                }
                switch (fType) {
                    case "Commanders":
                        var rows = thisFieldset.querySelectorAll('tr');
                        var numrows = rows.length;
                        for (var j = 1; j < numrows; j++) {
                            var tds = rows[j].querySelectorAll('td');
                            if (tds.length > 1) {
                                var thisCmdr = this.idleCommander(tds);
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cid] = thisCmdr;
                            }
                        }
                        break;
                    case "Armies":
                        var rows = thisFieldset.querySelectorAll('tr');
                        var numrows = rows.length;
                        for (var j = 0; j < numrows; j++) {
                            var tds = rows[j].querySelectorAll('td');
                            if (tds.length !== 0) {
                                // Not the title row
                                if (tds[1].textContent !== '') {
                                    // Commander unit
                                    var armyCmdr = this.armyCommander(tds, tc);
                                    dt[PlayerId].towns[CurrentTown].mil.commanders[cid] = armyCmdr;
                                } else {
                                    var troops = this.availUnits(units, tds, tc, "armies");
                                    var rubbish = '';
                                }
                            }
                        }
                        break;
                    case "Your Unit Pool":
                        var rows = thisFieldset.querySelectorAll('tr');
                        var numrows = rows.length;
                        for (var j = 1; j < numrows; j++) {
                            var tds = rows[j].querySelectorAll('td');
                            if (tds.length !== 0) {
                                // Not the title row
                                if (tds[1].textContent !== '') {
                                    // Commander unit
                                    var armyCmdr = this.armyCommander(tds, tc);
                                    dt[PlayerId].towns[CurrentTown].mil.commanders[cid] = armyCmdr;
                                } else {
                                    var troops = this.availUnits(units, tds, tc, "pool");
                                    var rubbish = '';
                                }
                            }
                        }
                        break;
                    case "Unit Pool":
                        var rows = thisFieldset.querySelectorAll('tr');
                        var numrows = rows.length;
                        for (var j = 0; j < numrows; j++) {
                            var tds = rows[j].querySelectorAll('td');
                            if (tds.length !== 0) {
                                // Not the title row
                                var troops = this.trainUnits(units, tds, tc, "build");
                                var rubbish = '';
                            }
                        }
                        break;
                    case "Totals":
                        var rows = thisFieldset.querySelectorAll('tr');
                        var numrows = rows.length;
                        for (var j = 1; j < numrows; j++) {
                            var tds = rows[j].querySelectorAll('td');
                            if (tds.length > 1) {
                                var summ = dt[PlayerId].towns[CurrentTown].mil.summary;
                                var atkdefScores = this.atkdef(summ, tds);
                                dt[PlayerId].towns[CurrentTown].mil.summary = atkdefScores;
                            }
                        }
                        break;
                }
            }
    // Store the current town data
            var key = CurrentTown + ':mil';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].mil));
            // log the scan end
            var msg = dt[PlayerId].towns[CurrentTown].name + " - Military Overview scan finished.";
            dt.logEntry(msg);
            this.showTroopSum();
            if (dt.milErrors.length > 0) {
                dt.sendReport = false;
                dt.errorArea = "Military Overview";
                var allEs = dt.milErrors.join("\n");
                dt.addElement(durcTools2, "div", ["id", "class", "title"], ["scanError", "nosee", "DurcTools2 error reporting"]);
                var errDiv = document.getElementById("scanError");
                errDiv.innerHTML = '<p>There has been an error scanning the unit data. If you are willing to send error data to help solve this problem:<p><ol><li>Copy the contents of the box below (Ctrl + A then Ctrl + C).</li><li>Click the Send Report button to indicate you are willing to send a report.</li><li>When the mail page opens after closing this dialog, click in the body area and press Ctrl + V to paste the error information.</li></ol></p><p>When you close this dialog the new igm page will load if you said to send a report.</p><textarea id="js-copytextarea"></textarea>';
                var textA = document.getElementById("js-copytextarea");
                textA.textContent = allEs;
                $("#scanError").dialog({
                    "width": 400,
                    "height": "auto",
                    buttons: {
                        "Send Report": function () {
                            dt.sendReport = true;
                        }
                    },
                    resizeStop: function (event, ui) {
                        me.width = ui.size.width;
                        me.height = ui.size.height;
                        me.pos = ui.position;
                        dt[PlayerId].toolSettings[id] = me;
                        var key = PlayerId + ':toolSettings';
                        locStorage.setItem(key, JSON.stringify(dt[PlayerId].toolSettings));
                    },
                    dragStop: function (event, ui) {
                        me.pos = ui.position;
                        dt[PlayerId].toolSettings[id] = me;
                        var key = PlayerId + ':toolSettings';
                        locStorage.setItem(key, JSON.stringify(dt[PlayerId].toolSettings));
                    },
                    close: function (event, ui) {
                        if (dt.sendReport === true) {
                            dt.errorReporter.sendReport(dt.errorArea);
                        }
                    }
                });
            }
        },
        /* Function: atkdef
        * Parse the TOTALS fieldset to extract the attack and defense values for this town
        * 
        * @param {type} summ
        * tds - node list. All the td elements in this table row
        * @returns {dt.military.atkdef.scores}
        */
        atkdef: function (summ, tds) {
    //        console.trace();
    //        console.profile("atkdef");
            try {
                var scores = {"atk": 0, "spearDef": 0, "infDef": 0, "bowDef": 0, "cavDef": 0};
                scores.atk = parseInt(dt.replaceAll(tds[4].textContent,",",""));
                scores.spearDef = parseInt(dt.replaceAll(tds[5].textContent,",",""));
                scores.bowDef = parseInt(dt.replaceAll(tds[6].textContent,",",""));
                scores.infDef = parseInt(dt.replaceAll(tds[7].textContent,",",""));
                scores.cavDef = parseInt(dt.replaceAll(tds[8].textContent,",",""));
                var rubbish = '';
    //        console.profileEnd("atkdef");
                return scores;
            } catch (e) {
                var errRow = {"td0": tds[0].innerHTML, "td1": tds[1].innerHTML, "td2": tds[2].innerHTML, "td3": tds[3].innerHTML, "td4": tds[4].innerHTML, "td5": tds[5].innerHTML, "td6": tds[6].innerHTML, "td7": tds[7].innerHTML, "td8": tds[8].innerHTML};
                dt.milErrors.push(e.name + "\n" + e.message + "\n\n" + JSON.stringify(errRow));
            }
            ;
        },
        /* Function: armyCommander
        * Parse a table row that holds info about a commander currently assigned to an army.
        * 
        * @param {type} tds
        * @param {type} tc
        * @returns {cmdr}
        */
        armyCommander: function (tds, tc) {
    //        console.trace();
            // Set up a try/catch to handle any unforseen errors and report them
            try {
                // Get the id of the commander
                cid = tds[1].querySelector("a").getAttribute("href").split('/')[3];
                // Create the object for this commander
                if (!dt[PlayerId].towns[CurrentTown].mil.commanders.hasOwnProperty(cid)) {
                    dt[PlayerId].towns[CurrentTown].mil.commanders[cid] = new dt.commander("", 0, 0, {}, {});
                }
                cmdr = dt[PlayerId].towns[CurrentTown].mil.commanders[cid];
                // Process the td elements to get the relevant data for the commander
                cmdr.uName = tds[3].textContent;
                cmdr.uType = tds[2].textContent.split("]")[0].replace("[", "");
                cmdr.cid = tds[1].querySelector("a").getAttribute("href").split('/')[3];
                t = tds[1].querySelector("a").innerHTML.split('(');
                cmdr.cName = tds[1].textContent.trim();
                cmdr.army = tc.split(':')[1].trim();
                cmdr.lvlType = this.procUid(cmdr.uType);
                var rubbish = "";
                return (cmdr);
            } catch (e) {
                var errRow = {"td0": tds[0].innerHTML, "td1": tds[1].innerHTML, "td2": tds[2].innerHTML, "td3": tds[3].innerHTML, "td4": tds[4].innerHTML, "td5": tds[5].innerHTML, "td6": tds[6].innerHTML, "td7": tds[7].innerHTML, "td8": tds[8].innerHTML, "td9": tds[9].innerHTML};
                dt.milErrors.push(e.name + "\n" + e.message + "\n\n" + JSON.stringify(errRow));
            }
            ;
        },
        /* Function: idleCommander
        * Parse a table row holding info about an unassigned commander
        * 
        * @param {type} tds
        * @returns {cmdr}
        */
        idleCommander: function (tds) {
    //        console.trace();
            // Get the id of the commander
            try {
                cid = tds[1].querySelector("a").getAttribute("href").split('/')[3];
                // Create the object for this commander
                if (!dt[PlayerId].towns[CurrentTown].mil.commanders.hasOwnProperty(cid)) {
                    dt[PlayerId].towns[CurrentTown].mil.commanders[cid] = new dt.commander("", 0, 0, {}, {});
                }
                cmdr = dt[PlayerId].towns[CurrentTown].mil.commanders[cid];
                // Process the td elements to get the relevant data for the commander
                cmdr.uName = tds[2].textContent.split("]")[1];
                cmdr.uType = tds[2].textContent.split("]")[0].replace("[", "");
                cmdr.cid = cid;
                tmp = tds[1].querySelector("a").innerHTML;
                splitat = tmp.lastIndexOf("(");
                var t = [tmp.substr(0, tmp.lastIndexOf("(")), tmp.substr(tmp.lastIndexOf("("), tmp.length - 1)];
                cmdr.name = t[0].trim();
                cmdr.lvl = t[1].trim().substring(1, (t[1].length) - 1).replace("L", "");
                cmdr.lvlType = dt.military.procUid(cmdr.uType);
                var rubbish = "";
                return (cmdr);
            } catch (e) {
                var errRow = {"td0": tds[0].innerHTML, "td1": tds[1].innerHTML, "td2": tds[2].innerHTML};
                dt.milErrors.push(e.name + "\n" + e.message + "\n\n" + JSON.stringify(errRow));
            }
            ;
        },
        /* Function: availUnits
        * Parse table rows that hold info on units that are currently either in the 
        * pool or assigned to an army
        * 
        * @param {type} units
        * @param {type} tds
        * @param {type} tc
        * @param {type} whereat
        * @returns {dt.military.availUnits.unt}
        */
        availUnits: function (units, tds, tc, whereat) {
    //        console.trace();
            try {
                var unt = {"uType": null, "uName": null, "uQty": 0, "uBuild": 0, "army": null};
                unt.uName = tds[3].textContent.trim();
                unt.uType = tds[2].textContent.split("]")[0].replace("[", "");
                unt.uQty = parseInt(dt.replaceAll(tds[4].textContent,",",""));
                unt.army = tc.split(':')[1];
                unt.lvlType = this.procUid(unt.uType);
                var rubbish = "";
                if (whereat == "armies") {
                    if (unt.lvlType[1] !== "Tournament") {
                        units[unt.lvlType[1]][unt.lvlType[0]].armies = units[unt.lvlType[1]][unt.lvlType[0]].armies + unt.uQty;
                    } else {
                        units[unt.lvlType[0]].armies = units[unt.lvlType[0]].armies + unt.uQty;
                    }
                }
                if (whereat == "pool") {
                    if (unt.lvlType[1] !== "Tournament") {

                        units[unt.lvlType[1]][unt.lvlType[0]].pool = units[unt.lvlType[1]][unt.lvlType[0]].pool + unt.uQty;
                    } else {
                        units[unt.lvlType[0]].pool = units[unt.lvlType[0]].pool + unt.uQty;
                    }

                }
                if (whereat == "build") {
                    if (unt.lvlType[1] !== "Tournament") {
                        units[unt.lvlType[1]][unt.lvlType[0]].pool = units[unt.lvlType[1]][unt.lvlType[0]].build + unt.uQty;
                    } else {
                        units[unt.lvlType[0]].build = units[unt.lvlType[0]].build + unt.uQty;
                    }

                }
                return (unt);
            } catch (e) {
    //            var untVals = "unt=>";
                var untVals = "";
                var k = Object.keys(unt);
                for (i = 0; i < k.length; i++) {
                    untVals = untVals + "[ " + k[i] + "->" + unt[k[i]] + " ] ";
                }
                var errRow = {"td0": tds[0].innerHTML, "td1": tds[1].innerHTML, "td2": tds[2].innerHTML, "td3": tds[3].innerHTML, "td4": tds[4].innerHTML, "td5": tds[5].innerHTML, "td6": tds[6].innerHTML, "td7": tds[7].innerHTML, "td8": tds[8].innerHTML, "td9": tds[9].innerHTML, "unt": untVals};
                dt.milErrors.push(e.name + "\n" + e.message + "\n\n" + JSON.stringify(errRow));
            }
            ;
        },
        /* Function: trainUnits
        * Parse a table row that holds info on how many of a unit are being built
        * 
        * @param {type} units
        * @param {type} tds
        * @param {type} tc
        * @param {type} whereat
        * @returns {dt.military.trainUnits.unt}
        */
        trainUnits: function (units, tds, tc, whereat) {
    //        console.trace();
            try {
                if(tds[0].innerHTML !=="You do not have any units in the Unit Pool."){
                    var unt = {"uType": null, "uName": null, "uQty": 0, "uBuild": 0, "army": null};
                    
                    unt.uName = tds[0].textContent.split("]")[1].trim();
                    unt.uType = tds[0].textContent.split("]")[0].replace("[", "");
                    unt.uQty = parseInt(dt.replaceAll(tds[3].textContent,",",""));
                    unt.army = "";
                    unt.lvlType = this.procUid(unt.uType);
                    var rubbish = "";
                    if (whereat == "build") {
                        if (unt.lvlType[1] !== "Tournament") {
                        units[unt.lvlType[1]][unt.lvlType[0]].build = units[unt.lvlType[1]][unt.lvlType[0]].build + unt.uQty;
                    }else{
                            units[unt.lvlType[0]].build = units[unt.lvlType[0]].build + unt.uQty;
                        }
                    }
                    return (unt);
                }
            } catch (e) {
                let eRow = [];
                for (let i = 0; i < tds.length; i++) {
                eRow[i] = tds[i].innerHTML;
                }
                let errRow = eRow.join("#|#");
    //            var errRow = {"td0": tds[0].innerHTML, "td1": tds[1].innerHTML, "td2": tds[2].innerHTML, "td3": tds[3].innerHTML, "td4": tds[4].innerHTML};
                dt.milErrors.push(e.name + "\n" + e.message + "\n\n" + errRow);
                if(PlayerId === 345832 || PlayerId === 374103 || PlayerId === 279547){
                    window.alert(dt.milErrors.join("\n\n********************\n"));
                }
            }
            ;
        },
        /* Function: clearCurrentTownUnits
        * Set the number of each unit in the current town to 0.
        * 
        * @returns {undefined}
        */
        clearCurrentTownUnits: function () {
    //        console.trace();
            // Clear the troops assigned to armies
            var milUnits = dt[PlayerId].towns[CurrentTown].mil.units;
            milUnits.cav.t1.armies = 0;
            milUnits.cav.t2.armies = 0;
            milUnits.inf.t1.armies = 0;
            milUnits.inf.t2.armies = 0;
            milUnits.spear.t1.armies = 0;
            milUnits.spear.t2.armies = 0;
            milUnits.range.t1.armies = 0;
            milUnits.range.t2.armies = 0;
            milUnits.siege.t1.armies = 0;
            milUnits.siege.t2.armies = 0;
            // Clear the troops being built
            milUnits.cav.t1.build = 0;
            milUnits.cav.t2.build = 0;
            milUnits.inf.t1.build = 0;
            milUnits.inf.t2.build = 0;
            milUnits.spear.t1.build = 0;
            milUnits.spear.t2.build = 0;
            milUnits.range.t1.build = 0;
            milUnits.range.t2.build = 0;
            milUnits.siege.t1.build = 0;
            milUnits.siege.t2.build = 0;
            // Clear the troops in the pool
            milUnits.cav.t1.pool = 0;
            milUnits.cav.t2.pool = 0;
            milUnits.inf.t1.pool = 0;
            milUnits.inf.t2.pool = 0;
            milUnits.spear.t1.pool = 0;
            milUnits.spear.t2.pool = 0;
            milUnits.range.t1.pool = 0;
            milUnits.range.t2.pool = 0;
            milUnits.siege.t1.pool = 0;
            milUnits.siege.t2.pool = 0;
        },
        /* Function: dispTroopSum
        * Set the flag for the MilSumm popup to true and show the table
        * @returns {undefined}
        */
        dispTroopSum: function () {
    //        console.trace();
            dt.popupStates.MilSumm = true;
            dt.military.showTroopSum();
        },
        /* Function: showTroopSum
        * Build the table holding the town(s) troop summary.
        */
        showTroopSum: function () {
    //        console.trace();
    // Get the towns object from dt
            var towns = dt[PlayerId].towns;
    // Get the list of town ids
            var townList = towns.list;
    // Create an object to hold the totals of each unit (pool,building) in all towns.
            var tots = {spear: {t1: {pool: 0, build: 0}, t2: {pool: 0, build: 0}}, inf: {t1: {pool: 0, build: 0}, t2: {pool: 0, build: 0}}, range: {t1: {pool: 0, build: 0}, t2: {pool: 0, build: 0}}, cav: {t1: {pool: 0, build: 0}, t2: {pool: 0, build: 0}}, siege: {t1: {pool: 0, build: 0}, t2: {pool: 0, build: 0}},tournament:{pool: 0, build: 0}};
    // Create object to hold the atk/def scores for all towns.
            var defScores = {};
            var tpNums = {};
            townList.sort();
            var numTowns = towns.numTowns;
            // Build the objects for the tables
            for (var i = 0; i < numTowns; i++) {
                defScores[townList[i]] = towns[townList[i]].mil.summary;
                tpNums[townList[i]] = towns[townList[i]].mil.units;
            }
            var outputArea = document.getElementById("dt_milSumDisplay");
    // Get the two tables
            var tbl1 = document.getElementById('defSummTbl');
            var tbl2 = document.getElementById('milSummTbl');
            var body1 = tbl1.getElementsByTagName('tbody').item(0);
            var body2 = tbl2.getElementsByTagName('tbody').item(0);
            // Remove all rows
            while (body1.firstChild) {
                body1.removeChild(body1.firstChild);
            }
            while (body2.firstChild) {
                body2.removeChild(body2.firstChild);
            }
            var logrecordArray = [];
            // Populate the atk/def table
            try {
                for (var i = 0; i < numTowns; i++) {
                    logRecord = "";
    // Populate the atk/def scores table
                    var row = body1.insertRow(-1);
                    var cell = row.insertCell(0);
                    cell.innerHTML = dt[PlayerId].towns[townList[i]].name;
                    cell = row.insertCell(1);
                    cell.innerHTML = defScores[townList[i]].atk;
    //                logRecord = logRecord + "||" + " atk: " + defScores[townList[i]].atk;
                    cell = row.insertCell(2);
                    cell.innerHTML = defScores[townList[i]].spearDef;
    //                logRecord = logRecord + "||" + " spDef: " + thisTown.mil.summary.spearDef;
                    cell = row.insertCell(3);
                    cell.innerHTML = defScores[townList[i]].infDef;
    //                logRecord = logRecord + "||" + " infDef: " + thisTown.mil.summary.infDef;
                    cell = row.insertCell(4);
                    cell.innerHTML = defScores[townList[i]].bowDef;
    //                logRecord = logRecord + "||" + " bowDef: " + thisTown.mil.summary.bowDef;
                    cell = row.insertCell(5);
                    cell.innerHTML = defScores[townList[i]].cavDef;
    //                logRecord = logRecord + "||" + " cavDef: " + thisTown.mil.summary.cavDef;
                }
            } catch (e) {
                window.alert("Error in Attack/Defense score table generation: " + e);
            }
            // Populate troop numbers table
            try {
                for (var i = 0; i < numTowns; i++) {

                    var row = body2.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var thisTown = towns[townList[i]];
                    var tps = towns[townList[i]].mil.units;
                    cell1.innerHTML = dt[PlayerId].towns[townList[i]].name;
                    logRecord = logRecord + "||" + dt[PlayerId].towns[townList[i]].name;
                    cell = row.insertCell(1);
                    cell.innerHTML = (tps.spear.t1.pool + tps.spear.t1.armies) + '</br>' + tps.spear.t1.build;
                    tots.spear.t1.pool += (tps.spear.t1.pool + tps.spear.t1.armies);
                    tots.spear.t1.build += tps.spear.t1.build;
                    cell = row.insertCell(2);
                    cell.innerHTML = (tps.spear.t2.pool + tps.spear.t2.armies) + '</br>' + tps.spear.t2.build;
                    tots.spear.t2.pool += (tps.spear.t2.pool + tps.spear.t2.armies);
                    tots.spear.t2.build += tps.spear.t2.build;
                    cell = row.insertCell(3);
                    cell.innerHTML = (tps.inf.t1.pool + tps.inf.t1.armies) + '</br>' + tps.inf.t1.build;
                    tots.inf.t1.pool += (tps.inf.t1.pool + tps.inf.t1.armies);
                    tots.inf.t1.build += tps.inf.t1.build;
                    cell = row.insertCell(4);
                    cell.innerHTML = (tps.inf.t2.pool + tps.inf.t2.armies) + '</br>' + tps.inf.t2.build;
                    tots.inf.t2.pool += (tps.inf.t2.pool + tps.inf.t2.armies);
                    tots.inf.t2.build += tps.inf.t2.build;
                    cell = row.insertCell(5);
                    cell.innerHTML = (tps.range.t1.pool + tps.range.t1.armies) + '</br>' + tps.range.t1.build;
                    tots.range.t1.pool += (tps.range.t1.pool + tps.range.t1.armies);
                    tots.range.t1.build += tps.range.t1.build;
                    cell = row.insertCell(6);
                    cell.innerHTML = (tps.range.t2.pool + tps.range.t2.armies) + '</br>' + tps.range.t2.build;
                    tots.range.t2.pool += (tps.range.t2.pool + tps.range.t2.armies);
                    tots.range.t2.build += tps.range.t2.build;
                    cell = row.insertCell(7);
                    cell.innerHTML = (tps.cav.t1.pool + tps.cav.t1.armies) + '</br>' + tps.cav.t1.build;
                    tots.cav.t1.pool += (tps.cav.t1.pool + tps.cav.t1.armies);
                    tots.cav.t1.build += tps.cav.t1.build;
                    cell = row.insertCell(8);
                    cell.innerHTML = (tps.cav.t2.pool + tps.cav.t2.armies) + '</br>' + tps.cav.t2.build;
                    tots.cav.t2.pool += (tps.cav.t2.pool + tps.cav.t2.armies);
                    tots.cav.t2.build += tps.cav.t2.build;
                    cell = row.insertCell(9);
                    cell.innerHTML = (tps.siege.t1.pool + tps.siege.t1.armies) + '</br>' + tps.siege.t1.build;
                    tots.siege.t1.pool += (tps.siege.t1.pool + tps.siege.t1.armies);
                    tots.siege.t1.build += tps.siege.t1.build;
                    cell = row.insertCell(10);
                    cell.innerHTML = (tps.siege.t2.pool + tps.siege.t2.armies) + '</br>' + tps.siege.t2.build;
                    tots.siege.t2.pool += (tps.siege.t2.pool + tps.siege.t2.armies);
                    tots.siege.t2.build += tps.siege.t2.build;
                    cell = row.insertCell(11);
                    cell.innerHTML = (tps.tournament.pool + tps.tournament.armies);
                    tots.tournament.pool += (tps.tournament.pool + tps.tournament.armies);

                }
                var row1 = body2.insertRow(-1);
                var cell1 = row1.insertCell(0);
                cell1.innerHTML = "Totals";
                cell = row1.insertCell(1);
                cell.innerHTML = tots.spear.t1.pool + '</br>' + tots.spear.t1.build;
                cell = row1.insertCell(2);
                cell.innerHTML = tots.spear.t2.pool + '</br>' + tots.spear.t2.build;
                cell = row1.insertCell(3);
                cell.innerHTML = tots.inf.t1.pool + '</br>' + tots.inf.t1.build;
                cell = row1.insertCell(4);
                cell.innerHTML = tots.inf.t2.pool + '</br>' + tots.inf.t2.build;
                cell = row1.insertCell(5);
                cell.innerHTML = tots.range.t1.pool + '</br>' + tots.range.t1.build;
                cell = row1.insertCell(6);
                cell.innerHTML = tots.range.t2.pool + '</br>' + tots.range.t2.build;
                cell = row1.insertCell(7);
                cell.innerHTML = tots.cav.t1.pool + '</br>' + tots.cav.t1.build;
                cell = row1.insertCell(8);
                cell.innerHTML = tots.cav.t2.pool + '</br>' + tots.cav.t2.build;
                cell = row1.insertCell(9);
                cell.innerHTML = tots.siege.t1.pool + '</br>' + tots.siege.t1.build;
                cell = row1.insertCell(10);
                cell.innerHTML = tots.siege.t2.pool + '</br>' + tots.siege.t2.build;
                cell = row1.insertCell(11);
                cell.innerHTML = tots.tournament.pool;
                
            } catch (e) {
                window.alert("Error in totals row generation: " + e);
            }
            var rubbish = '';
            if (dt.popupStates.MilSumm) {
                dt.showTool('#troopSummHtml', "MilSumm");
            }
    //        window.alert(logrecordArray.join("\n"));
    //console.dirxml(logrecordArray);
        },
        /* Method: scanMilMov
        * Scan the military movement page
        */
        scanMilMov: function () {
    //        console.trace();
            var msg = "Military Movement scan - not available.";
            dt.logEntry(msg);
        },
        /* Method: scanMilArmy
        * Scan the Military Armies page
        */
        scanMilArmy: function () {
    //        console.trace();
            var msg = "Military Army scan - not available.";
            dt.logEntry(msg);
        },
        /* Method: scanMilCommander
        * Scan the Military Commander page
        */
        scanMilCommander: function () {
    //        console.trace();
            var msg = "Scanning Military Commanders.";
            dt.logEntry(msg);
    // Get the divs that hold all the info for commanders in this town
            var cmdrDivs = document.querySelectorAll("div.ui-accordion-content.ui-helper-reset.ui-widget-content.ui-corner-bottom");
            var rubbish = '';
    // Step through the returned divs
            for (i = 0; i < cmdrDivs.length; i++) {
                var currentCmdrDiv = cmdrDivs[i];
                var equipDiv = cmdrDivs[i].querySelector('div div div');
                // currentcmdrDiv div div form.odd input.hidden
                var cmdrId = currentCmdrDiv.querySelector('div div form.odd input.hidden').value;
                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self = {atk: 0, spDef: 0, rgDef: 0, infDef: 0, cavDef: 0, cbtSurv: 0, health: 0, heal: 1, escAssas: 0};
                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div = {spAtk: 0, rgAtk: 0, infAtk: 0, cavAtk: 0, spDef: 0, rgDef: 0, infDef: 0, cavDef: 0, move: 0, carry: 0, magic: 0};
                var tds = currentCmdrDiv.querySelectorAll('div div fieldset table td');
                for (j = 1; j < tds.length; j = j + 1) {
                    var thisTd = tds[j];
                    if (thisTd.childElementCount > 1) {
                        var skillName = thisTd.querySelector('div.skillName').textContent;
                        var skillTxt = thisTd.querySelector('div.skillBarTxt').textContent;
                        var skillArray = skillTxt.split('/');
                        skillArray[0] = parseInt(skillArray[0]);
                        switch (skillName) {
                            case 'Heroism':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.atk = skillArray[0];
                                break;
                            case 'Defy Death':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.cbtSurv = skillArray[0];
                                break;
                            case 'Break Spear Wall':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.spDef = skillArray[0];
                                break;
                            case 'Cover':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.rgDef = skillArray[0];
                                break;
                            case 'Sword Mastery':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.infDef = skillArray[0];
                                break;
                            case 'Avoid Charge':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.cavDef = skillArray[0];
                                break;
                            case 'Vitality':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.health = skillArray[0];
                                break;
                                // Accelerated Healing
                            case 'Accelerated Healing':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.heal = skillArray[0];
                                break;
                            case 'Uncanny Sense':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].self.escAssas = skillArray[0];
                                break;
                            case 'Close Quarter Penetration':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.spAtk = skillArray[0];
                                break;
                            case 'Agile Defence':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.spDef = skillArray[0];
                                break;
                            case 'Forced March':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.move = skillArray[0];
                                break;
                            case 'Concentrated Fire':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.rgAtk = skillArray[0];
                                break;
                            case 'Tortoise Formation':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.rgDef = skillArray[0];
                                break;
                            case 'Military Logistics':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.carry = skillArray[0];
                                break;
                            case 'Bloodlust':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.infAtk = skillArray[0];
                                break;
                            case 'Interlocked Shields':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.infDef = skillArray[0];
                                break;
                            case 'Force Of Will':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.magic = skillArray[0];
                                break;
                            case 'Charge':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.cavAtk = skillArray[0];
                                break;
                            case 'Square Formation':
                                dt[PlayerId].towns[CurrentTown].mil.commanders[cmdrId].div.cavDef = skillArray[0];
                                break;
    // {spAtk:0,rgAtk:0,infAtk:0,cavAtk:0,spDef:0,rgDef:0,infDef:0,cavDef:0,move:0,carry:0,magic:0};
                        }
                    }
                }
                var key = CurrentTown + ':mil';
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].mil));
            }
            var msg = "Military Commanders scan finished.";
            dt.logEntry(msg);
        },

        milOrders: function () {
            var tmp = document.querySelector("#locationInner tr:nth-child(4) td:nth-child(3)").textContent;
            if(tmp == ""){
                dt.showTool("#terrainCbtModsHtml");
            }else{
            var cTerrType = document.querySelector("#locationInner tr:nth-child(4) td:nth-child(3)").textContent.replace(/[\[\]]/g, '');
    //        console.log(cTerrType);
            var thisMods = dt.cbtTerrainMods[cTerrType];
            var trs = document.querySelectorAll("#thisSqMods tbody tr");
            var tds = trs[0].querySelectorAll("td");
            tds[1].textContent = thisMods.atk.spear;
            tds[2].textContent = thisMods.atk.inf;
            tds[3].textContent = thisMods.atk.range;
            tds[4].textContent = thisMods.atk.cav;
            tds = trs[1].querySelectorAll("td");
            tds[1].textContent = thisMods.def.spear;
            tds[2].textContent = thisMods.def.inf;
            tds[3].textContent = thisMods.def.range;
            tds[4].textContent = thisMods.def.cav;

            dt.showTool("#sqMods");
            }
        },
        milReports:function(){
            // #locationInner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3) > input:nth-child(2)
            var x = document.querySelector('input[name="SendX"]').value;
            var y = document.querySelector('input[name="SendY"]').value;
            var t = "["+x+"|"+y+"]";
            var rubbish="";
            dt.msgFind(t);
        },
        milOrdersSetup: function () {
            if (!document.getElementById('showCbtModsBut')) {
                // Add the 'Show Cbt Mods' button to the headLinks menu bar
                var parent = document.querySelector(".headLinks");
                dt.addElement2(parent, 'input', ['id', 'value', 'class', 'type', 'onclick', 'style'], ['showCbtModsBut', 'Show Cbt Mods', 'see menuBut', 'button', 'dt.military.milOrders()', 'float: right;']);
                dt.addElement2(parent, 'input', ['id', 'value', 'class', 'type', 'onclick', 'style'], ['showReports', 'Show Relevant Mails', 'see menuBut', 'button', 'dt.military.milReports()', 'float: right;']);
                if (!dt.mdb) {
                    dt.mailsearch();
                }
        }
    
        },
        armyOutbound: function() {
        var btn = $(this);
            var aData = $(this).parents('form').serializeArray();
            console.log(aData);
            var tgt = [aData[0].value,aData[1].value];
            var src = [dt[PlayerId].towns[CurrentTown].x,dt[PlayerId].towns[CurrentTown].y];
            if(aData[3].value == '6'){
                var h = dt.hypot(src,tgt);
                if(h < 6){
                    var thisA = {"aid":btn[0].dataset.aid,"spd":btn[0].dataset.spd,"src":dt[PlayerId].towns[CurrentTown].name,"tgt":tgt[0] + "|" + tgt[1],"endsAt":0};
                    console.log("Possible sov army outbound");
        //              console.log(btn[0].dataset.aid,btn[0].dataset.spd);
                    var currentTS = Date.now();
                    thisA.endsAt = currentTS + (((h/thisA.spd)*3600)*1000);
                    console.log("army due to arrive at: ",new Date(thisA.endsAt));
                    var aid = thisA.aid;
                    thisA.eType = "army";
        //              dt[PlayerId].towns[CurrentTown].sov.armies[aid] = thisA;
        //              console.log(dt[PlayerId].towns[CurrentTown].sov.armies);
                    dt.sov.storeSovEvents(thisA);
                }
            }

        return false;
        },

        milOrdersPage: function(){
        if(!dt[PlayerId].towns[CurrentTown].sov.armies){
            dt[PlayerId].towns[CurrentTown].sov.armies = {};
        }
        var sendBtns =  document.querySelectorAll(".info td.right>input.short");
        for(b = 0;b < sendBtns.length;b++){
            var aForm = $(sendBtns[b]).parents('form');
        //      console.log(aForm);
            var aid = aForm[0].querySelector("input[name='ArmyID']").value;
            var aSpd = aForm[0].querySelectorAll("table")[3].querySelector("td:nth-child(4)").getAttribute("data");
        //      console.log(aid,aSpd);
            sendBtns[b].setAttribute("data-aid",aid);
            sendBtns[b].setAttribute("data-spd",aSpd);
            sendBtns[b].addEventListener("click", this.armyOutbound, false);
        }
        },
    };
    dt.errorReporter = {
        sendReport: function (errorArea) {
            var currentHash = location.hash;
            if (currentHash !== '#/Communication/ComposeMail') {
                location.hash = '#/Communication/ComposeMail';
                this.messageFill(errorArea);
            }
        },
        messageFill: function (errorArea) {
            $(document).ready(function () {
                timeoutID = window.setTimeout(function (errorArea) {
                    var inpName = document.querySelector('#finderPlayerName');
                    var inpId = document.querySelector('#finderPlayerID');
                    var msgSubj = document.querySelector('#MsgSubject');
                    msgSubj.value = "Error scanning " + dt.errorArea;
                    inpName.value = "Tensmoor";
                    inpId.value = "279547";
                    dt.errorArea = null;
                    // Display a pop-up with instructions 
                    window.alert("Click in the message body and press Ctrl + V to paste the error information.");
                }, 2000);
            });
        }
    };
}