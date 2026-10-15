dtaudrey = function(){
    dt.audrey = {
        checkResearch: function(){
            var areas = ["military","city","diplomacy","quest","trade","magic","sovereignty","crafting"];
            var r = dt[PlayerId].towns[CurrentTown].research;
            var k = Object.keys(r);
            var outstanding = r["1"].concat(r["2"],r["3"],r["4"],r["5"],r["6"],r["7"],r["8"]);
            document.querySelector("#audreyRep >h2").textContent =  dt[PlayerId].towns[CurrentTown].name;
            for(var a = 0;a<areas.length;a++){
                var tgt = document.querySelector("#"+areas[a]+">div");
                tgt.innerHTML = "";
    //            if(r[a+1].length > 0){
                if(r[a+1][0] != "All Complete"){
                    var t = "Outstanding research: "+r[a+1].join(", ");
                    var nEl = dt.addElement2(tgt, "p", [], []);
                    nEl.textContent = t;
                    tgt.parentElement.className = "rRemaining";
                }else{
                    var nEl = dt.addElement2(tgt, "p", [], []);
                    nEl.textContent = "All complete";
                    tgt.parentElement.className = "rDone";
                }
            }
            
            dt.showTool("#audreyRep");
            var rubbish = "";
        },
        checkResearch2: function(){
            var r = dt[PlayerId].towns[CurrentTown].research;
            var k = Object.keys(r);
            var outstanding = r["1"].concat(r["2"],r["3"],r["4"],r["5"],r["6"],r["7"],r["8"],);
            document.querySelector("#audreyRep2 >h2").textContent =  dt[PlayerId].towns[CurrentTown].name;
            var tgt = document.querySelector("#researchStatus");
            tgt.innerHTML = "";
            if(outstanding.length > 0){
                var t = "Outstanding research: "+outstanding.join(", ");
                var nEl = dt.addElement2(tgt, "p", [], []);
                nEl.textContent = t;
    //            for(var r=0;r<outstanding.length;r++){
    //                var nEl = dt.addElement2(tgt, "span", [], []);
    //                nEl.innerHTML = "<p>"+outstanding[r]+"</p>";
    //            }
            }else{
                    var nEl = dt.addElement2(tgt, "p", [], []);
                    nEl.textContent = "All complete";
                
            }
            dt.showTool("#audreyRep2");
            var rubbish = "";
        },
    }    
};