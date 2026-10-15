/* File: movCoordinator4.js
 * Script to assist in coordinating the sending of multiple armies to a single target.
 * 
 * Different armies will travel at different speeds depending on the units in 
 * the army and the abilities of the commanders. This allows you to select 
 * armies from any town under your control and will then calculate the travel 
 * times for them to reach the target. The results are then sorted so the armies 
 * are listed in the order they should be sent. Times are given in both GMT 
 * (Illy time) and local time for the user.
 */

/* Object: mc
 * This object is the container for all the methods for this script.
 */
dtmovcoord = function(){
    mc = {
        /* Method: setup
        * Sets up the html elements used by the tool
        */
        setup: function () {
            let toolDivs = document.querySelector("#toolDivs")
            mc.addElement(toolDivs, "div", ["id", "class", "title", "data-onclose"], ["movCoordinatorForm", "nosee", "Movement Coordinator", "mc.clearAll"]);
            document.getElementById("movCoordinatorForm").innerHTML = this.movCoordForm;
            // <div id="availUnits" class="nosee" title="Units Available here">
            mc.addElement(toolDivs, "div", ["id", "class", "title"], ["availUnits", "nosee", "Units Available here"]);
            document.getElementById("availUnits").innerHTML = this.availUnits;
            // #movCoordHrlp
            mc.addElement(toolDivs,"div",["id", "class", "title"],["movCoordHelp", "nosee", "Movement Coordinator Help"]);
            document.getElementById("movCoordHelp").innerHTML = this.movCoordHelp;
            // Add a button to the in-game UI to launch the tool
    //        var winWWidth = window.innerWidth;
    //        var winHeight = window.innerHeight;
    //        var logopos = document.getElementsByClassName('logo').item(0);
    //        var style = window.getComputedStyle(logopos, null);
    //        var left = (parseInt(style.getPropertyValue("left"))) + (parseInt(style.getPropertyValue("width")));
    //        left = parseInt(winWWidth) - 170;

    // <div id="mcbut" style="position:fixed; left:1200px; top:0px;" class="see"><input value="Mov Coordinator" onclick="mc.newMov()" title="Click to open Movement Coordinator" style="z-index: 99; float:right;" type="button"></div>
    //var mcbut = mc.addElement(document.body, 'div', ['id', 'style', 'class'], ['mcbut', 'position: fixed; left:' + left + 'px;top:0px', 'see']);
    //mcbut.innerHTML = '<input type="button" value="Mov Coordinator" onclick="mc.newMov()" title="Click to open Movement Coordinator">';

        },
        /* Object: mov
        * Defines the structure of the object used to hold the data for the 
        * coordinated movement to a given target.
        * 
        * Properties:
        * target - array. The X and Y coords of the target
        * arriveAt - integer. The time the first units should arrive at the target. This is a timestamp.
        * units - array. An array of objects with each object being a particular unit group.
        */
        mov: function (target, arriveAt, units) {
            this.target = target;
            this.arriveAt = arriveAt;
            this.units = units;
        },
        /* Object: unitGp
        * Defines properties for a unit group
        * 
        * Properties:
        * id - string. A unique id for each unit group. For armies this will be the army id.
        * name - string. The name currently assigned to this unit group.
        * from - integer. The id of the town this group will be sent from.
        * town - string. The name of the town this unit group is from.
        * speed - integer. The travel speed of this unit group.
        * travelTime - integer. The number of milliseconds for this group to reach the target.
        * depTime - date. The date/time this group should be sent at.
        */
        unitGp: function (id, from, speed) {
            this.id = id;
            this.name = "";
            this.from = from;
            this.town = "";
            this.speed = speed;
            this.travelTime = 0;
            this.depTime = 0;
        },
        /* Method:newMov
        * Set up a new coordination list which is held in the global object mc.thisMov
        */
        newMov: function () {
            if(document.getElementById('movCoordinatorForm') === null){
                mc.setup();
            }
            mc.thisMov = new this.mov([], 0, []);
            mc.showTool("#movCoordinatorForm","MovCoord");
        },
        /* Method: getTarget
        * Get the coords of the current map center.
        * 
        * Returns:
        * Array - [x coord, y coord]
        */
        getTarget: function () {
            mc.thisMov.target = [mapData.x, mapData.y];
            document.getElementsByName("xCoord")[0].value = mapData.x;
            document.getElementsByName("yCoord")[0].value = mapData.y;
            return [mapData.x, mapData.y];
        },
        getTownArmies: function () {
            if(window.location.hash !=="#/Military/Armies"){
                location.hash="#/Military/Armies";
                window.alert("Changing to the Armies page for this town...");
            }
            mc.tmpArmies = {};
            mc.showTool("#availUnits");
            var armyTbl = document.querySelector("#unitList tbody");
            mc.removeRows(armyTbl.parentElement);
            // Variable to hold the details
            var moveableArmies = [];
            // Page element that contains info on all the armies
            var armies = document.querySelectorAll('#ArmiesAccordian > h3');
            // Step through each army on the page
            for (var a = 0; a < armies.length; a++) {
                // Check if this army can move
                var canMove = armies[a].nextElementSibling.querySelector('td').textContent.split(':') [1].trim();
                // Proceed if this unit can move
                if (canMove !== "Can't Move(Need a living commander and 1 unit)") {
                    var thisArmy = new this.unitGp("", 0, 0);
                    thisArmy.id = armies[a].nextElementSibling.querySelector('form > input').value;
                    thisArmy.name = armies[a].querySelector('a').textContent.split(':') [1].trim();
                    thisArmy.speed = armies[a].nextElementSibling.querySelector('td > b').textContent.split(' ') [0];
                    thisArmy.town = dt[PlayerId].towns[CurrentTown].name;
                    thisArmy.from = [dt[PlayerId].towns[CurrentTown].x, dt[PlayerId].towns[CurrentTown].y];
                    moveableArmies.push(thisArmy);
                    var row = armyTbl.insertRow(-1);
                    var cell = row.insertCell(0);
                    cell.innerHTML = '<input type="checkbox" value=' + thisArmy.id + ">";
                    cell = row.insertCell(1);
                    cell.innerHTML = thisArmy.town;
                    cell = row.insertCell(2);
                    cell.innerHTML = thisArmy.name;
                    cell = row.insertCell(3);
                    cell.innerHTML = thisArmy.speed;
                    cell = row.insertCell(4);
                    cell.innerHTML = thisArmy.from[0];
                    cell = row.insertCell(5);
                    cell.innerHTML = thisArmy.from[1];
                    cell = row.insertCell(6);
                    var dist = mc.hypot(mc.thisMov.target, thisArmy.from);
                    thisArmy.travelTime = parseInt((dist / thisArmy.speed) * 60 * 60 * 1000, 10);
                    cell.innerHTML = SecToText(parseInt(thisArmy.travelTime / 1000));
                    mc.tmpArmies[thisArmy.id] = thisArmy;
                }
                var rubbish = '';
            }
    //        console.log(moveableArmies);
    //        if(!mc.hasOwnProperty("tmpArmies")){
    //            mc.tmpArmies={};
    //        }
    //        mc.tmpArmies = moveableArmies;

        },

        /* Method: updateArmyList
        * Generate the list of units that are to be sent
        */
        updateArmyList: function () {
            // Get any units selected in the town unit table
            this.getSelectedArmies();
            // Clear any entries in the army list table
            var tbl = document.querySelector("#sendUnitList");
            mc.removeRows(tbl);
            // Step through the entries in the units property adding them to the table
            var tbl = document.querySelector("#sendUnitList");
            mc.removeRows(tbl);
            // Get the target arrival time
            var tz="Z";
            var etaDate = document.getElementById("etadate");
            var etaTime = document.getElementById("etatime");
            mc.thisMov.targetTime = new Date(etaDate.value + " " + etaTime.value + "Z");
            if(mc.thisMov.targetTime === "Z"){
                mc.thisMov.targetTime = 0;
                mc.thisMov.units[k[r]].depTime = 0;
            }else{
                var k = Object.keys(mc.thisMov.units);
                for (r = 0; r < k.length; r++) {
                    mc.thisMov.units[k[r]].depTime = new Date(mc.thisMov.targetTime.getTime() - mc.thisMov.units[k[r]].travelTime);
                }
            }
            this.showUnits();
    //        TableSort.init('sendUnitList');
            mc.tmpArmies = {};

        },
        
        showUnits: function(){
            var tbl = document.querySelector("#sendUnitList");
            mc.removeRows(tbl);
            mc.thisMov.units.sort(function(obj1, obj2) {
                // Ascending: first time before the previous
                return obj1.depTime - obj2.depTime;
            });
            var tblBdy = document.querySelector("#sendUnitList tbody");
            var k = Object.keys(mc.thisMov.units);
            for (r = 0; r < k.length; r++) {
    //            thisArmy = JSON.parse(addUnits[r]);
                thisArmy = mc.thisMov.units[k[r]];
                var row = tblBdy.insertRow(-1);
                var cell = row.insertCell(0);
                cell.innerHTML = thisArmy.town;
                cell = row.insertCell(1);
                cell.innerHTML = thisArmy.name;
                cell = row.insertCell(2);
                cell.innerHTML = thisArmy.speed;
                cell = row.insertCell(3);
                cell.innerHTML = thisArmy.from[0];
                cell = row.insertCell(4);
                cell.innerHTML = thisArmy.from[1];
                cell = row.insertCell(5);
                var dist = mc.hypot(mc.thisMov.target, thisArmy.from);
                thisArmy.time = parseInt((dist / thisArmy.speed) * 60 * 60, 10);
                cell.innerHTML = SecToText(thisArmy.time);
                cell = row.insertCell(6);
                if(mc.thisMov.targetTime !== 0){
                    mc.thisMov.units[k[r]].depTime = new Date(mc.thisMov.targetTime.getTime() - thisArmy.travelTime);
                    cell.innerHTML = mc.thisMov.units[k[r]].depTime.toUTCString();
                }
    //            cell.innerHTML = this.getSendTime(thisArmy.time);
                cell = row.insertCell(7);
                if(mc.thisMov.targetTime !== 0){
    //                mc.thisMov.units[k[r]].depTime = new Date(mc.thisMov.targetTime.getTime() - thisArmy.travelTime);
                    cell.innerHTML = mc.thisMov.units[k[r]].depTime.toLocaleString();
                }
                cell = row.insertCell(8);
                cell.innerHTML = '<input type="button" style="border-radius: 50%; border: 1px solid red; background-color: red" onclick="mc.removeRow('+r+')">';
                
    //            cell.innerHTML = thisArmy.travelTime;
            }
            
        },
        
        removeRow: function(r){
            var arr = mc.thisMov.units;
            arr.splice(r,1);
            mc.thisMov.units = arr;
            this.showUnits();
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
        /* Method: getSelectedArmies
        * Add any armies selected in the town unit table to the units property of mc.thisMov
        */
        getSelectedArmies: function () {
            var rows = document.querySelectorAll("#unitList tbody tr");
            var selectedUnits = [];
            for (var r = 0; r < rows.length; r++) {
                if (rows[r].querySelector("td input").checked === true) {
                    selectedUnits.push(rows[r].querySelector("td input").value);
                    var id = rows[r].querySelector("td input").value;
                    mc.thisMov.units[id] = mc.tmpArmies[id];
                }
            }
        },

        clearAll: function (){
            mc.thisMov = {};
            document.querySelector("#movCoordinatorForm").innerHTML=this.movCoordForm;
        },
        /* Method: addElement
        * Create and append an element with multiple attributes
        *
        * Parameters:
        * parent - the element the element is to be appended to
        * elementType - the type of element to add.
        * attribVal - array holding the values to be given to the attributes
        * attribName - array holding the names of the attributes to be added.
        *
        * Returns:
        * The new element.
        */
        addElement: function (parent, elementType, attribName, attribVal) {
            var newElem = document.createElement(elementType);
            if (attribName) {
                var numAttribs = attribName.length;
                if (numAttribs > 0) {
                    for (var i = 0; i < numAttribs; i++) {
                        newElem.setAttribute(attribName[i], attribVal[i]);
                    }
                }
            }
            var newDiv = parent.appendChild(newElem);
            return newDiv;
        },
        /* Method: showTool
        * Display the dialog for the tool.
        */
        showTool: function (id, flag) {
            var winHeight = window.innerHeight;
            var maxHt = parseInt(0.9 * winHeight);
            var winWidth = window.innerWidth;
            var maxWd = parseInt(0.75 * winWidth);
                me = {width: 'auto', maxWd: maxWd, height: 'auto', maxHt: maxHt, pos: {left: 'center', top: 20}};
            $(function () {
                $(id).dialog({
                    "width": me.width,
                    "maxWidth": me.maxWd,
                    "height": me.height,
                    "maxHeight": me.maxHt,
                    resizeStop: function (event, ui) {
                        me.width = ui.size.width;
                        me.height = ui.size.height;
                        me.pos = ui.position;
                    },
                    dragStop: function (event, ui) {
                        me.pos = ui.position;
                    },
                    beforeClose: function (event, ui) {
                    }
                });
            });
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
        
        availUnits: '<h2>Available Units</h2><form name="unitDetails"><fieldset><legend>Armies</legend><table id="unitList" border="1" style="border-collapse:collapse;"><thead><tr><th>Include</th><th>Town</th><th>Units</th><th>Speed</th><th colspan="2">Coords</th><th>Travel Time</th></tr></thead><tbody></tbody></table></fieldset><input type="button" value="Accept" class="fRight" onclick="mc.updateArmyList()"/></form>',
        movCoordForm: '<table class="hlptbl"><tbody><tr><td><h3>Movement Coordinator</h3></td><td><img class="hlpicon" onclick="mc.showTool(\'#movCoordHelp\')" title="Mov Coordinator Help" src="https://assets.illyriad.net/img/buttons/secondary/about_32x32_off.png" alt="Help"></td></tr></tbody></table><form name="targetDetails"><fieldset><legend>Dest Coords</legend><table width="100%"><tr><td><label for="xCoord">X Coord</label><input type="text" name="xCoord" value="" size="5" /><label for="yCoord">Y Coord</label><input type="text" name="yCoord" value="" size="5" /></td><td><input type="button" value="Get coords" class="fRight" onclick="mc.getTarget()"/></td></tr></table></fieldset><fieldset><legend>Earliest Arrival</legend><label for="etadate">Date</label><input type="date" name="etadate" id="etadate"><label for="etatime">Time</label><input type="time" name="etatime" id="etatime"></fieldset></form><form name="unitDetails"><fieldset><legend>Units</legend><table id="sendUnitList" border="1" style="border-collapse:collapse;"><thead><tr><th>Town</th><th>Unit(s)</th><th>Speed</th><th colspan="2">Coords</th><th>Travel Time</th><th class="Date">Send At (GMT)</th><th class="Date">Send At (Local)</th><th>Remove</th></tr></thead><tbody></tbody></table><input type="button" value="Get Units" class="fRight" onclick="mc.getTownArmies()"/></fieldset></form>',
        movCoordHelp:'<h4>Movement Coordinator</h4><img src="https://v3.durctools.uk/images/movCoordinatorMain.PNG" alt="Movement Coordinator" width="632px" height="400px"><p>Displays a form that allows you to set a target location, required arrival time and then select units from all towns.</p><p>The units are displayed in a table and are sorted in the required order of sending. The send times are shown in both GMT (Illy time) and the local time as set on your device. For the image above I told my laptop it was in Kathmandu which is GMT + 5:45.</p><p>To set the target location center the World Map on it and press the \'Get Coords\' button.</p><p>Clicking in the Date or time fields will open popups to select from or you can simply type the values in (dates must be in the MM/DD/YYYY format. The time is a GMT time.</p><p>To select units from a particular town view the Armies page for that town and click the \'Get Units\' button. This will open a window showing all the armies in that town which are capable of moving. To add them to the main form check the box next to the army. When you have selected all those you want click the \'Accept\' button.</p>'
    };
}