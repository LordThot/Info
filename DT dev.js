dev = function(){
    dtrmudev = {
        found:{c:{},mu:{},mt:{},n:{}}, // Any camps/moving units found
        matched:{}, // Those properties in found that match the criterion in wanted
        wanted:{actions:[],types:[]}, // The criterion used to filter properties in found
        errors:[],
        muOwners:{muplayer:"Player",mufaction:"Faction",munpc:"NPC"},
        muTypes:{utmilitary:"military units", utdiplo:"diplo units", uttrade:"trade units"},
        standings:{},
    };
    dtrmudev.getCriteria = function(){
        // Get any selected criteria in the tblCtrls element
       dtrmudev.wanted.actions = [...document.querySelectorAll('#actionFilter .dtcheck:checked')].map(e => e.name);
       dtrmudev.wanted.types = [...document.querySelectorAll('#typeFilter .dtcheck:checked')].map(e => e.name);
    }
    dtrmudev.scan2 = function(){
        debugger;
        var srcData ={};
        // Sources to scan
        const sources = ["mu","mt","c","n"];
        // work through these possible sources
        const iterator = sources.values();
        for (const src of iterator) {
            // Check the criteria to see if this source is needed.
            if(dtrmudev.srcFilter(src)){
                // This src is wanted so now capture the data in src
                srcData = mapData[src];
                // Work through all the data captured
                for (const [key, value] of Object.entries(srcData)) {
                    // Only proceed if the owner (player, faction, npc) of this property is wanted
                    if(dtrmudev.ownerFilter(src,value)){
                        // Now we just have to check if the action of this entry (mil, diplo, trade)
                        // is wanted
                        if(dtrmudev.unitTypeFilter(src,value)){
                            // Yes so get the direction and add it to the table
                            var direction = dtrmudev.getDirection(value.cx,value.cy,value.dx,value.dy);
                            dtrmudev.updateTable2(value,direction);
                        }
                    }
                }
            }
        }        
    }
    dtrmudev.scan = function(){
        /*
        mu - moving units (player, faction, npc) can be mil or diplo if player
        mt - moving trade units. Can only be player (King Sigurd from tutorial?)
        c - encampments. Can be player, faction, npc. Military only
        n - stationary (harvesting?) trade units. Player only
        */
        // Get and scan the mu, mt, n and c objects
        // This tool is for moving units only so just "mt" & "mu"
        var mu = mapData.mu;
        //var c = mapData.c;
        var mt = mapData.mt;
        //var n = mapData.n;
        const sources = ["mu","mt"]; //,"c","n"];
        const iterator = sources.values();
        for (const src of iterator) {
            thisSrc = mapData[src];
            for (const [key, value] of Object.entries(thisSrc)) {
                //filterResults = dtrmudev.filter(src,value);
                //if(filterResults[0]){
                if(dtrmudev.filter(src,value)){
                    value.source = src;
                    dtrmudev.matched[key] = value;
                }
            }
        }
        console.log("Found: ",dtrmudev.found);
        // Add the matched object to the table

        for (const [key, value] of Object.entries(dtrmudev.matched)) {
            var dirData = dtrmudev.getDirection(value.cx,value.cy,value.dx,value.dy);
            dtrmudev.updateTable(value,dirData)
        }

    }
    dtrmudev.srcFilter = function(src){
        // Check the criteria to see if anything from this src is needed
        let wantThis = true; // default behaviour
        switch(src){
            case "mt":
                if(!dtrmudev.wanted.actions.includes("uttrade")){
                    // trade unit movements are not wanted so return false
                    wantThis = false;
                }
                break;
            case "mu":
                if(!((dtrmudev.wanted.actions.includes("utmilitary")) || (dtrmudev.wanted.actions.includes("utdiplo")))){
                    // Neither mil or diplo troop movements are wanted so return false
                    wantThis = false;
                }
                break;
            case "c":
            case "n":
                wantThis = false;
                break;
            default:
                wantThis = true;
        }
        return wantThis;
    }
    dtrmudev.ownerFilter = function(src,movement){
        // Get the owner of this movement
        let thisOwner = dtrmudev.getOwner(movement);
        if(thisOwner == "Unknown owner"){
            return false;
        }
        if(dtrmudev.wanted.types.includes(thisOwner)){
            movement.owner = thisOwner;
            return true;
        }
        return false;

        // Is this owner wanted?

    }
    dtrmudev.unitTypeFilter = function(src,movement){
        // work out if it is a mil, diplo or trade movement
        if(!dtrmudev.wanted.actions.includes(dtrmudev.getUnitType(movement))){
            return false;
        }
        return true;
    }
    dtrmudev.getUnitType = function(movement){
        // There are only 3 types of movement on the map so if it isn't one of the first 2 it must
        // be the third.
        var unitType = "";
        switch (movement.i){
            case "sword":
                unitType = "utmilitary";
                break;
            case "diplo":
                unitType = "utdiplo";
                break;
            default:
                unitType = "uttrade";
        }
        //unitType = "utmilitary";
        movement.ut = unitType;//dtrmudev.muTypes[unitType];
        return unitType;
    }
    dtrmudev.getOwner = function(movement){
        // Is it NPC?
        if (dtrmudev.hasNumbers(movement.i)){
            movement.status = -100;
            return "munpc";
        }
        // Is it faction?
        if((movement.d !=='Unknown') && (dtr.factionNames.includes(movement.d))){
            movement.status = dtrmudev.standings[movement.d].s;
            return "mufaction";
        }
        // Is it a Player?
        if ((movement.i == 'sword') || (movement.i == 'diplo')){
            movement.status = 0;
            if(movement.rd[0]=="Y"){movement.status = 101};
            if(movement.rd[0]=="H"){movement.status = -100};
            return "muplayer";
        }
        // Not found an owner so return an error
        console.log("Unknown Movement Owner - ",movement);
        dtrmudev.errors.push([movement.owner,movement]);
        return "Unkown owner!";
    }
    dtrmudev.updateTable2 = function(m,d){
        //for (const [key, v] of Object.entries(matched)) {        
            var tBody = document.querySelector("#dtrmutable tbody");

            var tr = tBody.insertRow(-1);
            // rr=m.r;
            // console.log(m.r,m);
            // switch(rr){
            //     case rr<0:
            //         tr.setAttribute("background-color","red");
            //         tr.setAttribute("color","green");
            //         break;
            //     case rr>0:
            //         tr.setAttribute("background-color","green");
            //         tr.setAttribute("color","red");
            //         break;
            //     case 0:
            //         if(m.rd.trim()=="Your"){
            //         tr.setAttribute("background-color","blue");
            //         tr.setAttribute("color",rgb(255, 170, 0));
            //         }
            //         break;
            //     default:
            //         // if(m.rd.trim()=="Your"){
            //         //     tr.setAttribute("backgroundColor","blue");
            //         //     }
    
            // }
            // Coords
            var cell = tr.insertCell(0);
            cell.appendChild(dtr.makeLoc(m.cx.toFixed(0)+"|"+m.cy.toFixed(0)))
            // Who is moving
            cell = tr.insertCell(1);
            let txt = dtrmudev.muOwners[m.owner] + " " + dtrmudev.muTypes[m.ut];
            cell.textContent = txt;
            switch (true){
                case (m.status
 < 0):
                    cell.classList.add("hostile");
                    break;
                case (m.status
 == 0):
                    cell.classList.add("neutral");
                    break;
                case (m.status
 >100):
                    cell.classList.add("yours");
                    break;
                case (m.status
 > 0):
                    cell.classList.add("friendly");
                    break;
            }
            // What direction
            cell = tr.insertCell(2);
            cell.textContent = "Heading "+d[0]+" on a rough bearing of "+d[1];
        //}
    }

    dtrmudev.filter = function(s,v){
        console.log("s: ",s, ", v: ",v);
        // This function decides if the current sighting is wanted
        const types = dtrmudev.wanted.types;
        const actions = dtrmudev.wanted.actions;
        // Check trade movements
        //if(((s == 'mt') || (s == 'n')) && (actions.includes("uttrade"))){
        if((s == 'mt') && (types.includes("muplayer"))){
            // It's a trade entry and belongs to a player both of which are wanted so return true. Possibly in the future(?) a faction
            v.orgName = "Player trade units";
            return true;
        }
        // Check diplo movements
        if(((v.i == 'diplo') && (s=="mu")) && (types.includes("muplayer"))){
            // Diplo movement by a player both of which are wanted so return true
            v.orgName = "Player diplo units";
            return true;
        }
        // Check mil movements
        if (s=="mu"){
        //if(((v.i == 'sword') || (v.i.includes("sigil")) || (dtrmudev.hasNumbers(i))) && (s =="mu")){
           if ((dtrmudev.hasNumbers(v.i)) && (types.includes("munpc"))){
            // NPC units
            v.orgName = v.d;
            return true;
           }
           if((v.d !=='Unknown') && (dtr.factionNames.includes(v.d)) && (types.includes("mufaction"))){
          // if  (v.i.includes("sigil")){
           // Faction troops
            v.orgName = v.d;
            return true;
           }
           if (v.i == 'sword'){
            // Player troops
            v.orgName = "Player troops";
            return true;
           }
            //return true;
        }
        // Nothing matched up so return false.
        return false;
    }
    dtrmudev.hasNumbers = function(t){
        var regex = /\d/g;
        return regex.test(t);
    } 
    dtrmudev.getDirection = function(cx,cy,dx,dy){
        var xDelta = cx-dx;
        var yDelta = cy-dy;
        var brg = dtrmudev.getAngleDegrees(cx,cy,dx,dy);

        //if(brg < 22.5) brg = brg +360;
        if(dtrmudev.inRange(brg,22.5,67.5)){
            return ["NE",brg.toFixed(2)+" deg"];
        }
        if(dtrmudev.inRange(brg,67.5,112.5)){
            return ["E",brg.toFixed(2)+" deg"];
        }
        if(dtrmudev.inRange(brg,112.5,157.5)){
            return ["SE",brg.toFixed(2)+" deg"];
        }
        if(dtrmudev.inRange(brg,157.5,202.5)){
            return ["S",brg.toFixed(2)+" deg"];
        }
        if(dtrmudev.inRange(brg,202.5,247.5)){
            return ["SW",brg.toFixed(2)+" deg"];
        }
        if(dtrmudev.inRange(brg,247.5,292.5)){
            return ["W",brg.toFixed(2)+" deg"];
        }
        if(dtrmudev.inRange(brg,292.5,337.5)){
            return ["NW",brg.toFixed(2)+" deg"];
        }
        if((brg<23) || (brg>337.5)){
            return ["N",brg.toFixed(2)+" deg"];
        }
    }
    dtrmudev.getAngleDegrees = function(cx,cy,dx,dy,force360 = true) {
        let deltaX = cx-dx; 
        //let deltaY = cy-dy; // reverse
        let deltaY = -1*(cy-dy);
        let radians = Math.atan2(deltaY, deltaX)
        let degrees = (radians * 180) / Math.PI - 90; // rotate
        if (force360) {
           while (degrees >= 360) degrees -= 360;
           while (degrees < 0) degrees += 360;
        }
        //console.log('angle to degree:',{deltaX,deltaY,radians,degrees})
        return degrees;
    }
    dtrmudev.updateTable = function(m,d){
        //for (const [key, v] of Object.entries(matched)) {        
            var tBody = document.querySelector("#dtrmutable tbody");

            var tr = tBody.insertRow(-1);
            rr=m.r;
            console.log(m.r,m);
            switch(rr){
                case rr<0:
                    tr.setAttribute("backgroundColor","red");
                    break;
                case rr>0:
                    tr.setAttribute("backgroundColor","green");
                    break;
                case 0:
                    if(m.rd=="Yours"){
                    tr.setAttribute("backgroundColor","blue");
                    }
                    break;
                default:
                    if(m.rd=="Yours"){
                        tr.setAttribute("backgroundColor","blue");
                        }
    
            }
            // Coords
            var cell = tr.insertCell(0);
            cell.appendChild(dtr.makeLoc(m.cx.toFixed(0)+"|"+m.cy.toFixed(0)))
            // Who is moving
            cell = tr.insertCell(1);
            cell.textContent = m.orgName;
            // What direction
            cell = tr.insertCell(2);
            cell.textContent = "Heading "+d[0]+" on a rough bearing of "+d[1];
        //}
    }
    dtrmudev.inRange = function(num,a,b){
        low=Math.min(a,b);
        high=Math.max(a,b);
        if(num>low && num<= high){
            return true;
        }
        return false;
    }
   
}
dtrmudevintercept = function(){
    $(document).ajaxSuccess(function (event, xhr, settings) {
        var furl = settings.url;
        var url = settings.url.split("?")[0];
        var bits = url.split("/");
    //    console.log("bits: ",bits);
        var paramArray = settings.url.split("?");
        if (paramArray.length > 1) {
            var paramstring = settings.url.split("?")[1];
            var params = paramstring.split("&");
            if (params[0] == "page=api") {
                var runnish = "";
                addButton();
            }
        } 
        switch (bits[1]) {
            case "World":
                switch (bits[2]) {
                    case "MapData":
                    case "MapRefresh":
                    case "MapCanvas":
                        // This is where I capture the faction armies and camp data
                        dtrmudev.scan();
                        //dt.notes(dt.countVisible2); // Show count of visible notes
                        //dt.canvasNotes();
                        break;
                }
                break;
        }        
    })
}
dtrmudevajax = function(data){
    $.ajax({
        // ftp://dewt@ftp.dewt.co.uk/public_html/durctools2dev/php/craftingdb.php
        url: "https://illystuff.uk/FactionStandings/php/durcGetRS.php",
        data: data,
        type: "POST",
        dataType: "json",
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            //console.log(data);
            //Object.assign(dtrmudev.standings, data);
            data.forEach((faction) =>{
                fname = faction.factionname.trim();
                dtrmudev.standings[fname]={id:faction.factionid,s:faction.standing}
            })
            //console.log(dtrmudev.standings);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("There was an error getting the RS data " + errorThrown);
        }
    })

}

dev();