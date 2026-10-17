/* File: trade5.js
*
*/
dttrade = function(){
    dt.trade = {
        dataSelected: false,
        historySelected: false,

    /*     function (n) {
            try {
            var i = $(n.currentTarget),
            r = i.attr('data') ||
            i.attr('data-link'),
            t = ExtractData(r);
            t &&
            t.popup &&
            t.popup({
                data: t
            })
            } catch (u) {
            }
    */
    tradeOrders: function(){

        // Set up an event listener on the tree
        document.getElementById("tree").addEventListener("click", (e) => {
            console.log("t: ",e.target,"p: ",e.target.parentElement);
            if(e.target.parentElement.classList.contains('jstree-leaf')){
    //            console.log("item selected");
                var t = e.target.textContent.trim();
                var q = Number(t.split("(")[1].replace(")",""));
                dt.tradeOrderItem = {t:t,q:q};
                console.log("Title: ",t," Qty: ",q);
            }
        });
        // Select the node that will be observed for mutations
        var targetNode = document.querySelector("#consignment");

        // Options for the observer (which mutations to observe)
        var config = {childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        
        var callback = function(mutationsList) {
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                var a = mutation.addedNodes;
    //            orderObserver.disconnect();
                try{
                    for (var item of a) {
                        var thisI = item;
                        var iElems = thisI.querySelectorAll("input");
                        //console.log("iElems: ",iElems);
                        if(iElems.length == 3){
                            var thisI2 = document.querySelectorAll("#" + item.id + " input:nth-child(2)")[0];
                        }else{
                            var thisI2 = document.querySelectorAll("#" + item.id + " input:nth-child(3)")[0];
                        }
                        thisI2.setAttribute("onblur","dt.trade.getVanTots()");
                        var td = thisI.querySelector(".right");
                        var mb = document.createElement("input");
                        mb.setAttribute("type","button");
                        mb.setAttribute("onclick","dt.trade.sendAll(event)");
                        mb.setAttribute("title","Send all");
                        mb.setAttribute('data-qty',dt.tradeOrderItem.q);
                        mb.classList.add("greenB");
                        td.insertBefore(mb, td.firstChild);
                        orderObserver.observe(targetNode, config);
                    }
                }catch (error) {
                    //console.error(error);
                    // Expected output: ReferenceError: nonExistentFunction is not defined
                    // (Note: the exact output may be browser-dependent)
                }
                
                var d = mutation.removedNodes;
                if(d.length > 0){
                    dt.trade.getVanTots();
                }
            }
        }
        }
        // Create an observer instance linked to the callback function
        var orderObserver = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        orderObserver.observe(targetNode, config);
        dt.trade.setTitles();

    },
    sendAll: function(event){
        qi = event.target.parentElement.querySelector("[name='Quantity']");
        //console.log("qty inp: ",qi);
        let q = Number(event.target.dataset.qty);
        var result = dt.trade.getVanTots();
        var spaceLeft = result.spaceLeft;
        var maxCap = result.maxCap;
        var qs = Math.min(q, spaceLeft);
        if(event.target.parentElement.parentElement.id == "cons183") qs = q;
        qi.setAttribute('value',qs);
        dt.trade.getVanTots();
    var rubbish = "";  
    },
    getVanTots: function (){
        var vanSize = CarryingCapacity;
        var cVan = document.querySelector("div.fRight");
        var maxCap = Number(cVan.parentElement.nextElementSibling.querySelector("td:nth-child(4)").textContent);

        var loadTot = this.getVtot();
        var vansReq = Math.ceil(loadTot / vanSize);
        var spaceLeft = maxCap - loadTot;
        var vanSpace = (vanSize * vansReq) - loadTot;
        cVan.setAttribute("title", "Current van has " + vanSpace + " cap left.\n" + spaceLeft + " total space left.");
        //console.log(cVan);
        return { spaceLeft: spaceLeft, maxCap: maxCap };
    //    console.log("getVanTots called...");
    },
    setTitles: function (){
    var icoList = document.querySelectorAll("li.jstree-leaf a");
    //  console.log(icoList);
    for(i=0;i<icoList.length;i++){
        var t = icoList[i].textContent;
        icoList[i].querySelector("ins").setAttribute("title",t);
    }
    },
    getVtot: function () {
        var vTot = 0;
        var iTable = document.querySelector("#consignment");
        var trs = iTable.querySelectorAll("tr");
        for (var i = 1; i < trs.length; i++) {
            if (trs[i].id == "cons183") {
                var inps = trs[i].querySelectorAll("input");
                if (Number(inps[1].value) > 0) {
                    vTot += 1;
                }
            } else {
                var inps = trs[i].querySelectorAll("input");
                num = Number(inps[2].value);
                vTot += isNaN(num) ? 0 : num;
            }
        }
        return vTot;
    },


        scanTradeMov: function () {
    //	funcTracker.push(['scanTradeMov - NOT DEFINED',new Date()]);
        },
        scanTradeOverview: function () {
    //	funcTracker.push(['scanTradeOverview - NOT DEFINED',new Date()]);
        },
        tradeMarkets: function () {
            if (this.historySelected && this.dataSelected) {
                if (!document.getElementById('extDL')) {
                    var parent = document.querySelector('div.flotr-datagrid-toolbar');
                    // <button class="flotr-datagrid-toolbar-button" type="button">Download CSV</button>
                    var newBut = dt.addElement2(parent, 'button', ['class', 'type', 'onclick', 'id'], ['dt-added-button', 'button', 'dt.trade.extDownload()', 'extDL']);
                    newBut.textContent = "Ext Download";
                    var rubbish4 = '';
                }
            }
        },
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
            var titleLine = document.querySelector('div#ItemDetail div h3').textContent;
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
            var tbl = document.querySelector('table.flotr-datagrid');
            var rows = tbl.querySelectorAll('tr');
            var cells = '';
            for (var i = 1; i < rows.length; i++) {
                var thisline = [];
                cells = rows.item(i).querySelectorAll('th,td');
                for (var j = 0; j < cells.length; j++) {
                    thisline[j] = '"' + cells.item(j).textContent + '"';
                }
                tblData += thisline.join(',') + '\r\n';
            }
            document.location = 'data:Application/octet-stream,' + encodeURIComponent(tblData);
            var rubbish = '';
        },
        cpSearch: function (needle) {
            for (var prop in cp) {
                if (cp.hasOwnProperty(prop) && cp[prop].n === needle) {
                    //Found needle!
                    return prop;
                }
            }
            return false;
        },
        factionHubDetails: function () {
            tool = document.getElementById("hubDetails");
            bdy = tool.querySelector("tbody");
            dt.removeRows(tool);
            var fs = dt[PlayerId].factions;
            for (r = 0; r < dt.hubDetails.length; r++) {
                thisHub = dt.hubDetails[r];
                row = bdy.insertRow(-1);
                cell = row.insertCell(0);
                cell.innerHTML = '<a onclick="href=&quot;#/World/Map/' + thisHub.x + '/' + thisHub.y + '/5&quot;">' + thisHub.name + '</a>';
                cell = row.insertCell(1);
                cell.textContent = thisHub.regionName;
                cell = row.insertCell(2);
                cell.innerHTML = '<a href="#/Alliance/Faction/'+thisHub.factionId+'">'+thisHub.factionName+'</a>';
    //            cell.textContent = thisHub.factionName;
                cell = row.insertCell(3);
                cell.textContent = thisHub.x;
                cell = row.insertCell(4);
                cell.textContent = thisHub.y;
                cell = row.insertCell(5);
                source = [dt[PlayerId].towns[CurrentTown].x, dt[PlayerId].towns[CurrentTown].y];
                dest = [thisHub.x, thisHub.y];
                cell.textContent = Math.round(Number(dt.hypot(source, dest)));
                cell = row.insertCell(6);
                try{
                    source = [mapData.x, mapData.y];
                    dest = [thisHub.x, thisHub.y];
                    cell.textContent = Math.round(Number(dt.hypot(source, dest)));
                }
                catch{
                    cell.textContent = "";
                }
                
                cell = row.insertCell(7);
                if(fs.hasOwnProperty(thisHub.factionId)){
                    cell.textContent = fs[thisHub.factionId][0];
                }else{
                    cell.textContent = "?";
                }
                cell = row.insertCell(8);
                if(fs.hasOwnProperty(thisHub.factionId)){
                    cell.textContent = fs[thisHub.factionId][1];
                }else{
                    cell.textContent = "?";
                }
            }
            dt.showTool('#hubListHtml', "HubSumm");
        },
        
        storeSetup: function(){
            if (!document.getElementById('saveTradeBut')) {
                // Add the 'Save Trade' button to the headLinks menu bar
                var parent = document.querySelector(".headLinks");
                dt.addElement2(parent, 'input', ['id', 'value', 'class', 'type', 'onclick', 'style'], ['saveTradeBut', 'Save Trade', 'see menuBut', 'button', 'dt.trade.saveTrade()', 'float: right;']);
                dt.addElement2(parent, 'input', ['id', 'value', 'class', 'type', 'onclick', 'style'], ['showSavedTradeBut', 'Show Saved Trades', 'see menuBut', 'button', 'dt.trade.showStoredTrades()', 'float: right;']);
            }
        },

        showStoredTrades: function (town = CurrentTown) {
            this.doTownList();
            this.sourceSwitch('town', CurrentTown);
            dt.showTool("#storedTradesHtml");
        },

        doTownList: function () {
            // Populate the list of towns
            var twnArea = document.getElementById('sourceTownCol');
            var twnList = twnArea.querySelector("table");
            if (twnList === null) {
                var twnList = dt.addElement2(twnArea, 'table', ['border', 'border-collapse', 'class', 'width'], ['1', 'collapse', 'oddeven', '100%']);
                dt.addElement2(twnList, 'tbody', [], []);
            }
            dt.removeRows(twnList);
            var tblBdy = twnList.querySelector("tbody");
            var tRow = dt.addElement2(tblBdy, 'tr');
            var tCell = dt.addElement2(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
            tCell.innerHTML = 'Source';
            var tRow = dt.addElement2(tblBdy, 'tr');
            var tCell = dt.addElement2(tRow, 'td', ['id', 'class', 'data'], ['all', 'dthover', 'all']);
            tCell.innerHTML = 'Res Bomb';
            tCell.setAttribute('onclick', 'dt.trade.sourceSwitch("all","All")');
            var tRow = dt.addElement2(tblBdy, 'tr');
            var tCell = dt.addElement2(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
            tCell.innerHTML = 'Towns';
            for (var i = 0; i < dt[PlayerId].towns.numTowns; i++) {
                var tRow = dt.addElement2(tblBdy, 'tr');
                var tCell = dt.addElement2(tRow, 'td', ['id', 'class', 'data'], [dt[PlayerId].towns.list[i], 'dthover', 'towns']);
                var thisTwn = dt[PlayerId].towns.list[i];
                tCell.innerHTML = dt[PlayerId].towns[thisTwn].name;
                tCell.setAttribute('onclick', 'dt.trade.sourceSwitch("town",' + thisTwn + ')');
            }
        },
        getStoredTrades: function (townId) {
            return JSON.parse(locStorage.getItem(townId + ':trades'));
        },
        saveTrade: function (town = CurrentTown) {
            // Get the destination coords and build the url
            var formElement = document.querySelector("#MainContentDiv > div:nth-child(3) > div:nth-child(1) > form:nth-child(4)");
            var inputs = formElement.querySelectorAll('input[type="text"], input[type="hidden"]');
            var sendX = formElement.querySelector('input[name="SendX"]').value;
            var sendY = formElement.querySelector('input[name="SendY"]').value;
            if(sendX !== ""){
                // https://elgea.illyriad.co.uk/#/Trade/Orders/596/-3093
                newUrl = "https://elgea.illyriad.co.uk/#/Trade/Orders/"+sendX+"/"+sendY;
                town = CurrentTown;
            }else{
                newUrl = "https://elgea.illyriad.co.uk/#/Trade/Orders/";
                town = "all";
            }
            // Retrieve any stored trades for the town
            dt[PlayerId].towns[town].trade.storedTrades = this.getStoredTrades(town);
            if (dt[PlayerId].towns[town].trade.storedTrades == null) {
                dt[PlayerId].towns[town].trade.storedTrades = [];
            }
            var thisTrade = {};
            // Set the url
            thisTrade.url = newUrl;
            // Get the name of the sending town
            thisTrade.sourceName = dt[PlayerId].towns[CurrentTown].name;
            // Get the name of the destination town
            thisTrade.destName = document.getElementById("finderTownName").value;
            if (thisTrade.destName === "") {
                if (document.querySelector("#locationInner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(4) > td:nth-child(1)").textContent === "") {
                    thisTrade.destName = "All";
                    thisTrade.sourceName = "all";
                } else {
                    thisTrade.destName = document.querySelector("#locationInner > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(4) > td:nth-child(1)").textContent;
                }
            }
            // Get the date time the trade was stored
            thisTrade.dated = Date.now();
            // Get the form values
            var formElement = document.querySelector("#MainContentDiv > div:nth-child(3) > div:nth-child(1) > form:nth-child(4)");
            var inputs = formElement.querySelectorAll('input[type="text"], input[type="hidden"]');

    //        var theData = new FormData(formElement);
            // Get all the input element names and values.
            thisTrade.inputs = [];
            for (i = 0; i < inputs.length; i++) {
                thisInput = [];
                thisInput.push(inputs[i].name, inputs[i].value);
                thisTrade.inputs.push(thisInput);
            }
            // Get the html for all the items being sent.
            var sendItems = formElement.querySelector("div.info");
            thisTrade.itemsHtml = sendItems.innerHTML;
    //        // Get the html for the dest section
    //        thisTrade.destHtml = document.querySelector("#locationInner").innerHTML;

    //        console.log(thisTrade);
            if (!dt[PlayerId].towns[town].trade.hasOwnProperty('storedTrades')) {
                dt[PlayerId].towns[town].trade.storedTrades = [];
            }
            dt[PlayerId].towns[town].trade.storedTrades.push(thisTrade);
            var key = town + ':trades';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[town].trade.storedTrades));

            var dummy = '';
        },
        removeStored: function (town, index) {
            var removed = dt[PlayerId].towns[town].trade.storedTrades.splice(index, 1);
            var key = town + ':trades';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[town].trade.storedTrades));
            this.showStoredTrades(town);
        },

        rebuildTrade: function (town, num) {
            // Get the trade details
            dt[PlayerId].towns[town].trade.storedTrades = this.getStoredTrades(town);
            var thisTrade = dt[PlayerId].towns[town].trade.storedTrades[num];
            // Get and apply the url
            if(thisTrade.url !== "https://elgea.illyriad.co.uk/#/Trade/Orders/"){
                location = thisTrade.url;
            }
            // Wait for 1 sec to give the page time to load then carry on with the 
            // rest of the function.
            setTimeout(function () {
                // Get the form values
                var formElement = document.querySelector("#MainContentDiv > div:nth-child(3) > div:nth-child(1) > form:nth-child(4)");
                var sendItems = formElement.querySelector("div.info");
                sendItems.innerHTML = thisTrade.itemsHtml;
                // Loop through each of the items setting the qty to send
                var inpCount = thisTrade.inputs.length;
                for(var ind=3;ind<inpCount-1;ind+=2){
                    var thisItemQty = document.querySelector('#cons'+thisTrade.inputs[ind][1]+' input[name="Quantity"]');
                    thisItemQty.value = thisTrade.inputs[ind+1][1];
                }
            }, 1000);
        },
        sourceSwitch: function (part, new_tab) {
            // Set the active town
            var townCol = document.getElementById('sourceTownCol');
            var twns = townCol.getElementsByTagName('td');
            for (var i = 1; i < twns.length; i++) {
                twns.item(i).classList.remove("dtActive");
            }
            if (new_tab == "All") {
                document.getElementById("all").classList.add("dtActive");
            } else {
                document.getElementById(new_tab).classList.add("dtActive");
            }
            var source = new_tab;
            var town = new_tab;
            var where = 'towns';
            this.dispStoredTrades(where, town);
        },
        dispStoredTrades: function (where, town) {
            // If there are any stored trades display them otherwise display a message and exit
            // Get any trades stored for this town
            if (town == "All") {
                town = "all";
            }
            storedTradeDetails = this.getStoredTrades(town);

            tbl = document.getElementById("storedTradesList");
            var bdy = tbl.querySelector("tbody");
    //        var hdr = tbl.querySelector("th");
    //        hdr.textContent = "Stored Trades for " + dt[PlayerId].towns[town].name;
            // Clear all current entries from the table
            dt.removeRows(tbl);
            if (storedTradeDetails === null || storedTradeDetails.length === 0) {
                var row = bdy.insertRow(-1);
                var cell = row.insertCell(0);
                cell.setAttribute("colspan", "3");
                cell.innerHTML = "No stored trades for this town.";
            } else {
                // Loop through the entries in the storedTradeDetails array
                var keys = Object.keys(cp);
                for (var num = 0; num < storedTradeDetails.length; num++) {
                    thisTrade = storedTradeDetails[num];
                    var dest = thisTrade.destName;
                    var dated = new Date(thisTrade.dated);
                    var row = bdy.insertRow(-1);
                    var cell = row.insertCell(0);
                    cell.textContent = "To: " + thisTrade.destName;
                    cell = row.insertCell(1);
                    cell.textContent = "Stored: " + dated.toString();
                    cell = row.insertCell(2);
                    cell.setAttribute("rowspan", "2");
                    dt.addElement2(cell, 'input', ['class', 'type', 'value', 'onclick'], ['ck-button', 'button', 'Del', 'dt.trade.removeStored("' + town + '", "' + num + '")']);
                    // Step through the items in the inputs array
                    row = bdy.insertRow(-1);
                    cell = row.insertCell(0);
                    cell.setAttribute("colspan", "2");
                    var thisText = '';
                    var inputs = thisTrade.inputs;
                    var thisTradeItemArray = [];
                    for (var entry = 3; entry < inputs.length - 1; (entry += 2)) {
                        
                        var thisItem = thisTrade.inputs[entry];
                        // var newSpan = dt.addElement2(out, 'span', ['data', 'class', 'title'], [dat, "name " + cp[keys[i]].is, cp[keys[i]].n + " (cp=" + keys[i] + ")"]);
                        // <span data="c=17" class="name base wood_24" title="Wood (cp=17)"></span>
                        var thisIcon = '<span data="c=' + thisItem[1] + '" class="name ' + cp[thisItem[1]].is + '" title="' + cp[thisItem[1]].n + '"></span>';
                        thisTradeItemArray.push(thisIcon + " " + thisTrade.inputs[entry + 1][1]);
                        thisText = thisText + ", " + thisIcon + " " + thisTrade.inputs[entry + 1][1];
    //                    itemId = thisItem[1];
                    }
    //                console.log(thisTradeItemArray.join(', '));
    //                cell.innerHTML = thisText;
                    cell.innerHTML = thisTradeItemArray.join(', ');

                    cell.setAttribute("onclick", "dt.trade.rebuildTrade('" + town + "', '" + num + "')");
                    cell.setAttribute("title", "Click to load this trade");
                }
            }
            var dummy = '';
        },

        getTradeProdSchedule: function (xhr, event) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var infodivs = d.querySelectorAll("div.info");
            var yr = new Date(event.timeStamp).getUTCFullYear();
            var bldgs = this.tradeProdWorker(infodivs, yr);
            this.updateTradeProdStatus(bldgs);
        },
        tradeProdWorker: function (infodivs, yr) {
            var numInfos = infodivs.length;
            var bldgs = {};
            if (numInfos > 1) {
                var dParts = this.gameTimeToParts();
                var thisBldg = {"id": null, "name": null, "items": {}};
                thisBldg.id = "8";
                thisBldg.name = "Marketplace";
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
        updateTradeProdStatus: function (bldgs) {
            var townProd = dt[PlayerId].towns[CurrentTown].prod.trade;
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

    };
}
