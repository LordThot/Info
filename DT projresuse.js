dtprojresuse = function(){
    dt.resUse = {
    addMonitors: function(){
        var makeQtys = document.getElementsByName("Quantity");
        if(makeQtys.length  === 0){
            makeQtys = document.getElementsByName("UnitQuantity");
        }
        var maxQtys = document.querySelectorAll(".max");
        for(var i=0;i<makeQtys.length;i++){
            dt.resUse.addListner(makeQtys[i]);
            dt.resUse.addListner2(maxQtys[i]);
            dt.resUse.addListner3(maxQtys[i].parentElement);
        }
    },
    mkTbl: function(el){
    //    var val = el.value;
        if(window.location.hash.startsWith("#/Town/UnitProduction/")){
            var items = el.parentElement.parentElement.parentElement.querySelectorAll("td")[3];
            var timer = el.parentElement.parentElement.parentElement.querySelectorAll("td")[6];
        }else{
            var items = el.parentElement.parentElement.parentElement.querySelectorAll("td")[2];
            var timer = el.parentElement.parentElement.parentElement.querySelectorAll("td")[4];
        }
        var tmp = items.innerHTML;
        var iArray=tmp.split("</span>");
        var numItems = items.querySelectorAll("span").length;
        var c = items.childNodes;
    //    console.log(val);
        var t=[];
        for(cn=0;cn<(c.length)-1;cn=cn+2){
            t.push(c[cn].textContent.trim());
        }
    //    console.log(t);
        d = t.join("|");
    //    items.setAttribute("align","center");
    //    items.innerHTML = "<table align='center' class='resUse'><tr><td colspan=numItems>"+tmp+"</td></tr><tr></tr></table>";
        items.innerHTML = "<table align='center' class='resUse' data-vals='"+d+"'><tr></tr><tr></tr></table>";
        var projRes = items.querySelectorAll(".resUse tr")[0];
        for(var i=0;i<numItems;i++){
            tEl = document.createElement("td");
            tEl.setAttribute("textAlign","centre");
            tEl.innerHTML = iArray[i] + "</span>";
            projRes.appendChild(tEl);
        }
        projRes = items.querySelectorAll(".resUse tr")[1];
        for(i=0;i<numItems;i++){
            tEl = document.createElement("td");
            tEl.setAttribute("textAlign","centre");
    //        tEl.textContent = t[i][2];
            projRes.appendChild(tEl);
        }
        var t = timer.textContent;
        timer.innerHTML = "";
        var tdiv = dt.addElement2(timer, "div", ['class'], ['tdiv']);
        tdiv.textContent = t;
        var tdiv = dt.addElement2(timer, "div", ['class'], ['ddiv']);
        
    },
    qtyChange: function(el){
        var val = el.value;
        var items = el.parentElement.parentElement.parentElement.querySelectorAll(".resUse tr:nth-child(1) td");
        var reqItems = el.parentElement.parentElement.parentElement.querySelectorAll(".resUse tr:nth-child(2) td");
    //    console.log(val);
        var t=el.parentElement.parentElement.parentElement.querySelector(".resUse").dataset.vals.split("|");
    //    console.log(t);
        for(var i=0;i<t.length;i++){
            reqItems[i].textContent = t[i]*val;
        }
        var timer =  el.parentElement.parentElement.parentElement.querySelector(".tdiv");
        if(timer.textContent.substring(timer.textContent.trim().length - 1) != ")"){
        var prate =  Math.round(3600 / timer.textContent.replace("p/h","").trim());
        }else{
            var prate =  Math.round(3600 / timer.textContent.split("(")[1].replace(" p/h)",""));
        }
        var dlen = SecToText(val * prate);
        timer.nextElementSibling.textContent = dlen;
    //    console.log(dlen);
    //  dt.showTool("#projResUsePopup");
    el.focus();
    },
    qtyChange2: function(el){
        if(window.location.hash.startsWith("#/Town/UnitProduction/")){
            val = el.getAttribute("data");
        var items = el.parentElement.querySelectorAll(".resUse tr:nth-child(1) td");
        var reqItems = el.parentElement.querySelectorAll(".resUse tr:nth-child(2) td");
    //    console.log(val);
        var t=el.parentElement.querySelector(".resUse").dataset.vals.split("|");
        }else{
        var val = el.dataset.max;
        var items = el.parentElement.parentElement.parentElement.querySelectorAll(".resUse tr:nth-child(1) td");
        var reqItems = el.parentElement.parentElement.parentElement.querySelectorAll(".resUse tr:nth-child(2) td");
    //    console.log(val);
        var t=el.parentElement.parentElement.parentElement.querySelector(".resUse").dataset.vals.split("|");
        }
    //    console.log(t);
        for(var i=0;i<t.length;i++){
            reqItems[i].textContent = t[i]*val;
        }
    //  dt.showTool("#projResUsePopup");
    el.focus();
    },

    addListner: function(el){
        dt.resUse.mkTbl(el);
        el.addEventListener('input', function(){
            dt.resUse.qtyChange(el);
        });
    },

    addListner2: function(el){
        el.addEventListener('click', function(){
            dt.resUse.qtyChange2(el);
        });
    },
    addListner3: function(el){
        el.addEventListener('mouseleave', function(el){
            dt.resUse.closePopUp(el);
        });
    },
    closePopUp: function(el){
        $( "#projResUsePopup" ).dialog( "destroy" );
    }

    };
}