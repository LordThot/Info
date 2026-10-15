dtr = {
    // NPC Names
    npcNames: [
        null,null,null,null,null,null,null,null,null,null,"Brown Bears",null,"Wild Dogs",null,null,null,"Wolves","Giant Rats","Mammoths","Gharials","Giant Spiders","Giant Snakes",null,null,null,null,null,"Polar Bears","Alligators","Anacondas","Cobras","Coral Snakes","Poisonous Crawlers","Giant Scuttlers","Scritchers","Giant Scorpions","Scaled Chargers","Elephants","Rhinoceros","Simien Wolves","Black Bears","Arctic Wolves","Jaguars","Leopards","Pumas","Snow Leopards","Lions","Tigers","White Tigers","Salamanders","Ice Salamanders","Fire Salamanders",null,"Giant Beetles","Golden Monkeys","Baboons","Massive Scarabs","Black Panthers","Saurians","Cyclopes",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"Escaped Air Elementals",null,"Escaped Earth Elementals","Escaped Fire Elementals","Escaped Water Elementals"
    ],
    // Faction Names
    factionNames: [
        "Unknown","Council of Illyria","Arakvar","Unknown","Atagek","Azure Throne","Barbarians","Fratri Hominis","Tantarkim","Circle Of Five","Daedalons","Dragonkin","Kildarran","Duchy of Keppen","Unknown","Eaglesbrood","Empirium","Kingdom of Larn","Forbidden Empire","Fyrgis","Giantkind","Skarakar","Tinkers","Keepers of the Golden Fields","Harpies","Sma Uruk","Kadu","Kanchalka","Kingdom of Tal","Unknown","Parvacones","Sslipentin","Lords Of The West","Melders","Demersae","Jannu","Northmen","Nordlanders","Drangu Mundas","Outlaws","Parlan","Raja Metu","Order of Allembine","Sillar","Sirens","Sultanate of Kazim","Sylvans","Tenaril","Tewhirrus","Tien Zao","Tipu Khan","Triumvirate","Zau Brulk","Udaiman","Udan Tebriz","Undying Flame","Wen Kun Dynasty","Windseekers","Seelie Court","Unseelie Court","Crimson Dawn","Treggar's Crows","Brotherhood of Kerala","Bayne's Irregulars","Marauding Skullsplitters","Illyria Trade Council","Trappers","Sundog Gith","Guardians of Zera","Clan Reashag","Blood Reavers","Crimson Skulls","Pax Orcana","Apaxu","Lannigolds","Clan Bealagh","Clan Moedagh","Hashashin","Foshnu Ob Wulpor","Turyns","Illians","Lyrians","Dyadans","Argiri","Clan Dollogh","Drek-Hhakral","Free Orcs","Guul-Hai","Heirs of Voyldarn","Houergerrt","Kapikami","Kartur-Hhakral","Llwcharion","Mellorians","Overoad Traders","South Oceans Company","Tal Colonists","The College of Silence","The Lost Clans","The New Light","The Pirate Kings","The Tears Eternal","The Tower","Virten","Yuraquncha","Underworld"
    ],
    // Group sizes
    groupSizes: {
        "Few":["Few",1,3],"Handfull":["Handfull",4,8],"Several":["Several",9,21],"Pack":["Pack",22,81],"Many":["Many",82,128],"Gathering":["Gathering",129,227],"Horde":["Horde",228,462],"Throng":["Throng",463,815],"Host":["Host",816,2500],"Legion":["Legion",2501,9999],"Myriad":["Myriad",10000,25000],"Sea":["Sea",25001,49999],"Cornucopia":["Cornucopia",50000,"Infinity"],"Unknown":["Unknown","",""]
    },
    /* Method: numberFormat
     * Format a number to display it in the format  d, ddd.ddK or ddd.ddM
     * 
     * Parameter:
     * orig - float. The number to be formatted.
     * 
     * Returns: string or integer.
     */
    numberFormat: function (orig) {
        switch (true) {
            case (orig > 999999):
                var formatted = (orig / 1000000).toFixed(2);
                formatted = formatted.toString() + 'M';
                break;
            case (orig > 999):
                formatted = (orig / 1000).toFixed(2);
                formatted = formatted.toString() + 'k';
                break;
            default:
                formatted = parseInt(orig);
        }
        return formatted;
    },
    /* Function: numberFormat2
     * Format a number to display it in the format  d, dddK or dddM
     * 
     * Parameter:
     * orig - float. The number to be formatted.
     * 
     * Returns: string or integer.
     */
    numberFormat2: function (orig) {
        switch (true) {
            case (orig > 999999):
                var formatted = (orig / 1000000).toFixed(0);
                formatted = formatted.toString() + 'M';
                break;
            case (orig > 999):
                formatted = (orig / 1000).toFixed(0);
                formatted = formatted.toString() + 'k';
                break;
            default:
                formatted = parseInt(orig);
        }
        return formatted;
    },
    /* Function: arrayMin
     * Return the smallest value in the supplied array.
     * 
     * Parameter:
     * numArray - array. The array to process.
     * 
     * Return:
     * Number.
     */
    arrayMin: function (numArray) {
        return Math.min.apply(null, numArray);
    },
    /* Function: arrayMax
     * Return the largest value in the supplied array.
     * 
     * Parameter:
     * numArray - array. The array to process.
     * 
     * Return:
     * Number.
     */
    arrayMax: function (numArray) {
        return Math.max.apply(null, numArray);
    },
    /* Method: sortObject
     * Sort an object.
     * 
     * Parameter:
     * obj - object. The object to be sorted.
     * 
     * Returns:
     * The sorted object.
     */
    sortObject: function (obj) {
        if (obj !== 'undefined') {
            return Object.keys(obj).sort().reduce(function (result, key) {
                result[key] = obj[key];
                return result;
            }, {});
        }
    },
    /* Method: coordSwap
     * Switch the position of a pair of numbers in a two element array. Used to switch the coords of a point between standard x,y and the method used by the ingame objects where the y and x coords are joined to make a name for a property.
     * 
     * Parameter:
     * coords - array. The array holding the numbers to swap.
     * 
     * Returns:
     * array - The array with the elements swapped.
     */
    coordSwap: function (coords) {
        try {
            var t = coords.split('|');
            t.reverse();
            return t.join('|');
        } catch (e) {
            return null;
        }
    },
    /* Method: hypot
     * Calculate the hypotunuse of a right angle triangle. Requires the coords for both vertexes to be in the same order (x,y or y,x).
     * 
     * Parameters:
     * sourceC - coords of one vertex.
     * destC - coords of second vertex.
     * 
     * Returns:
     * Number - The hypotenuse
     */
    hypot: function (sourceC, destC) {
        var dx = sourceC[0] - destC[0];
        var dy = sourceC[1] - destC[1];
        dist = Math.sqrt((dx * dx) + (dy * dy));
        return dist;
    },
    /* Method: removeRows
     * Remove all the rows from the body of a table.
     * 
     * Parameter:
     * tbl - object reference. The table to remove the rows from.
     */
    removeRows: function (tbl) {
        var bdy = tbl.querySelector('tbody');
        if (bdy.hasChildNodes()) {
            while (bdy.firstChild) {
                bdy.removeChild(bdy.firstChild);
            }
        }
    },
    /* Function: replaceAll
     * Replaces all occurences of needle in a string with the specified string. It 
     * works by first splitting str on each occurence of the sub-string in search 
     * and then joining the resulting array elements with the string replace 
     * in-between them. This will work because split removes the contents of the 
     * sub-string.
     * 
     *  Parameters: 
     * str - string. The string to search in.
     * search - string. The sub-string to be replaced.
     * replace - string. The string to replace search with.
     * 
     * Returns:
     * string. The new string.
     */
    replaceAll: function (str, search, replace) {
        var newStr = str.split(search).join(replace);
        return newStr;
    },
    /* Method: getURLParams
     * Build an array of any parameters passed in the url. Empty array if none.
     * Each parameter is returned as a two element array (key, value).
     * 
     * Returns:
     *  {Array|params}
     */
    getURLParams: function (h) {
        params = [];
        if (!h)
            var h = location.hash;
        var paramString = h.split("?")[1];
        if (!paramString) {
            return params;
        }
        var pArray = paramString.split("&");
        for (var i in pArray) {
            params.push(pArray[i].split("="));
        }
        return params;
    },

	clickMonitor: function(e){
		let t = e.currentTarget; 
		let d=t.dataset;
		if(d.tool){
		    e.stopPropagation();
			if(d.tool.startsWith("#")){
				dtr.showToolDiv(d.tool);
			}else{
				dtr.runSelected(d.tool);
			}
		};
        if(t.classList.contains("cr")){
            //
            switch(t.classList[0].toUpperCase()){
                case 'NW':
                    dtr.moveUp();
                    dtr.moveLeft();
                break;
                case 'N':
                    dtr.moveUp();
                break;
                case 'NE':
                    dtr.moveUp();
                    dtr.moveRight();
                break;
                case 'E':
                    dtr.moveRight();
                break;
                case 'SE':
                    dtr.moveDown();
                    dtr.moveRight();
                break;
                case 'S':
                    dtr.moveDown();
                break;
                case 'SW':
                    dtr.moveDown();
                    dtr.moveLeft();
                break;
                case 'W':
                    dtr.moveLeft();
                break;
                case 'H':
                    dtr.goHome();
                break;
            }
        };
        if(e.target.classList.contains("zl")){
            if(e.target.classList.contains("pluszoom")){
                console.log("zoom in");
                dtr.zoomOut();
            }
            if(e.target.classList.contains("minuszoom")){
                console.log("zoom out");
                dtr.zoomIn();
            }
        }
        console.log(e,"currentTargt: ",t);


	},
	runSelected: function(tool){
		switch(tool){
			case "showcamps":
    			dtr.getCamps();
	    		dtr.showToolDiv("#campstool");
			break;
			case "showcollectable":
			    dtr.getCollectable();
			    dtr.showToolDiv("#collecttool");
			break;
			case "toggleCtrls":
			    dtr.toggleControls();
			break;
		}
	},
	checkLimits: function(d){
		let rect = d.getBoundingClientRect();
		toolHt = rect.bottom - rect.top;
		toolWdth = rect.right - rect.left;
		settings = {'top':0,'left':0,'width':0,'height':0};
		let illyWin = document.body.getBoundingClientRect();
		if(toolHt > 0.9 * (illyWin.bottom - illyWin.top)){
		    settings.height = 0.9 * (illyWin.bottom - illyWin.top);
		    settings.top = illyWin.top + (0.1 * (illyWin.bottom - illyWin.top));
		}else{
		    settings.top = ((illyWin.bottom - illyWin.top) - toolHt)/2;
		    settings.height = toolHt;
		}
		if(toolWdth > 0.9 * (illyWin.right - illyWin.left)){
		    settings.width = 0.9 * (illyWin.right - illyWin.left);
		    settings.left = illyWin.left + (0.1 * (illyWin.right - illyWin.left));
		}else{
		    settings.left = ((illyWin.right - illyWin.left) - toolWdth)/2;
		    settings.width = toolWdth;
		}
		return settings;
	    
	},
	showToolDiv: function(id){
		// Get the div
		let d = document.querySelector(id);
		d.classList.remove("nosee");
		d.classList.add("see");
		// Get any settings for this tool
		let k = id + ":settings";
		let settings = JSON.parse(locStorage.getItem(k));
		if(settings !== null){
			// Apply any settings
			d.style.width = settings.width + "px";
			d.style.height = settings.height + "px";
			d.style.top = settings.top + "px";
			d.style.left = settings.left + "px";
		}else{
		    settings = dtr.checkLimits(d);
			d.style.width = settings.width + "px";
			d.style.height = settings.height + "px";
			d.style.top = settings.top + "px";
			d.style.left = settings.left + "px";
			locStorage.setItem(k, JSON.stringify(settings));
		}
		// Make the div draggable & resizeable
		if(!d.classList.contains("ui-draggable")){
			$( d ).draggable();
		}
		if(!d.classList.contains("ui-resizable")){
			$( d ).resizable();
		}
//		el.currentTarget.parentNode.appendChild(el.currentTarget);
//let aa = d.querySelector("div");
//aa.click();
		d.querySelector('div').click();
		// Set as the front tool div
//		$( ".tooldiv" ).removeClass( "selected" );
//		$(d).addClass("selected");
	},
	closeTool: function(e){
		document.querySelector(e.target.dataset.tool).classList.add("nosee");
		document.querySelector(e.target.dataset.tool).classList.remove("see");
		var rubbish="";
	},
	toolMove: function(event,ui){
		console.log("toolMove event:",event);
		console.log("toolMove ui:",ui);
		let toolId = "#" + event.target.id;
		let toolSettings = JSON.parse(locStorage.getItem(toolId + ":settings"));
		toolSettings.top = ui.position.top;
		toolSettings.left = ui.position.left;
		locStorage.setItem(toolId + ":settings", JSON.stringify(toolSettings));
	},
	toolResize: function(event,ui){
		console.log("toolResize event:",event);
		console.log("toolResize ui:",ui);
		let toolId = "#" + event.target.id;
		let toolSettings = JSON.parse(locStorage.getItem(toolId + ":settings"));
		toolSettings.top = ui.position.top;
		toolSettings.left = ui.position.left;
		toolSettings.width = ui.size.width;
		toolSettings.height = ui.size.height;
		locStorage.setItem(toolId + ":settings", JSON.stringify(toolSettings));
	},
	toolToFront: function(el){
        el.currentTarget.parentNode.appendChild(el.currentTarget);
	},
	moveTo: function(c){
	    let s = c.split("|").join("/");
	    window.location = "https://enhanced.illyriad.co.uk/#/World/Map/"+s;
	},
    zoomOut: function(){
        let t = document.querySelector("#zoomOut");
        t.click();
    },
    zoomIn: function(){
        let t = document.querySelector("#zoomIn");
        t.click();
    },
    moveRight: function(){
        console.log("moveRight called");
        let c =  map._mapData._currentLocation;
        c.x += (c.z * 2);
	    let s = c.x + "/" + c.y;
	    window.location = "https://enhanced.illyriad.co.uk/#/World/Map/"+s;
    },
    moveLeft: function(){
        console.log("moveLeft called");
        let c =  map._mapData._currentLocation;
        c.x -= (c.z * 2);
	    let s = c.x + "/" + c.y;
	    window.location = "https://enhanced.illyriad.co.uk/#/World/Map/"+s;
    },
    moveUp: function(){
        console.log("moveUp called");
        let c =  map._mapData._currentLocation;
        c.y += (c.z * 1.5);
	    let s = c.x + "/" + c.y;
	    window.location = "https://enhanced.illyriad.co.uk/#/World/Map/"+s;
    },
    moveDown: function(){
        console.log("moveDown called");
        let c =  map._mapData._currentLocation;
        c.y -= (c.z * 1.5);
	    let s = c.x + "/" + c.y;
	    window.location = "https://enhanced.illyriad.co.uk/#/World/Map/"+s;
    },
    kbdMonitor: function(){
        document.addEventListener('keyup', (event) => {
            const keyName = event.key;
            console.log(keyName);
            if (keyName === 'PageUp') {
                dtr.zoomOut();
            }
            if (keyName === 'PageDown') {
                dtr.zoomIn();
            }
        }, false);
    },
    kbdMonitorOn: function(){
        document.addEventListener('keyup',dtr.handleKeyUp,false);
    },
    kbdMonitorOff: function(){
        document.removeEventListener("keyup", dtr.handleKeyUp, false);
    },
    handleKeyUp:function(event){
        const keyName = event.key;
        console.log(keyName);
        if (keyName === 'PageUp') {
            dtr.zoomOut();
        }
        if (keyName === 'PageDown') {
            dtr.zoomIn();
        }
        if (keyName === 'ArrowRight') {
            dtr.moveRight();
        }
        if (keyName === 'ArrowLeft') {
            dtr.moveLeft();
        }
        if (keyName === 'ArrowUp') {
            dtr.moveUp();
        }
        if (keyName === 'ArrowDown') {
            dtr.moveDown();
        }
        
    },
    toggleControls: function(){
        document.querySelector("#dtrControls").classList.toggle("dtrbackground");
        document.querySelector(".moveto").classList.toggle("nosee");
        document.querySelector(".compass_rose").classList.toggle("nosee");
        document.querySelector(".zooms").classList.toggle("nosee");
    },
    getCurrentTown: function(){
        let t=dtr[playerId].towns;
        let ct = null;
        // Get the coords of the town in 'home'
        let coords = dtr.replaceAll(document.querySelector(".towndata > div.townlocation").textContent.split(" in")[0]," ","").split("|");
        // Step through the towns looking for one with matching coords
        for(let i=0;i<t.numTowns;i++){
            thisId = t.list[i];
            if((t[thisId].x === coords[0]) && (t[thisId].y === coords[1])){
                ct = thisId;
            }
        }
        console.log(t[ct]);
        return thisId;
    }
};

/* ===============================================================================================================
 * INITIAL CONFIG START
   ===============================================================================================================*/

dtr.ConfigureMonitors = function(){
    // Set the tabs functionallity in the menu.
    if(document.getElementById('menutabs') === null){
        dtr.monitorStatus.menutabs = {status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-624","menutabs monitor not configured",Date.now()]);
    } else {
        $("#menutabs").tabs();
        dtr.tmpLog.push(["l-628","menutabs monitor configured",Date.now()]);
        dtr.monitorStatus.menutabs = {status:'set',haserr:null};
    }
    // Add the click listener to all the menu buttons and the menu opener
    let t = document.querySelectorAll(".tool");
    if(t === null){
        dtr.monitorStatus.toolbutons ={status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-634","menu buttons monitor not configured",Date.now()]);
    } else {
        for(let i=0;i<t.length;i++){
            t[i].addEventListener("click",dtr.clickMonitor);
        }
        dtr.monitorStatus.toolbuttons = {status:'set',haserr:null};
        dtr.tmpLog.push(["l-640","menu buttons monitor configured",Date.now()]);
    }
    // Add event listeners to all the close icons
    let c = document.querySelectorAll(".closetool");
    if(c === null){
        dtr.monitorStatus.closetools ={status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-638","closetools monitor not configured",Date.now()]);
    } else{
        for(let i=0;i<c.length;i++){
            c[i].addEventListener("click",dtr.closeTool);
        }
        dtr.tmpLog.push(["l-645","closetool monitor configured",Date.now()]);
        dtr.monitorStatus.closetools = {status:'set',haserr:null};
    }
    // Add eventListener to the compass rose arrows
    let cr = document.querySelectorAll(".cr");
    if(cr === null){
        dtr.tmpLog.push(["l-649","compass rose monitor not configured",Date.now()]);
        dtr.monitorStatus.compassrose = {status:'not found',haserr:'not found'};
    } else{
        for(let i=0;i<cr.length;i++){
            cr[i].addEventListener('click',dtr.clickMonitor);
        }
        dtr.tmpLog.push(["l-656","compass rose monitor configured",Date.now()]);
        dtr.monitorStatus.compassrose = {status:'set',haserr:null};
    }
    // Add eventListener to the zoom icons
    let zl = document.querySelector(".zooms");
    if(zl === null){
        dtr.monitorStatus.zoomlevels = {status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-660","zoom levels monitor not configured",Date.now()]);
    } else{
        zl.addEventListener('click',dtr.clickMonitor);
        dtr.tmpLog.push(["l-663","zoom levels monitor configured",Date.now()]);
        dtr.monitorStatus.zoomlevels = {status:'set',haserr:null};
    }   
    // Add an eventListener to the 'Go' button on the map controls
    let g= document.querySelector("#dtrGoto");
    if(g === null){
        dtr.monitorStatus.gohome = {status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-669","gohome monitor not configured",Date.now()]);
    } else{
        g.addEventListener('click',dtr.goto);
        dtr.tmpLog.push(["l-672","gohome monitor configured",Date.now()]);
        dtr.monitorStatus.gohome = {status:'set',haserr:null};
    }
    // Add an eventListener to all the clear buttons in the tools
    let cd = document.querySelectorAll(".dataClear");
    if(cd === null){
        dtr.monitorStatus.dataclear = {status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-678","clear tool data monitor not configured",Date.now()]);
    } else{
        for(let i=0;i<cd.length;i++){
            cd[i].addEventListener('click',dtr.clearData);
        }
        dtr.tmpLog.push(["l-682","clear tool data monitor configured",Date.now()]);
        dtr.monitorStatus.dataclear = {status:'set',haserr:null};
    }
    // Make all the tool divs draggable, resizeable and can be brought to front
    // handle: ".ps-popup-outer",
    if(document.querySelectorAll('.tooldiv') === null){
        dtr.monitorStatus.tooldivs = {status:'not found',haserr:'not found'};
        dtr.tmpLog.push(["l-689","tooldivs move,resize, bring to front monitor not configured",Date.now()]);
    } else{
        $( ".tooldiv" ).draggable({handle: "div",cancel:"div.contents",stop: function( event, ui ) {dtr.toolMove(event,ui)}});
        // Make all the tool divs resizable
        $( ".tooldiv" ).resizable({stop: function( event, ui ) {dtr.toolResize(event,ui)}});
        // Add a listener to bring the div to the front.
        c = document.querySelectorAll(".tooldiv");
        for(let i=0;i<c.length;i++){
            c[i].addEventListener("click",dtr.toolToFront);
        }
        dtr.tmpLog.push(["l-701","tooldivs move,resize, bring to front monitor configured",Date.now()]);
        dtr.monitorStatus.tooldivs = {status:'set',haserr:null};
    }
    console.log("======================================================================");
    console.log("Configure Monitors results: ",dtr.monitorStatus);
    console.log("======================================================================");
}

dtr.GetPlayer = function(){
    if(document.querySelector(".portait-head") !== null){
        console.log("dtr.GetPlayer called")
            console.log("GetPlayer started");
            let d=document.querySelector(".portait-head").dataset.head.split("|");
            dtr[playerId] = new dtr.player.make(d[0].substring(2), d[3], {},{}, {factionScanState: false, alertAudio: false, alertVisual: false, alertFreq: 10}, [], [], {});
            dtr[playerId].towns=dtr.getTownIds();
            dtr.invent.scrapeResBar();
            console.log("======================================================================");
            console.log("player data: ",dtr[playerId]);
            console.log("======================================================================");
    }else{
        dtrTimeoutPlayer = setTimeout(dtr.GetPlayer, 2 * 1000);
    }
}
dtr.getTownIds = function(){
    let townData={};
    if(playerId= 418074 ){
        townData = {"57|567":"553897", "-954|-2666":"559425","429|406" :"566869"};
    }
    let townListData=document.querySelectorAll(".townList--town");
    let townD={};
    townListData.forEach(function (thisTown, currentIndex, listObj) {
        tid=thisTown.dataset.townid;
        tname= thisTown.querySelector(".lTownname").textContent 
        tloc=dtr.replaceAll(thisTown.querySelector(".townlocation").textContent.split(" in")[0]," ","");
//            console.log(tid,tname,tloc);
        // check if this town is in townData
        if(Object.hasOwn(townData,tloc)){
            delete townData[tloc];
        }
        townD[tid]={name:tname,x:tloc.split("|")[0],y:tloc.split("|")[1],inv:dtr.invent.emptyInv};
    });
    if(Object.keys(townData)){
        // there is a town in the list we don't have yet. Check the current town.
        loc = dtr.replaceAll(document.querySelector(".towndata > div.townlocation").textContent.split(" in")[0]," ","");
        if(townData[loc]){
            tid=townData[loc];
            tName = document.querySelector('.townname').textContent;
            townD[tid] = {name:tName,x:loc.split("|")[0],y:loc.split("|")[1],inv:dtr.invent.emptyInv};
            dtr.currentTown = tid;
        }
    }
    townD.list = Object.keys(townD);
    townD.numTowns = townD.list.length;
    console.log("======================================================================");
    console.log("Town data: ",townD);
    console.log("======================================================================");
    return townD;
}
dtr.getHomeTown = function(){
    let tlist = dtr[playerId].towns.list;
    let townListData=document.querySelectorAll(".townList--town");
}
/* ===============================================================================================================
 * INITIAL CONFIG END
   ===============================================================================================================*/



// ******************************************************************************************************


dtr.getCamps = function(){
    var camps = [];
    var ca = mapData.c;
    //console.log(ca)
    var thisCamp = {};
    for (var a in ca) {
        //  console.log(a);
        if (ca.hasOwnProperty(a)) {
            console.log(`ca.${a} =`, ca[a]);
            thisCamp = ca[a];
            thisCamp.x = a.split("|")[1];
            thisCamp.y = a.split("|")[0];
            //var w = camps.concat(ca[a]);
            var w = camps.concat(thisCamp);
            camps = w;
        } 
    }
    console.log("Camps",camps);
    let tBody = document.querySelector("#campstool tbody");
    dtr.removeRows(tBody.parentNode);
    let town =  dt[PlayerId].towns[CurrentTown];
    var showPlayer =  document.getElementsByName("player")[0].checked;
    var showFaction =  document.getElementsByName("faction")[0].checked;
    var showNPC =  document.getElementsByName("npc")[0].checked;
    
    for(let i=0;i<camps.length;i++){
        var thisC = camps[i];
        showRow = true;
        // This is where we work out if it is a player, npc or faction camp and if we want to show it
        var cType = dtr.campType(thisC.d);
        switch(cType){
            case "NPC":
                if(!showNPC){
                    showRow = false;
                }
                //cell.textContent = thisC.d;
                break;
            case "Faction":
                if(!showFaction){
                    showRow = false;
                }
                //cell.textContent = thisC.d;
            break;
            case "Player":
                if(!showPlayer){
                    showRow = false;
                }
                //cell.textContent = thisC.d;
            break;
            //default:
            //    cell.textContent = "Player id "+ Math.abs(thisC.p);
            //break;
        }
        // This checks to see if this size of camp is wanted
        if(!dtr.selectedSizes.includes(thisC.n)){
            showRow = false;
        }
        if(showRow){
            var tr = tBody.insertRow(-1);
            // Coords
            var cell = tr.insertCell(0);
            cell.appendChild(dtr.makeLoc(thisC.x+"|"+thisC.y))
            // Who owns the camp
            cell = tr.insertCell(1);
            cell.textContent = thisC.d;
            // The size of the camp if known
            cell = tr.insertCell(2);
            cell.textContent = dtr.groupSizes[thisC.n][0] + "("+dtr.groupSizes[thisC.n][1]+" - "+dtr.groupSizes[thisC.n][2] + ")";
            // Dist to current town
            cell = tr.insertCell(3);
            dist = dtr.hypot([thisC.x,thisC.y],[town.x,town.y]);
            cell.textContent = dist.toFixed(2);
        }
    }
    TableSort.init('dtrcampstable')
}
dtr.showGetCamps = function(){
    if (dt.mapTools.checkHash()) {
        dt.showTool("#campstool");
    }

    //dt.showTool("#campstool");
}
dtr.campType = function(d){
    // Remove the 'Occupying Force' part if present
    var t = d.split(' Occupying Force')[0];
    // Check if it is an NPC camp
    if(dtr.npcNames.includes(t)){
        return "NPC";
    }
    // Check if it is a Faction camp
    if(dtr.factionNames.includes(t)){
        return "Faction";
    }
    // Check if it is a Player camp
    if(["Neutral","Your","Hostile"].includes(t)){
        return "Player";
    }
    return "Unknown";

}
dtr.getSelectedSizes = function(){
    dtr.selectedSizes =  [...document.querySelectorAll('#campSizesSelect .dtcheck:checked')].map(e => e.name);
    let t = document.getElementById("campSizesSelect");
    t.classList.add("nosee");
    t.classList.remove("see");
    $( "#campSizesSelect" ).dialog( "close" );
}
dtr.dec2bin = function(dec){
    return (dec >>> 0).toString(2).padStart(9,"0");
}
var iList = ["Herbs","Rare Herbs","Grapes","Hides","Animal Parts","Salts","Minerals","Rare Minerals","Equipment"];
iList.reverse();
dtr.getCollectable = function(){
    var res = {};
    var bits = []
    var collect = [];
    var showMe = [];
    var ld = map._mapData._locationData;
    for (let x in ld){
        if(x !== "dataTime"){
            for (let y in ld[x]){
                var thisLoc = ld[x][y];
                if(thisLoc.res > 0){
                    bits = [];
                    res[y+"|"+x] = thisLoc;
                    var items = dec2bin(Number(thisLoc.res));
                    collect.push([x+"|"+y,items.split('')]);
                    for (var i = 0; i < items.length; i++) {
                        if(items.charAt(i) == "1"){
                            bits.push(iList[i])
                        }
                    }
                }
            }
        }
    }
    console.log("collect: ",collect);
    let t = document.querySelector("#dtrcollecttable");
    dtr.removeRows(t);
    let tBody = t.querySelector("tbody");
    let  showme = $("#toshow input:checked");
    let ch = [];
    for (let a=0;a<showme.length;a++){
        ch.push(showme[a].value);
    }
    console.log("show items",ch);
    let town =  document.querySelector(".home").dataset;
    for(let i=0;i<collect.length;i++){
        show = false;
        let rc = collect[i][1];
        for(let c=0;c<ch.length;c++){
            if(rc[ch[c]]=="1"){
                show = true;
            }
        }
        if(show === true){
            var row = tBody.insertRow(-1);
            var cell = row.insertCell(-1);
            let newEl = makeLoc(collect[i][0]); //document.createElement("a");
            cell.appendChild(newEl);
            rc = collect[i][1].reverse();
            for(let c=0;c<9;c++){
                cell = row.insertCell(-1);
                cell.textContent = rc[c];
            }
            cell = row.insertCell(-1);
            dist = dtr.hypot(collect[i][0].split("|"),[town.x,town.y]);
            cell.textContent = dist.toFixed(2);
        }
    }
    if(!TableSort.tables_.includes(document.querySelector("#dtrcollecttable"))){
    
        TableSort.init("dtrcollecttable");
    }
}
dtr.makeLoc = function(coords){
    let newEl = document.createElement("a");
    newEl.setAttribute("class","a--location");
    newEl.setAttribute("href","#");
    newEl.setAttribute("data-x",coords.split("|")[0]);
    newEl.setAttribute("data-y",coords.split("|")[1]);
    newEl.textContent = coords;
return newEl;
}
/* Method: wholeMap
* Do a scan of the entire map.
* 
* Parameter:
* None
* coords - array. The array holding the numbers to swap.
* 
* Returns:
* Nothing.
*/

dtr.wholeMap = function(){
    // There is no need to worry about zoom levels as they are only used for the display. Data is loaded for the max possible display area each time.
    dtr.illyRange = [[-1000,1000],[-3300,1000]];
    dtr.currentLoc = [-1100,1000];
    
    dtr.moveTo(dtr.currentLoc[0]+"|"+dtr.currentLoc[1]);
    console.log("Scanning centered on: " + dtr.currentLoc[0] + "|" + dtr.currentLoc[1]);
    // This is where I'd scan the mapData
    
    // Check if we need to increase the X coord or reset back to the left edge
    if(dtr.currentLoc[0]+100 > 1000){
        dtr.newX = -1000;
        dtr.newY = dtr.currentLoc[1]-75;
    }else{
        dtr.newX = dtr.currentLoc[0]+100;
        dtr.newY = dtr.currentLoc[1];
    }
    dtr.moveTo(dtr.newX+"|"+dtr.newY);
    dtr.currentLoc = [dtr.newX,dtr.newY];
//    console.log("Scanning centered on: " + dtr.newX + "|" + dtr.newY);
    console.log("Scanning centered on: " + dtr.currentLoc[0] + "|" + dtr.currentLoc[1]);
}

dtr.doMove = function(){
    // Calculate the new coords
        if(dtr.currentScanLoc[0]+100 > 1000){
        dtr.newX = -1000;
        dtr.newY = dtr.currentScanLoc[1]-75;
    }else{
        dtr.newX = dtr.currentScanLoc[0]+100;
        dtr.newY = dtr.currentScanLoc[1];
    }
    // Check to see if the entire map has been scanned (ie newY is now < -3300)
//    if(dtr.newY < -3300){
    if(dtr.newY < 900){
        // Yes, so cancel the timed event, display all the captured data and exit.
        console.log("Entire map scanned.");
        dtr.clearTimer();
//        clearInterval(wholeMapIntervID);
        console.log("Captured data: ",dtr.captured);
    }else{
        // Scan the current mapData for required info
//        dtr.doScans();
//        checkLocDat();
        // Move to the new coords
        dtr.moveTo(dtr.newX+"|"+dtr.newY);
        // Update current location
//        dtr.currentScanLoc = [dtr.newX,dtr.newY];
    }
}
dtr.checkLocData = function(){
    var res = {};
//    var myst = {};
    var bits = []
    var collect = [];
    var showMe = [];
    var ld = map._mapData._map._mapData._locationData;
    for (let x in ld){
        if(x !== "dataTime"){
//            console.log(x);
            for (let y in ld[x]){
//                console.log(x,y);
                var thisLoc = ld[x][y];
                // Record if myst
                if(thisLoc.mystery !== null){
                    dtr.captured.myst[y+"|"+x] = thisLoc.mystery;
                }
                // Record if rare res
                if(thisLoc.res > 0){
                    bits = [];
                    res[y+"|"+x] = thisLoc;
                    var items = dec2bin(Number(thisLoc.res));
                    iHere = items.split('');
                    if(Number(iHere[1]) == 1 ){
                        dtr.captured.herbs[x+"|"+y] = true;
                    }
                    if(Number(iHere[7]) == 1 ){
                        dtr.captured.minerals[x+"|"+y] = true;
                    }
                }
            }
        }
    }
    console.log("myst: ",dtr.captured.myst)
    console.log("herbs: ",dtr.captured.herbs);
    console.log("minerals: ",dtr.captured.minerals);
}

