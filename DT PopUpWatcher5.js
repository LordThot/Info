dtpopupw = function(){
    popupMain = function () {

    // select the target node
        dt.popupDiv = document.getElementById("WzTtDiV");
        dt.popupState = "hidden";

    // create an observer instance
        var popupObserver = new MutationObserver(function (mutations) {
    //        mutations.forEach(function (mutation) {
    //            console.log(mutation.type);
    //        });
            if (dt.popupDiv.style.visibility !== dt.popupState) {
                dt.popupState = dt.popupDiv.style.visibility;
                if (dt.popupDiv.style.visibility === "visible") {
                    // The popup is visible
    //                console.log("Popup visible.");
                    popupExtras();
                    checkThePopUp(dt.popupDiv);
                }
                if (dt.popupDiv.style.visibility === "hidden") {
                    // The popup is hidden
    //                console.log("Popup hidden.");
                    dt.popupExtraState = "empty";
                    dt.thisPopUp = null;
                    dt.extrasObserver.disconnect();
                }
            }
        });

    // configuration of the observer:
        var config = {attributes: true, childList: true, characterData: true};
        var popupConfig = {'attributes': true, 'attributeFilter': ["style"], 'attributeOldValue': true};
    // pass in the target node, as well as the observer options
        popupObserver.observe(dt.popupDiv, popupConfig);
    };

    popupExtras = function () {

    // select the target node
        dt.popupExtrasDiv = document.querySelector(".extrasPopup");
        dt.popupExtraState = "empty";

    // create an observer instance
        dt.extrasObserver = new MutationObserver(function (allmutations) {
    //        console.log("Extras observer called");
            if (dt.popupExtrasDiv.querySelector("#popupHarvesting")) {
    //            console.log("Harvesters popup opened");
                harvesterTimings();
            }
    //        allmutations.forEach(function (mutation) {
    //            console.log(mutation.type);
    //            console.log(mutation.addedNodes);
    //        });
            var rubbish = "";

        });
    if(dt.popupExtrasDiv !== null){
    // configuration of the observer:
    //    var config = {attributes: true, childList: true, characterData: true};
        var extrasConfig = {childList: true};
    // pass in the target node, as well as the observer options
        dt.extrasObserver.observe(dt.popupExtrasDiv, extrasConfig);
    }
    };

    checkThePopUp = function (popupDiv) {
        var m = popupDiv.querySelector(".m");
        var contents = m.textContent;
        // Check if the contents contain 'Size'
        if(contents.includes("Size:")){
            var si=m.querySelector("tr td i").textContent;
    //        console.log(si);
            var gs={Few:"1 - 3",
                    Handful:"4 - 8",
                    Several:"9 - 21",
                    Pack:"22 - 81",
                    Many:"82 - 128",
                    Gathering:"129 - 227",
                    Horde:"228 - 462",
                    Throng:"463 - 815",
                    Host:"816 - 2500",
                    Legion:"2501 - 9999",
                    Myriad:"10000 - 24999",
                    Sea:"25000 - 49999",
                    Cornucopia:"50000 - ∞",
                    Unknown:""
            };
            newsi = si + " ("+ gs[si] +")";
    //        console.log(newsi);
            if(si != "Unknown"){
                m.querySelector("tr td i").textContent = newsi;
            }
        }
        // Check if the contents contain 'Location:'
        if (contents.includes("Location:")) {
    //        console.log("Popup visible and has a location.");
            // There is a location so now extract it
            locStart = contents.indexOf("[");
            var locEnd = contents.indexOf("]");
            var coords = contents.substring(locStart + 1, locEnd);
            var tDists = dt.getTownDists(coords.split("|"));
            var bull=document.createElement("img");
            bull.setAttribute("src","https://v3.durctools.uk/images/dewt.svg");
            bull.style.width="15px";
            bull.style.height="auto";
            bull.setAttribute("onclick","dt.showTool('#twnDistHTML')");
            try{
            document.querySelector("div.m > div > span").appendChild(bull);
            }
            catch(e){console.log(e)}
    //        console.log("Coords from popup: " + coords);
            dt.thisPopUp = {};
            dt.thisPopUp.coords = coords;
            var matches = dt.notes(dt.popupNotesByCoords, coords);
    //        console.log("# of notes: " + matches);
        }
    };
    /* Function: harvesterItems
    * Check if there are any items each of the harvesters can collect
    * Parameter:
    * coords - string. The coords of the square in the same format as the keys in 
    * the various sections of mapData.
    */
    harvesterItems = function (coords) {
        var vanKeys = Object.keys(mapData.n);
        var chmsKeys = Object.keys(mapData.d);
        var campKeys = Object.keys(mapData.c);
        var thisSquare = {cotters: [], herbalists: [], miners: [], skinners: [], caravans: [], camps: []};
        // Check if there is a caravan collectable
        if ($.inArray(coords, vanKeys) > -1) {
            if (mapData.n[coords].hasOwnProperty('rImg')) {
                thisSquare.caravans.push("Yes");
            }
        }
        // Check for cotter, miner, herbalist or skinner items
        if ($.inArray(coords, chmsKeys) > -1) {
            var flags = mapData.d[coords];
            var flagArray = flags.split('|');
            for (i = 0; i < 10; i++) {
                if (parseInt(flagArray[i]) === 1) {
                    switch (i) {
                        case 0:
                            thisSquare.cotters.push([['resIcon', 'hide_24'], ['Hides']]);
                            break;
                        case 1:
                            thisSquare.cotters.push([['itemsprite', 'herbs_24'], ['Herbs']]);
                            break;
                        case 2:
                            thisSquare.cotters.push([['base', 'crystals_24'], ['Minerals']]);
                            break;
                        case 3:
                            thisSquare.cotters.push([['dtequip'], ['Equipment']]);
                            break;
                        case 4:
                            thisSquare.skinners.push([['resIcon', 'elemairsalt_24'], ['Elemental Salts']]);
                            break;
                        case 5:
                            thisSquare.herbalists.push([['resIcon', 'spices_24'], ['Rare Herbs']]);
                            break;
                        case 6:
                            thisSquare.miners.push([['resIcon', 'gems_24'], ['Rare Minerals']]);
                            break;
                        case 7:
                            thisSquare.cotters.push([['resIcon', 'grapes_24'], ['Grapes']]);
                            break;
                        case 8:
                            thisSquare.skinners.push([['resIcon', 'paws_24'], ['Animal Parts']]);
                            break;
                        case 9:
                            thisSquare.cotters.push([['calamity', 'skyfallen_48'],['Skysplinters']])
                    }
                }
            }
        }
    //    console.log(thisSquare);
        var rubbish = "";
        return thisSquare;
    //        dt.found[coords] = thisSquare;
    //    }

    };
    harvesterTimings = function () {
        harvesterTable = dt.popupExtrasDiv.querySelector("#popupHarvesting");
        // Get the rows in the table
        var trs = harvesterTable.querySelectorAll("tr");
        coords = dt.thisPopUp.coords.split("|");
        if (typeof mapData != "undefined" && mapData != null) {
            var items = harvesterItems(coords[1] + "|" + coords[0]);
        }
        townCoords = [dt[PlayerId].towns[CurrentTown].x, dt[PlayerId].towns[CurrentTown].y];
        var dist = dt.hypot(townCoords, coords);
        // Loop throught each of the rows
        for (var r = 1; r < trs.length; r++) {
            // Get the td elements in the row
            var tds = trs[r].querySelectorAll("td");
            // Get the data attribute from the span element in the first td
            var thisUnit = {};
            thisUnit.Id = tds[0].querySelector("span").getAttribute("data").split("|")[1];
    //        console.log(thisUnit.Id);
            thisUnit.speed = Items[5][thisUnit.Id][8];
            thisUnit.time = parseInt((dist / thisUnit.speed) * 60 * 60);
    //        console.log(thisUnit.time);
    //        console.log(SecToText(thisUnit.time));
            tds[1].setAttribute("title", "Travel time: " + SecToText(thisUnit.time));
            // now check if there are items for this unit type
            var ind = tds[1].textContent.toLowerCase() + "s";
            if (typeof items != "undefined") {
                if (items[ind].length > 0) {
                    // There are items
                    tds[0].querySelector("span >img").classList.remove("noItems");
                } else {
                    // No items
                    tds[0].querySelector("span >img").classList.add("noItems");
                }
            }
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

    };
    popupMain();
    //popupExtras();

    dt.getTownDists = function(tgtCoords){
    var t=dt[PlayerId].towns.list;
    var tbl = document.querySelector("#twnDistsTable");
    dt.removeRows(tbl);
    var tb=tbl.querySelector("tbody");
    var dists = [];
    for(var i=0;i<t.length;i++){
        tCoords = [dt[PlayerId].towns[t[i]].x,dt[PlayerId].towns[t[i]].y];
        dists.push([dt[PlayerId].towns[t[i]].name,Math.round(dt.hypot(tgtCoords,tCoords))]);
        var r=tb.insertRow(-1);
        var c=r.insertCell(0);
        c.textContent=dists[i][0];
        c.setAttribute("onclick","ChangeTownFocus("+t[i]+");");
        c.style.cursor="pointer";
        c=r.insertCell(1);
        c.textContent=dists[i][1];
    }
    return dists;
    }
}