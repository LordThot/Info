/* File: inventory9.js
 */

/* Class: invent
 * The functions to deal with capturing and displaying information relating to 
 * inventories.
 * 
 * TODO:
 * - Write routines for getting info from the hub inventory pages.
 * - 
 */
dtinvent = function(){
    dt.invent = {
        baseExtract: function(cells,cells2){
            const baseResNames = ["Gold", "Wood", "Clay", "Iron","Stone", "Food", "Mana", "Research"];
            let baseRes = {
                "Gold": {"id": "i=4|1", "held": 0, "rate": 0, "classes": " resIcon ico-gold"},
                "Wood": {"id": "i=1|1", "held": 0, "rate": 0, "classes": " resIcon ico-wood"},
                "Clay": {"id": "i=1|2", "held": 0, "rate": 0, "classes": " resIcon ico-clay"},
                "Iron": {"id": "i=1|3", "held": 0, "rate": 0, "classes": " resIcon ico-iron"},
                "Stone": {"id": "i=1|4", "held": 0, "rate": 0, "classes": " resIcon ico-stone"},
                "Food": {"id": "i=1|5", "held": 0, "rate": 0, "classes": " resIcon ico-food"},
                "Mana": {"id": "i=2|1", "held": 0, "rate": 0, "classes": " resIcon ico-mana"},
                "Research": {"id": "i=2|2", "held": 0, "rate": 0, "classes": " resIcon ico-research"},
            };
            // Loop through cells
            for(let i=0; i<cells.length; i=i+2){
                var ind = i/2;
                var held = cells[i].getAttribute('data');
                var rate = cells[i].getAttribute('inc');
                var id = cells[i+1].innerText;
                var sid = id.substring(2, id.length-1);
                propName = dt.invent.objSearch2(baseRes, 'id', sid);
                baseRes[propName].held = held;
                baseRes[propName].rate = rate;
                baseRes[propName].makeing = cells2[ind].getAttribute('data');
            }
            // Return the populated advRes obj
            return baseRes;

        },
        /* Function: advExtract
        *  Extracts all the adv res data from two rows of TDs
        */
        advExtract: function(cells,cells2){
            const advResNames = ["Horse", "Livestock", "Beer", "Book","Spear", "Sword", "Bow", "Saddle", "Leather Armour", "Chainmail", "Plate Armour", "Siege Block"];
            var advRes =  {
                "Horse": {"id": "i=3|1", "held": 0, "rate": 0, "classes": " resIcon ico-horses"},
                "Livestock": {"id": "i=3|2", "held": 0, "rate": 0, "classes": " resIcon ico-livestock"},
                "Beer": {"id": "i=3|12", "held": 0, "rate": 0, "classes": " resIcon ico-beer"},
                "Book": {"id": "i=3|7", "held": 0, "rate": 0, "classes": " resIcon ico-books"},
                "Spear": {"id": "i=3|5", "held": 0, "rate": 0, "classes": " resIcon ico-spears"},
                "Sword": {"id": "i=3|3", "held": 0, "rate": 0, "classes": " resIcon ico-swords"},
                "Bow": {"id": "i=3|4", "held": 0, "rate": 0, "classes": " resIcon ico-bows"},
                "Saddle": {"id": "i=3|6", "held": 0, "rate": 0, "classes": " resIcon ico-saddles"},
                "Leather Armour": {"id": "i=3|8", "held": 0, "rate": 0, "classes": " resIcon ico-leather"},
                "Chainmail": {"id": "i=3|9", "held": 0, "rate": 0, "classes": " resIcon ico-chainmail"},
                "Plate Armour": {"id": "i=3|10", "held": 0, "rate": 0, "classes": " resIcon ico-plate"},
                "Siege Block": {"id": "i=3|11", "held": 0, "rate": 0, "classes": " resIcon ico-siege"}
            };
            // Loop through cells
            for(let i=0; i<cells.length; i=i+2){
                var ind = i/2;
                var held = cells[i].getAttribute('data');
                var rate = cells[i].getAttribute('inc');
                var id = cells[i+1].innerText;
                var sid = id.substring(2, id.length-1);
                propName = dt.invent.objSearch2(advRes, 'id', sid);
                advRes[propName].held = held;
                advRes[propName].rate = rate;
                advRes[propName].makeing = cells2[ind].getAttribute('data');
            }
            // Return the populated advRes obj
            return advRes;
        },
        /* Function: getBaseRes2
        * Get updated base res for the current town.
        * Gets the data from the display at the top of the page
        */
        getBaseRes2: function () {
            var basetrs = document.querySelectorAll("#tbRes tr");
            var yr = currentResTick.getUTCFullYear();
            var townId = CurrentTown;
            
            var cells = basetrs[0].getElementsByTagName("td");
            var cells2 = basetrs[1].getElementsByTagName("td");
            var emptyRes = {
                "Gold": {"id": "i=4|1", "held": 0, "rate": 0, "classes": " resIcon ico-gold"},
                "Wood": {"id": "i=1|1", "held": 0, "rate": 0, "classes": " resIcon ico-wood"},
                "Clay": {"id": "i=1|2", "held": 0, "rate": 0, "classes": " resIcon ico-clay"},
                "Iron": {"id": "i=1|3", "held": 0, "rate": 0, "classes": " resIcon ico-iron"},
                "Stone": {"id": "i=1|4", "held": 0, "rate": 0, "classes": " resIcon ico-stone"},
                "Food": {"id": "i=1|5", "held": 0, "rate": 0, "classes": " resIcon ico-food"},
                "Mana": {"id": "i=2|1", "held": 0, "rate": 0, "classes": " resIcon ico-mana"},
                "Research": {"id": "i=2|2", "held": 0, "rate": 0, "classes": " resIcon ico-research"},
                "Horse": {"id": "i=3|1", "held": 0, "rate": 0, "classes": " resIcon ico-horses"},
                "Livestock": {"id": "i=3|2", "held": 0, "rate": 0, "classes": " resIcon ico-livestock"},
                "Beer": {"id": "i=3|12", "held": 0, "rate": 0, "classes": " resIcon ico-beer"},
                "Book": {"id": "i=3|7", "held": 0, "rate": 0, "classes": " resIcon ico-books"},
                "Spear": {"id": "i=3|5", "held": 0, "rate": 0, "classes": " resIcon ico-spears"},
                "Sword": {"id": "i=3|3", "held": 0, "rate": 0, "classes": " resIcon ico-swords"},
                "Bow": {"id": "i=3|4", "held": 0, "rate": 0, "classes": " resIcon ico-bows"},
                "Saddle": {"id": "i=3|6", "held": 0, "rate": 0, "classes": " resIcon ico-saddles"},
                "Leather Armour": {"id": "i=3|8", "held": 0, "rate": 0, "classes": " resIcon ico-leather"},
                "Chainmail": {"id": "i=3|9", "held": 0, "rate": 0, "classes": " resIcon ico-chainmail"},
                "Plate Armour": {"id": "i=3|10", "held": 0, "rate": 0, "classes": " resIcon ico-plate"},
                "Siege Block": {"id": "i=3|11", "held": 0, "rate": 0, "classes": " resIcon ico-siege"}
            };
            if (!dt[PlayerId].towns[townId].inv.res) {
                dt[PlayerId].towns[townId].inv.res = emptyRes;
            }
            var baseRes = dt[PlayerId].towns[townId].inv.res;
            var baseResNames = ["Gold", "Wood", "Clay", "Iron", "Stone", "Food", "Mana", "Research"];
            var tdi = 0;
            var tdi2 = 0;
            baseResNames.forEach(function (item) {
                if (!baseRes[item]) {
                    // No entry for this item so add it
                    baseRes[item] = emptyRes[item];
                }
                baseRes[item].held = parseInt(cells[tdi].getAttribute("data"));
                baseRes[item].rate = cells[tdi].getAttribute("inc");
                if (cells2[tdi2].getAttribute("data")) {
                    baseRes[item].makeing = cells2[tdi2].getAttribute("data");
                }
                tdi = tdi + 2;
                tdi2 = tdi2 + 1;
            });
            dt[PlayerId].towns[townId].inv.res = baseRes;
            if(dt.popupStates.BaseInv === true){
                dt.invent.dispBaseInv();
            }
            dt.invent.getAdvRes2();
            var key = townId + ':inv';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[townId].inv));
            var msg = dt[PlayerId].towns[CurrentTown].name + " auto base/adv resource update finished.";
            dt.logEntry(msg);

        },

        /* Function: getAdvRes2
        * Get updated adv res for the current town.
        * Gets the data from the adv res toolbar at the top of the page.
        */
        getAdvRes2: function() {
            var advtrs = document.querySelectorAll("#advRes tr");
            var yr = currentResTick.getUTCFullYear();
            var townId = CurrentTown;

            var cells = advtrs[0].getElementsByTagName("td");
            var cells2 = advtrs[1].getElementsByTagName("td");
            if (!dt[PlayerId].towns[townId].inv.res) {
                dt[PlayerId].towns[townId].inv.res = {
                    "Gold": {"id": "i=4|1", "held": 0, "rate": 0, "classes": " resIcon ico-gold"},
                    "Wood": {"id": "i=1|1", "held": 0, "rate": 0, "classes": " resIcon ico-wood"},
                    "Clay": {"id": "i=1|2", "held": 0, "rate": 0, "classes": " resIcon ico-clay"},
                    "Iron": {"id": "i=1|3", "held": 0, "rate": 0, "classes": " resIcon ico-iron"},
                    "Stone": {"id": "i=1|4", "held": 0, "rate": 0, "classes": " resIcon ico-stone"},
                    "Food": {"id": "i=1|5", "held": 0, "rate": 0, "classes": " resIcon ico-food"},
                    "Mana": {"id": "i=2|1", "held": 0, "rate": 0, "classes": " resIcon ico-mana"},
                    "Research": {"id": "i=2|2", "held": 0, "rate": 0, "classes": " resIcon ico-research"},
                    "Horse": {"id": "i=3|1", "held": 0, "rate": 0, "classes": " resIcon ico-horses"},
                    "Livestock": {"id": "i=3|2", "held": 0, "rate": 0, "classes": " resIcon ico-livestock"},
                    "Beer": {"id": "i=3|12", "held": 0, "rate": 0, "classes": " resIcon ico-beer"},
                    "Book": {"id": "i=3|7", "held": 0, "rate": 0, "classes": " resIcon ico-books"},
                    "Spear": {"id": "i=3|5", "held": 0, "rate": 0, "classes": " resIcon ico-spears"},
                    "Sword": {"id": "i=3|3", "held": 0, "rate": 0, "classes": " resIcon ico-swords"},
                    "Bow": {"id": "i=3|4", "held": 0, "rate": 0, "classes": " resIcon ico-bows"},
                    "Saddle": {"id": "i=3|6", "held": 0, "rate": 0, "classes": " resIcon ico-saddles"},
                    "Leather Armour": {"id": "i=3|8", "held": 0, "rate": 0, "classes": " resIcon ico-leather"},
                    "Chainmail": {"id": "i=3|9", "held": 0, "rate": 0, "classes": " resIcon ico-chainmail"},
                    "Plate Armour": {"id": "i=3|10", "held": 0, "rate": 0, "classes": " resIcon ico-plate"},
                    "Siege Block": {"id": "i=3|11", "held": 0, "rate": 0, "classes": " resIcon ico-siege"}
                };
            }
            var advRes = ["Horse", "Livestock", "Beer", "Book","Spear", "Sword", "Bow", "Saddle", "Leather Armour", "Chainmail", "Plate Armour", "Siege Block"];
            var baseRes = dt[PlayerId].towns[townId].inv.res;
            var cells = advtrs[0].getElementsByTagName("td");
            var tdi = 0;
            var tdi2 = 0;
            advRes.forEach(function (item) {
                baseRes[item].held = cells[tdi].getAttribute("data");
                baseRes[item].rate = cells[tdi].getAttribute("inc");
                if (cells2[tdi2].getAttribute("data")) {
                    baseRes[item].makeing = cells2[tdi2].getAttribute("data");
                }
                tdi = tdi + 2;
                tdi2 = tdi2 + 1;
            });
            console.log("getAdvRes2: ",dt[PlayerId].towns[CurrentTown].inv.res["Siege Block"]);
        },
        /* Function: dispBaseInv
        * This function is responsible for populating the actual sub-inventory area 
        * with the required data.
        * 
        * Calls:
        * <dt.showTool> <dt.removeRows> <dt.numberFormat> <dt.secondsToString2>
        */
        dispBaseInv: function () {
            var towns = dt[PlayerId].towns;
            var townList = towns.list;
            townList.sort();
            var numTowns = towns.numTowns;
            var totals = [0, 0, 0, 0, 0, 0];
            var items = ["name", "Gold", "Wood", "Clay", "Iron", "Stone", "Food"];
            dt.showTool("#baseInvSummHtml", "BaseInvs");
            dt.popupStates.BaseInvs = true;
            var tbl = document.getElementById('townres');
            dt.removeRows(tbl);
            var body = tbl.getElementsByTagName('tbody').item(0);
            // Step through all the towns
            for (var i = 0; i < numTowns; i++) {
                // Process the current town
                var row = body.insertRow(-1);
                var row2 = body.insertRow(-1);
                var cell = row.insertCell(0);
                var cell2 = row2.insertCell(0);
                var thisTown = towns[townList[i]];
                var inv = thisTown.inv;
                // Create a check for res and each of the base resources existing.
                var res = inv.res;
                cell.innerHTML = thisTown.name;
                cell2.textContent = 'Time left:';
                for (var j = 1; j < items.length; j++) {
                    cell = row.insertCell(j);
                    cell2 = row2.insertCell(j);
                    var pName = items[j];
                    if (res.hasOwnProperty(pName)) {
                        if (parseFloat(res[pName].rate) < 0) {
                            cell.setAttribute('class', 'red');
                            cell2.setAttribute('class', 'red');
                        }
                        if (parseFloat(res[pName].rate) > 0) {
                            cell2.setAttribute('class', 'greenT');
                        }
                        if (res[pName].held == dt[PlayerId].towns[townList[i]].inv.maxStore) {
                            cell.setAttribute('class', 'blue');
                        }
                        cell.innerHTML = dt.numberFormat(res[pName].held);
                        totals[j - 1] = totals[j - 1] + parseInt(res[pName].held);
                        if (parseFloat(res[pName].rate) < 0) {
                            var secs = res[pName].held / parseFloat(res[pName].rate);
                        } else {
                            var diff = dt[PlayerId].towns[townList[i]].inv.maxStore - res[pName].held;
                            var secs = diff / parseFloat(res[pName].rate);
                        }
    //					cell2.innerHTML = dt.numberFormat2(hrs);
                        cell2.innerHTML = dt.secondsToString2(secs);
                        if (j === 1 && parseFloat(res[pName].rate) >= 0) {
                            cell2.innerHTML = "-";
                        }
                    } else {
                        cell.innerHTML = "?";
                        cell.innerHTML = "-";
                    }
                }
            }
    //		dt.addElement2(tbl, 'tfoot', ['id'], ['totals']);
    //		var tfoot = document.getElementById('totals');
            var tfoot = tbl.querySelector("tfoot");
            var rowText = '<td>Totals</td>';
    //		var cell = tfoot.insertCell(0);
    //		cell.innerHTML = 'Totals';
            for (var j = 0; j < 6; j++) {
    //			cell = tfoot.insertCell(j);
    //			cell.innerHTML = dt.numberFormat(totals[j]);
                rowText = rowText + '<td>' + dt.numberFormat(totals[j]) + '</td>';
            }
            tfoot.innerHTML = rowText;
    //		dt.outputArea.setAttribute('class', 'see');
    //	},
        },
        /* Function: dispResSum
        * Build and display the table holding the town(s) inventory summary.
        * 
        * Calls:
        * <dt.showTool> <dt.removeRows> <dt.numberFormat> <dt.secondsToString2>
        */
        dispResSum: function () {
            var towns = dt[PlayerId].towns;
            var townList = towns.list;
            townList.sort();
            var numTowns = towns.numTowns;
            var totals = [0, 0, 0, 0, 0, 0];
            var items = ["name", "Gold", "Wood", "Clay", "Iron", "Stone", "Food"];
            dt.showTool("#baseInvSummHtml");
    //		dt.outputArea.innerHTML = dt.townResTbl;
    //		var kids = dt.outputArea.children;

            var tbl = document.getElementById('townres');
            dt.removeRows(tbl);
            var body = tbl.getElementsByTagName('tbody').item(0);
            // Step through all the towns
            for (var i = 0; i < numTowns; i++) {
                // Process the current town
                var row = body.insertRow(-1);
                var row2 = body.insertRow(-1);
                var cell = row.insertCell(0);
                var cell2 = row2.insertCell(0);
                var thisTown = towns[townList[i]];
                var inv = thisTown.inv;
                // Create a check for res and each of the base resources existing.
                var res = inv.res;
                cell.innerHTML = thisTown.name;
                cell2.textContent = 'Time left:';
                for (var j = 1; j < items.length; j++) {
                    cell = row.insertCell(j);
                    cell2 = row2.insertCell(j);
                    var pName = items[j];
                    if (res.hasOwnProperty(pName)) {
                        if (parseFloat(res[pName].rate) < 0) {
                            cell.setAttribute('class', 'red');
                            cell2.setAttribute('class', 'red');
                        }
                        if (parseFloat(res[pName].rate) > 0) {
                            cell2.setAttribute('class', 'greenT');
                        }
                        if (res[pName].held == dt[PlayerId].towns[townList[i]].inv.maxStore) {
                            cell.setAttribute('class', 'blue');
                        }
                        cell.innerHTML = dt.numberFormat(res[pName].held);
                        totals[j - 1] = totals[j - 1] + parseInt(res[pName].held);
                        if (parseFloat(res[pName].rate) < 0) {
                            var secs = res[pName].held / parseFloat(res[pName].rate);
                        } else {
                            var diff = dt[PlayerId].towns[townList[i]].inv.maxStore - res[pName].held;
                            var secs = diff / parseFloat(res[pName].rate);
                        }
    //					cell2.innerHTML = dt.numberFormat2(hrs);
                        cell2.innerHTML = dt.secondsToString2(secs);
                        if (j === 1 && parseFloat(res[pName].rate) >= 0) {
                            cell2.innerHTML = "-";
                        }
                    } else {
                        cell.innerHTML = "?";
                        cell.innerHTML = "-";
                    }
                }
            }
    //		dt.addElement2(tbl, 'tfoot', ['id'], ['totals']);
    //		var tfoot = document.getElementById('totals');
            var tfoot = tbl.querySelector("tfoot");
            var rowText = '<td>Totals</td>';
    //		var cell = tfoot.insertCell(0);
    //		cell.innerHTML = 'Totals';
            for (var j = 0; j < 6; j++) {
    //			cell = tfoot.insertCell(j);
    //			cell.innerHTML = dt.numberFormat(totals[j]);
                rowText = rowText + '<td>' + dt.numberFormat(totals[j]) + '</td>';
            }
            tfoot.innerHTML = rowText;
    //		dt.outputArea.setAttribute('class', 'see');
    //	},
        },
    /* Function: dispResRates
    * Build and display the table holding the town(s) base res production rates summary.
    */
        dispResRates: function() {
        var towns = dt[PlayerId].towns;
        var townList = towns.list;
        townList.sort();
        var numTowns = towns.numTowns;
        var totals = [0, 0, 0, 0, 0, 0];
        var items = ["name", "Gold", "Wood", "Clay", "Iron", "Stone", "Food"];
        dt.showTool("#baseInvRatesHtml");

        var tbl = document.getElementById('townresrates');
        dt.removeRows(tbl);
        
                var foot = tbl.querySelector('tfoot');
            if (foot.hasChildNodes()) {
                while (foot.firstChild) {
                    foot.removeChild(foot.firstChild);
                }
            }

        var body = tbl.getElementsByTagName('tbody').item(0);
        // Step through all the towns
        for (var i = 0; i < numTowns; i++) {
            // Process the current town
            var row = body.insertRow(-1);
            var row2 = body.insertRow(-1);
            var cell = row.insertCell(0);
            var cell2 = row2.insertCell(0);
            var thisTown = towns[townList[i]];
            var inv = thisTown.inv;
            // Create a check for res and each of the base resources existing.
            var res = inv.res;
            cell.innerHTML = thisTown.name;
            cell2.textContent = 'Time left:';
            for (var j = 1; j < items.length; j++) {
                cell = row.insertCell(j);
                cell2 = row2.insertCell(j);
                var pName = items[j];
                if (res.hasOwnProperty(pName)) {
                    if (parseFloat(res[pName].rate) < 0) {
                        cell.setAttribute('class', 'red');
                        cell2.setAttribute('class', 'red');
                    }
                    if (parseFloat(res[pName].rate) > 0) {
                        cell2.setAttribute('class', 'greenT');
                    }
                    if (res[pName].held == dt[PlayerId].towns[townList[i]].inv.maxStore) {
                        cell.setAttribute('class', 'blue');
                    }
                    cell.innerHTML = dt.numberFormat((res[pName].rate) * 3600);
    //					cell.innerHTML = res[pName].rate;
    //					totals[j - 1] = totals[j - 1] + parseInt(res[pName].rate);
                    totals[j - 1] = totals[j - 1] + Number(res[pName].rate);
                    if (parseFloat(res[pName].rate) < 0) {
                        var secs = res[pName].held / parseFloat(res[pName].rate);
                    } else {
                        var diff = dt[PlayerId].towns[townList[i]].inv.maxStore - res[pName].held;
                        var secs = diff / parseFloat(res[pName].rate);
                    }
    //					cell2.innerHTML = dt.numberFormat2(hrs);
                    cell2.innerHTML = dt.secondsToString2(secs);
                    if (parseFloat(res[pName].rate) < 0) {
                        if (secs < -172799) {
                            cell2.className = "yellowB";
                        } else if (secs < -86399 && secs > -172800) {
                            cell2.className = "orange1B";
                        } else if (secs < -43199 && secs > -86400) {
                            cell2.className = "orange2B";
                        } else if (secs > -43200) {
                            cell2.className = "redB";
                        }
                        
    /*                    if(secs > -43200){
                            cell2.className = "redB";
                        }
                        if(secs < -43199 && secs > -86400){
                            cell2.className = "orange2B";
                        }
                        if(secs < -86399 && secs > -172800){
                            cell2.className = "orange1B";
                        }
                        if(secs < -172799){
                            cell2.className = "yellowB";
                        }
    */
                    }
                    if (j === 1 && parseFloat(res[pName].rate) >= 0) {
                        cell2.innerHTML = "-";
                    }
                } else {
                    cell.innerHTML = "?";
                    cell.innerHTML = "-";
                }
            }
        }
    //		dt.addElement2(tbl, 'tfoot', ['id'], ['totals']);
    //		var tfoot = document.getElementById('totals');
        var tfoot = tbl.querySelector("tfoot");
        var row = tfoot.insertRow(-1);
        cell = row.insertCell(0);
        cell.textContent = 'Totals:';
        for (var j = 0; j < 6; j++) {
            cell = row.insertCell(j+1);
            if (totals[j] < 0) {
                cell.setAttribute('class', 'red');
            }
            if (totals[j] > 0) {
                cell2.setAttribute('class', 'greenT');
            }
            cell.innerHTML = dt.numberFormat(totals[j] * 3600);

        }

    //    var rowText = '<td>Totals</td>';
    ////		var cell = tfoot.insertCell(0);
    ////		cell.innerHTML = 'Totals';
    //    for (var j = 0; j < 6; j++) {
    ////			cell = tfoot.insertCell(j);
    ////			cell.innerHTML = dt.numberFormat(totals[j]);
    ////			rowText = rowText + '<td>' + dt.numberFormat(totals[j]) + '</td>';
    //        rowText = rowText + '<td>' + dt.numberFormat((totals[j]) * 3600) + '</td>';
    //    }
    //    tfoot.innerHTML = rowText;
    ////		dt.outputArea.setAttribute('class', 'see');
    ////	},
        },

        /* Function: dispSubInv
        * Display selected sub-inventory for the chosen town.
        * 
        * Calls:
        * <dt.invent.buildInvTotals> <dt.sortObject> <dt.numberFormat2> <dt.numberFormat>
        */
        dispSubInv: function (where, viewTown, subId) {
            // Get the active location
            var loc = document.querySelector("#subInvToolTable td.townCol tbody td.dtActive");
            var where = loc.dataset.where;
            var viewTown = loc.dataset.id;
            var subId = document.querySelector('#invAreaSel td.dtActive').getAttribute('data-id');
                var res = dt.sortObject(dt[PlayerId][where][viewTown].inv[subId]);
            var invArea = document.getElementById('subInvDispArea');
            invArea.innerHTML = '';
            var keys = Object.keys(res);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] !== '') {
                    if (parseFloat(res[keys[i]].rate) < 0) {
                            var spn = '<span class="name ' + res[keys[i]].classes + '" data="' + res[keys[i]].id + '"></span><br><span width="100%" text-align="center" class ="red">' + dt.numberFormat(res[keys[i]].held) + '</span>';
                    } else {
                            var spn = '<span class="name ' + res[keys[i]].classes + '" data="' + res[keys[i]].id + '"></span><br><span width="100%" text-align="center">' + dt.numberFormat(res[keys[i]].held) + '</span>';
                    }
                    var newNode = document.createElement('div');
                    newNode.setAttribute('title', keys[i]);
                    newNode.classList.add("subInvItem");
                    newNode.innerHTML = spn;
                    invArea.appendChild(newNode);
                }
            }
        },
        /* Method: dispSubInvs
        * Called when the Sub Inventory tool is called. Builds and displays the 
        * sub-inventory tool. The various locations and each of the sub-inventories 
        * have calls to <dt.invent.invSwitch> attached to the onclick event that 
        * handle changing from one to the other. 
        * 
        * Calls:
        * <dt.showTool> <dt.addElement2> <dt.invent.invSwitch> <dt.invent.dispSubInv>
        */
        dispSubInvs: function () {
            dt[PlayerId].hubs = JSON.parse(locStorage.getItem(PlayerId + ':hubs'));

            dt.showTool("#subInvHtml");
            // Get the outer table
            var toolTable = document.querySelector('#subInvToolTable');
            // Get the tbody that the town & hub links are held in
            var linkBody = document.querySelector("#subInvToolTable td.townCol tbody");
            // Populate the list of towns & hubs
            var twnArea = toolTable.querySelector('.townCol');
            var twnList = twnArea.querySelector('tbody');
            // <tr><td height="29" class="titleCell">Towns</td></tr>
            linkBody.innerHTML = '';
            var tRow = dt.addElement2(linkBody, 'tr');
            var tCell = dt.addElement2(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
            tCell.textContent = "Location";
            tRow = dt.addElement2(linkBody, 'tr');
    //        tCell = dt.addElement2(tRow, 'td', ['onclick', 'class', 'data-where', 'data-id'], ["dt.invent.invSwitch('all','-1')", 'dthover', 'all', '-1']);
    //        tCell.textContent = "Everywhere";
            tRow = dt.addElement2(linkBody, 'tr');
            tCell = dt.addElement2(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
            tCell.textContent = "Towns";

            for (var i = 0; i < dt[PlayerId].towns.numTowns; i++) {
                var tRow = dt.addElement2(linkBody, 'tr');
                var tCell = dt.addElement2(tRow, 'td', ['data-id', 'class', 'data-where'], [dt[PlayerId].towns.list[i], 'dthover', 'towns']);
                var thisTwn = dt[PlayerId].towns.list[i];
                tCell.innerHTML = dt[PlayerId].towns[thisTwn].name;
                tCell.setAttribute('onclick', 'dt.invent.invSwitch("town",' + thisTwn + ')');
            }
            var tRow = dt.addElement2(linkBody, 'tr');
            var tCell = dt.addElement2(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
            tCell.innerHTML = 'Hubs';
            dt[PlayerId].hubs.numHubs = Object.keys(dt[PlayerId].hubs.list).length -1;
            for (var i = 0; i < dt[PlayerId].hubs.numHubs; i++) {
                var tRow = dt.addElement2(linkBody, 'tr');
                var tCell = dt.addElement2(tRow, 'td', ['data-id', 'class', 'data-where'], [dt[PlayerId].hubs.list[i], 'dthover', 'hubs']);
                var thisHub = dt[PlayerId].hubs.list[i];
                tCell.innerHTML = dt[PlayerId].hubs[thisHub].name;
                tCell.setAttribute('onclick', 'dt.invent.invSwitch("hub",' + thisHub + ')');
            }
            // Set the current town as the active location
            dt.invent.invSwitch('town', CurrentTown);

            var invArea = document.getElementById('invCol');
        },
        /* Method: invSwitch
        * Handle a change of either town or sub-inventory
        * 
        * Parameters:
        * part - what is being changed. One of either:
        *				tab (what sub-inventory),
        *				town (a town has been selected),
        *				hub (a hub has been selected) or
        *				all (inventories from everywhere are wanted).
        *	new_tab - the data-id of the particular item that is being changed.
        *	
        *	Calls:
        *	<dt.invent.dispSubInv>
        */
        invSwitch: function (part, new_tab) {
            var toolDiv = document.querySelector('#subInvHtml');
            var tc = toolDiv.querySelector('.townCol');
            // 
            if (part === 'tab') {
                // First remove the active setting on the current inventory
                document.querySelector('#invAreaSel td.dtActive').classList.remove('dtActive');
                var rubbish = '';
                // Now get the new inventory to mark as active
                // toolDiv.querySelector('[data-id="'+new_tab+'"]').classList.add("dtActive");
                var newSub = document.querySelector('#invAreaSel td[data-id="' + new_tab + '"]');
                newSub.classList.add('dtActive');

                var townCol = toolDiv.querySelector('.townCol');
                var town = townCol.querySelector('.dtActive').getAttribute('id');
                var where = townCol.querySelector('.dtActive').getAttribute('data');
                var invArea = new_tab;
            }
            if (part === 'town') {
                // Set the active town
                var townCol = document.querySelector('#subInvHtml .townCol');
                var twns = townCol.getElementsByTagName('td');
                for (var i = 1; i < twns.length; i++) {
                    twns.item(i).classList.remove("dtActive");
                }
                // Set the selected town to active
                var activTwn = townCol.querySelector('#' + part);
                toolDiv.querySelector('[data-id="' + new_tab + '"]').classList.add("dtActive");
                var source = new_tab;
                var invSel = document.getElementById('invAreaSel');
                var invArea = document.querySelector('#invAreaSel .dtActive').getAttribute('data-id');
                var town = new_tab;
                var where = 'towns';
            }
            if (part === 'hub') {
                // Set the active hub
                var townCol = document.querySelector('#subInvHtml .townCol');
                var twns = townCol.getElementsByTagName('td');
                for (var i = 1; i < twns.length; i++) {
                    twns.item(i).classList.remove("dtActive");
                }
                toolDiv.querySelector('[data-id="' + new_tab + '"]').classList.add("dtActive");
                var source = new_tab;
                var invSel = document.getElementById('invAreaSel');
                var invArea = invSel.getElementsByClassName('dtActive').item(0).getAttribute('id');
                var town = new_tab;
                var where = 'hubs';
            }
    //        if (part === 'all') {
    //            // Set the active hub
    //            var townCol = toolDiv.querySelector('.townCol');
    //            var twns = townCol.getElementsByTagName('td');
    //            for (var i = 1; i < twns.length; i++) {
    //                twns.item(i).classList.remove("dtActive");
    //            }
    //            toolDiv.querySelector('[data-where="all"]').classList.add("dtActive");
    //            var source = new_tab;
    //            var invSel = document.getElementById('invAreaSel');
    //            var invArea = invSel.getElementsByClassName('dtActive').item(0).getAttribute('id');
    //            var town = new_tab;
    //            var where = 'all';
    //        }
            dt.invent.dispSubInv();
        },
        /* Function: advInvSearch
        * 
        * @returns {undefined}
        */
        advInvSearch: function () {
            dt.showTool("#advInvSearchHtml");
            var dt_search = document.getElementById('dt_advSearchInp');
            dt_search.setAttribute('class', 'see');
        },
        advShowResult: function (str) {
            var dt_search = document.getElementById('dt_advSearchInp');
            var dt_searchSuggestions = document.getElementById("dt_advlivesearch");
            dt_searchSuggestions.classList.remove('nosee');
            dt_searchSuggestions.classList.add('see');
            if (str.length < 2) {
                document.getElementById("dt_advlivesearch").innerHTML = "";
                document.getElementById("dt_advlivesearch").style.border = "0px";
                return;
            }
            str = str.toLowerCase();
            var itemNames = [];
            var keys = Object.keys(cp);
            dt_searchSuggestions.innerHTML = '';
            for (var i = 0; i < keys.length; i++) {
                var name = cp[keys[i]].n;
                var lowerName = name.toLowerCase();
                if (lowerName.indexOf(str) !== -1) {
                    var t = name.split(' ');
                    var t2 = t.join('_');
                    var t3 = '<span onclick = dt.invent.advSelectThis("' + t2 + '"' + ',' + keys[i] + ') cId="' + keys[i] + '">' + name + '</span><br>';
                    itemNames.push(t);
                    dt_searchSuggestions.innerHTML += t3;
                    var dummy = '';
                }
            }
            if (itemNames.length > 0) {
                dt_search.innerHTML = itemNames;
                dt_searchSuggestions.style.border = "1px solid #A5ACB2";
            } else {
                dt_searchSuggestions.innerHTML = '';
                dt_searchSuggestions.style.border = "none";
            }
        },
        advSelectThis: function (name, cId) {
            dt.searchResults = {};
            document.querySelector('#advInvSearchResHtml').classList.remove('nosee');
            document.querySelector('#advInvSearchResHtml').classList.add('see');
            document.querySelector('#advInvSearchResHtml h2').textContent = 'Search Results for - ' + name;
            // Get the results table
            var theTable = document.querySelector('#dt_advSearchResults tbody');
            dt.removeRows(theTable.parentNode);
            document.querySelector('#advusedin').innerHTML = '';
            // Replace any underscores in name with spaces
            var t = name.split('_');
            var name = t.join(' ');
            var totalHeld = 0;
            document.getElementById('dt_advSearchInp').value = name;
            // Clear and hide the suggestions.
    //	document.getElementById("dt_livesearch").innerHTML = "";
            document.getElementById("dt_advlivesearch").className = "nosee";
            // Loop through all the towns
            var twnList = dt[PlayerId].towns.list;
            for (var twn = 0; twn < twnList.length; twn++) {
                var twnId = twnList[twn];
                // Set the results for this town to 0
                dt.searchResults[twnId] = 0;
                // Get the properties of the inv object for this town
                var props = Object.getOwnPropertyNames(dt[PlayerId].towns[twnId].inv);
                // Step through these properties
                for (var propId = 0; propId < props.length; propId++) {
                    // Check if this sub-inventory has a property matching the name we are looking for
                    if (dt[PlayerId].towns[twnId].inv[props[propId]].hasOwnProperty(name)) {
                        // There is a matching item so get the qty held
                        dt.searchResults[twnId] = dt[PlayerId].towns[twnId].inv[props[propId]][name].held;
                        if (parseFloat(dt[PlayerId].towns[twnId].inv[props[propId]][name].rate) < 0) {
                            var redLine = true;
                        } else {
                            var redLine = false;
                        }
                    }
                }
                // Add a row to the results table
                var row = theTable.insertRow(-1);
                var cell = row.insertCell(0);
                cell.innerHTML = dt[PlayerId].towns[twnId].name;
                cell = row.insertCell(1);
                if (redLine === true) {
                    cell.setAttribute('class', 'red');
                }
                cell.innerHTML = dt.numberFormat(dt.searchResults[twnId]);
                totalHeld = totalHeld + parseInt(dt.searchResults[twnId]);
                var recipeTable = this.recipeCheck(dt[PlayerId].towns[twnId].inv, cId);
                cell = row.insertCell(2);
                cell.appendChild(recipeTable);
    //            cell.innerHTML = recipeTable;
                // Check if there are any buildings needed for this item to be produced.
                cell = row.insertCell(3);
                if(dt.cBuildings.hasOwnProperty(cId)){
                    // There is an entry for the item so get the building id(s).
                    var bldgsNeeded = dt.cBuildings[cId].bldgs;
                    // now check if each of the needed buildings is present in this town.
                    var matchedBldgs = this.buildingCheck(bldgsNeeded,dt[PlayerId].towns[twnId].plots.internal)
                    for(bindex = 0;bindex<bldgsNeeded.length;bindex++){
                        cell.innerHTML = "No";
                        if(matchedBldgs.length === bldgsNeeded.length){
                            cell.innerHTML = "Yes";
                        }
                            
                    }
                }
            }
            // Loop through the hubs
            if (dt[PlayerId].hubs.hasOwnProperty('list')) {
                var twnList = dt[PlayerId].hubs.list;
                for (var twn = 0; twn < twnList.length; twn++) {
                    var twnId = twnList[twn];
                    // Set the results for this town to 0
                    dt.searchResults[twnId] = 0;
                    // Get the properties of the inv object for this town
                    var props = Object.getOwnPropertyNames(dt[PlayerId].hubs[twnId].inv);
                    // Step through these properties
                    for (var propId = 0; propId < props.length; propId++) {
                        // Check if this sub-inventory has a property matching the name we are looking for
                        if (dt[PlayerId].hubs[twnId].inv[props[propId]].hasOwnProperty(name)) {
                            // There is a matching item so get the qty held
                            dt.searchResults[twnId] = dt[PlayerId].hubs[twnId].inv[props[propId]][name].held;
                        }
                    }
                    // Add a row to the results table
                    var row = theTable.insertRow(-1);
                    var cell = row.insertCell(0);
                    cell.innerHTML = dt[PlayerId].hubs[twnId].name;
                    cell = row.insertCell(1);
                    cell.innerHTML = dt.numberFormat(dt.searchResults[twnId]);
                    var recipeTable = this.recipeCheck(dt[PlayerId].hubs[twnId].inv, cId);
                    cell = row.insertCell(2);
                    cell.appendChild(recipeTable);

    //			if (dt[PlayerId].hubs[twnId].name = 'All Hubs') {
                    if (twnId == 0) {
                        totalHeld = totalHeld + parseInt(dt.searchResults[twnId]);
                    }
                }
            }
            // Add a row for the total held
            var row = theTable.insertRow(-1);
            var cell = row.insertCell(0);
            cell.innerHTML = 'Total held';
            cell = row.insertCell(1);
            cell.innerHTML = dt.numberFormat(totalHeld);
            var usedIn = [];
            // Get details of the items this is used in (if any)
            itemId = 'c=' + cId;
            if (dt.cpi.hasOwnProperty(cId)) {
                itemId = dt.cpi[cId];
            }

            // 2. Step through each of the recipes
            var count = 0;
            for (var k in dt.cRecipes)
                ++count;
            var Keys = Object.keys(dt.cRecipes);
            for (var item = 0; item < Keys.length; item++) {
                // Check to see if the item is in this recipe
                for (var subitem = 0; subitem < dt.cRecipes[Keys[item]].recipe.length; subitem++) {
                    if (dt.cRecipes[Keys[item]].recipe[subitem][1] == itemId) {
                        usedIn.push(Keys[item]);
                    }
                }
            }
            if (usedIn.length > 0) {
                var out = document.getElementById('advusedin');
                var usedhdr = dt.addElement2(out, 'h3', [], []);
                usedhdr.textContent = 'Used In:';
                for (item in usedIn) {
                    if (dt.cpi.hasOwnProperty(usedIn[item])) {
                        dataVal = dt.cpi[item];
                    } else {
                        dataVal = 'c=' + usedIn[item];
                    }
                    dt.addElement2(out, 'span', ['class', 'title', 'data'], ['name ' + dt.cItems[usedIn[item]].classes, dt.cItems[usedIn[item]].name, dataVal])
                }
            }
            dt.adjustTool('#advInvSearchHtml');
        },
        buildingCheck: function(bldgsNeeded,bldgsPresent){
            // loop through the buildings needed and check if a building with the same name is present in the town.
            var bldgsMatched = [];
            for(bni=0;bni<bldgsNeeded.length;bni++){
                thisBldg = dt.buildings.bldgs[bldgsNeeded[bni]][0];
                for (b in bldgsPresent) {
                    if(thisBldg == bldgsPresent[b][0]){
                        bldgsMatched.push(bldgsNeeded[bni]);
                    }
                }
            }
            return bldgsMatched;
        },
        recipeCheck: function (inv, cId) {
            if (dt.cRecipes.hasOwnProperty(cId)) {
                var thisRecipe = dt.cRecipes[cId].recipe;
                var iRow = '';
                var hRow = '';
                var aRow = '';
                var matchFlags = 0;
                var thisMake = [];
                // Make atable for the sub-items
                var subTbl = document.createElement("table");
                subTbl.innerHTML = "<tr></tr>";
                var tr = subTbl.querySelector("tr");
                // Check each item on the recipe
                for (var i = 0; i < thisRecipe.length; i++) {
                    // Get the qty of this sub-item
                    var subItem = thisRecipe[i];
                    var sId = subItem[1];
                    var sQty = parseInt(subItem[0]);
                    // Build a td for this sub-item
                    var td = tr.insertCell(i);
                    // Check the inventory of this town for this sub-item
                    if (sId !== 'c=266') {
    //                var inv = dt[PlayerId].towns[townId].inv;
                        var invAreas = Object.keys(inv);
                        // Loop through each area of the inventory
                        for (var area = 0; area < invAreas.length; area++) {
                            if (invAreas[area] !== 'maxStore') {
                                var thisSub = inv[invAreas[area]];
                                var subKeys = Object.keys(thisSub);
                                sQty = 0;
                                var found = false;
                                // Loop through each entry in this sub-inventory
                                for (var subI = 0; subI < subKeys.length; subI++) {
                                    // Check if this item has the required id
                                    if (thisSub[subKeys[subI]].id === sId) {
                                        found = true;
                                        sQty = parseInt(thisSub[subKeys[subI]].held);
                                        if (sId.charAt(0) === 'i') {
                                            td.innerHTML = '<span class="' + dt.iClasses[sId][0] + '" data="' + sId + '" title="' + dt.iClasses[sId][1] + '"></span>' + sQty;
                                        } else {
                                            tid = sId.replace('c=', '');
                                            td.innerHTML = '<span class="name ' + cp[tid].is + '" data="' + sId + '" title="' + cp[tid].n + '"></span>' + sQty;
                                        }
                                    }

                                }
                                if (td.innerHTML === "") {
                                    if (sId.charAt(0) === 'i') {
                                        td.innerHTML = '<span class="' + dt.iClasses[sId][0] + '" data="' + sId + '" title="' + dt.iClasses[sId][1] + '"></span>' + 0;
                                    } else {
                                        tid = sId.replace('c=', '');
                                        td.innerHTML = '<span class="name ' + cp[tid].is + '" data="' + sId + '" title="' + cp[tid].n + '"></span>' + 0;
                                    }

                                }
                            }
                        }
                    }
                }
            } else {
                var subTbl = document.createElement("table");
                subTbl.innerHTML = "<tr></tr>";
            }
            return subTbl;
        },
        /* Function: searchInv
        * Display an input to allow the user to search all available inventories to 
        * find the holdings of a particular item in each location. The input has a 
        * listener attached to the onchange event that updates a list of possible 
        * matches.
        * 
        * Calls:
        * <dt.showTool>
        */
        invSearch: function () {
            dt.showTool("#invSearchHtml");
            // Get the names of all possible items
            var itemNames = [];
            // Get the item to be searched for.
    //	document.getElementById('dt_input').innerHTML = dt.searchInp;
            var dt_search = document.getElementById('dt_searchInp');
    //	document.getElementById('dt_input').setAttribute('class', 'see');
            dt_search.setAttribute('class', 'see');
        },
        /* Function: showResult
        * If the length of the parameter is greater than 1 this will search the in-
        * game cp object for any items whose name contains the submitted string 
        * anywhere. These are appended to a list and each entry has a listener 
        * attached.
        * 
        * Parameter:
        * str - string. The characters to search for.
        * 
        */
        showResult: function (str) {
            var dt_search = document.getElementById('dt_searchInp');
            var dt_searchSuggestions = document.getElementById("dt_livesearch");
            dt_searchSuggestions.classList.remove('nosee');
            dt_searchSuggestions.classList.add('see');
            if (str.length < 2) {
                document.getElementById("dt_livesearch").innerHTML = "";
                document.getElementById("dt_livesearch").style.border = "0px";
                return;
            }
            str = str.toLowerCase();
            var itemNames = [];
            var keys = Object.keys(cp);
            dt_searchSuggestions.innerHTML = '';
            for (var i = 0; i < keys.length; i++) {
                var name = cp[keys[i]].n;
                var lowerName = name.toLowerCase();
                if (lowerName.indexOf(str) !== -1) {
                    var t = name.split(' ');
                    var t2 = t.join('_');
                    var t3 = '<span onclick = dt.invent.selectThis("' + t2 + '"' + ',' + keys[i] + ') cId="' + keys[i] + '">' + name + '</span><br>';
                    itemNames.push(t);
                    dt_searchSuggestions.innerHTML += t3;
                    var dummy = '';
                }
            }
            if (itemNames.length > 0) {
                dt_search.innerHTML = itemNames;
                dt_searchSuggestions.style.border = "1px solid #A5ACB2";
            } else {
                dt_searchSuggestions.innerHTML = '';
                dt_searchSuggestions.style.border = "none";
            }
        },
        /* Function: selectThis
        * Called when the user selects an entry in the list of matching items. This 
        * carries out two searches:
        * - Search the inventories and build the table of the holdings in each location.
        * - Search the recipes to find what this item is used in making.
        * 
        * Parameters:
        * name - string. The display name for the item to search for.
        * cId - string. Used to build the code needed to display clickable icons.
        * 
        * Calls:
        * <dt.removeRows> <dt.numberFormat> <dt.addElement2> <dt.adjustTool>
        */
        selectThis: function (name, cId) {
            dt.searchResults = {};
            document.querySelector('#invSearchResHtml').classList.remove('nosee');
            document.querySelector('#invSearchResHtml').classList.add('see');
            document.querySelector('#invSearchResHtml h2').textContent = 'Search Results for - ' + name;
            // Get the results table
            var theTable = document.querySelector('#dt_searchResults tbody');
            dt.removeRows(theTable.parentNode);
            document.querySelector('#usedin').innerHTML = '';
            // Replace any underscores in name with spaces
            var t = name.split('_');
            var name = t.join(' ');
            var totalHeld = 0;
            document.getElementById('dt_searchInp').value = name;
            // Clear and hide the suggestions.
    //	document.getElementById("dt_livesearch").innerHTML = "";
            document.getElementById("dt_livesearch").className = "nosee";
            // Loop through all the towns
            var twnList = dt[PlayerId].towns.list;
            for (var twn = 0; twn < twnList.length; twn++) {
                var twnId = twnList[twn];
                // Set the results for this town to 0
                dt.searchResults[twnId] = 0;
                // Get the properties of the inv object for this town
                var props = Object.getOwnPropertyNames(dt[PlayerId].towns[twnId].inv);
                // Step through these properties
                for (var propId = 0; propId < props.length; propId++) {
                    // Check if this sub-inventory has a property matching the name we are looking for
                    if (dt[PlayerId].towns[twnId].inv[props[propId]].hasOwnProperty(name)) {
                        // There is a matching item so get the qty held
                        dt.searchResults[twnId] = dt[PlayerId].towns[twnId].inv[props[propId]][name].held;
                        if (parseFloat(dt[PlayerId].towns[twnId].inv[props[propId]][name].rate) < 0) {
                            var redLine = true;
                        } else {
                            var redLine = false;
                        }
                    }
                }
                // Add a row to the results table
                var row = theTable.insertRow(-1);
                var cell = row.insertCell(0);
                cell.innerHTML = dt[PlayerId].towns[twnId].name;
                cell = row.insertCell(1);
                if (redLine === true) {
                    cell.setAttribute('class', 'red');
                }
                cell.innerHTML = dt.numberFormat(dt.searchResults[twnId]);
                totalHeld = totalHeld + parseInt(dt.searchResults[twnId]);
            }
            // Loop through the hubs
            if (dt[PlayerId].hubs.hasOwnProperty('list')) {
                var twnList = dt[PlayerId].hubs.list;
                for (var twn = 0; twn < twnList.length; twn++) {
                    var twnId = twnList[twn];
                    // Set the results for this town to 0
                    dt.searchResults[twnId] = 0;
                    // Get the properties of the inv object for this town
                    var props = Object.getOwnPropertyNames(dt[PlayerId].hubs[twnId].inv);
                    // Step through these properties
                    for (var propId = 0; propId < props.length; propId++) {
                        // Check if this sub-inventory has a property matching the name we are looking for
                        if (dt[PlayerId].hubs[twnId].inv[props[propId]].hasOwnProperty(name)) {
                            // There is a matching item so get the qty held
                            dt.searchResults[twnId] = dt[PlayerId].hubs[twnId].inv[props[propId]][name].held;
                        }
                    }
                    // Add a row to the results table
                    var row = theTable.insertRow(-1);
                    var cell = row.insertCell(0);
                    cell.innerHTML = dt[PlayerId].hubs[twnId].name;
                    cell = row.insertCell(1);
                    cell.innerHTML = dt.numberFormat(dt.searchResults[twnId]);
    //			if (dt[PlayerId].hubs[twnId].name = 'All Hubs') {
                    if (twnId == 0) {
                        totalHeld = totalHeld + parseInt(dt.searchResults[twnId]);
                    }
                }
            }
            // Add a row for the total held
            var row = theTable.insertRow(-1);
            var cell = row.insertCell(0);
            cell.innerHTML = 'Total held';
            cell = row.insertCell(1);
            cell.innerHTML = dt.numberFormat(totalHeld);

            var usedIn = [];
            // Get details of the items this is used in (if any)
            itemId = 'c=' + cId;
            if (dt.cpi.hasOwnProperty(cId)) {
                itemId = dt.cpi[cId];
            }

            // 2. Step through each of the recipes
            var count = 0;
            for (var k in dt.cRecipes)
                ++count;
            var keys = Object.keys(dt.cRecipes);

            for (var item = 0; item < keys.length; item++) {
                // Check to see if the item is in this recipe
                for (var subitem = 0; subitem < dt.cRecipes[keys[item]].recipe.length; subitem++) {
                    if (dt.cRecipes[keys[item]].recipe[subitem][1] == itemId) {
                        usedIn.push(keys[item]);
                    }
                }
            }
            if (usedIn.length > 0) {
                var out = document.getElementById('usedin');
                var usedhdr = dt.addElement2(out, 'h3', [], []);
                usedhdr.textContent = 'Used In:';
                for (item in usedIn) {
                    if (dt.cpi.hasOwnProperty(usedIn[item])) {
                        dataVal = dt.cpi[item];
                    } else {
                        dataVal = 'c=' + usedIn[item];
                    }
                    dt.addElement2(out, 'span', ['class', 'title', 'data'], ['name ' + dt.cItems[usedIn[item]].classes, dt.cItems[usedIn[item]].name, dataVal])
                }
            }
            dt.adjustTool('#invSearchHtml');
        },
        /* Function: tradeMarkets
        * 
        */
        tradeMarkets: function () {
            var selArea = document.getElementById("ItemDetail").getElementsByClassName('sideTab selected').item(0);
            if (selArea !== null) {
                if (selArea.textContent === 'History') {
    // html body div div.content table.generic tbody tr td#contentTD div.largeBorder div.scrollContent div#MainContentDiv div div#ItemDetail div div.subLinks a.selected
                    var dataType = document.getElementById("ItemDetail").querySelector('div.subLinks a.selected').textContent;
    //				var dataType = document.getElementsByClassName('subLinks a.selected').item(0);
                    if (dataType !== null) {
                        var displayType = document.getElementById("ItemDetail").getElementsByClassName('flotr-tab selected').item(0).textContent;
                        if (displayType === 'Data') {
                            if (!document.getElementById('extDL')) {
                                var parent = document.querySelector('div.flotr-datagrid-toolbar');
                                // <button class="flotr-datagrid-toolbar-button" type="button">Download CSV</button>
                                var newBut = dt.addElement(parent, 'button', ['class', 'type', 'onclick', 'id'], ['dt-added-button', 'button', 'dt.invent.extDownload()', 'extDL']);
                                newBut.textContent = "Ext Download";
                                var rubbish4 = '';
                            }
                        }
                        var rubbish3 = '';
                    }
                    var rubbish2 = '';
                }
            }
            var rubbish1 = '';
        },
        /* Function: cpSearch
        * 
        */
        cpSearch: function (needle) {
            for (var prop in cp) {
                if (cp.hasOwnProperty(prop) && cp[prop].n === needle) {
                    //Found needle!
                    return prop;
                }
            }
            return false;
        },
        /* Function: objSearch2
        * 
        */
        objSearch2: function (obj, subProp, needle) {
            // Get the properties of the object
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop][subProp] == needle) {
                        //Found needle!
                        return prop;
                    }
                }
            }
            return false;
        },
        /* Function: extDownload
        * 
        */
        extDownload: function () {
            var numHubs = dt.tradeHubs.length;
            var where = document.querySelector('#TradeLocation option[selected=selected]').textContent;
            var hubName = where.split('[')[0].trim();
            for (var i = 0; i < numHubs; i++) {
                if (dt.tradeHubs[i].name == hubName) {
                    regionId = dt.tradeHubs[i].regionId;
                    break;
                }
            }
    //		var hubId = dt.objSearch2(dt.tradeHubs, 'name', hubName);
            // html body div div.content table.generic tbody tr td#contentTD div.largeBorder div.scrollContent div#MainContentDiv div div#ItemDetail div h3
            var titleLine = document.querySelector('div#ItemDetail div h3').textContent;
    //		var regionId = dt.tradeHubs[hubId].regionId;
            var dataType = document.getElementById("ItemDetail").querySelector('div.subLinks a.selected').textContent;
            if (dataType === 'Prices') {
                dataTypeId = 1;
                var lastCol = 'Average';
            } else {
                dataTypeId = 3;
                var lastCol = 'Net';
            }
            var item = document.querySelector('a.jstree-clicked').textContent.split('(')[0].trim();
            var itemId = this.cpSearch(item);
            var tblData = '"' + regionId + '"|"' + itemId + '"|"' + dataTypeId + '","Date/Ser","Volume","Sell","Buy","Average"\r\n';
    //		tblData +='"itemId|Price/Supply indicator|regionId","Date/Ser","Volume","Sell","Buy","Average"\r\n';
    //		tblData += '"itemId","Price/Supply indicator","regionId", "Date/Count" , "Volume"  , "Sell"  ,  "Buy"  , "Average"';
            var tbl = document.querySelector('table.flotr-datagrid');
            var rows = tbl.querySelectorAll('tr');
            var cells = '';
            for (var i = 1; i < rows.length; i++) {
                var thisline = [];
                cells = rows.item(i).querySelectorAll('th,td');
                for (var j = 0; j < cells.length; j++) {
    //				thisline[j] = '"' + itemId + '"' + dataTypeId + '"' + regionId + '"' + cells.item(j).textContent + '"';
                    thisline[j] = '"' + cells.item(j).textContent + '"';
                }
                tblData += thisline.join(',') + '\r\n';
            }
    //		this.tellServer();
            document.location = 'data:Application/octet-stream,' + encodeURIComponent(tblData);
            var rubbish = '';
        },
        /* Function: tellServer
        * 
        */
        tellServer: function () {
            $.ajax({
                url: dt.server + "/php/marketDlUse.php",
                data: {playerid: PlayerId},
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    var rubbish = '';
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("You can not send Cross Domain AJAX requests: " + errorThrown + "textStat: " + textStatus);
                }
            });
        },
        /* Function: getMaxStorage
        * 
        */
        getMaxStorage: function (xhr, event) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            var response = xhr.responseText;
            var tmp = response.trim();
            d.innerHTML = tmp;
            var maxStoreText = d.querySelector("#StorehouseFill + div").textContent;
            var maxStorage = parseInt(dt.replaceAll(maxStoreText.split(":")[1].trim(),",",""));
            dt[PlayerId].towns[CurrentTown].inv.maxStore = maxStorage;
            var key = CurrentTown + ':inv';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].inv));
        },
        resUpdateImproved: function(xhr,event){
            if(!dt[PlayerId].towns.list.includes(CurrentTown)){
                dt.getTownList();
            }
            var msg = dt[PlayerId].towns[CurrentTown].name + " resource update started.";
            dt.logEntry(msg);
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
//                console.log("resUpdate:d ",d);
            }
            // Parse the response text in xhr
            var response = JSON.parse(xhr.responseText);
            // Get the current 4 digit year
            var yr = new Date(event.timeStamp).getUTCFullYear();
            // Get the town id from the data
            const t = JSON.parse(xhr.responseText).t;
            // Create the key for storing the updated inventory
            const key = t + ':inv';
            // Check if the data contains base res information and extract if it does
            if (response.hasOwnProperty("tn")) {
                // Get the base res info from the data
                let tmp = response.tn.trim();
                // Insert this into the docfrag
                d.innerHTML = tmp;
                // Get the cells containing the relevant data from the docfrag
                const baseTrs = d.querySelectorAll("#tbRes.generic tbody tr");
                // Create the two cells html selections
                const cells = baseTrs[0].querySelectorAll('td');
                const cells2 = baseTrs[1].querySelectorAll('td');
                // Call the updated baseExtraction function
                const bRes = this.baseExtract(cells,cells2);
                // Update the town inventory with the returned data
                for (const prop in bRes) {
                    if (Object.hasOwn(bRes, prop)) {
 //                       console.log(prop, advanced[prop]);
                        dt[PlayerId].towns[CurrentTown].inv.res[prop] = bRes[prop];
 //                       console.log("inv: ",prop,dt[PlayerId].towns[CurrentTown].inv.res[prop]);
                    }
                }
                // Store the town inventory
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[t].inv));
            }
            // Check if the data contains adv res information and extract if it does
            if (response.hasOwnProperty("ar")) {
                // Get the base res info from the data
                let tmp = response.ar.trim();
                // Insert this into the docfrag
                d.innerHTML = tmp;
                // Get the cells containing the relevant data from the docfrag
                const advTrs = d.querySelectorAll("table.generic tbody tr");
                // Create the two cells html selections
                const cells = advTrs[0].querySelectorAll('td');
                const cells2 = advTrs[1].querySelectorAll('td');
                // Call the updated baseExtraction function
                const aRes = this.advExtract(cells,cells2);
                // Update the town inventory with the returned data
                for (const prop in aRes) {
                    if (Object.hasOwn(aRes, prop)) {
 //                       console.log(prop, advanced[prop]);
                        dt[PlayerId].towns[CurrentTown].inv.res[prop] = aRes[prop];
 //                       console.log("inv: ",prop,dt[PlayerId].towns[CurrentTown].inv.res[prop]);
                    }
                }
                // Store the town inventory
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[t].inv));
            }
            var msg = dt[PlayerId].towns[CurrentTown].name + " resource update completed.";
            dt.logEntry(msg);
        },
        /* Function: resUpdate
        * Called when an update from the server is intercepted that contains either 
        * base or advanced resource information. It creates a document fragment and 
        * cycles through the properties of the intercept calling other functions to 
        * parse the property contents. On completion of the parsing it will call 
        * locStorage to update the stored info.
        * 
        * Parameters:
        * xhr - object. The data from the server.
        * event - object. Details such as the timing of the event.
        * 
        * Calls:
        * <dt.invent.getBaseRes> <dt.invent.getAdvRes> <dt.logEntry> <locStorage>
        */
        resUpdate: function (xhr, event) {
            if(!dt[PlayerId].towns.list.includes(CurrentTown)){
                dt.getTownList();
            }
            var msg = dt[PlayerId].towns[CurrentTown].name + " resource update started.";
            dt.logEntry(msg);
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            var response = JSON.parse(xhr.responseText);
            var yr = new Date(event.timeStamp).getUTCFullYear();
            if (response.hasOwnProperty("tn")) {
                // tn holds the basic res
                var t = JSON.parse(xhr.responseText).t;
                var tmp = response.tn.trim();
                d.innerHTML = tmp;
                var tBody = d.querySelector("#tdRestb > table > tbody");
                var baseTrs = d.querySelectorAll("#tbRes.generic tbody tr");
                var rubbish = "";
                var baseRes = this.getBaseRes(baseTrs, yr, t);
                var key = t + ':inv';
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[t].inv));
    //            var msg = "Base resource scan done.";
    //            dt.logEntry(msg);
            }
            if (response.hasOwnProperty("ar")) {
                var t = JSON.parse(xhr.responseText).t;
                var tmp = response.ar.trim();
                d.innerHTML = tmp;
                var advTrs = d.querySelectorAll("tr");
                var rubbish = "";
//                var advRes = this.getAdvRes(advTrs, yr, t);
                var cells = advTrs[0].getElementsByTagName("td");
                var cells2 = advTrs[1].getElementsByTagName("td");
                var advanced = this.advExtract(cells,cells2);

                for (const prop in advanced) {
                    if (Object.hasOwn(advanced, prop)) {
 //                       console.log(prop, advanced[prop]);
                        dt[PlayerId].towns[CurrentTown].inv.res[prop] = advanced[prop];
 //                       console.log("inv: ",prop,dt[PlayerId].towns[CurrentTown].inv.res[prop]);
                    }
                }
                var key = t + ':inv';
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[t].inv));
            }
            if (dt.popupStates.BaseInvs === true) {
                dt.invent.dispBaseInv();
            }
            var msg = dt[PlayerId].towns[CurrentTown].name + " resource update finished.";
            dt.logEntry(msg);
        },
        /* Function: getBaseRes
        * Parse a series of html elements to get details of the updated base 
        * resource levels.
        * 
        * Parameters:
        * basetrs - object. The table rows holding the base resources information.
        * yr - string. The 4 digit year the intercept happened.
        * townId - string. The id of the town the update is for. Can't use 
        *          CurrentTown as the user may have changed towns since the 
        *          intercept happened.
        *          
        * 
        */
        getBaseRes: function (basetrs, yr, townId) {
            var cells = basetrs[0].getElementsByTagName("td");
            var cells2 = basetrs[1].getElementsByTagName("td");
            var emptyRes = {
                "Gold": {"id": "i=4|1", "held": 0, "rate": 0, "classes": " resIcon ico-gold"},
                "Wood": {"id": "i=1|1", "held": 0, "rate": 0, "classes": " resIcon ico-wood"},
                "Clay": {"id": "i=1|2", "held": 0, "rate": 0, "classes": " resIcon ico-clay"},
                "Iron": {"id": "i=1|3", "held": 0, "rate": 0, "classes": " resIcon ico-iron"},
                "Stone": {"id": "i=1|4", "held": 0, "rate": 0, "classes": " resIcon ico-stone"},
                "Food": {"id": "i=1|5", "held": 0, "rate": 0, "classes": " resIcon ico-food"},
                "Mana": {"id": "i=2|1", "held": 0, "rate": 0, "classes": " resIcon ico-mana"},
                "Research": {"id": "i=2|2", "held": 0, "rate": 0, "classes": " resIcon ico-research"},
                "Horse": {"id": "i=3|1", "held": 0, "rate": 0, "classes": " resIcon ico-horses"},
                "Livestock": {"id": "i=3|2", "held": 0, "rate": 0, "classes": " resIcon ico-livestock"},
                "Beer": {"id": "i=3|12", "held": 0, "rate": 0, "classes": " resIcon ico-beer"},
                "Book": {"id": "i=3|7", "held": 0, "rate": 0, "classes": " resIcon ico-books"},
                "Spear": {"id": "i=3|5", "held": 0, "rate": 0, "classes": " resIcon ico-spears"},
                "Sword": {"id": "i=3|3", "held": 0, "rate": 0, "classes": " resIcon ico-swords"},
                "Bow": {"id": "i=3|4", "held": 0, "rate": 0, "classes": " resIcon ico-bows"},
                "Saddle": {"id": "i=3|6", "held": 0, "rate": 0, "classes": " resIcon ico-saddles"},
                "Leather Armour": {"id": "i=3|8", "held": 0, "rate": 0, "classes": " resIcon ico-leather"},
                "Chainmail": {"id": "i=3|9", "held": 0, "rate": 0, "classes": " resIcon ico-chainmail"},
                "Plate Armour": {"id": "i=3|10", "held": 0, "rate": 0, "classes": " resIcon ico-plate"},
                "Siege Block": {"id": "i=3|11", "held": 0, "rate": 0, "classes": " resIcon ico-siege"}
            };
            if (!dt[PlayerId].towns[townId].inv.res) {
                dt[PlayerId].towns[townId].inv.res = emptyRes;
            }
            var baseRes = dt[PlayerId].towns[townId].inv.res;
            var baseResNames = ["Gold", "Wood", "Clay", "Iron", "Stone", "Food", "Mana", "Research"];
            var tdi = 0;
            var tdi2 = 0;
            baseResNames.forEach(function (item) {
                if (!baseRes[item]) {
                    // No entry for this item so add it
                    baseRes[item] = emptyRes[item];
                }
                baseRes[item].held = parseInt(cells[tdi].getAttribute("data"));
                baseRes[item].rate = cells[tdi].getAttribute("inc");
                if (cells2[tdi2].getAttribute("data")) {
                    baseRes[item].makeing = cells2[tdi2].getAttribute("data");
                }
                tdi = tdi + 2;
                tdi2 = tdi2 + 1;
            });
            dt[PlayerId].towns[townId].inv.res = baseRes;

        },
        /* Function: getAdvRes
        * Parse a series of html elements to get details of the updated advanced 
        * resource levels.
        * 
        * Parameters:
        * advtrs - object. The table rows holding the advanced resources information.
        * yr - string. The 4 digit year the intercept happened.
        * townId - string. The id of the town the update is for. Can't use 
        *          CurrentTown as the user may have changed towns since the 
        *          intercept happened.
        * 
        */
        getAdvRes: function (advtrs, yr, townId) {
            var cells = advtrs[0].getElementsByTagName("td");
            var cells2 = advtrs[1].getElementsByTagName("td");
            dt.cells1 = cells;
            dt.cells2 = cells2;
            if (!dt[PlayerId].towns[townId].inv.res) {
                dt[PlayerId].towns[townId].inv.res = {
                    "Gold": {"id": "i=4|1", "held": 0, "rate": 0, "classes": " resIcon ico-gold"},
                    "Wood": {"id": "i=1|1", "held": 0, "rate": 0, "classes": " resIcon ico-wood"},
                    "Clay": {"id": "i=1|2", "held": 0, "rate": 0, "classes": " resIcon ico-clay"},
                    "Iron": {"id": "i=1|3", "held": 0, "rate": 0, "classes": " resIcon ico-iron"},
                    "Stone": {"id": "i=1|4", "held": 0, "rate": 0, "classes": " resIcon ico-stone"},
                    "Food": {"id": "i=1|5", "held": 0, "rate": 0, "classes": " resIcon ico-food"},
                    "Mana": {"id": "i=2|1", "held": 0, "rate": 0, "classes": " resIcon ico-mana"},
                    "Research": {"id": "i=2|2", "held": 0, "rate": 0, "classes": " resIcon ico-research"},
                    "Horse": {"id": "i=3|1", "held": 0, "rate": 0, "classes": " resIcon ico-horses"},
                    "Livestock": {"id": "i=3|2", "held": 0, "rate": 0, "classes": " resIcon ico-livestock"},
                    "Beer": {"id": "i=3|12", "held": 0, "rate": 0, "classes": " resIcon ico-beer"},
                    "Book": {"id": "i=3|7", "held": 0, "rate": 0, "classes": " resIcon ico-books"},
                    "Spear": {"id": "i=3|5", "held": 0, "rate": 0, "classes": " resIcon ico-spears"},
                    "Sword": {"id": "i=3|3", "held": 0, "rate": 0, "classes": " resIcon ico-swords"},
                    "Bow": {"id": "i=3|4", "held": 0, "rate": 0, "classes": " resIcon ico-bows"},
                    "Saddle": {"id": "i=3|6", "held": 0, "rate": 0, "classes": " resIcon ico-saddles"},
                    "Leather Armour": {"id": "i=3|8", "held": 0, "rate": 0, "classes": " resIcon ico-leather"},
                    "Chainmail": {"id": "i=3|9", "held": 0, "rate": 0, "classes": " resIcon ico-chainmail"},
                    "Plate Armour": {"id": "i=3|10", "held": 0, "rate": 0, "classes": " resIcon ico-plate"},
                    "Siege Block": {"id": "i=3|11", "held": 0, "rate": 0, "classes": " resIcon ico-siege"}
                };
            }
//            var advRes = ["Horse", "Livestock", "Beer", "Spear", "Sword", "Bow", "Saddle", "Leather Armour", "Chainmail", "Plate Armour", "Siege Block"];
            var advRes = ["Horse", "Livestock", "Beer", "Book","Spear", "Sword", "Bow", "Saddle", "Leather Armour", "Chainmail", "Plate Armour", "Siege Block"];
            var baseRes = dt[PlayerId].towns[townId].inv.res;
            var cells = advtrs[0].getElementsByTagName("td");
            var tdi = 0;
            var tdi2 = 0;
            advRes.forEach(function (item) {
                baseRes[item].held = cells[tdi].getAttribute("data");
                baseRes[item].rate = cells[tdi].getAttribute("inc");
                if (cells2[tdi2].getAttribute("data")) {
                    baseRes[item].makeing = cells2[tdi2].getAttribute("data");
                }
                tdi + 2;
                tdi2 + 1;
            });
            console.log("getAdvRes: ",dt[PlayerId].towns[CurrentTown].inv.res["Siege Block"]);
            console.log("cells: ",dt.cells1);
            console.log("cells2: ",dt.cells2);
        },
        /* Function: subInvUpdate
        * Called when an update to a sub-inventory area is intercepted.
        * Places the intercepted html in a document fragment for processing. The 
        * relevant data is extracted from the fragment and the current holdings of 
        * the items updated. Once completed the updated inventory is stored.
        * 
        * Calls:
        * <dt.logentry> <locStorage>
        */
        subInvUpdate: function (xhr, event) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            var response = xhr.responseText;
            var yr = new Date(event.timeStamp).getUTCFullYear();
            var tmp = response.trim();
            d.innerHTML = tmp;
            var nameSwap = {'i=3|1': 'Horse', 'i=3|2': 'Livestock', 'i=3|3': 'Sword', 'i=3|4': 'Bow', 'i=3|5': 'Spear', 'i=3|6': 'Saddle', 'i=3|7': 'Book', 'i=3|8': 'Leather Armour', 'i=3|9': 'Chainmail', 'i=3|10': 'Plate Armour', 'i=3|11': 'Siege Block', 'i=3|12': 'Beer'};
            var area = ['res', 'weapons', 'armour', 'anatomies', 'minerals', 'herbs', 'exotic', 'mounts'];
            var targ = event.target.URL;
            if (targ.indexOf("?") > 0) {
                var sect = targ.split("?")[1].split("=")[1];
            } else {
                sect = "0";
            }
            var thisSect = area[sect];
            // Clear the current items in this section for the current town
            dt[PlayerId].towns[CurrentTown].inv[thisSect] = {};
            var tbls = d.querySelectorAll("table");
            if (tbls.length > 1) {
                for (tInd = 1; tInd < tbls.length; tInd++) {
                    var thisTbl = tbls[tInd];
                    var trs = thisTbl.querySelectorAll("tr");
                    for (r = 0; r < trs.length; r++) {
                        var tds = trs[r].querySelectorAll("td");
                        var thisItem = {"classes": null, "held": null, "id": null, "rate": 0};
                        thisItem.held = dt.replaceAll(tds[2].textContent,",","");
                        thisItem.id = tds[0].textContent.replace("[@", "");
                        thisItem.id = thisItem.id.replace("]", "");
                        var itemName = tds[1].textContent;
    //                    if (sect == 0) {
                        if (thisItem.id.indexOf("|") > 0) {
                            thisItem.classes = cp[thisItem.id.split("|")[1]].is;
                        } else {
                            thisItem.classes = cp[thisItem.id.split("=")[1]].is;
                        }
                        dt[PlayerId].towns[CurrentTown].inv[thisSect][itemName] = thisItem;
                        qty = thisItem.held;
                    }
                }
            }
            if(sect == 0){
                setTimeout(dt.invent.updateResPos, 1000);
            }
            var key = CurrentTown + ':inv';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].inv));
            var msg = dt[PlayerId].towns[CurrentTown].name + " - " + thisSect + " Sub-Inventory scan done.";
            dt.logEntry(msg);
        },

        updateResPos: function(){
            var dat = {};
            var invTbls = document.querySelectorAll("div.info > table table tr");
            var advres =  document.querySelectorAll("#advRes > table tr");
            
            var tds1 = advres[0].querySelectorAll("td.resIco span");
            var tds2 = advres[1].querySelectorAll("td");
            
            for(i=0;i<tds1.length;i++){
                d = tds1[i].getAttribute("data");
                dat[d] = tds2[i].getAttribute("data");
            }
    //            console.log(dat);
            for(i=0;i<invTbls.length;i++){
                var tds = invTbls[i].querySelectorAll("td");
                var d = tds[0].querySelector("span").getAttribute("data");
                tds[3].textContent = "+" + dat[d];
        //        console.log(d,dat[d]);
            }
            
        },

        getHubList: function (xhr, event) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            var response = xhr.responseText;
            var tmp = response.trim();
            d.innerHTML = tmp;
        //	if(!dt[PlayerId].hubs){
        //		dt[PlayerId].hubs = {};
        //	}
            // Get any current hub data from local storage
            dt[PlayerId].hubs = JSON.parse(locStorage.getItem(PlayerId + ':hubs'));
            if(dt[PlayerId].hubs === null){
                    dt[PlayerId].hubs = {};
                }
            
            if (d.querySelector("#HubId") !== null) {
                var hubSelect = d.querySelector("#HubId");
                var hubOpts = hubSelect.querySelectorAll('option');
                var numHubs = hubOpts.length;
                if(!dt[PlayerId].hubs.list){
                    dt[PlayerId].hubs.list = [];
                }
                dt[PlayerId].hubs.numHubs = numHubs;
                var list = [];
                for (var i = 0; i < numHubs; i++) {
                    var hubId = hubOpts.item(i).getAttribute('value');
                    var optText = hubOpts.item(i).textContent;
                    var name = optText.split("-").join("");
                    // Remove everything past '('
                    name = name.split("[")[0];
                    name = name.trim();
                    if (hubId == 0) {
                        var traders = 0;
                        var vans = 0;
                    } else {
                        var vanStart = parseInt(optText.lastIndexOf('Caravans:'));
                        var goodStart = parseInt(optText.lastIndexOf('Goods:'));
                        var traderStart = parseInt(optText.lastIndexOf('Traders:'));
                        var traders = hubOpts.item(i).textContent.substring(traderStart, goodStart);
                        traders = dt.replaceAll(traders, 'Traders:', '');
                        traders = traders.trim();
                        var vans = optText.substring(vanStart);
                        vans = dt.replaceAll(traders, 'Caravans:', '');
                        vans = vans.trim();
                    }
                    if (dt[PlayerId].hubs.hasOwnProperty(hubId) === false) {
                        dt[PlayerId].hubs[hubId] = new dt.hubs(name, '', '', traders, vans, new dt.inv(0, {}, {}, {}, {}, {}, {}, {}, {}));
                    } else {
                        dt[PlayerId].hubs[hubId].name = name;
                        dt[PlayerId].hubs[hubId].traders = traders;
                        dt[PlayerId].hubs[hubId].vans = vans;
                    }
                }
                // Update the list of hubs
                let k = Object.keys(dt[PlayerId].hubs);
                for(let ind = 0;ind<k.length;ind++){
                    if(k[ind] !== "list" && k[ind] !== "numHubs"){
                        if(!dt[PlayerId].hubs.list.includes(k[ind])){
                            dt[PlayerId].hubs.list.push(k[ind]);
                        }
                    }
                }
                dt[PlayerId].hubs.list.sort();
            }
            // Store the updated hub info
            var key = PlayerId + ':hubs';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].hubs));
            var msg = PlayerId + " - Hub list updated.";
            dt.logEntry(msg);
        },
        /* Function: hubUpdate
        * Called when an update to hub information is intercepted from the server
        * 
        */
        hubUpdate: function (xhr, event) {
            dt[PlayerId].hubs = JSON.parse(locStorage.getItem(PlayerId + ':hubs'));
            if(dt[PlayerId].hubs === null){
                dt[PlayerId].hubs = {};
            }

    //        console.log(xhr,event);
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            var response = xhr.responseText;
            var tmp = response.trim();
            d.innerHTML = tmp;
            
    //        var hubSelect = d.getElementById('HubId');
            var hubOpts = d.querySelectorAll("#HubId option");
        // If hubOpts.length == 0 then there is no hub info available in this town so skip the rest of this function
            if(hubOpts.length > 0){
                var numHubs = hubOpts.length;
        //        if(!dt[PlayerId].hubs.list){
        //            dt[PlayerId].hubs.list = [];
        //        }
        //        dt[PlayerId].hubs.numHubs = numHubs;
                var list = [];


                var rubbish = "";
                var nameSwap = {'i=3|1': 'Horse', 'i=3|2': 'Livestock', 'i=3|3': 'Sword', 'i=3|4': 'Bow', 'i=3|5': 'Spear', 'i=3|6': 'Saddle', 'i=3|7': 'Book', 'i=3|8': 'Leather Armour', 'i=3|9': 'Chainmail', 'i=3|10': 'Plate Armour', 'i=3|11': 'Siege Block', 'i=3|12': 'Beer'};
                var area = ['res', 'weapons', 'armour', 'anatomies', 'minerals', 'herbs', 'exotic', 'mounts'];
                var targ = event.target.URL;
                if (targ.indexOf("?") > 0) {
                    var sect = targ.split("?")[1].split("=")[2];
                } else {
                    sect = "0";
                }
                var thisSect = area[sect];
                // Clear the current items in this section for the current town
        //        $("#HubId :selected").text(); // The text content of the selected option
                var hubId =  d.querySelector("#HubId option[selected='selected']").value;
        //        var hubId = $("#HubId :selected").val(); // The value of the selected option;

        //      var key = dt[PlayerId].hubs[hubId].name + ':inv';

        //        dt[PlayerId].hubs[hubId].inv = JSON.parse(locStorage.getItem(hubId + ':inv'));
        //        if(dt[PlayerId].hubs[hubId].inv === null){
        //            dt[PlayerId].hubs[hubId].inv = {};
        //        }

                dt[PlayerId].hubs[hubId].inv[thisSect] = {};
                var tbls = d.querySelectorAll("table");
                if (tbls.length > 1) {
                    for (tInd = 1; tInd < tbls.length; tInd++) {
                        var thisTbl = tbls[tInd];
                        var trs = thisTbl.querySelectorAll("tr");
                        for (r = 0; r < trs.length-1; r++) {
                            var tds = trs[r].querySelectorAll("td");
                            if(tds.length > 0){
                                var thisItem = {"classes": null, "held": null, "id": null, "rate": 0};
                                thisItem.held = dt.replaceAll(tds[2].textContent,",","");
                                thisItem.id = tds[0].textContent.replace("[@", "");
                                thisItem.id = thisItem.id.replace("]", "");
                                var itemName = tds[1].textContent;
                                if (sect == 0) {
                                    var t = dt.invent.objSearch2(cp, "n", itemName);
                                }
                                if(t){
                                    thisItem.classes = cp[t].is;
                                }else{
                                    if (thisItem.id.indexOf("|") > 0) {
                                        thisItem.classes = cp[thisItem.id.split("|")[1]].is;
                                    } else {
                                        thisItem.classes = cp[thisItem.id.split("=")[1]].is;
                                    }
                                }

                                dt[PlayerId].hubs[hubId].inv[thisSect][itemName] = thisItem;
                                qty = thisItem.held;
                            }
                        }
                        var key = PlayerId + ':hubs';
                //        locStorage.setItem(key, JSON.stringify(dt[PlayerId].hubs[hubId].inv));
                        locStorage.setItem(key, JSON.stringify(dt[PlayerId].hubs));
                        var msg = dt[PlayerId].hubs[hubId].name + " - " + thisSect + " Sub-Inventory scan done.";
                        dt.logEntry(msg);
                        
                    }
                }
                if(sect == 0){
                    setTimeout(dt.invent.updateResPos, 1000);
                }
        //        var key = dt[PlayerId].hubs[hubId].name + ':inv';
                var key = PlayerId + ':hubs';
        //        locStorage.setItem(key, JSON.stringify(dt[PlayerId].hubs[hubId].inv));
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].hubs));
                var msg = dt[PlayerId].hubs[hubId].name + " - " + thisSect + " Sub-Inventory scan done.";
                dt.logEntry(msg);
            }
        }
    };
}