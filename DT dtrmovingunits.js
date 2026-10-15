dtrmu = {};
dtrmu.getMU = function(){
    var tBody = document.querySelector("#dtrmutable tbody");
    var mu = mapData.mu;
    for (const [key, value] of Object.entries(mu)) {
        console.log(key+": "+ JSON.stringify(value));
        // Use the 'i' property to figure out what this is
        var i = value.i;
        switch(i){
        case "sword":
            unitType="muplayer";
            console.log("plsyer military units");
            orgName = "Player Military Unit(s)";
            break;
        case "diplo":
            unitType="muplayer";
            console.log("player diplo units");
            orgName = "Player Diplo Unit(s)";
            break;
        case "underworld3":
            unitType="mufaction";
            console.log("Underworld units");
            orgName = 'Underworlders';
            orgFlag = 'https://illystuff.uk/FactionRanges/images/sigils/105.png';
            break;
        default:
            if(i.includes("sigil")){
            unitType="mufaction";
                console.log("Faction units");
                orgName = value.d;
                orgFlag = 'https://illystuff.uk/FactionRanges/images/sigils/'+i+'.png';
            }
            if(dtrmu.hasNumbers(i)){
            unitType="munpc";
            console.log("NPC units");
            orgName = value.d;
            orgFlag = null;
            }
            console.log(i);
        }
        dtrmu.showTypes =  [...document.querySelectorAll('#typeFilter .dtcheck:checked')].map(e => e.name);
        if(dtrmu.showTypes.includes(unitType)){
            var dirData = dtrmu.getDirection(value.cx,value.cy,value.dx,value.dy);
            console.log("Heading of units: ",dirData);

            var tr = tBody.insertRow(-1);
            // Coords
            var cell = tr.insertCell(0);
            cell.appendChild(dtr.makeLoc(value.cx.toFixed(0)+"|"+value.cy.toFixed(0)))
            // Who is moving
            cell = tr.insertCell(1);
            cell.textContent = orgName;
            // What direction
            cell = tr.insertCell(2);
            cell.textContent = "Heading "+dirData[0]+" on a rough bearing of "+dirData[1];
        }
    }
}
dtrmu.getDirection = function(cx,cy,dx,dy){
    var xDelta = dx-cx;
    var yDelta = dy-cy;
    var brg = (Math.atan(yDelta/xDelta))*(180/Math.PI);
    if(brg < 22.5) brg = brg +360;
    //if(brg > 360) brg = brg -360;

    // NE - 22.5 -> 
    if(dtrmu.inRange(brg,22.5,67.5)){
        return ["NE",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,67.5,112.5)){
        return ["E",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,112.5,157.5)){
        return ["SE",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,157.5,202.5)){
        return ["S",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,202.5,247.5)){
        return ["SW",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,247.5,292.5)){
        return ["W",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,292.5,337.5)){
        return ["NW",brg.toFixed(2)+" deg"];
    }
    if(dtrmu.inRange(brg,337.5,382.5)){
        if(brg > 360){
            brg=brg-360;
        }
        return ["N",brg.toFixed(2)+" deg"];
    }

}

dtrmu.hasNumbers = function(t){
    var regex = /\d/g;
    return regex.test(t);
}
dtrmu.inRange = function(num,low,high){
    if(num>low && num<= high){
        return true;
    }
    return false;
}
dtrmu.clearMU = function(){
    var tbl = document.querySelector("#dtrmutable");
    dtr.removeRows(tbl);
}
