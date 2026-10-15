function dataKeys(){
    var k = Object.keys(mapData.data);
    var keyList = [];
    for(i=0;i<k.length;i++){
        var tk = Object.keys(mapData.data[k[i]]);
        for(j=0;j<tk.length;j++){
            if(!keyList.includes(tk[j])){
                keyList.push(tk[j]);
            }
        }
    }
    console.log(keyList);
};
ms = {
    "biomeNames": {"0":"Arctic","1":"Arctic","2":"Arctic","3":"None","4":"None","5":"None","6":"Jungle","7":"Jungle","8":"Jungle","9":"Unknown","10":"Unknown","11":"Desert","12":"None","13":"Unknown","14":"Unknown","15":"None","16":"Unknown","17":"None","18":"None","19":"None","20":"None","21":"Unknown","22":"Unknown","23":"Unknown","24":"Unknown","25":"None"},
    "outpostBldgs":["ElvenFlet","ElvenTower","DwarvenHall","DwarvenTradePost","HumanWatchTower","HumanBorderTown","OrcHovel","Orc-InfestedRuin","OrcTower","MixedWalledCoOp","MixedSharecroppingEstate","FeyForestGlade","FeyGlade","MonstrousChasm","MythicalPortal"],
    "outpostsStarts":["Elven","Dwarven","Dwarf","Human","Orc","Walled","Share","Fey","Monstrous","Mythical"],
    "camps": false,
    "herbs": false,
    "minerals": false,
    "biomes": false,
    "spawns": false,
    "outposts": false,
    "campData": [],
    "rareData": [],
    "herbData": [],
    "mineralData": [],
    "biomeData": [],
    "spawnData":[],
    "outpostsData":[],
    "unknownOutposts":[],

    submitData: function () {
        if (ms.campData.length > 0) {
            sData = ms.campData.join(", ");
            $.ajax({
                url: "https://illystuff.uk/npcmap/php/insertCamps.php",
                data: {"sData": sData},
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data, textStatus, jqXHR) {
                    if (data.Status === "Camp Data processed" && data.Camps == ms.campData.length) {
                        console.log(data);
                        ms.campData = [];
                        console.log("Camp Data cleared...");
                    }else{
                      console.log("Possible error with Camp Data...");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Ajax error in campWorker function: " + errorThrown);
                }
            });
        }
        if (ms.herbData.length > 0) {
            sData = ms.herbData.join(", ");
            $.ajax({
                url: "https://illystuff.uk/npcmap/php/insertHerbs.php",
                data: {"sData": sData},
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data, textStatus, jqXHR) {
                    if (data.Status === "Herb Data processed") {
                        console.log(data);
                        ms.herbData = [];
                        console.log("Herb Data cleared...");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Ajax error in herbWorker function: " + errorThrown);
                }
            });
        }
        if (ms.mineralData.length > 0) {
            sData = ms.mineralData.join(", ");
            $.ajax({
                url: "https://illystuff.uk/npcmap/php/insertMinerals.php",
                data: {"sData": sData},
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data, textStatus, jqXHR) {
                    if (data.Status === "Mineral Data processed") {
                        console.log(data);
                        ms.mineralData = [];
                        console.log("Mineral Data cleared...");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Ajax error in mineralWorker function: " + errorThrown);
                }
            });
        }
        if (ms.spawnData.length > 0) {
            sData = ms.spawnData.join(", ");
            $.ajax({
                url: "https://illystuff.uk/npcmap/php/insertSpawns.php",
                data: {"sData": sData},
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data, textStatus, jqXHR) {
                    if (data.Status === "Spawn Data processed") {
                        console.log(data);
                        ms.spawnData = [];
                        console.log("Spawn Data cleared...");
                    }else{
                      console.log("Possible error with Spawn Data...");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Ajax error in campWorker function: " + errorThrown);
                }
            });
        }
    },

    addElement: function (prefs) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute('id', 'mapScanner');
        newDiv.setAttribute('display', 'none');
        newDiv.setAttribute('title', 'Map Scanner');
        newDiv.innerHTML = prefs;
        var current = document.getElementsByTagName("body")[0];
        document.body.appendChild(newDiv);
    },
    toggleOutpostScanState: function(e){
        var outpostchk = document.querySelector("#outpostScan");
        if (ms.outposts === true) {
            ms.outposts = false;
        } else {
            ms.outposts = true;
        }
    },
    toggleCampScanState: function () {
        var campchk = document.querySelector("#campScan");
        if (ms.camps === true) {
            ms.camps = false;
        } else {
            ms.camps = true;
        }
    },
    toggleBiomeScanState: function () {
        var biomechk = document.querySelector("#biomeScan");
        if (ms.biomes === true) {
            ms.biomes = false;
        } else {
            ms.biomes = true;
        }
    },
    toggleSpawnScanState: function () {
        var spawnchk = document.querySelector("#spawnScan");
        if (ms.spawns === true) {
            ms.spawns = false;
        } else {
            ms.spawns = true;
        }
    },
    toggleMineralScanState: function () {
        var campchk = document.querySelector("#mineralscan");
        if (ms.minerals === true) {
            ms.minerals = false;
        } else {
            ms.minerals = true;
        }
    },
    toggleHerbScanState: function () {
        var campchk = document.querySelector("#herbscan");
        if (ms.herbs === true) {
            ms.herbs = false;
        } else {
            ms.herbs = true;
        }
    },

    /* Method: showTool
     * Display the dialog for the tool.
     */
    showTool: function (id) {
        var winHeight = window.innerHeight;
        var maxHt = parseInt(0.9 * winHeight);
        var winWidth = window.innerWidth;
        var maxWd = parseInt(0.75 * winWidth);
        me = {width: 'auto', maxWd: maxWd, height: 'auto', maxHt: maxHt, pos: {left: 'center', top: 20}};
        $(function () {
            $(id).dialog({
                "width": 250,
                "maxWidth": me.maxWd,
                "maxHeight": me.maxHt,
                resizeStop: function (event, ui) {
                    me.width = ui.size.width;
                    me.height = ui.size.height;
                    me.pos = ui.position;
                },
                dragStop: function (event, ui) {
                    me.pos = ui.position;
                }
            });
        });
    },

    checkScans: function (event, xhr, settings) {
        document.querySelector("#msStatus").style.background = "red";
        if(ms.outposts === true){
            ms.outpostScan(event, xhr, settings);
            console.log("Outpost scan finished...");
        }
        if (ms.camps === true) {
            ms.campScan(event, xhr, settings);
            console.log("Camp scan finished...");
        }
        if (ms.herbs === true || ms.minerals === true) {
            ms.rareScan(event, xhr, settings);
            console.log("Rare Scan finished...");
        }
        if (ms.spawns === true) {
            ms.spawnScan(event, xhr, settings);
            console.log("Spawns Scan finished...");
        }
        if (ms.biomes === true) {
            ms.biomeScan(event, xhr, settings);
//            console.log("Biomes Scan finished...");
        }
        document.querySelector("#msStatus").style.background = "palegreen";
    },
    outpostScan: function (event, xhr, settings) {
        var mD = JSON.parse(xhr.responseText);
        var e = event;
        var dt = event.timeStamp;
        var mKeys = Object.keys(mD.m);
        var dat = {"e": dt, "x": xhr.responseText};
        if (mKeys.length > 0) {
            // There are camps of some kind so pass them to the campworker.
            ms.outpostWorker(dat);
        }
    },
    rareScan: function (event, xhr, settings) {
        var mD = JSON.parse(xhr.responseText);
        var e = event;
        var dt = event.timeStamp;
        var dat = {"e": dt, "x": xhr.responseText};
        ms.rareWorker(dat);
    },
    campScan: function (event, xhr, settings) {
        var mD = JSON.parse(xhr.responseText);
        var e = event;
        var dt = event.timeStamp;
        var campKeys = Object.keys(mD.c);
        var dat = {"e": dt, "x": xhr.responseText};
        if (campKeys.length > 0) {
            // There are camps of some kind so pass them to the campworker.
            ms.campWorker(dat);
        }
    },
    spawnScan: function (event, xhr, settings) {
        var mD = JSON.parse(xhr.responseText);
        var e = event;
        var dt = event.timeStamp;
        var dataKeys = Object.keys(mD.data);
        var dat = {"e": dt, "x": xhr.responseText};
        if (dataKeys.length > 0) {
            ms.spawnWorker(dat);
        }
    },
    biomeScan: function (event, xhr, settings) {
        var mD = JSON.parse(xhr.responseText);
        var e = event;
        var dt = event.timeStamp;
        var dataKeys = Object.keys(mD.data);
        var dat = {"e": dt, "x": xhr.responseText};
        if (dataKeys.length > 0) {
            ms.biomeWorker(dat);
        }
        console.log(mD.x, mD.y, "Biomes Scan finished...");
    },
    rareWorker: function (data) {
        var mD = JSON.parse(data.x);
        var dKeys = Object.keys(mD.d);
        for (i = 0; i < dKeys.length; i++) {
            var thisD = mD.d[dKeys[i]];
            var parts = thisD.split("|");
            if (parts[5] === "1") {
                // Rare Herbs Present
                if (mD.data[dKeys[i]].hasOwnProperty("npc")) {
                    var npc = mD.data[dKeys[i]].npc;
                } else {
                    var npc = 0;
                }
                var herbVals = [data.e, dKeys[i], dKeys[i].split("|")[1], dKeys[i].split("|")[0], mD.data[dKeys[i]].t, mD.data[dKeys[i]].r, mD.data[dKeys[i]].b, npc];
                var t = ("(" + JSON.stringify(herbVals) + ")");
                var t2 = t.replace("[", "");
                var herbString = t2.replace("]", "");
                ms.herbData.push(herbString);
            }
            if (parts[6] === "1") {
                if (mD.data[dKeys[i]].hasOwnProperty("npc")) {
                    var npc = mD.data[dKeys[i]].npc;
                } else {
                    var npc = 0;
                }
                var mineralVals = [data.e, dKeys[i], dKeys[i].split("|")[1], dKeys[i].split("|")[0], mD.data[dKeys[i]].t, mD.data[dKeys[i]].r, mD.data[dKeys[i]].b, npc];
                var t = ("(" + JSON.stringify(mineralVals) + ")");
                var t2 = t.replace("[", "");
                var mineralString = t2.replace("]", "");
                ms.mineralData.push(mineralString);
            }
        }
    },
    outpostWorker: function(data){
        var mD = JSON.parse(data.x);
        var outpostKeys = Object.keys(mD.m);
        for (i = 0; i < outpostKeys.length; i++) {
            // Check the image
            thisKey = outpostKeys[i];
            thisM = mD.m[outpostKeys[i]];
            thisImg = thisM.img.split("/").reverse()[0];
            if(ms.outpostBldgs.includes(thisImg)){
                thisOutpost = {coords:outpostKeys[i],"name":thisM.n,"region":regionNames[mD.data[thisKey].r],"biome":ms.biomeNames[mD.data[thisKey].b],"terrain":terrain[mD.data[thisKey].t],"img":thisImg};
                console.log("Found: ",thisOutpost);
                ms.outpostsData.push(thisOutpost);
            }else{
                ms.unknownOutposts.push(thisImg);
                //console.log("Unknown "+thisImg);
            }
        }
        console.log(outpostKeys,mD.m);
    },
    campWorker: function (data) {
        var mD = JSON.parse(data.x);
        var campKeys = Object.keys(mD.c);
        for (i = 0; i < campKeys.length; i++) {
            var thisCamp = mD.c[campKeys[i]];
            if (mD.data[campKeys[i]].hasOwnProperty("npc")) {
                var npc = mD.data[campKeys[i]].npc;
            } else {
                npc = 0;
            }
            var campVals = [data.e, campKeys[i], thisCamp.d, thisCamp.i, thisCamp.n, campKeys[i].split("|")[1], campKeys[i].split("|")[0], mD.data[campKeys[i]].t, mD.data[campKeys[i]].r, mD.data[campKeys[i]].b, npc];
//            console.log("("+campVals+")");
            var t = ("(" + JSON.stringify(campVals) + ")");
            var t2 = t.replace("[", "");
            var campString = t2.replace("]", "");
            ms.campData.push(campString);
        }
    },
    spawnWorker: function (data) {
        var mD = JSON.parse(data.x);
//        console.log(mD);
        var spawnKeys = Object.keys(mD.data);
        for (i = 0; i < spawnKeys.length; i++) {
            var thisSpawn = mD.data[spawnKeys[i]];
            if (mD.data[spawnKeys[i]].hasOwnProperty("npc")) {
                var npc = mD.data[spawnKeys[i]].npc;
            } else {
                npc = 0;
            }
            if(npc != 0){
                var spawnVals = [data.e, spawnKeys[i], spawnKeys[i].split("|")[1], spawnKeys[i].split("|")[0], thisSpawn.t, thisSpawn.r, thisSpawn.b];
                var spawnD = {"sighted":data.e,
                          "coords":spawnKeys[i],
                          "mapx":spawnKeys[i].split("|")[1],
                          "mapy":spawnKeys[i].split("|")[0],
                          "terrain":thisSpawn.t,
                          "region":thisSpawn.r,
                          "biome":thisSpawn.b
                          };
//                console.log(spawnD);
                // (`sighted`, `coords`, `mapx`, `mapy`, `terrain`, `region`, `biome`, `brg`, `npc`, `imp`)
                // (`sighted`, `coords`, `mapx`, `mapy`, `terrain`, `region`, `biome`)
                //            console.log("("+campVals+")");
                var t = ("(" + JSON.stringify(spawnVals) + ")");
                var t2 = t.replace("[", "");
                var spawnString = t2.replace("]", "");
                ms.spawnData.push(spawnString);
            }
        }
    },
    biomeWorker: function (data) {
        var mD = JSON.parse(data.x);
//        console.log(mD);
        var biomeKeys = Object.keys(mD.data);
        for (i = 0; i < biomeKeys.length; i++) {
            var thisBiome = mD.data[biomeKeys[i]];
            if(ms.biomeNames[thisBiome.b] === "Unknown") {
                ms.biomeNames[thisBiome.b] = biomeKeys[i];
            }
                var biomeVals = [data.e, biomeKeys[i], biomeKeys[i].split("|")[1], biomeKeys[i].split("|")[0], thisBiome.t, thisBiome.r, thisBiome.b];
                var biomeD = {"sighted":data.e,
                          "coords":biomeKeys[i],
                          "mapx":biomeKeys[i].split("|")[1],
                          "mapy":biomeKeys[i].split("|")[0],
                          "terrain":thisBiome.t,
                          "region":thisBiome.r,
                          "biome":thisBiome.b
                          };
//                console.log(biomeD);
                // (`sighted`, `coords`, `mapx`, `mapy`, `terrain`, `region`, `biome`, `brg`, `npc`, `imp`)
                // (`sighted`, `coords`, `mapx`, `mapy`, `terrain`, `region`, `biome`)
                //            console.log("("+campVals+")");
                var t = ("(" + JSON.stringify(biomeVals) + ")");
                var t2 = t.replace("[", "");
                var biomeString = t2.replace("]", "");
                ms.biomeData.push(biomeString);
        }
        ms.sendBiomes();
    },
    
    sendBiomes: function(){
        if (ms.biomeData.length > 0) {
            sData = ms.biomeData.join(", ");
            $.ajax({
                url: "https://illystuff.uk/npcmap/php/insertBiomes.php",
                data: {"sData": sData},
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data, textStatus, jqXHR) {
//                    console.log(data,textStatus,ms.biomeData.length);
                    
                    if (data.Status == "Biome Data processed") {
                        console.log(data);
                        ms.biomeData = [];
                        console.log("Biome Data cleared...");
                    }else{
                      console.log("Possible error with Biome Data...");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Ajax error in biomeWorker function: " + errorThrown);
                }
            });
        }
    }
};
var prefs = '<div id="mapScanner" class="tooldiv"><div class="toolHeader" data-toolid="mapScanner"> <span class="fl">Map Scanner</span></div><div class="contents"><div class="controls fr"><fieldset><span><input type="button" value="Start" onclick="ms.startScan()"></span><span><input type="button" value="Pause" onclick="ms.pauseScan()"></span><span><input type="button" value="Cont" onclick="ms.comtiueScan()"></span><span><input type="button" value="Stop" onclick="ms.stopScan()"></span></fieldset></div><div class="filterCtrls"><fieldset><span class="b"><input type="checkbox" onchange="ms.toggleCampScanState()" value="ON" name="campscan" id="campScan"><label for="campscan">Encampments (NPC, Faction etc)</label></span><span class="b"><input type="checkbox" onchange="ms.toggleMineralScanState()" value="ON" name="mineralscan" id="mineralscan"><label for="mineralscan">Rare Minerals</label></span><span class="b"><input type="checkbox" onchange="ms.toggleHerbScanState()" value="ON" name="herbscan" id="herbscan"><label for="herbscan">Rare Herbs</label></span><span class="b"><input type="checkbox" onchange="ms.toggleBiomeScanState()" value="ON" name="biomescan" id="biomescan"><label for="biomescan">Biomes</label></span><span class="b"><input type="checkbox" onchange="ms.toggleSpawnScanState()" value="ON" name="spawnscan" id="spawnscan"><label for="spawnscan">Spawn Locs</label></span><span class="b"><input type="checkbox" onchange="ms.toggleSpawnScanState()" value="ON" name="spawnscan" id="spawnscan"><label for="spawnscan">Totems</label></span><span class="b"><input type="checkbox" onchange="ms.toggleOutpostScanState()" value="ON" name="outpostscan" id="outpostscan"><label for="outpostscan">Outposts</label></span></fieldset></div><fieldset id="msStatus" style="min-height:50px;background-color:palegreen;"></fieldset></fieldset></div></div>';


$(document).ajaxSuccess(function (event, xhr, settings) {
    var urlStart = settings.url.substring(0, 17);
    switch (urlStart) {
        case "/World/MapData":
            ms.checkScans(event, xhr, settings);
            break;
        case "/World/MapRefresh":
//            ms.checkScans(event, xhr, settings);
            break;
        case "/World/MapCanvas/":
            break;
        default:
            break;
    }
});

ms.addElement(prefs);
ms.showTool('#mapScanner');


window.addEventListener(
    "keydown",
    (event) => {
        //event.preventDefault(); // prevent the default action (scroll / move caret)

      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case "ArrowDown":
            moveSS2();
          break;
        case "ArrowUp":
            moveNN2();
          break;
        case "ArrowLeft":
            moveWW2();
          break;
        case "ArrowRight":
            moveEE2();
          break;
      }
    })

function moveNN2() {
    mapData.y += (mapData.zoom * 2),
            loadData(''),
            ChangeMapLocation();
}
function moveSS2() {
    mapData.y -= (mapData.zoom * 2),
            loadData(''),
            ChangeMapLocation();
}
function moveEE2() {
    mapData.x += (mapData.zoom * 2),
            loadData(''),
            ChangeMapLocation();
}
function moveWW2() {
    mapData.x -= (mapData.zoom * 2),
            loadData(''),
            ChangeMapLocation();
}