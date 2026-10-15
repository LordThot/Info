/* File: production6.js
 * Functions to manage production queues and alerts.
 * Data on the queues is stored in the format:
 * {bId:buildingId,Building:buildingName,item:itemName,endsat:endingTimestamp}
 * The data is no longer stored in separate areas. rather those areas will be recreated for display purposes.
 */
dtprod = function(){
    dt.production = {

        setup: function () {
            dt.production.fullCompleteCheck();
            dt.production.updateFlag();
        },
        /**
         * Method: haveEnough
         * Extracts details of the items need to craft an item or train a unit and checks the town inventory 
         * to see it there are enough to make one. Any item that there are not enough of gets a pale red background on it.
         */
        haveEnough: function(){
            var tds = document.querySelectorAll("table.resUse td:has(span)");
            for (const item of tds.values()) {
                console.log(item);
                let q = parseInt(item.textContent);
                let n = item.firstElementChild.title;
                if(n === "Horses"){n="Horse"};
                if(n === "Suits of Plate Armour"){n="Plate Armour"};
                if(n === "Suits of Chainmail Armour"){n="Chainmail"};
                if(n === "Suits of Leather Armour"){n="Leather Armour"};
                if(n === "Swords"){n="Sword"};
                if(n === "Spears"){n="Spear"};
                if(n === "Bows"){n="Bow"};
                if(n === "Saddles"){n="Saddle"};
                if(n === "Siege Blocks"){n="Siege Block"};
                if(n === "Barrels of Beer"){n="Beer"};
                console.log(q,n);
                if(!dt.magic.checkInv(q,n)){
                    item.firstElementChild.classList.add("redB");
                }
            }
        },
        /**
         * Method: checkProdObj
         * Checks each town to make sure that each production building physically present in the town is included in the obj.
         */
        checkProdObj: function(){
            let tpbs = tProd2 = null;
            dt[PlayerId].towns.list.forEach((tId) => {
                tpbs = dt.production.getTownProdBldgs(tId);
                tProd2 = dt[PlayerId].towns[tId].prod2;
                tpbs.forEach((bId,ind) => {
                    if(!tProd2.hasOwnProperty(ind)){
                        tProd2[ind] = {name:tpbs[ind].name, type:tpbs[ind].class,queues:{}};
                    }else{
                        if(!tProd2[ind].hasOwnProperty('queues')){
                            let a = Object.keys(tProd2[ind]);
                            tProd2[ind].queues = {};
                            let t = [];
                            a.forEach((k) =>{
                                if(k !== 'name' && k!== 'type'){
                                    tProd2[ind].queues[k] = tProd2[ind][k];
                                    delete tProd2[ind][k];
    //                                t.push(tProd2[ind][a[k]]);
                                }
                            });
    //                        tProd2[ind].queues = t;
                        }
                    }
                })
            })
            console.log("checkProdObj: ",tProd2);
        },
        /* Method: parseBldgProd
        * Parse the intercept of a 'BuildingProduction' page
        * 
        */
        parseBldgProd2: function (xhr, event, bits) {
            if(!dt[PlayerId].towns[CurrentTown].prod2){
                dt[PlayerId].towns[CurrentTown].prod2 = JSON.parse(localStorage.getItem(CurrentTown + ":prod2"));
            }
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var infodivs = d.querySelectorAll("div.info");
            // The building
            var bId = event.currentTarget.URL.split("/")[6];
            var bName = dt.prodBuildings[bId].name;
            var prodArea = dt.prodBuildings[bId].class;

            let tProd2 = dt[PlayerId].towns[CurrentTown].prod2;
            tProd2[bId] = {name: dt.prodBuildings[bId].name, type: dt.prodBuildings[bId].class,queues:{}};
            if (infodivs.length > 1) {
                // The queued items
                var queue = infodivs[1].querySelectorAll("tr");
                for (let r = 1; r < queue.length; r++) {
                    var thisR = queue[r].querySelectorAll("td");
                    if(thisR[0].textContent[2] == 'i'){
                    var itemId = dt.icp[thisR[0].textContent.slice(2,-1)];
                    } else {
                        var itemId = thisR[0].textContent.slice(4,-1);
                    }
                    var itemName = thisR[1].textContent;
                    var data = thisR[5].querySelector("div").getAttribute('data').split('|');
                    var startDate = new Date(parseInt(data[0]));
                    var endDate = new Date(parseInt(data[1]));
                    if(tProd2[bId].queues.hasOwnProperty(itemId)){
                        tProd2[bId].queues[itemId].push([thisR[1].textContent,Number(data[0]),Number(data[1])])
                    } else {
                        tProd2[bId].queues[itemId]=[[thisR[1].textContent,Number(data[0]),Number(data[1])]];
                    }
                }
                data = startDate = endDate = docfrag = null;
            }
            dt[PlayerId].towns[CurrentTown].prod2 = tProd2;
            let key = CurrentTown + ":prod2";
            locStorage.setItem(key,JSON.stringify(tProd2));

        },
        /* Method: parseTownProd
        * Parse the intercept of a 'Production' page
        */
        parseTownProd2: function(xhr, event, bits){
            if(!dt[PlayerId].towns[CurrentTown].prod2){
                dt[PlayerId].towns[CurrentTown].prod2 = JSON.parse(localStorage.getItem(CurrentTown + ":prod2"));
            }
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var infodiv = d.getElementsByClassName("info")[0];
            var townProd = [];
            var fieldsets = infodiv.querySelectorAll("fieldset");
            var numFieldsets = fieldsets.length;
            var thisTPBs = [];
            let tProd2 = {};
            for (var i = 0; i < numFieldsets; i++) {
                var thisFieldset = fieldsets[i];
                var bId = thisFieldset.querySelector("a").getAttribute("href").split('/')[3];
                // Create the property in tProd2 for this building
                tProd2[bId] = {name: dt.prodBuildings[bId].name, type: dt.prodBuildings[bId].class,queues:{}};
                // Process the rows to find any items being produced
                // The queued items
                var trs = thisFieldset.querySelectorAll("tr");
                for (let r = 1; r < trs.length; r++) {
                    var thisR = trs[r].querySelectorAll("td");
    //                var itemId = dt.icp[thisR[0].textContent.slice(2,-1)];
                    if(thisR[0].textContent[2] == 'i'){
                        var itemId = dt.icp[thisR[0].textContent.slice(2,-1)];
                        } else {
                            var itemId = thisR[0].textContent.slice(4,-1);
                        }
                    var itemName = thisR[1].textContent;
                    var data = thisR[5].querySelector("div").getAttribute('data').split('|');
                    if(tProd2[bId].queues.hasOwnProperty(itemId)){
                        tProd2[bId].queues[itemId].push([thisR[1].textContent,Number(data[0]),Number(data[1])])
                    } else {
                        tProd2[bId].queues[itemId]=[[thisR[1].textContent,Number(data[0]),Number(data[1])]];
                    }
                }
            }
            dt[PlayerId].towns[CurrentTown].prod2 = tProd2;
            let key = CurrentTown + ":prod2";
            locStorage.setItem(key,JSON.stringify(tProd2));
        },
        /* Method: parseUnitProd
        * 
        */
        parseUnitProd2: function (xhr, event, bits) {
            if(!dt[PlayerId].towns[CurrentTown].prod2){
                dt[PlayerId].towns[CurrentTown].prod2 = JSON.parse(localStorage.getItem(CurrentTown + ":prod2"));
            }
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var infodivs = d.querySelectorAll("div.info");
            // The building
            var bId = event.currentTarget.URL.split("/")[6];
            var bName = dt.prodBuildings[bId].name;
            var prodArea = dt.prodBuildings[bId].class;

            let tProd2 = dt[PlayerId].towns[CurrentTown].prod2;
            tProd2[bId] = {name: dt.prodBuildings[bId].name, type: dt.prodBuildings[bId].class,queues:{}};
            if (infodivs.length > 1) {
                // The queued units
                var queue = infodivs[1].querySelectorAll("tr");
                for (let r = 1; r < queue.length; r++) {
                    var thisR = queue[r].querySelectorAll("td");
                    var unitId = thisR[0].textContent.slice(6,-1);
                    var unitName = thisR[1].textContent;
                    var data = thisR[5].querySelector("div").getAttribute('data').split('|');
                    var startDate = new Date(parseInt(data[0]));
                    var endDate = new Date(parseInt(data[1]));
                    if(tProd2[bId].hasOwnProperty(unitId)){
                        tProd2[bId].queues[unitId].push([thisR[1].textContent,Number(data[0]),Number(data[1])])
                    } else {
                        tProd2[bId].queues[unitId]=[[thisR[1].textContent,Number(data[0]),Number(data[1])]];
                    }
                }
                data = startDate = endDate = docfrag = null;
            }
            dt[PlayerId].towns[CurrentTown].prod2 = tProd2;
            let key = CurrentTown + ":prod2";
            locStorage.setItem(key,JSON.stringify(tProd2));

        }, 
        /* Check complete times
        * A simple check of the 'endsAt' property against the current datetime.
        * 
        * Parameters:
        * tId - integer. The id of the town to check.
        * list - array. An array holding the indexes of the elements in the src to check. If not present then check all elements.
        */
        /**
         * 
         * @param {string} tId - the id of the town to check
         * 
         * properties:
         * prod2 {object} - holds all the production info for the town.
         */
        checkComplete3: function(tId){
            if(!dt[PlayerId].towns[tId].prod2){
                dt[PlayerId].towns[tId].prod2 = JSON.parse(localStorage.getItem(tId + ":prod2"));
            }
            let p = dt[PlayerId].towns[tId].prod2;
            let pk = Object.keys(p);
            Object.entries(p).forEach(([bId,bData]) => {
                let d = this.checkBqs(tId,bId,bData.queues);
                p[bId].queues = d;
            })
            let key = tId + ":prod2";
            locStorage.setItem(key,JSON.stringify(p));
        },
        /*
        * checkIqs: Check if any of the queue entries for an item have finished and delete them if the have.
        *
        * Parameters:
        * t - int. The id of the town.
        * b - int. The id of the building.
        * i - int. The id of the item.
        * iq - array. Array of arrays each of which is the data for a queue entry.

        */
        checkIqs: function(t,b,i,iq){
            let cTS = Date.now();
            let completed = [];
            for(let ind=iq.length-1;ind>-1;ind--){
                if(!(iq[ind][2]>cTS)){
                    // End time has passed so make a notification then delete it
                    dt.production.makeNotify2(t,b,iq[ind]);
                    iq.splice(ind,1);
                }
            }
            return iq;
        },
        checkBqs: function(t,b,queues){
            let iKeys = Object.keys(queues);
            // Step through each item queue present in this building
            for(let ind = 0; ind < iKeys.length; ind++){
                // iq is the queue data for the current item
                let iq = queues[iKeys[ind]];
                // Check the entries in iq for having completed
                let d = this.checkIqs(t,b,iKeys[ind],queues[iKeys[ind]]);
                // d is the queue after checking for completed entries in the queue
                // If the returned item queue is empty remove the item otherwise set the item queue to the returned value.
                if(d.length == 0){
                    delete queues[iKeys[ind]];
                }else{
                    queues[iKeys[ind]] = d;
                }
            }
            return queues;
        },
        /* Check prod queues in all towns for completed entries.
        * 
        */
        fullCompleteCheck: function () {
            for (t = 0; t < dt[PlayerId].towns.list.length; t++) {
                dt.production.checkComplete3(dt[PlayerId].towns.list[t]);
            }
        },
        /* Make a notify entry and remove the entry from the town production array
        * 
        */
        makeNotify2: function (tId,bId,entry){
            let d=new Date(entry[2]);
            let prodN = '';
            if(bId < 90){
                prodN = {logged: true, seen: false, "body": "Production of "+entry[0]+" completed in "+dt[PlayerId].towns[tId].name+"'s "+dt.prodBuildings[bId].name+" at "+d};
            }else{
                prodN = {logged: true, seen: false, "body": "Production of "+entry[0]+" completed in "+dt[PlayerId].towns[tId].name+"'s TEST BLDG at "+d};
            }
            dt[PlayerId].prodNotices.unshift(prodN);
            dt.production.updateFlag();
            locStorage.setItem([PlayerId] + ":prodNotices", JSON.stringify(dt[PlayerId].prodNotices));
        },
        /* Method: updateFlag
        * Updates the count of unseen production notifications.
        */
        updateFlag: function () {
            var unseen = 0;
            dt[PlayerId].prodNotices.forEach(function (entry) {
                if (entry.seen === false) {
                    unseen++;
                }
            });
            document.getElementById("prodflag").textContent = unseen;
            document.getElementById("prodflag").setAttribute("title", unseen + " unread Production Alerts");
            if (dt.popupStates.AllQs) {
                dt.showTool("#showAllQueuesHtml", "AllQs");
            }
        },
        showProdAlerts: function () {
            var prodAlertPopUp = document.getElementById("prodAlertsHtml");
            var tBody = prodAlertPopUp.getElementsByTagName("tbody")[1];
            while (tBody.rows.length > 0) {
                tBody.deleteRow(0);
            }
            var numAlerts = dt[PlayerId].prodNotices.length;
            for (i = 0; i < numAlerts; i++) {
    //        dt[PlayerId].prodNotices.forEach(function (item) {
                var item = dt[PlayerId].prodNotices[i];
                var row = tBody.insertRow(-1);
                var cell = row.insertCell(0);
                // <input type="checkbox" id="cbox2" value="second_checkbox" checked="checked">
                var cBox = dt.addElement2(cell, "input", ["type", "value"], ["checkbox", i]);
                cBox.setAttribute("onchange", 'dt.production.alertDelHandler(' + i + ')');
                cell = row.insertCell(1);
                if (!item.seen) {
                    item.seen = true;
                    cell.innerHTML = "<strong>" + item.body + "</strong>";
                } else {
                    cell.innerHTML = item.body;
                }
            }
            ;
            var key = PlayerId + ':prodNotices';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].prodNotices));
            var key = CurrentTown + ':prod';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].prod));
            var unseen = 0;
            document.getElementById("prodflag").textContent = unseen;
            document.getElementById("prodflag").setAttribute("title", unseen + " unread Production Alerts");
            dt.popupStates.ProdNotices = true;
            dt.showTool("#prodAlertsHtml", "ProdNotices");
        },
        clearAlerts: function (){
            var prodAlertPopUp = document.getElementById("prodAlertsHtml");
            var tBody = prodAlertPopUp.getElementsByTagName("tbody")[1];
            while (tBody.rows.length > 0) {
                tBody.deleteRow(0);
            }
            dt[PlayerId].prodNotices = [];
            var key = PlayerId + ':prodNotices';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].prodNotices));
            var unseen = 0;
            document.getElementById("prodflag").textContent = unseen;
            document.getElementById("prodflag").setAttribute("title", unseen + " unread Production Alerts");
        
        },
        showIdle2: function(){
            dt.popupStates.IdleQs = true;
            if (!document.getElementById("showIdleBldgsHtml")) {
                dt.addElement(document.getElementsByTagName("body")[0], "div", ["class", "id", "title"], ["nosee", "showIdleBldgsHtml", "Idle Production Buildings"]);
                var t = document.getElementById("showIdleBldgsHtml");
                t.innerHTML = this.idleQs;
            }
            const twns = dt[PlayerId].towns.list;
            const idleTbl = document.getElementById('idleQueuesTbl');
            TableSort.init('idleQueuesTbl');
            let tBody = idleTbl.getElementsByTagName("tbody")[0];
            while (tBody.rows.length > 0) {
                tBody.deleteRow(0);
            }
            let idle = [];
            let busy = [];
            let busyBldgs = [];
            let tpb = [];
            let tprod = [];
            const currentTS = Date.now();
            // loop through the towns
            for (var t = 0; t < twns.length; t++) {
                // Get the prod bldgs present in this town
                tpb = this.getTownProdBldgs(twns[t]);
                busy = [];
                busyBldgs = [];
                tprod = dt[PlayerId].towns[twns[t]].prod2;
                for (const [bId] of Object.entries(tprod)) {
                    if(Object.entries(tprod[bId].queues).length == 0){
                        // No queue entries for this building so idle
                        var row = tBody.insertRow(-1);
                        var cell = row.insertCell(0);
                        cell.textContent = dt[PlayerId].towns[twns[t]].name;
                        cell = row.insertCell(1);
                        cell.textContent = tprod[bId].name;
                    }
                }
            }
            if (dt.popupStates.IdleQs) {
                dt.showTool("#showIdleBldgsHtml", "IdleQs");
            }
        },
        showIdle: function () {
            dt.popupStates.IdleQs = true;
            if (!document.getElementById("showIdleBldgsHtml")) {
                dt.addElement(document.getElementsByTagName("body")[0], "div", ["class", "id", "title"], ["nosee", "showIdleBldgsHtml", "Idle Production Buildings"]);
                var t = document.getElementById("showIdleBldgsHtml");
                t.innerHTML = this.idleQs;
            }
            var twns = dt[PlayerId].towns.list;
            var idleTbl = document.getElementById('idleQueuesTbl');
                           }
                if (active === false) {
                    var r = [twn.name, thisB.name, , 0, , ];
                    dt.production.addRows(r, thisB.class, prodTabs);
                }
    //            console.log(thisB.class, r);
    //            dt.production.addRows(r, thisB.class, prodTabs);
            });
        },
        addRows2: function (r,prodTabs){
            console.log("addRows2 - r",r);
            const tBody1 = document.querySelector("#" + prodTabs.all.tblId + " tbody");
            const tBody2 = document.querySelector("#" + prodTabs[r.tbl].tblId + " tbody");
            let rk = Object.keys(r);
            const row1 = tBody1.insertRow(-1);
            const row2 = tBody2.insertRow(-1);
            let cell1 = row1.insertCell(0);
            let cell2 = row2.insertCell(0);
            cell1.textContent = r.town;
            cell2.textContent = r.town;
            for(c=1;c<rk.length-1;c++){

                let cell1 = row1.insertCell(c);
                let cell2 = row2.insertCell(c);
                cell1.textContent = r[rk[c]];
                cell2.textContent = r[rk[c]];
                if (c === 3) {
                    cell1.classList.add("tiny");
                    cell2.classList.add("tiny");
                }
            }

        },
        addRows: function (r, tabName, prodTabs) {
            var tBody1 = document.querySelector("#" + prodTabs.all.tblId + " tbody");
            var tBody2 = document.querySelector("#" + prodTabs[tabName].tblId + " tbody");
            var row1 = tBody1.insertRow(-1);
            var row2 = tBody2.insertRow(-1);
            for (var c = 0; c < 6; c++) {
                var cell1 = row1.insertCell(c);
                var cell2 = row2.insertCell(c);
                cell1.textContent = r[c];
                cell2.textContent = r[c];
                if (c === 3) {
                    cell1.classList.add("tiny");
                    cell2.classList.add("tiny");
                }
            }

            var rubbish = "";
        },
        alertDelHandler: function (index) {
            var arr = dt[PlayerId].prodNotices;
    //        var index = event.target.value;
            if (index > -1) {
                arr.splice(index, 1);
            }
            this.showProdAlerts();
            var key = PlayerId + ':prodNotices';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].prodNotices));
        },
        getTownProdBuildings: function(tId){
            let tbNames = [];
            let pbNames = [];
            let b=dt[PlayerId].towns[tId].plots.internal;
            for (const prop in b) {
                tbNames.push(b[prop][0]);
            }
            for (const prop in dt.prodBuildings){
                pbNames.push(dt.prodBuildings[prop].name);
            }
            // Get the common elements
            let tpbNames = tbNames.filter((x) => {
                return pbNames.indexOf(x) != -1
            })
            console.log("887: ",tpbNames);
            return tpbNames;
        },

    };
    dt.prodBuildings = {"8": {"class": "mil", "name": "Barracks"}, "9": {"class": "trade", "name": "Marketplace"}, "10": {"class": "items", "name": "Brewery"}, "12": {"class": "diplo", "name": "Consulate"}, "19": {"class": "items", "name": "Common Ground"}, "21": {"class": "items", "name": "Paddock"}, "28": {"class": "items", "name": "Fletcher"}, "31": {"class": "items", "name": "Spearmaker"}, "32": {"class": "items", "name": "Blacksmith"}, "33": {"class": "items", "name": "Forge"}, "34": {"class": "items", "name": "Tannery"}, "35": {"class": "items", "name": "Saddlemaker"}, "36": {"class": "items", "name": "Siege Workshop"}, "37": {"class": "items", "name": "Book Binder"}};

    dt.prodCheckTimer = window.setInterval(dt.production.fullCompleteCheck, 60000);
}