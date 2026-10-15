dtmisc = function(){
/*     dt.chat2 = {
        initialize: function(){
            console.log("dt.chat2.initialize called...");
            dt.chatdefaults = {post:"#000000",poster:"#704406",background:"#f3e9c7"};
            // dt[PlayerId].chatcolours = {poster:"",post:""};
            dt[PlayerId].chatdemocolours = {enabled:false,poster:"",post:"",background:""};
            if(dt[PlayerId].chatcolours.enabled){
                dt[PlayerId].chatdemocolours.poster = dt[PlayerId].chatcolours.poster;
                dt[PlayerId].chatdemocolours.post = dt[PlayerId].chatcolours.post;
                dt[PlayerId].chatdemocolours.background = dt[PlayerId].chatcolours.background;
                dt[PlayerId].chatdemocolours.enabled = true;
            }
            var demo = document.querySelector("#chatcolours2 .bordered");
            let d=window.getComputedStyle(demo);

            // Get the name colour
            //let pname = demo.querySelector(".name");
            var el = demo.querySelector(".name");
            //let p=window.getComputedStyle(pname);
            var styles=window.getComputedStyle(el);
            //let c=p.getPropertyValue("color");
            var nameCol=styles.getPropertyValue("color");

            // Get the background colour of the 2nd div
            //let div2=demo.querySelectorAll('div')[1];
            el=demo.querySelectorAll('div')[1];
            //let b = window.getComputedStyle(div2);
            styles = window.getComputedStyle(el);
            //bkg = b.getPropertyValue("background-color");
            var bkgCol = styles.getPropertyValue("background-color");
            // Get the text colour
            var textCol = styles.getPropertyValue("color");
            let background = document.querySelector("#bkg2");
            background.addEventListener("change",dt.chat2.modifyDemo,false);
            let poster = document.querySelector("#poster2");
            poster.addEventListener("change", dt.chat2.modifyDemo, false);
            let post = document.querySelector("#post2");
            post.addEventListener("change", dt.chat2.modifyDemo, false);

            dt.showTool("#chatcolours2");
            if(dt[PlayerId].chatcolours.enabled){
                document.getElementById("dtchattoggle2").value = "Disable";
                document.getElementById("dtchatapply2").removeAttribute("disabled");
    
            }else{
                document.getElementById("dtchattoggle2").value = "Enable";
                document.getElementById("dtchatapply2").setAttribute('disabled', 'disabled');
            }
        },
        toggle:function(){
            if(dt[PlayerId].chatcolours.enabled){
                document.getElementById("dtchattoggle2").value = "Ensable";
                dt[PlayerId].chatcolours.enabled = false;
                document.getElementById("dtchatapply2").setAttribute('disabled', 'disabled');
            }else{
                document.getElementById("dtchattoggle2").value = "Disable";
                dt[PlayerId].chatcolours.enabled = true;
                document.getElementById("dtchatapply2").removeAttribute("disabled");
            }
        },
        modifyDemo: function(e){
            console.log("modify demo called...",e);
            let demo = document.querySelector("#chatcolours2 .bordered");
            if(e.target.id == "poster"){
                dt[PlayerId].chatdemocolours.poster = e.target.value;
                demo.querySelectorAll(".name").forEach((name) => {
                    name.style.color = e.target.value;
                });
            }
            if(e.target.id == "post"){
                dt[PlayerId].chatdemocolours.post = e.target.value;
                demo.querySelectorAll("div").forEach((div) => {
                    div.style.color = e.target.value;
                });
            }
            if(e.target.id == "bkg2"){
                dt[PlayerId].chatdemocolours.background = e.target.value;
                demo.querySelectorAll("div").forEach((div) => {
                    div.style.backgroundColor = e.target.value;
                });

            }
            console.log("Demo colours: ",dt[PlayerId].chatdemocolours);
        },
        apply: function(){
            // Firstly store the settings in local storage.
            console.log ("dt.chat2.apply called...");
            dt[PlayerId].chatcolours.background = dt[PlayerId].chatdemocolours.background;
            dt[PlayerId].chatcolours.poster = dt[PlayerId].chatdemocolours.poster;
            dt[PlayerId].chatcolours.post = dt[PlayerId].chatdemocolours.post;
            var key = PlayerId + ':cc';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].chatcolours));
            root.style.setProperty('--cbackground',dt[PlayerId].chatcolours.background);
            root.style.setProperty('--poster', dt[PlayerId].chatcolours.poster);
            root.style.setProperty('--post', dt[PlayerId].chatcolours.post);
    
            // Apply the colours to GC.
            let thisChat = document.querySelector(".globalChat");
            thisChat.querySelectorAll("div").forEach((div) => {
                //div.style.color = dt[PlayerId].chatcolours.post;
                div.classList.add("dt_chatcolours_post");
                div.style.backgroundColor=dt[PlayerId].chatcolours.background;
            });
            thisChat.querySelectorAll(".name").forEach((name) => {
                //name.style.color = dt[PlayerId].chatcolours.poster;
                name.classList.add("dt_chatcolours_poster");
            });
            // Apply to AC if present
            thisChat = document.querySelector(".allianceChat");
            thisChat.querySelectorAll("div").forEach((div) => {
                div.style.color = dt[PlayerId].chatcolours.post;
            });
            thisChat.querySelectorAll(".name").forEach((name) => {
                name.style.color = dt[PlayerId].chatcolours.poster;
            });
    
    
        },
        reset: function(){
            // Transferthe defaults to the demo colours
            dt[PlayerId].chatdemocolours.post = dt.chatdefaults.post;
            dt[PlayerId].chatdemocolours.poster = dt.chatdefaults.poster;
            dt[PlayerId].chatdemocolours.background = dt.chatdefaults.background;
            // Apply the new colours to the inputs
            document.getElementById("bkg2").value=dt[PlayerId].chatdemocolours.background;
            document.getElementById("poster2").value=dt[PlayerId].chatdemocolours.poster;
            document.getElementById("post2").value=dt[PlayerId].chatdemocolours.post;
            // Apply the new colours to the demo area
            let demo = document.querySelector("#chatcolours2 .bordered");
            demo.querySelectorAll(".name").forEach((name) => {
                name.style.color = dt[PlayerId].chatdemocolours.poster;
            });
            demo.querySelectorAll("div").forEach((div,i) => {
                console.log("index:",i);
                div.style.color = dt[PlayerId].chatdemocolours.post;
                if(i % 2){
                    div.style.backgroundColor = dt[PlayerId].chatdemocolours.background;
                }
            });
        }
    };

    dt.chat = {
        initialize: function(){
            console.log("dt.chat.initialize called...");
            // dt[PlayerId].chatcolours = {poster:"",post:""};
            dt[PlayerId].chatdemocolours = {enabled:false,poster:"",post:""};
            if(dt[PlayerId].chatcolours.enabled){
                dt[PlayerId].chatdemocolours.poster = dt[PlayerId].chatcolours.poster;
                dt[PlayerId].chatdemocolours.post = dt[PlayerId].chatcolours.post;
                dt[PlayerId].chatdemocolours.enabled = true;
            }
            var demo = document.querySelector(".bordered");
            let d=window.getComputedStyle(demo);
            let pname = demo.querySelector(".name");
            let p=window.getComputedStyle(pname);
            let c=p.getPropertyValue("color");
        
            let t = d.getPropertyValue("color");
            let poster = document.querySelector("#poster");
            poster.addEventListener("change", dt.chat.modifyDemo, false);
            let post = document.querySelector("#post");
            post.addEventListener("change", dt.chat.modifyDemo, false);
            dt.showTool("#chatcolours");
            if(dt[PlayerId].chatcolours.enabled){
                document.getElementById("dtchattoggle").value = "Disable";
                document.getElementById("dtchatapply").removeAttribute("disabled");
    
            }else{
                document.getElementById("dtchattoggle").value = "Enable";
                document.getElementById("dtchatapply").setAttribute('disabled', 'disabled');
            }
        },
        toggle:function(){
            if(dt[PlayerId].chatcolours.enabled){
                document.getElementById("dtchattoggle").value = "Ensable";
                dt[PlayerId].chatcolours.enabled = false;
                document.getElementById("dtchatapply").setAttribute('disabled', 'disabled');
            }else{
                document.getElementById("dtchattoggle").value = "Disable";
                dt[PlayerId].chatcolours.enabled = true;
                document.getElementById("dtchatapply").removeAttribute("disabled");
            }
        },
        modifyDemo: function(e){
            console.log("modify demo called...",e);
            let demo = document.querySelector(".bordered");
            if(e.target.id == "poster"){
                dt[PlayerId].chatdemocolours.poster = e.target.value;
                demo.querySelectorAll(".name").forEach((name) => {
                    name.style.color = e.target.value;
                });
            }
            if(e.target.id == "post"){
                dt[PlayerId].chatdemocolours.post = e.target.value;
                demo.querySelectorAll("div").forEach((div) => {
                    div.style.color = e.target.value;
                });
            }
            console.log("Demo colours: ",dt[PlayerId].chatdemocolours);
        },
        apply: function(){
            // Firstly store the settings in local storage.
            console.log ("dt.chat.apply called...");
            dt[PlayerId].chatcolours.poster = dt[PlayerId].chatdemocolours.poster;
            dt[PlayerId].chatcolours.post = dt[PlayerId].chatdemocolours.post;
            var key = PlayerId + ':cc';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].chatcolours));
            root.style.setProperty('--poster', dt[PlayerId].chatcolours.poster);
            root.style.setProperty('--post', dt[PlayerId].chatcolours.post);
    
            // Apply the colours to GC.
            let thisChat = document.querySelector(".globalChat");
            thisChat.querySelectorAll("div").forEach((div) => {
                //div.style.color = dt[PlayerId].chatcolours.post;
                div.classList.add("dt_chatcolours_post");
            });
            thisChat.querySelectorAll(".name").forEach((name) => {
                //name.style.color = dt[PlayerId].chatcolours.poster;
                div.classList.add("dt_chatcolours_poster");
            });
            // Apply to AC if present
            thisChat = document.querySelector(".allianceChat");
            thisChat.querySelectorAll("div").forEach((div) => {
                div.style.color = dt[PlayerId].chatcolours.post;
            });
            thisChat.querySelectorAll(".name").forEach((name) => {
                name.style.color = dt[PlayerId].chatcolours.poster;
            });
    
    
        }
    }; */
    dt.magic = {
        cancast: function(){
            // Get all the forms on the page
            forms = document.querySelectorAll(".info form");
            // Loop through all these forms
            for (const form of forms.values()) {
                recipeNodes = form.querySelector("fieldset:nth-child(1) tr:nth-child(2)>td").childNodes;
                if(recipeNodes.length > 1){
                    for (let i = 0; i < recipeNodes.length; i=i+2) {
                        let thisN = recipeNodes[i];
                        if(thisN.nodeValue !== " "){
                            let q = parseInt(thisN.nodeValue);
                            let n = thisN.nextElementSibling.title;
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
                            if(n === "Books"){n="Book"};
                            if(!this.checkInv(q,n)){
                                thisN.nextElementSibling.classList.add("redB");
                            }
                        }
                    }
                }
              }
        },
        checkInv: function(qty,title){
            // Get the inv for the current town
            inv = dt[PlayerId].towns[CurrentTown].inv;
            for (const [key, subinv] of Object.entries(inv)) {
                if(Object.hasOwn(subinv, title)){
                    // In the right sub-inv so check the qty.
                    if(parseInt(subinv[title].held) >= qty){
                        // This one is ok so return true
                        return true;
                    }
                }
            }
            return false;
        }
    }

    dt.misc = {
        newPlayers: function(event,xhr){
    //        console.log(event,xhr);
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            d.innerHTML = xhr.responseText;
            var nPlayer =  document.querySelector("table.spaced span.name").getAttribute("data");
    //        console.log("nPlayer: ",nPlayer);
            var nBits = nPlayer.split("|");
            var nName = nBits[0].replace("p=","");
            var nId = nBits[1];
            console.log("New Player: ",nId,nName);
            // locStorage.setItem(PlayerId + ":GMBeep", JSON.stringify(dt[PlayerId].gmBeep));
            var lPlayer = JSON.parse(locStorage.getItem("lPlayer"));
            if(lPlayer === null){
                locStorage.setItem("lPlayer",JSON.stringify(nId));
            }else{
                var nList = [];
                for(var i = Number(lPlayer);i<Number(nId)+1;i++){
                    nList.push(i);
    //                nList.push('<a href="https://elgea.illyriad.co.uk/#/Player/Profile/' + Number(i) + '" target="_blank">' + i + '</a>');
                }
                if((PlayerId == 381057) || (PlayerId == 377125) || (PlayerId == 279547) || (PlayerId == 260239) || (PlayerId == 380847)|| (PlayerId == 418074)){
                    var par = document.querySelector("#newbieAlerts");
                    if (par.hasChildNodes()) {
                        while (par.firstChild) {
                            par.removeChild(par.firstChild);
                        }
                    }
                    nList.forEach(function(el){
                        var th = "https://elgea.illyriad.co.uk/#/Player/Profile/" + el;
                        var nEl = dt.addElement2(par,"a",["href","target"],[th, "_blank"]);
                        nEl.innerText = el;
                        dt.addElement2(par,"br",[],[]);
                    })
    //                var msgString = nList.join("\n");
                    //  <div id="newbieAlerts" title="New Accounts since last time" class="nosee"></div>
    //                document.querySelector("#newbieAlerts").innerHTML = msgString;
                    dt.showTool("#newbieAlerts");
                    locStorage.setItem("lPlayer",JSON.stringify(nId));
    //                window.alert(msgString);
                }
            }

        },
        dmSetup: function () {
            var dtPkeys = [];
            var dtTkeys = [];
            var dtAreas = [];
            for (var i = 0; i < localStorage.length; i++) {
                var k = localStorage.key(i);
                var kBits = k.split(":");
                if (kBits.length > 1) {
    //                console.log(kBits);
                    if (kBits[0] == PlayerId) {
                        dtPkeys.push(k);
                    }
                    if (dt[PlayerId].towns.list.includes(kBits[0])) {
                        dtTkeys.push(k);
                        if(!dtAreas.includes(kBits[1])){
                            dtAreas.push(kBits[1]);
                        }
                    }
                }
            }
            console.log(dtAreas);
            var aOpts = document.querySelector("#area-select");
            var nOpts = document.querySelectorAll("#area-select option");
            if(nOpts.length > 1){
                for(i=nOpts.length-1;i>0;i--){
                    aOpts.removeChild( aOpts.options[i] ); 
                }
            }
                for(i=0;i<dtAreas.length;i++){
                    var opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(dtAreas[i]));
                    opt.value = dtAreas[i]; 
                    aOpts.appendChild(opt);       
                }
            dtTkeys.sort();
            var kda = document.querySelector("#dtDataManagerHTML div.kda");
            kda.innerHTML = "<h3>Player Data</h3>";
            for (i = 0; i < dtPkeys.length; i++) {
                var p = document.createElement("p");
                p.textContent = dtPkeys[i];
                kda.appendChild(p);
            }
            var p = document.createElement("h3");
            p.textContent = "Town Data";
            kda.appendChild(p);
            for (i = 0; i < dtTkeys.length; i++) {
                var p = document.createElement("p");
                p.textContent = dtTkeys[i];
                p.setAttribute('title',dt[PlayerId].towns[dtTkeys[i].split(":")[0]].name);
                kda.appendChild(p);
            }
            document.querySelector("fieldset.dda > textArea").textContent = "";
            dt.showTool("#dtDataManagerHTML");
        },
        dmAreaClear: function (event){
            console.log(event);
            var sKey = event.target.value;
            var areaKeys = [];
            if(sKey !== 'ignore'){
                for (var i = 0; i < localStorage.length; i++) {
                    var k = localStorage.key(i);
                    var kBits = k.split(":");
                    if (kBits.length > 1) {
                        if (dt[PlayerId].towns.list.includes(kBits[0]) && kBits[1] == sKey) {
                            areaKeys.push(k);
                            localStorage.removeItem(k);
                        }
                    }
                }
            }
            console.log(areaKeys);
            dt.misc.dmSetup();
            
            var rubbish = "";
        },
        showData: function (event) {
            var expArray = ['inv','hubs'];
            var eBtn = document.querySelector(".btns > input:nth-child(4)");
            var t = event.target;
            console.log(event);
            var dda = document.querySelector("#dtDataManagerHTML fieldset.dda");
            dda.innerHTML = "";
            var tmp = document.createElement("legend");
            tmp.textContent = t.textContent;
            dda.appendChild(tmp);
            tmp = document.createElement("textArea");
            dda.appendChild(tmp);
            var d = localStorage.getItem(t.textContent);
            tmp.innerHTML = d;
            dt.currentData = t.textContent;
            var typ = t.textContent.split(":")[1];
            if(expArray.includes(typ)){
                eBtn.removeAttribute("disabled");
            }else{
                eBtn.setAttribute("disabled","true");
            }
            if(PlayerId === 279547){
                eBtn.removeAttribute("disabled");
            }
            console.log(t.txtContent);
        },
        copyData: function () {
            var copyTextarea = document.querySelector("fieldset.dda > textArea");
            copyTextarea.focus();
            copyTextarea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        },
        clearData: function(){
            localStorage.removeItem(dt.currentData);
        },

        addCanvas: function(){
            var dtCanvases = {
                "notes":{"id":"noteDisplay","class":dt[PlayerId].mapDisplay.noteDisplay.onoff},
                "tenSq":{"id":"tenSq","class":dt[PlayerId].mapDisplay.tenSq.onoff},
                "fiveSq":{"id":"fiveSq","class":dt[PlayerId].mapDisplay.fiveSq.onoff},
                "spawnLocs":{"id":"spawnTiles","class":dt[PlayerId].mapDisplay.spawnLocs.onoff}
            };
            var canvases = Object.keys(dtCanvases);
            for(i=0;i<canvases.length;i++){
    //        var canvas = document.getElementById('mapNotes');
            var canvas = document.getElementById(dtCanvases[canvases[i]].id);
            if(!canvas){
                var p = document.querySelector("#mapDiv");
                var b = document.getElementById("mapGrid");
                canvas = document.createElement("canvas");
    //            canvas.setAttribute("id","mapNotes");
                canvas.setAttribute("id",dtCanvases[canvases[i]].id);
                // <canvas id="mapNotes" width="500" height="500" style="position:absolute;top:11px;left:15px;" unselectable="on"></canvas>
                canvas.setAttribute("width","500");
                canvas.setAttribute("height","500");
                canvas.setAttribute("style","position:absolute;top:11px;left:15px;");
                canvas.setAttribute("unselectable","on");
    //            canvas.setAttribute("class",dt[PlayerId].mapDisplay.noteDisplay);
                if(dtCanvases[canvases[i]].class == 'on'){
                    dtCanvases[canvases[i]].class = 'see';
                }else{
                    dtCanvases[canvases[i]].class = 'nosse';
                }
                canvas.setAttribute("class",dtCanvases[canvases[i]].class);
    //            p.appendChild(canvas);
                p.insertBefore(canvas,b);
            }
            dt.ctx = canvas.getContext('2d');
            dt.ctx.clearRect(0, 0, 500, 500);
            }    

        },
        
        gmBeepToggle: function(){
            
        var currentState = document.querySelector("#gmBeepToggle").textContent;
        var rd = document.querySelector("#gmBeepToggle");
        if(currentState == "Enable GM Beep"){
            rd.textContent = "Disable GM Beep";
            dt[PlayerId].gmBeep = true;
        }else{
            rd.textContent = "Enable GM Beep";
            dt[PlayerId].gmBeep = false;
            
        }
            GMbeep=dt[PlayerId].gmBeep;
        locStorage.setItem(PlayerId + ":GMBeep", JSON.stringify(dt[PlayerId].gmBeep));
        var rubbish = "";

        },
        triviaToggle: function(){
            
        var currentState = document.querySelector("#triviaToggle").textContent;
        var rd = document.querySelector("#triviaToggle");
        if(currentState == "Enable Trivia Filter"){
            rd.textContent = "Disable Trivia Filter";
            dt[PlayerId].trivia = true;
//            dt.showTool("#triviaDiv");
        }else{
            rd.textContent = "Enable Trivia Filter";
            dt[PlayerId].trivia = false;
            
        }
            trivia=dt[PlayerId].trivia;
        locStorage.setItem(PlayerId + ":trivia", JSON.stringify(dt[PlayerId].trivia));
        var rubbish = "";

        },
        smileyToggle: function(){
            
        var currentState = document.querySelector("#smileyToggle").textContent;
        var rd = document.querySelector("#smileyToggle");
        if(currentState == "Enable smileys"){
            rd.textContent = "Disable smileys";
            dt[PlayerId].smileys = true;
        }else{
            rd.textContent = "Enable smileys";
            dt[PlayerId].smileys = false;
            
        }
            smileys=dt[PlayerId].smileys;
        locStorage.setItem(PlayerId + ":smileys", JSON.stringify(dt[PlayerId].smileys));
        var rubbish = "";

        },
        /* Method: regions
        * Display the dialog showing the list of regions in the game.
        * @returns {undefined}
        */
        regions: function () {
            dt.showTool("#regionsHtml");
        },
        /*	Method: tourneySqs
        *	Main method to show the tourney sqs data.
        */
        tourneySqs: function(){
    //		this.readTourneySqsData() then (this.showTourneySqsTool());
            dt.misc.readTourneySqsData() .then(function(result) {
            return dt.misc.showTourneySqsTool(result);
            });
    //			.then dt.misc.showTourneySqsTool(result);
        },
        /* 	Method: fetchTourneySqs
        *	Fetch the data for the tourney sqs from the game server and store in local storage
        *	Returns true on sucess or false on failure
        */
        fetchTourneySqs: function(){
            $.ajax({
                type: "GET", 
                url: "https://elgea.illyriad.co.uk/external/tournamentsquaresapi",
                dataType: "xml",
                contentType:"text/xml", 
                async:false,
                success: function(xml) {
                    var sqs = xml.querySelectorAll("tournament_square");
                    tbdy = document.querySelector("#tSqsData tbody");
                    dt.removeRows(document.querySelector("#tSqsData"))
                    let tsqs = {};
                    let thisSq = {};
                    for (let i = 0; i < sqs.length; i++) {
                    thisSq = {};
                    let item = sqs[i];
                    //  {"id":"1","X":"-707","Y":"737","Region":"The Wastes","terrain":"Plains","Biome":"Artic"}"
                    thisSq.id = item.getAttribute("id");
                    thisSq.X = item.querySelector("X").textContent;
                    thisSq.Y = item.querySelector("Y").textContent;
                    thisSq.Region = item.querySelector("region name").textContent;
                    thisSq.RegionId = item.querySelector("region").getAttribute("id");
                    thisSq.terrain = item.querySelector("terrain_combat_type").textContent;
                    thisSq.terrainId = item.querySelector("terrain_combat_type").getAttribute("id");
                    thisSq.Biome = item.querySelector("biome overall_type").textContent;
                    thisSq.BiomeId = item.querySelector("biome").getAttribute("id");
                    thisSq.Bonus = item.querySelector("totem_type bonus").textContent;
                    tsqs[thisSq.id] = thisSq;
                    }
                    loadVar = xml;
                    locStorage.setItem("tourneySqs", JSON.stringify(tsqs));
                    return tsqs;
                },
        
                error: function() {
                return false;
                }
            });        
        },
        /* 	Method: showTourneySqsTool
        *	Show the tourneySqs tool
        */
        showTourneySqsTool: function(tourneySqs){
            var okeys = Object.keys(tourneySqs);
            tbdy = document.querySelector("#tSqsData tbody");
            dt.removeRows(document.querySelector("#tSqsData"))

            for (var thisSq in okeys){
                var coordString = "";
                var coordArray = [];
                var newRow = tbdy.insertRow( - 1);
                var newCell = newRow.insertCell(0);
                newCell.textContent = tourneySqs[okeys[thisSq]].Region;
                newCell = newRow.insertCell(1);
                // http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x=46&y=-597
                // <span class="name" data="l=525|-1614|46|36|12">[525|-1614] in Pawanallpa</span>
                let thisData = tourneySqs[okeys[thisSq]];
                let dstring = [thisData.X, thisData.Y,thisData.Region,thisData.terrain,thisData.Biome].join("|");
                let coordString2 = '<span class="name" data="l=' + tourneySqs[okeys[thisSq]].dString + '">[' + tourneySqs[okeys[thisSq]].X + '|' + tourneySqs[okeys[thisSq]].Y + ']</span>';
                console.log(coordString2);
                coordString = '<span><a onclick="href=&quot;#/World/Map/' + tourneySqs[okeys[thisSq]].X + '/' + tourneySqs[okeys[thisSq]].Y + '&quot;">' + tourneySqs[okeys[thisSq]].X + '|' + tourneySqs[okeys[thisSq]].Y + '</a></span>';
                newCell.innerHTML = coordString2;
                newCell = newRow.insertCell(2);
                newCell.textContent = tourneySqs[okeys[thisSq]].terrain;
                newCell = newRow.insertCell(3);
                newCell.textContent = tourneySqs[okeys[thisSq]].Biome;
                
                var sourceC=[parseInt(dt[PlayerId].towns[CurrentTown].x),parseInt(dt[PlayerId].towns[CurrentTown].y)];
                var destC=[parseInt(tourneySqs[okeys[thisSq]].X),parseInt(tourneySqs[okeys[thisSq]].Y)];
                var dist = dt.hypot(sourceC,destC);
                newCell=newRow.insertCell(4);
                newCell.textContent=parseInt(dist);
                newCell=newRow.insertCell(5);
                // https://elgea.illyriad.co.uk/#/World/TournamentSquare/61
                //http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x=46&y=-597
                //onclick="window.open(&quot;http://battlecalculator.dewt.me.uk/&quot;, &quot;_blank&quot;)
                // Koda tourney
                var ls = "http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x="+tourneySqs[okeys[thisSq]].X+"&y="+tourneySqs[okeys[thisSq]].Y;
                // Dev tourney
                // https://elgea.illyriad.co.uk/#/World/TournamentSquare/61
                var ls = "https://elgea.illyriad.co.uk/#/World/TournamentSquare/"+okeys[thisSq];
    //            console.log("ingame tourney sq: ",ls);
                linkString = '<span><a target="_blank" href="'+ls+'">Cbt Details</a></span>';
                newCell.innerHTML = linkString;
                newCell=newRow.insertCell(6);
                newCell.textContent = tourneySqs[okeys[thisSq]].Bonus;
                
            }
            dt.showTool("#tourneySqs");
            
        },
        /*	Method:readTourneySqsData
        *	Read the data for the tourney sqs from local storage
        */
        readTourneySqsData: function(){
            return Promise.resolve().then(function () {
                let tourneySqs = JSON.parse(locStorage.getItem(['tourneySqs']));
                if (tourneySqs === null) {
                    tourneySqs = dt.misc.fetchTourneySqs();
                }
                return tourneySqs;
            });
                
    //		let tourneySqs = JSON.parse(locStorage.getItem(['tourneySqs']));
    //		if (tourneySqs === null) {
    //			tourneySqs = fetchTourneySqs();
    //		}
    //		return tourneySqs;
        },
        getTourneySqs2: function(){
            dt.showTool("#tourneySqs");

            $.ajax({
                type: "GET", 
                url: "https://elgea.illyriad.co.uk/external/tournamentsquaresapi",
                dataType: "xml",
                contentType:"text/xml", 
                async:false,
                success: function(xml) {
                    var sqs = xml.querySelectorAll("tournament_square");
                    tbdy = document.querySelector("#tSqsData tbody");
                    dt.removeRows(document.querySelector("#tSqsData"))

                    let thisSq = {};
                    for (let i = 0; i < sqs.length; i++) {
                    let item = sqs[i];
                    //  "{\"id\":\"1\",\"X\":\"-707\",\"Y\":\"737\",\"Region\":\"The Wastes\",\"terrain\":\"Plains\",\"Biome\":\"Artic\"}"
                    thisSq.id = item.getAttribute("id");
                    thisSq.X = item.querySelector("X").textContent;
                    thisSq.Y = item.querySelector("Y").textContent;
                    thisSq.Region = item.querySelector("region name").textContent;
                    thisSq.RegionId = item.querySelector("region").getAttribute("id");
                    thisSq.terrain = item.querySelector("terrain_combat_type").textContent;
                    thisSq.terrainId = item.querySelector("terrain_combat_type").getAttribute("id");
                    thisSq.Biome = item.querySelector("biome overall_type").textContent;
                    thisSq.BiomeId = item.querySelector("biome").getAttribute("id");
                    thisSq.Bonus = item.querySelector("totem_type bonus").textContent;
                    console.log(thisSq);
                    dt.misc.showTourneySqs2(thisSq);
                    var rubbish = "";
                    }
                    loadVar = xml;
                },
        
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });        
        },
        showTourneySqs2: function(thisSq){
            tbdy = document.querySelector("#tSqsData tbody");
            var coordString = "";
            var coordArray = [];
            var newRow = tbdy.insertRow( - 1);
            var newCell = newRow.insertCell(0);
            newCell.textContent = thisSq.Region;
            newCell = newRow.insertCell(1);
            // http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x=46&y=-597
            // <span class="name" data="l=525|-1614|46|36|12">[525|-1614] in Pawanallpa</span>
            let thisData = thisSq;
            let dString = [thisData.X, thisData.Y,thisData.RegionId,thisData.terrainId,thisData.BiomeId].join("|");
    //        console.log(dString);
            let coordString2 = '<span class="name" data="l=' + dString + '">[' + thisSq.X + '|' + thisSq.Y + ']</span>';
            console.log(coordString2);
            coordString = '<span><a onclick="href=&quot;#/World/Map/' + thisSq.X + '/' + thisSq.Y + '&quot;">' + thisSq.X + '|' + thisSq.Y + '</a></span>';
            newCell.innerHTML = coordString2;
            newCell = newRow.insertCell(2);
            newCell.textContent = thisSq.terrain;
            newCell = newRow.insertCell(3);
            newCell.textContent = thisSq.Biome;
                
            var sourceC=[parseInt(dt[PlayerId].towns[CurrentTown].x),parseInt(dt[PlayerId].towns[CurrentTown].y)];
            var destC=[parseInt(thisSq.X),parseInt(thisSq.Y)];
            var dist = dt.hypot(sourceC,destC);
            newCell=newRow.insertCell(4);
            newCell.textContent=parseInt(dist);
            
            newCell=newRow.insertCell(5);
            // https://elgea.illyriad.co.uk/#/World/TournamentSquare/61
            //http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x=46&y=-597
            //onclick="window.open(&quot;http://battlecalculator.dewt.me.uk/&quot;, &quot;_blank&quot;)
            // Koda tourney
            var ls = "http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x="+thisSq.X+"&y="+thisSq.Y;
            // Dev tourney
            // https://elgea.illyriad.co.uk/#/World/TournamentSquare/61
            var ls = "https://elgea.illyriad.co.uk/#/World/TournamentSquare/"+thisSq.RegionId;
    //            console.log("ingame tourney sq: ",ls);
            linkString = '<span><a target="_blank" href="'+ls+'">Cbt Details</a></span>';
            newCell.innerHTML = linkString;
            newCell=newRow.insertCell(6);
            newCell.textContent = thisSq.Bonus;
        },
        getTourneySqs: function(){
            //  "{\"id\":\"1\",\"X\":\"-707\",\"Y\":\"737\",\"Region\":\"The Wastes\",\"terrain\":\"Plains\",\"Biome\":\"Artic\"}"
            let biomes = ["Arctic","Arctic","Arctic","","","","Jungle","Jungle","Jungle","","","Desert","","","","","Swamp"];
            let ts = {};
            let tbody = document.querySelector("div.info table>tbody");
            let trs = tbody.querySelectorAll("tr");
            trs.forEach(function(thisRow,cInd){
    //            console.log(thisRow,cInd);
                let tds = thisRow.querySelectorAll("td");
                if(tds.length == 6){
    //                console.log("#TDs: ",tds.length,tds);
                    let d = tds[1].querySelector("span").getAttribute("data").split("=")[1].split("|");
    //                console.log("data: ",d);
                    let thisTS = {"id":d[2],"X":d[0],"Y":d[1],"Region":regionNames[d[2]],"terrain":terrain[d[3]].combat,"Biome":biomes[d[4]],"dString":d.join("|")};
                    ts[d[2]] = thisTS;
                }
            })
            console.log(ts);
            locStorage.setItem("tourneySqs", JSON.stringify(ts));
        },
        showTourneySqs: function(){
            let tourneySqs = JSON.parse(locStorage.getItem(['tourneySqs']));
            if (tourneySqs === null) {
                tourneySqs = {};
            }
            
    //        var tourneySqs = {"1":{"id":"1","X":"-707","Y":"737","Region":"The Wastes","terrain":"Plains","Biome":"Artic"},"2":{"id":"2","X":"-272","Y":"673","Region":"Kal Tirikan","terrain":"Plains","Biome":""},"3":{"id":"3","X":"111","Y":"564","Region":"Wolgast","terrain":"Small Hill","Biome":"Swamp"},"4":{"id":"4","X":"442","Y":"811","Region":"Ursor","terrain":"Large Forest","Biome":""},"5":{"id":"5","X":"836","Y":"887","Region":"Qarosslan","terrain":"Plains","Biome":"Artic"},"6":{"id":"6","X":"326","Y":"519","Region":"Windlost","terrain":"Large Forest","Biome":""},"7":{"id":"7","X":"644","Y":"446","Region":"Tamarin","terrain":"Plains","Biome":""},"8":{"id":"8","X":"-910","Y":"65","Region":"Fremorn","terrain":"Small Mountain","Biome":""},"9":{"id":"9","X":"-231","Y":"393","Region":"Norweld","terrain":"Plains","Biome":""},"10":{"id":"10","X":"931","Y":"187","Region":"Laoshin","terrain":"Plains","Biome":""},"11":{"id":"11","X":"438","Y":"469","Region":"Ragallon","terrain":"Plains","Biome":""},"12":{"id":"12","X":"690","Y":"258","Region":"Taomist","terrain":"Plains","Biome":""},"13":{"id":"13","X":"-392","Y":"290","Region":"Meilla","terrain":"Small Forest","Biome":""},"14":{"id":"14","X":"426","Y":"2","Region":"Lucerna","terrain":"Plains","Biome":""},"15":{"id":"15","X":"-58","Y":"122","Region":"Middle Kingdom","terrain":"Large Forest","Biome":""},"16":{"id":"16","X":"767","Y":"69","Region":"Mal Motsha","terrain":"Plains","Biome":""},"17":{"id":"17","X":"-540","Y":"141","Region":"Keppen","terrain":"Plains","Biome":""},"18":{"id":"18","X":"-97","Y":"-304","Region":"Tor Carrock","terrain":"Large Hill","Biome":""},"19":{"id":"19","X":"-746","Y":"2","Region":"The Western Realms","terrain":"Plains","Biome":""},"20":{"id":"20","X":"770","Y":"-94","Region":"Keshalia","terrain":"Plains","Biome":""},"21":{"id":"21","X":"538","Y":"-209","Region":"Perrigor","terrain":"Plains","Biome":""},"22":{"id":"22","X":"982","Y":"-252","Region":"Kul Tar","terrain":"Plains","Biome":""},"23":{"id":"23","X":"-982","Y":"-284","Region":"Kumala","terrain":"Plains","Biome":"Desert"},"24":{"id":"24","X":"-850","Y":"-336","Region":"Lan Larosh","terrain":"Plains","Biome":"Desert"},"25":{"id":"25","X":"-77","Y":"-559","Region":"Arran","terrain":"Large Forest","Biome":"Jungle"},"26":{"id":"26","X":"401","Y":"-559","Region":"Turalia","terrain":"Large Forest","Biome":""},"27":{"id":"27","X":"716","Y":"-559","Region":"Zanpur","terrain":"Plains","Biome":""},"28":{"id":"28","X":"861","Y":"-547","Region":"Elijal","terrain":"Small Forest","Biome":""},"29":{"id":"29","X":"-674","Y":"-650","Region":"Azura","terrain":"Small Mountain","Biome":"Jungle"},"30":{"id":"30","X":"789","Y":"-615","Region":"Djebeli","terrain":"Plains","Biome":"Jungle"},"32":{"id":"32","X":"220","Y":"-888","Region":"Tallimar","terrain":"Plains","Biome":"Jungle"},"33":{"id":"33","X":"689","Y":"-883","Region":"Larn","terrain":"Plains","Biome":"Jungle"},"34":{"id":"34","X":"587","Y":"-828","Region":"Kem","terrain":"Plains","Biome":"Jungle"},"35":{"id":"35","X":"-451","Y":"-913","Region":"Farra Isle","terrain":"Large Hill","Biome":"Jungle"},"36":{"id":"36","X":"439","Y":"-913","Region":"Trome","terrain":"Plains","Biome":"Jungle"},"37":{"id":"37","X":"-688","Y":"-918","Region":"Rill Archipelago","terrain":"Small Mountain","Biome":"Jungle"},"38":{"id":"38","X":"-39","Y":"-978","Region":"Stormstone Island","terrain":"Plains","Biome":"Jungle"},"40":{"id":"40","X":"460","Y":"-2850","Region":"Calumnex","terrain":"Large Mountain","Biome":""},"41":{"id":"41","X":"787","Y":"-1412","Region":"Puchuallpa","terrain":"Large Forest","Biome":"Jungle"},"43":{"id":"43","X":"-201","Y":"-1369","Region":"Pamanyallpa","terrain":"Large Forest","Biome":"Jungle"},"44":{"id":"44","X":"-696","Y":"-1524","Region":"Huronire","terrain":"Small Forest","Biome":"Jungle"},"45":{"id":"45","X":"341","Y":"-1682","Region":"Clarien","terrain":"Small Hill","Biome":""},"46":{"id":"46","X":"682","Y":"-1566","Region":"Pawanallpa","terrain":"Plains","Biome":"Desert"},"48":{"id":"48","X":"-946","Y":"-1595","Region":"The Poisoned Isle","terrain":"Large Hill","Biome":"Jungle"},"49":{"id":"49","X":"7","Y":"-1828","Region":"Glanhad","terrain":"Large Hill","Biome":""},"50":{"id":"50","X":"-481","Y":"-1763","Region":"Northmarch","terrain":"Plains","Biome":""},"51":{"id":"51","X":"245","Y":"-1907","Region":"High Hills","terrain":"Large Hill","Biome":""},"52":{"id":"52","X":"-847","Y":"-1789","Region":"Westmarch","terrain":"Small Forest","Biome":""},"54":{"id":"54","X":"-264","Y":"-2084","Region":"Oarnamly","terrain":"Large Mountain","Biome":""},"56":{"id":"56","X":"663","Y":"-2232","Region":"Gremont","terrain":"Small Forest","Biome":""},"57":{"id":"57","X":"-726","Y":"-2136","Region":"Coanhara","terrain":"Large Mountain","Biome":""},"58":{"id":"58","X":"936","Y":"-1973","Region":"Lapo'a Lua","terrain":"Large Forest","Biome":""},"59":{"id":"59","X":"266","Y":"-2226","Region":"Newlands","terrain":"Small Forest","Biome":""},"61":{"id":"61","X":"-713","Y":"-2221","Region":"Aindara","terrain":"Large Hill","Biome":""},"62":{"id":"62","X":"480","Y":"-2267","Region":"The Pirate Isles","terrain":"Small Hill","Biome":""},"63":{"id":"63","X":"-203","Y":"-2402","Region":"Silbeaur","terrain":"Large Forest","Biome":""},"64":{"id":"64","X":"661","Y":"-2372","Region":"Fellandire","terrain":"Large Hill","Biome":""},"66":{"id":"66","X":"422","Y":"-2588","Region":"Vindorel","terrain":"Large Mountain","Biome":""},"67":{"id":"67","X":"-140","Y":"-2598","Region":"Almenly","terrain":"Large Hill","Biome":""},"68":{"id":"68","X":"-458","Y":"-2769","Region":"Kormandly","terrain":"Large Hill","Biome":""},"69":{"id":"69","X":"149","Y":"-2579","Region":"The Orken Coast","terrain":"Large Hill","Biome":""},"70":{"id":"70","X":"-761","Y":"-2854","Region":"Kingslands","terrain":"Large Forest","Biome":""},"71":{"id":"71","X":"893","Y":"-2871","Region":"Farshards","terrain":"Plains","Biome":""},"72":{"id":"72","X":"310","Y":"-2790","Region":"Shardlands","terrain":"Plains","Biome":""},"73":{"id":"73","X":"-281","Y":"-2868","Region":"Strendur","terrain":"Plains","Biome":""},"74":{"id":"74","X":"-769","Y":"-2946","Region":"Chulbran","terrain":"Small Forest","Biome":""},"75":{"id":"75","X":"659","Y":"-3284","Region":"Jurgor","terrain":"Plains","Biome":"Artic"},"76":{"id":"76","X":"-374","Y":"-3238","Region":"The Long White","terrain":"Large Hill","Biome":""}};

            var okeys = Object.keys(tourneySqs);
            tbdy = document.querySelector("#tSqsData tbody");
            dt.removeRows(document.querySelector("#tSqsData"))

            for (var thisSq in okeys){
                var coordString = "";
                var coordArray = [];
                var newRow = tbdy.insertRow( - 1);
                var newCell = newRow.insertCell(0);
                newCell.textContent = tourneySqs[okeys[thisSq]].Region;
                newCell = newRow.insertCell(1);
                // http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x=46&y=-597
                // <span class="name" data="l=525|-1614|46|36|12">[525|-1614] in Pawanallpa</span>
                let thisData = tourneySqs[okeys[thisSq]];
                let dstring = [thisData.X, thisData.Y,thisData.Region,thisData.terrain,thisData.Biome].join("|");
                let coordString2 = '<span class="name" data="l=' + tourneySqs[okeys[thisSq]].dString + '">[' + tourneySqs[okeys[thisSq]].X + '|' + tourneySqs[okeys[thisSq]].Y + ']</span>';
                console.log(coordString2);
                coordString = '<span><a onclick="href=&quot;#/World/Map/' + tourneySqs[okeys[thisSq]].X + '/' + tourneySqs[okeys[thisSq]].Y + '&quot;">' + tourneySqs[okeys[thisSq]].X + '|' + tourneySqs[okeys[thisSq]].Y + '</a></span>';
                newCell.innerHTML = coordString2;
                newCell = newRow.insertCell(2);
                newCell.textContent = tourneySqs[okeys[thisSq]].terrain;
                newCell = newRow.insertCell(3);
                newCell.textContent = tourneySqs[okeys[thisSq]].Biome;
                
                var sourceC=[parseInt(dt[PlayerId].towns[CurrentTown].x),parseInt(dt[PlayerId].towns[CurrentTown].y)];
                var destC=[parseInt(tourneySqs[okeys[thisSq]].X),parseInt(tourneySqs[okeys[thisSq]].Y)];
                var dist = dt.hypot(sourceC,destC);
                newCell=newRow.insertCell(4);
                newCell.textContent=parseInt(dist);
                newCell=newRow.insertCell(5);
                // https://elgea.illyriad.co.uk/#/World/TournamentSquare/61
                //http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x=46&y=-597
                //onclick="window.open(&quot;http://battlecalculator.dewt.me.uk/&quot;, &quot;_blank&quot;)
                // Koda tourney
                var ls = "http://tournament.bestmagicbears.com/illy_tournaments.cgi?tid=3&x="+tourneySqs[okeys[thisSq]].X+"&y="+tourneySqs[okeys[thisSq]].Y;
                // Dev tourney
                // https://elgea.illyriad.co.uk/#/World/TournamentSquare/61
                var ls = "https://elgea.illyriad.co.uk/#/World/TournamentSquare/"+okeys[thisSq];
    //            console.log("ingame tourney sq: ",ls);
                linkString = '<span><a target="_blank" href="'+ls+'">Cbt Details</a></span>';
                newCell.innerHTML = linkString;
                
            }
            dt.showTool("#tourneySqs");
        },
        cbtmods: function () {
            dt.showTool("#terrainCbtModsHtml");
        },
        /* Method: showUnits
        * Display the icons for all units available in the game. Data is drawn directly 
        * from the game (Items[5]). The icons are made into links that open up the same 
        * popup as in-game by setting the same classes and data attribute as is done 
        * in-game.
        * 
        */
        showUnits: function () {
            var parent = document.querySelector('#imgholder');
            parent.innerHTML = '';
            var keys = Object.keys(Items[5]);
            for (i = 1; i < keys.length; i++) {
                var dat = 'i=5|' + keys[i];
                var newSpan = dt.addElement('', parent, 'span', ['data', 'class', 'title'], [dat, "name " + Items[5][keys[i]][2], Items[5][keys[i]][1] + " (i=5|" + keys[i] + ")"]);
                var newImg = dt.addElement('', newSpan, 'img', ['title', 'src'], [Items[5][keys[i]][1] + ' [@i=5|' + keys[i] + ']', '//assets.illyriad.net/img/icons/' + Items[5][keys[i]][2]]);
                newSpan = dt.addElement('', parent, 'span', ['data', 'class', 'title'], [dat, "name " + Items[5][keys[i]][3], Items[5][keys[i]][1] + " (i=5|" + keys[i] + ")"]);
                var newImg = dt.addElement('', newSpan, 'img', ['title', 'src'], [Items[5][keys[i]][1] + ' [@i=5|' + keys[i] + ']', '//assets.illyriad.net/img/icons/' + Items[5][keys[i]][3]]);
            }
            dt.showTool("#unitsHtml");
            dt.adjustTool("#unitsHtml");

        },
        /* Method: showIcons
        * Show all the various item icons used in-game.  Data is drawn directly 
        * from the game (Items[5]). The icons are made into links that open up the same 
        * popup as in-game by setting the same classes and data attribute as is done 
        * in-game.
        * 
        */
        showIcons: function () {
    //	var swp2 = {"1": '3|1', "2": '3|2', "3": '3|3', "4": '3|4', "5": '3|5', "6": '3|6', "7": '3|7', "8": '3|8', "9": '3|9', "10": '3|10', "11": '3|11', "12": '3|12', "17": '1|1', "19": '1|2', "21": '1|3', "23": '1|4', "25": '1|5', "183": '4|1', "295": '2|1', "296": '2|2'};
    //	var swp = ['3|1', '3|2', '3|3', '3|4', '3|5', '3|6', '3|7', '3|8', '3|9', '3|10', '3|11', '3|12', '1|1', '1|2', '1|3', '1|4', '1|5', '4|1', '2|1', '2|2'];
            var out = document.querySelector('#icoholder');
            var keys = Object.keys(cp);
            out.innerHTML = '';
            for (var i = 0; i < keys.length; i++) {
                var tt = cp[keys[i]].n + " (cp=" + keys[i] + ")";
    //		if(swp2.hasOwnProperty(keys[i])){
    //		if (i < 21) {
    //			var dat = 'i=' + swp2[keys[i]];
    //		} else {
                var dat = 'c=' + keys[i];
    //		}
                var newSpan = dt.addElement('',out, 'span', ['data', 'class', 'title'], [dat, "name " + cp[keys[i]].is, cp[keys[i]].n + " [@c=" + keys[i] + "]"]);
                newSpan = dt.addElement('',out, 'span', ['data', 'class', 'title'], [dat, "name " + cp[keys[i]].il, cp[keys[i]].n + " [@c=" + keys[i] + "]"]);
            }
            dt.showTool("#iconsHtml");
            dt.adjustTool("#iconsHtml");
        },
        groupSizes: function(){
            // 
            dt.showTool("#npcGroupSizesHtml");
        },
    };
}

