dtdiplo = function(){
    dt.diplomatic = {
        getDiploProdSchedule: function (xhr, event) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var infodivs = d.querySelectorAll("div.info");
            var yr = new Date(event.timeStamp).getUTCFullYear();
            var bldgs = this.diploProdWorker(infodivs, yr);
            this.updateDiploProdStatus(bldgs);
        },
        diploProdWorker: function (infodivs, yr) {
            var numInfos = infodivs.length;
            var bldgs = {};
            if (numInfos > 1) {
                var dParts = this.gameTimeToParts();
                var thisBldg = {"id": null, "name": null, "items": {}};
                thisBldg.id = "8";
                thisBldg.name = "Consulate";
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
        updateDiploProdStatus: function (bldgs) {
            var townProd = dt[PlayerId].towns[CurrentTown].prod.diplo;
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

        orders: function (x, y) {
            if (x !== undefined) {
                unitTable = document.querySelector(".info > table:nth-child(1) > tbody:nth-child(2)");
                // Get the rows in the table
                var trs = unitTable.querySelectorAll("tr");
                coords = [x, y];
                townCoords = [dt[PlayerId].towns[CurrentTown].x, dt[PlayerId].towns[CurrentTown].y];
                var dist = dt.hypot(townCoords, coords);
                // Loop throught each of the rows
                for (var r = 1; r < trs.length; r++) {
                    // Get the td elements in the row
                    var tds = trs[r].querySelectorAll("td");
                    // Get the data attribute from the span element in the first td
                    var thisUnit = {};
                    thisUnit.Id = tds[0].querySelector("span").getAttribute("data").split("|")[1];
    //                console.log(thisUnit.Id);
                    thisUnit.speed = Items[5][thisUnit.Id][8];
                    thisUnit.time = parseInt((dist / thisUnit.speed) * 60 * 60);
    //                console.log(thisUnit.time);
    //                console.log(SecToText(thisUnit.time));
                    tds[1].setAttribute("title", "Travel time: " + SecToText(thisUnit.time));
                    /* Colour coding
                    * < 12hrs - green. thisUnit.time < 43200
                    * 12-24hrs - amber. 
                    * > 24hrs - red. thisUnit.time > 86400
                    */
                    tds[1].className = "yellowB";
                    if (thisUnit.time < 43200) {
                        tds[1].className = "greenB";
                    }
                    if (thisUnit.time > 86400) {
                        tds[1].className = "redB";
                    }
                    var rubbish = "";
                }
            }
        },
        showThiefIdentifier: function () {
                    dt.showTool("#whoThievedMe");
                    },
        thiefIdentifier: function(){            
            var units = ["Human T1", "Human T2", "Dwarf T1", "Dwarf T2", "Elf T1", "Elf T2", "Orc T1", "Orc T2"];
            var unitNames = ["Burglar", "Master Thief", "Footpad", "Halfling", "Rogue", "DarkElf", "Goblin Cutpurse", "Plunderer"];
            carries = [59, 64, 57, 60, 50, 54, 71, 76];
            var out = document.getElementById("culprits");
            var out2 = document.getElementById("thiefscores");
            var items = document.querySelectorAll("#taken input[name='losses[]']");
            var taken = 0;
            for (i = 0; i < items.length; i++) {
                taken += Number(items[i].value);
            }
            document.querySelector("#totalTaken").textContent = taken;

            while (out.firstChild) {
                out.removeChild(out.firstChild);
            }
            while (out2.firstChild) {
                out2.removeChild(out2.firstChild);
            }
            
            var matched = 0;
            for (i = 0; i < carries.length; i++) {
                thisScore = units[i] + "(" + carries[i] + ") - " + unitNames[i] + " (" + taken / carries[i] + ")";
                var p = document.createElement("p");
                p.textContent = thisScore;
                out2.appendChild(p);
                
                if (Number.isInteger(taken / carries[i])) {
                    matched++;
                    culprit = units[i] + " - " + unitNames[i] + " (" + taken / carries[i] + ")";
                    var p = document.createElement("p");
                    p.textContent = culprit;
                    out.appendChild(p);
                }
            }
            if (matched === 0) {
                var p = document.createElement("p");
                p.textContent = "No possible matches. Please check your inputs and try again.";
                out.appendChild(p);

            }

        }
    };

    dt.scanDiploMov = function () {
    //	funcTracker.push(['scanDiploMov - NOT DEFINED',new Date()]);
    };
    dt.scanDiploOverview = function (xhr) {
    //	funcTracker.push(['scanDiploOverview - NOT DEFINED',new Date()]);
        dt.diploErrors = [];
        if (!docfrag) {
            var docfrag = document.createDocumentFragment();
            var d = document.createElement("div");
            docfrag.appendChild(d);
        }
        // log the scan start
        var msg = "Scanning Diplomatic Overview - " + dt[PlayerId].towns[CurrentTown].name;
        dt.logEntry(msg);
        d.innerHTML = xhr.responseText;
        var infodiv = d.getElementsByClassName("info")[0];
    //    dt.diplo.clearCurrentTownUnits();
        var units = dt[PlayerId].towns[CurrentTown].diplo.units;
        // Get all the fieldsets
        var fieldsets = docfrag.querySelectorAll("div.info fieldset");
        var numFieldsets = fieldsets.length;
        var trs = fieldsets[0].querySelectorAll("table tbody tr");
        if(trs[1].childElementCount !== 1){
            for(var r = 1;r<trs.length;r++){
                var tds = trs[r].querySelectorAll("td");
        //        console.log(r, tds);
                var uidString = tds[0].textContent;
                var uid = tds[0].textContent.split("]")[0].split("|")[1];
                var unit = Items[5][uid];
                if(unit[5] !== ""){
                    var uType = unit[5].split(" ");
                    if(uType.length>1){
                        if(uType[0] == "Basic"){
                            var lvl = "t1";
        //                console.log(uType[1],"t1");
                        }else{
                            var lvl = "t2";
        //                console.log(uType[1],"t2");
                        }
                        var uT = uType[1].toLowerCase();
                    }else{
                        uT = "messenger";
                    }
                }
        //        console.log(unit);
                var qty = tds[1].textContent;
        //        console.log(uT,lvl,qty);
        if(uT!="messenger"){
                dt[PlayerId].towns[CurrentTown].diplo[uT][lvl]=Number(qty);
        }else{
            dt[PlayerId].towns[CurrentTown].diplo[uT]=Number(qty);
        }
                var key = CurrentTown + ":diplo";
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].diplo));
            }
        }
    //    console.log(dt[PlayerId].towns[CurrentTown].diplo);
    };

    dt.dispTroopSum = function () {
    //        console.trace();
            dt.popupStates.DiploSumm = true;
            dt.showDiploSum();
        }

    dt.showDiploSum = function () {
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
                tpNums[townList[i]] = towns[townList[i]].diplo;
            }
    //        var outputArea = document.getElementById("dt_milSumDisplay");
    // Get the two tables
            var tbl2 = document.getElementById('diploSummTbl');
            var body2 = tbl2.getElementsByTagName('tbody').item(0);
            // Remove all rows
            while (body2.firstChild) {
                body2.removeChild(body2.firstChild);
            }
            var logrecordArray = [];
            // Populate unit numbers table
    //        try {
                for (var i = 0; i < numTowns; i++) {

                    var row = body2.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var thisTown = towns[townList[i]];
                    var tps = towns[townList[i]].diplo;
                    cell1.innerHTML = dt[PlayerId].towns[townList[i]].name;
    //                logRecord = logRecord + "||" + dt[PlayerId].towns[townList[i]].name;
                    cell = row.insertCell(1);
                    cell.textContent = tps.scout.t1;
    //                tots.spear.t1.pool += (tps.spear.t1.pool + tps.spear.t1.armies);
    //                tots.spear.t1.build += tps.spear.t1.build;
                    cell = row.insertCell(2);
                    cell.textContent = tps.scout.t2;
    //                tots.spear.t2.pool += (tps.spear.t2.pool + tps.spear.t2.armies);
    //                tots.spear.t2.build += tps.spear.t2.build;
                    cell = row.insertCell(3);
                    cell.textContent = tps.spy.t1;
    //                tots.inf.t1.pool += (tps.inf.t1.pool + tps.inf.t1.armies);
    //                tots.inf.t1.build += tps.inf.t1.build;
                    cell = row.insertCell(4);
                    cell.textContent = tps.spy.t2;
    //                tots.inf.t2.pool += (tps.inf.t2.pool + tps.inf.t2.armies);
    //                tots.inf.t2.build += tps.inf.t2.build;
                    cell = row.insertCell(5);
                    cell.textContent = tps.thief.t1;
    //                tots.range.t1.pool += (tps.range.t1.pool + tps.range.t1.armies);
    //                tots.range.t1.build += tps.range.t1.build;
                    cell = row.insertCell(6);
                    cell.textContent = tps.thief.t2;
    //                tots.range.t2.pool += (tps.range.t2.pool + tps.range.t2.armies);
    //                tots.range.t2.build += tps.range.t2.build;
                    cell = row.insertCell(7);
                    cell.textContent = tps.saboteur.t1;
    //                tots.cav.t1.pool += (tps.cav.t1.pool + tps.cav.t1.armies);
    //                tots.cav.t1.build += tps.cav.t1.build;
                    cell = row.insertCell(8);
                    cell.textContent = tps.saboteur.t2;
    //                tots.cav.t2.pool += (tps.cav.t2.pool + tps.cav.t2.armies);
    //                tots.cav.t2.build += tps.cav.t2.build;
                    cell = row.insertCell(9);
                    cell.textContent = tps.assassin.t1;
    //                tots.siege.t1.pool += (tps.siege.t1.pool + tps.siege.t1.armies);
    //                tots.siege.t1.build += tps.siege.t1.build;
                    cell = row.insertCell(10);
                    cell.textContent = tps.assassin.t1;
    //                tots.siege.t2.pool += (tps.siege.t2.pool + tps.siege.t2.armies);
    //                tots.siege.t2.build += tps.siege.t2.build;
                    cell = row.insertCell(11);
                    cell.textContent = tps.messenger;
    //                tots.tournament.pool += (tps.tournament.pool + tps.tournament.armies);

                }
    //            var row1 = body2.insertRow(-1);
    //            var cell1 = row1.insertCell(0);
    //            cell1.innerHTML = "Totals";
    //            cell = row1.insertCell(1);
    //            cell.innerHTML = tots.spear.t1.pool + '</br>' + tots.spear.t1.build;
    //            cell = row1.insertCell(2);
    //            cell.innerHTML = tots.spear.t2.pool + '</br>' + tots.spear.t2.build;
    //            cell = row1.insertCell(3);
    //            cell.innerHTML = tots.inf.t1.pool + '</br>' + tots.inf.t1.build;
    //            cell = row1.insertCell(4);
    //            cell.innerHTML = tots.inf.t2.pool + '</br>' + tots.inf.t2.build;
    //            cell = row1.insertCell(5);
    //            cell.innerHTML = tots.range.t1.pool + '</br>' + tots.range.t1.build;
    //            cell = row1.insertCell(6);
    //            cell.innerHTML = tots.range.t2.pool + '</br>' + tots.range.t2.build;
    //            cell = row1.insertCell(7);
    //            cell.innerHTML = tots.cav.t1.pool + '</br>' + tots.cav.t1.build;
    //            cell = row1.insertCell(8);
    cell.textContent = tps.saboteur.t2;
    //                tots.cav.t2.pool += (tps.cav.t2.pool + tps.cav.t2.armies);
    //                tots.cav.t2.build += tps.cav.t2.build;
                    cell = row.insertCell(9);
                    cell.textContent = tps.assassin.t1;
    //                tots.siege.t1.pool += (tps.siege.t1.pool + tps.siege.t1.armies);
    //                tots.siege.t1.build += tps.siege.t1.build;
                    cell = row.insertCell(10);
                    cell.textContent = tps.assassin.t1;
    //                tots.siege.t2.pool += (tps.siege.t2.pool + tps.siege.t2.armies);
    //                tots.siege.t2.build += tps.siege.t2.build;
                    cell = row.insertCell(11);
                    cell.textContent = tps.messenger;
    //                tots.tournament.pool += (tps.tournament.pool + tps.tournament.armies);

                }
    //            var row1 = body2.insertRow(-1);
    //            var cell1 = row1.insertCell(0);
    //            cell1.innerHTML = "Totals";
    //            cell = row1.insertCell(1);
    //            cell.innerHTML = tots.spear.t1.pool + '</br>' + tots.spear.t1.build;
    //            cell = row1.insertCell(2);
    //            cell.innerHTML = tots.spear.t2.pool + '</br>' + tots.spear.t2.build;
    //            cell = row1.insertCell(3);
    //            cell.innerHTML = tots.inf.t1.pool + '</br>' + tots.inf.t1.build;
    //            cell = row1.insertCell(4);
    //            cell.innerHTML = tots.inf.t2.pool + '</br>' + tots.inf.t2.build;
    //            cell = row1.insertCell(5);
    //            cell.innerHTML = tots.range.t1.pool + '</br>' + tots.range.t1.build;
    //            cell = row1.insertCell(6);
    //            cell.innerHTML = tots.range.t2.pool + '</br>' + tots.range.t2.build;
    //            cell = row1.insertCell(7);
    //            cell.innerHTML = tots.cav.t1.pool + '</br>' + tots.cav.t1.build;
    //            cell = row1.insertCell(8);
    //            cell.innerHTML = tots.cav.t2.pool + '</br>' + tots.cav.t2.build;
    //            cell = row1.insertCell(9);
    //            cell.innerHTML = tots.siege.t1.pool + '</br>' + tots.siege.t1.build;
    //            cell = row1.insertCell(10);
    //            cell.innerHTML = tots.siege.t2.pool + '</br>' + tots.siege.t2.build;
    //            cell = row1.insertCell(11);
    //            cell.innerHTML = tots.tournament.pool;
                
    //        } catch (e) {
    //            window.alert("Error in totals row generation: " + e);
    //        }
            var rubbish = '';
    //        if (dt.popupStates.MilSumm) {
                dt.showTool('#diploSummHtml');
    //        }
    //        window.alert(logrecordArray.join("\n"));
    //console.dirxml(logrecordArray);
        };
}