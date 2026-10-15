dtui = function () {
  dt.ui = {
    market: function (event, xhr, settings) {
      if (settings.url == "/Trade/MarketData") {
        var ss = settings.data.split("&");
        var itemId = ss[1].split("=")[1];
        var ic = document.querySelector("#currentIcon");
        if (dt.cEffects[itemId]) {
          var aEffects = [];
          var ef = dt.cEffects[itemId].effects;
          for (tEffect = 0; tEffect < ef.length; tEffect++) {
            aEffects.push(ef[tEffect].join(" "));
          }
          var effectsText = "Effects: \x0A" + aEffects.join("\x0A");
          //                console.log(effectsText);
          ic.setAttribute("title", effectsText);
        } else {
          ic.setAttribute("title", "");
        }
        if (dt.priceGrabber == true) {
          getItemOrders();
        }
      }
    },
    buildStratMapHTML: function () {
      // Get the div that holds the actual parts of the map
      let elements = document.querySelector("#StratMapDiv");
      // Build the totems element
      let newElem = document.createElement("img");
      newElem.setAttribute("id", "totemMap");
      newElem.setAttribute(
        "src",
        "https://v3.durctools.uk/StratMap/images/totems.png"
      );
      newElem.setAttribute(
        "style",
        "display:none;position:absolute;top:0px;left:0px"
      );
      let beforeEl = document.getElementById("currentPos");
      beforeEl.parentNode.insertBefore(newElem, beforeEl);
      // Build the control for the totems map
      //debugger;
      let parentTbl = document.querySelector(
        "table.generic:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > table:nth-child(1)"
      );
      newElem = document.createElement("tr");
      parentTbl.appendChild(newElem);
      newelem = document.createElement("tr");
      newElem.classList.add("middle");
      newElem.innerHTML =
        '<td colspan="3"><h3 style="text-align:center">Extras</h3></td>';
      newElem = document.createElement("tr");
      parentTbl.appendChild(newElem);
      newElem.innerHTML =
        '<td>Totems</td><td><span><input id="totemsChkBox" name="totemsChkBox" type="checkbox" value="true"></span></td><td><span style="margin-top: 4px;width:10px;height:10px;border:solid 1px black;background:#ffff00;display:block"></span></td>';
      parentTbl.appendChild(newElem);
      newElem = document.createElement("tr");
      newElem.innerHTML =
        '<td>My Towns</td><td><span><input id="dtMyTowns" name="dtMyTowns" type="checkbox" value="true"></span></td><td><span <span style="margin-top: 4px;width:10px;height:10px;border:solid 1px black;background:#ffffff;display:block"></span></span></td>';
      parentTbl.appendChild(newElem);
      dt.ui.makeMyTowns();
      dt.ui.strategicMap();
      // Add event listeners to the two inputs
      document
        .querySelector("#dtMyTowns")
        .addEventListener("change", dt.ui.toggleStratDisplay, false);
      document
        .querySelector("#totemsChkBox")
        .addEventListener("change", dt.ui.toggleTotems, false);
    },
    makeMyTowns: function () {
      let smDiv = document.querySelector("#StratMapDiv");
      if (smDiv.querySelector("#mt") === null) {
        let newDiv = document.createElement("div");
        //			newDiv.addClass("nosee");
        newDiv.setAttribute("id", "dtStratDiv");
        newDiv.setAttribute(
          "style",
          "position:absolute;height:100%;height:100%"
        );
        newDiv.innerHTML =
          '<svg id="dtPlayerTowns" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-1000 -1000 2000 4300"><g id="mt" style="visibility: hidden;" stroke="black" stroke-width="2" fill="white"></g></svg>';
        smDiv.appendChild(newDiv);
      }
    },
    toggleTotems: function () {
      console.log("toggleTotems called");
      //let elem = document.getElementById("totemMap");
      // if ($("#chkCurrentPos").is(":checked")) {
      //   $("#currentPos").show();
      // } else {
      //   $("#currentPos").hide();
      // }
      if (document.querySelector("#totemsChkBox").checked === true) {
        document.querySelector("#totemMap").style.display = "block";
      } else {
        document.querySelector("#totemMap").style.display = "none";
      }
    },
    toggleStratDisplay: function () {
      console.log("toggleStratDisplay called");
      if (document.querySelector("#dtMyTowns").checked === true) {
        document.querySelector("#mt").style.visibility = "visible";
      } else {
        document.querySelector("#mt").style.visibility = "hidden";
      }
    },
    strategicMap: function () {
      // <div id="currentPos" style="position:absolute;width:3px;height:3px;border:solid 1px #ff0000;background:#000;display:none;top:838px;left:274px"></div>
      let smDiv = document.querySelector("#StratMapDiv");
      if (smDiv.querySelector("#mt") === null) {
        let newDiv = document.createElement("div");
        //			newDiv.addClass("nosee");
        newDiv.setAttribute("id", "dtStratDiv");
        newDiv.setAttribute(
          "style",
          "position:absolute;height:100%;height:100%"
        );
        newDiv.innerHTML =
          '<svg id="dtPlayerTowns" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-1000 -1000 2000 4300"><g id="mt" style="visibility: hidden;" stroke="black" stroke-width="2" fill="white"></g></svg>';
        smDiv.appendChild(newDiv);
      }
      // let tblEl = document.querySelector(
      //   "table.generic:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody"
      // );
      // let r = tblEl.insertRow(-1);
      // let c = r.insertCell(0);
      // c.textContent = "My Towns";
      // c = r.insertCell(1);
      // c.innerHTML =
      //   '<span><input id="dtMyTowns" name="dtMyTowns" type="checkbox" value="true"></span>';
      // document
      //   .querySelector("#dtMyTowns")
      //   .addEventListener("change", dt.ui.toggleStratDisplay, false);
      // c = r.insertCell(2);

      var myTowns = [];
      let thisT = { n: "", x: 0, y: 0 };
      let pt = dt[PlayerId].towns;
      for (let i = 0; i < pt.list.length; i++) {
        thisT.n = pt[pt.list[i]].name;
        thisT.x = pt[pt.list[i]].x;
        thisT.y = pt[pt.list[i]].y;
        this.showMyTowns(thisT);
        //			console.log(i,thisT);
      }
      //		console.log(myTowns);
    },
    showMyTowns: function (thisT) {
      let parentElem = document.querySelector("#mt");
      newElem = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      newElem.setAttribute("cx", thisT.x);
      newElem.setAttribute("cy", -1 * Number(thisT.y));
      var title = thisT.n;
      var titleElem = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title"
      );
      titleElem.textContent = title;
      newElem.appendChild(titleElem);
      newElem.setAttribute("r", 10);
      parentElem.appendChild(newElem);
    },
  };
};