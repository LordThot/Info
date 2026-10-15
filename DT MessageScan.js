dtmessagescan = function(){
    dt.reports = {
        getPermission(event, xhr, settings){
            if (window.confirm("Do you really want to leave?")) { 
                console.log("Confirmed: ",confirm); //window.open("exit.html", "Thanks for Visiting!");
            }else{
                console.log("Rejected: ",confirm);
            }
        },
        getType: function (event, xhr, settings) {
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            // log the scan start
            var msg = "Scanning a message";
            dt.logEntry(msg);
            d.innerHTML = xhr.responseText;
            var infodiv = d.getElementsByClassName("info")[0];
            // Get the <table> elements
            var tables = d.querySelectorAll("table");
    //        console.log("# tables: " + tables.length);
            var h = tables[0].querySelector("h2");
            if (h.textContent.includes("battle against")) {
                // It is a scout report so do the scan for that
                if (window.confirm("This will send details of this battle to the Drop Rate database. Are you sure?")) { 
                    this.battleScan(docfrag, tables, h);
                }
            }
            if (h.textContent.includes("Scout Mission to Square")) {
                // It is a battle report so do the scan for that
                if (window.confirm("This will send information from this scout report to the Drop Rate database. Are you sure?")) { 
                    this.scoutScan(docfrag, tables, h);
                }
            }
        },
        getFam: function (str){
            var unit = parseInt(str.split("]")[0].replace("[@i=5|",""));
            var fams = Object.keys(dt.npcFamilies);
            for(var i=0;i<fams.length;i++){
                var f=dt.npcFamilies[fams[i]];
                if(f.includes(unit)){
                    return fams[i];
                }
            }
        },

        submitReport: function (repType, report) {
            data = {t: repType, d: report};
            $.ajax({
                // ftp://dewt@ftp.dewt.co.uk/public_html/durctools2dev/php/craftingdb.php
                url: "https://durctools2.dewt.me.uk/php/acceptReports.php",
                scriptCharset: "utf-8" ,
                data: data,
                type: "POST",
                dataType: "json",
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
    //                console.log(repType+" Report stored "+ data);
                    var msg = repType + " Report stored " + data;
                    dt.logEntry(msg);

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var msg = repType + " Report stored " + data;
                    dt.logEntry(msg);
    //                console.log(repType+" Report stored "+ data);
                }
            })

        },
        scoutScan: function (docfrag, tables, h) {

            // get the scout location
            var scout = {where: "", when: "", drops: []};
            scout.where = h.textContent.split(']')[0].split('[')[1].split("=")[1].split("|");
            scout.when = tables[0].querySelector("tr:nth-child(5) > td:nth-child(2)").textContent;
            var itemArea = docfrag.querySelector(".info table tr:nth-child(6) p:nth-child(4)");
    //        var itemArea2 = tables[0].querySelectorAll("tr")[6];
            var itemArea2 = tables[0].rows[5].textContent.trim().split("Information Gathered:")[1].split("remain.");
            // only interested in the parts that have harvestable resource info in them
            if (itemArea2[0].includes("Harvestable Resource Square Information")) {
                // split it down removing any troop info
                var parts = tables[0].rows[5].textContent.trim().split("Information Gathered:")[1].split("\nTroop levels present")[0].split("remain.");
                var drops2 = [];
    //            console.log("parts length: " + parts.length);
                // step through the parts array
                for (var j = 0; j < (parts.length-1); j++) {
    //                console.log(parts[j]);
                    // ignore any elements that don't have the 'Harvestable' header
                    if(parts[j].includes("Harvestable Resource Square Information")){
                        // strip out all the unwanted text leaving just the details of the items present
                        var t2=parts[j].replace("Harvestable Resource Square Information:","").trim();
    //                    console.log(t2);
                        // split on spaces. 2 elements per item
                        qs2 = t2.split(" ");
                        // step through qs2 two elements at a time
                        for (var i = 0; i < qs2.length; i += 2) {
                            if(qs2[i+1].includes("[")){
                                var thisI = [qs2[i + 1], qs2[i]];
                                drops2.push(thisI);
                            }
                        }
                    }
                }
                    
    //        console.log(drops2);
            scout.drops=drops2;
        }
            this.submitReport("scout", scout);
        },
        battleScan: function (docfrag, tables, h) {
            // get the battle location
            var battle = {where: "", when: "", fam:"", defenders: []};
            battle.where = h.textContent.split(']')[0].split('[')[1].split("=")[1].split("|");
            battle.when = tables[0].querySelector("tr:nth-child(5) > td:nth-child(2)").textContent;
            var defRows = tables[3].querySelectorAll("tr");
    //        var defenders = [];
            for (var i = 1; i < defRows.length; i++) {
                var thisDef = {d: "", q: 0, k: 0, s: 0};
                var tds = defRows[i].querySelectorAll("td");
                battle.fam = this.getFam(tds[1].textContent);
                thisDef.d = tds[1].textContent;
                thisDef.q = tds[2].textContent;
                thisDef.k = tds[3].textContent;
                thisDef.s = tds[4].textContent;
                battle.defenders.push(thisDef);
                var rubbish = "";
            }
            var rubbish = "";
            
            // For now just echo to the console
    //        console.log(JSON.stringify(battle));
    //        console.log(battle);
            this.submitReport("battle", battle);

        },

    }
}