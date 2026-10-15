/* File: maptools5.js
 * All functions relating to gathering info from the World Map
 */
dtmaptools = function () {
  dt.mapTools = {
    biomeTypes: [
      ["Ice Sheet", "Arctic"],
      ["Polar Desert", "Arctic"],
      ["Tundra", "Arctic"],
      ["Taiga", ""],
      ["Boreal Forest", ""],
      ["Temperate Forests, Woodlands and Scrub", ""],
      ["Tropical Forest", "Jungle"],
      ["Monsoon Forest", "Jungle"],
      ["Rainforest", "Jungle"],
      ["Semi-arid Desert", "Desert"],
      ["Xeric Shrubland", ""],
      ["Arid Desert", "Desert"],
      ["Savanna", ""],
      ["Steppe", ""],
      ["Prairie", ""],
      ["Mediterranean", ""],
      ["Swamp", "Swamp"],
      ["Tidal Water", ""],
      ["Shallow Salt Water", ""],
      ["Ocean", ""],
      ["Fresh Water", ""],
      ["Dead Water", ""],
      ["Warped Lands", ""],
      ["", ""],
      ["", ""],
      ["Warped Lands", ""],
      ["", ""],
      ["Dead Water", ""],
    ],
    biomeNames: [
      "Arctic",
      "Arctic",
      "Arctic",
      "",
      "",
      "",
      "Jungle",
      "Jungle",
      "Jungle",
      "Desert",
      "",
      "Desert",
      "",
      "",
      "",
      "",
      "Swamp",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],

    /* Method: checkHash
     * Check if the user is currently viewing the world map. Return true if they are
     * otherwise display a message and return false.
     *
     */
    checkHash: function () {
      var newHash = window.location.hash;
      if (newHash.indexOf("?")) {
        var bits = newHash.split("?");
        newHash = bits[0];
      }
      var bits = newHash.split("/");
      if (bits[1] === "World") {
        if (bits[2] === "Map") {
          return true;
        }
      }
      window.alert("You must be viewing the world map to use this tool.");
      return false;
    },

    showSettings: function () {
      // Load the form with the current settings
      var sects = document.querySelectorAll("fieldset.cbox");
      var sectNames = ["noteDisplay", "fiveSq", "tenSq", "spawnLocs"];
      for (var i = 0; i < sects.length; i++) {
        var thisSect = sects[i];
        thisSect.querySelector(".current").style.backgroundColor =
          dt[PlayerId].mapDisplay[sectNames[i]].colour;
        thisSect.querySelector(
          "." + dt[PlayerId].mapDisplay[sectNames[i]].onoff
        ).checked = true;
      }
      if (PlayerId == 418974) {
        dt.showTool("#colourSetter2");
      } else {
        dt.showTool("#colourSetter");
      }
    },
    overlaySettingsChange: function (ev) {
      let t = ev.target;
    },
    loadOverlaySettings: function () {
      let mo = JSON.parse(locStorage.getItem([PlayerId] + ":mo"));
      if (mo === null) {
        mo = {
          notes: { v: false, c: "#ff0000" },
          tenSq: { v: false, c: "#808080" },
          fiveSq: { v: false, c: "#c0c0c0" },
          spawnLocs: { v: false, c: "#ff0000" },
        };
      }
      return mo;
    },
    storeOverlaySettings: function (mo) {
      locStorage.setItem([PlayerId] + ":mo", JSON.stringify(mo));
    },
    showOverlaySettings: function (mo) {
      var sects = document.querySelectorAll(".overlays>fieldset.role");
      var sectNames = ["noteDisplay", "fiveSq", "tenSq", "spawnLocs"];
      // Apply the current colour & visibility settings to the tool
      sects.forEach(function (currentRole, currentIndex, listObj) {
        var cInp = currentRole.querySelector('input[type="color"]');
        var vis = currentRole.querySelector('input[type="checkbox"]');
        console.log(`${currentRole}`, cInp, vis, mo);
        //cInp.value = dt.mo;
      });
      dt.showTool("#mapOverlaySettings");
    },
    saveSettings: function (e) {
      var tgt = e.target;
      var p = tgt.dataset.p;
      switch (p) {
        case "Notes":
          sect = "noteDisplay";
          break;
        case "fiveSq":
          sect = "fiveSq";
          break;
        case "tenSq":
          sect = "tenSq";
          break;
        case "spawnLocs":
          sect = "spawnLocs";
          break;
      }
      if (tgt.dataset.c) {
        dt[PlayerId].mapDisplay[sect].colour = tgt.dataset.c;
        tgt.parentNode.parentNode.previousElementSibling.style.backgroundColor =
          tgt.dataset.c;
      }
      if (tgt.dataset.state) {
        dt[PlayerId].mapDisplay[sect].onoff = tgt.dataset.state;
        if (sect == "spawnLocs") {
          m = document.querySelector("#spawnTiles");
        } else {
          m = document.querySelector("#" + sect);
        }
        if (tgt.dataset.state == "on") {
          m.classList.add("see");
          m.classList.remove("nosee");
        } else {
          m.classList.add("nosee");
          m.classList.remove("see");
        }
      }

      locStorage.setItem(
        PlayerId + ":mapDisplay",
        JSON.stringify(dt[PlayerId].mapDisplay)
      );
      var rubbish = "";
    },

    addNotes: function () {
      // Get the canvas container
      var mDiv = document.getElementById("mapDiv");
      // Get the canvas element for the cities
      var cCanvas = document.getElementById("mapCities");
      // Create the canvas for the notes
      var mapNotes = document.createElement("canvas");
      // <canvas id="mapSov" width="500" height="500" style="position:absolute;top:11px;left:15px" unselectable="on"></canvas
      mapNotes.setAttribute("id", "notesCanvas");
      mapNotes.setAttribute("width", "500");
      mapNotes.setAttribute("height", "500");
      mapNotes.setAttribute("style", "position:absolute;top:11px;left:15px");
      mapNotes.setAttribute("unselectable", "on");
    },
    /* Function: noteDispUpdate
     *
     * @return {undefined}
     */
    noteDispUpdate: function () {
      if (dt[PlayerId].mapDisplay.noteDisplay.onoff == "on") {
        if (
          window.location.href.startsWith(
            "https://elgea.illyriad.co.uk/#/World/Map"
          )
        ) {
          document.querySelector("#mapNotes").classList.replace("nosee", "see");
        }
      } else {
        if (
          window.location.href.startsWith(
            "https://elgea.illyriad.co.uk/#/World/Map"
          )
        ) {
          document.querySelector("#mapNotes").classList.replace("see", "nosee");
        }
      }
      //       locStorage.setItem(PlayerId + ":mapDisplay", JSON.stringify(dt[PlayerId].mapDisplay));
      var rubbish = "";
    },
    spawnDispUpdate: function () {
      if (dt[PlayerId].mapDisplay.spawnLocs.onoff == "on") {
        if (
          window.location.href.startsWith(
            "https://elgea.illyriad.co.uk/#/World/Map"
          )
        ) {
          document
            .querySelector("#spawnTiles")
            .classList.replace("nosee", "see");
        }
      } else {
        if (
          window.location.href.startsWith(
            "https://elgea.illyriad.co.uk/#/World/Map"
          )
        ) {
          document
            .querySelector("#spawnTiles")
            .classList.replace("see", "nosee");
        }
      }
      //       locStorage.setItem(PlayerId + ":mapDisplay", JSON.stringify(dt[PlayerId].mapDisplay));
      var rubbish = "";
    },

    townRadDispToggle: function () {
      var currentState =
        document.querySelector("#townRadDispToggle").textContent;
      var rd = document.querySelector("#townRadDispToggle");
      if (currentState == "Enable 10sq radius display") {
        rd.textContent = "Disable 10sq radius display";
        if (
          window.location.href.startsWith(
            "https://elgea.illyriad.co.uk/#/World/Map"
          )
        ) {
          //            document.querySelector("#townRadDispToggle").textContent = "Disable 10sq radius display";
          document.querySelector("#townRad").classList.replace("nosee", "see");
        }
        dt[PlayerId].mapDisplay.tenSq = "see";
      } else {
        rd.textContent = "Enable 10sq radius display";
        if (
          window.location.href.startsWith(
            "https://elgea.illyriad.co.uk/#/World/Map"
          )
        ) {
          //          document.querySelector("#townRadDispToggle").textContent = "Enable 10sq radius display";
          document.querySelector("#townRad").classList.replace("see", "nosee");
        }
        dt[PlayerId].mapDisplay.tenSq = "nosee";
      }
      locStorage.setItem(
        PlayerId + ":mapDisplay",
        JSON.stringify(dt[PlayerId].mapDisplay)
      );
      var rubbish = "";
    },

    /* Function: getVisTowns
     * Get the coords of all towns visible on the map
     */
    getVisTowns: function () {
      var tList = Object.keys(mapData.t);
      this.addCircle(tList, 10);
    },
    getSpawnLocs: function () {
      spawnPoints = [];
      let md = mapData.data;
      let k = Object.keys(md);
      for (i = 0; i < k.length; i++) {
        if (md[k[i]].hasOwnProperty("npc")) {
          spawnPoints.push(k[i]);
        }
      }
      this.addCircle2(spawnPoints, 0.5);
    },

    addCircle2: function (cList, rad) {
      var sFactor = 500 / (mapData.zoom * 2 + 1);
      var cx = mapData.x;
      var cy = mapData.y;

      for (i = 0; i < cList.length; i++) {
        thisLoc = cList[i].split("|");
        x = thisLoc[1];
        y = thisLoc[0];
        xCol = mapData.zoom + (x - cx);
        yCol = mapData.zoom - (y - cy);
        if (dt[PlayerId].mapDisplay.spawnLocs.onoff == "on") {
          var t = document.querySelector("#spawnTiles");
          var ctx = t.getContext("2d");
          dt.drawCircle2(
            ctx,
            xCol,
            yCol,
            sFactor,
            0.5,
            dt[PlayerId].mapDisplay.spawnLocs.colour
          );
        }

        //ctx.arc(x, y, radius, startAngle, endAngle);
      }
    },

    addCircle: function (cList, rad) {
      var sFactor = 500 / (mapData.zoom * 2 + 1);
      var cx = mapData.x;
      var cy = mapData.y;

      for (i = 0; i < cList.length; i++) {
        thisTown = cList[i].split("|");
        x = thisTown[1];
        y = thisTown[0];
        xCol = mapData.zoom + (x - cx);
        yCol = mapData.zoom - (y - cy);
        //            console.log("xCol ",xCol," yCol ",yCol);
        if (dt[PlayerId].mapDisplay.tenSq.onoff == "on") {
          var t = document.querySelector("#tenSq");
          var ctx = t.getContext("2d");
          dt.drawCircle2(
            ctx,
            xCol,
            yCol,
            sFactor,
            10,
            dt[PlayerId].mapDisplay.tenSq.colour
          );
        }
        if (dt[PlayerId].mapDisplay.fiveSq.onoff == "on") {
          var t = document.querySelector("#fiveSq");
          var ctx = t.getContext("2d");
          dt.drawCircle2(
            ctx,
            xCol,
            yCol,
            sFactor,
            5,
            dt[PlayerId].mapDisplay.fiveSq.colour
          );
        }
      }
    },

    addTownRadius: function () {
      var mDiv = document.getElementById("mapDiv");
      // Get the canvas element for the cities
      var cCanvas = document.getElementById("mapCities");
      // Create the canvas for the notes
      var townRad = document.createElement("canvas");
      townRad.setAttribute("id", "townRadCanvas");
      townRad.setAttribute("width", "500");
      townRad.setAttribute("height", "500");
      townRad.setAttribute("style", "position:absolute;top:11px;left:15px");
      townRad.setAttribute("unselectable", "on");
      mDiv.insertBefore(cCanvas, townRad);
      townRad = document.getElementById("townRadCanvas");
      var ctx = townRad.getContext("2d");
      // Get the coords of any towns on the map
      var visibleTowns = Object.keys(mapData.t);
      // Loop through each of the towns
      for (t = 0; t < visibleTowns.length; t++) {
        //    console.log(mapData.t[visibleTowns[t]]);
        thisTown = {
          x: parseInt(mapData.t[visibleTowns[t]].t.X),
          y: parseInt(mapData.t[visibleTowns[t]].t.Y),
        };
        //    console.log(thisTown);
        s = 2 * curMapZoom + 1;
        ctx.scale(500 / s, 500 / s),
          ctx.translate(-curMapX + curMapZoom, curMapY + curMapZoom);
        ctx.arc(thisTown.x, thisTown.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    },
    /* Method: collectScan
     * Display the buttons and table for the scan of collactable items.
     */
    collectScan: function () {
      if (this.checkHash()) {
        dt.showTool("#scanCollectableHtml");
      }
    },
    toggleCollect(e) {
      var t = e.target;
      var tId = t.id;
      //    console.log(t,tId,t.value,t.checked);
      if (t.checked) {
        // console.log("Will show " + tId);
      } else {
        // console.log("Will not show " + tId);
      }
      dt.sCollectables[tId] = t.checked;
    },
    /* Function: scanCollectTbl
     * Scan the visible map for any items that can be collected by trade units or
     *  military/NPC camps and display them in a table.
     *
     * Calls:
     * <addElement2>
     */
    scanCollectTbl: function () {
      // Hex codes for sov colours
      // #A5CE38 - Confed
      //
      var gpsizes = [
        "",
        "Few",
        "Handful",
        "Several",
        "Pack",
        "Many",
        "Gathering",
        "Horde",
        "Throng",
        "Host",
        "Legion",
        "Myriad",
        "Sea",
        "Cornucopia",
      ];
      dt.found = {};
      var outputTable = document.querySelector("#collectable tbody");
      // Get the limits for the map.
      var centerCoords = [parseInt(mapData.x), parseInt(mapData.y)];
      var zoomLevel = parseInt(mapData.zoom);
      var xRange = [centerCoords[0] - zoomLevel, centerCoords[0] + zoomLevel];
      if (xRange[0] > xRange[1]) {
        var t = xRange[0];
        xRange[0] = xRange[1];
        xRange[1] = t;
      }
      var yRange = [centerCoords[1] - zoomLevel, centerCoords[1] + zoomLevel];
      if (yRange[0] > yRange[1]) {
        var t = yRange[0];
        yRange[0] = yRange[1];
        yRange[1] = t;
      }
      // Get keys for all the elments of interest from mapData
      var vanKeys = Object.keys(mapData.n);
      var chmsKeys = Object.keys(mapData.d);
      var campKeys = Object.keys(mapData.c);
      var sovKeys = Object.keys(mapData.s);
      // Step through the squares
      for (var thisY = yRange[0]; thisY < yRange[1] + 1; thisY++) {
        for (var thisX = xRange[0]; thisX < xRange[1] + 1; thisX++) {
          var thisSquare = {
            cotters: [],
            herbalists: [],
            miners: [],
            skinners: [],
            caravans: [],
            camps: [],
          };
          var thisKey = thisY + "|" + thisX;
          // Check if there is a caravan collectable
          if ($.inArray(thisKey, vanKeys) > -1) {
            if (mapData.n[thisKey].hasOwnProperty("rImg")) {
              var t = mapData.n[thisKey].rImg;
              var title = mapData.n[thisKey].d;
              thisSquare.caravans.push([
                ["resIcon", t.split("/")[1] + "_24"],
                [title],
              ]);
              dt.found[thisKey] = thisSquare;
            } else {
              var t = mapData.n[thisKey].hImg;
              // "map/flags/T--1"
              var bits = t.split("/");
              var numBits = bits.length;
              t = "dt-" + bits[numBits - 1];
              var title = mapData.n[thisKey].rd + "harvesters";
              thisSquare.caravans.push([[t], [title]]);
              dt.found[thisKey] = thisSquare;
            }
          }
          // Check if there is a encampment collectable
          if ($.inArray(thisKey, campKeys) > -1) {
            var index = mapData.c[thisKey].i;
            var title = mapData.c[thisKey].d;
            var sz = mapData.c[thisKey].n;
            if (parseInt(index) == index) {
              // "//assets.illyriad.net/img/map/flags/44.png"
              var imgTag =
                '<img class="simg" src="//assets.illyriad.net/img/map/flags/' +
                index +
                '.png"  alt="" title="' +
                title +
                '">';
              //                        var imgTag = '<img src="http://cdn7.illyriad.com/img/icons/res' + index + '.png"  alt="" title="' + title + '">';
              thisSquare.camps.push(["dtresIcon", imgTag, sz, title]);
            } else {
              var imgTag =
                '<img class="dtcamp" src="//assets.illyriad.net/img/map/flags/' +
                index +
                '.png"  alt="" title="' +
                title +
                '">';
              //                        var imgTag = '<img class="dtcamp" src="//assets.illyriad.net/img/map/flags/encampment2.png"  alt="" title="' + title + '">';
              thisSquare.camps.push(["dtresIcon", imgTag, sz, title]);
            }
            dt.found[thisKey] = thisSquare;
          }
          // Check for cotter, miner, herbalist or skinner items
          if ($.inArray(thisKey, chmsKeys) > -1) {
            var flags = mapData.d[thisKey];
            var flagArray = flags.split("|");
            for (i = 0; i < 10; i++) {
              if (parseInt(flagArray[i]) === 1) {
                switch (i) {
                  case 0:
                    thisSquare.cotters.push([
                      ["resIcon", "hide_24"],
                      ["Hides"],
                    ]);
                    break;
                  case 1:
                    thisSquare.cotters.push([
                      ["itemsprite", "herbs_24"],
                      ["Herbs"],
                    ]);
                    break;
                  case 2:
                    thisSquare.cotters.push([
                      ["base", "crystals_24"],
                      ["Minerals"],
                    ]);
                    break;
                  case 3:
                    thisSquare.cotters.push([["dtequip"], ["Equipment"]]);
                    break;
                  case 4:
                    thisSquare.skinners.push([
                      ["resIcon", "elemairsalt_24"],
                      ["Elemental Salts"],
                    ]);
                    break;
                  case 5:
                    thisSquare.herbalists.push([
                      ["resIcon", "spices_24"],
                      ["Rare Herbs"],
                    ]);
                    break;
                  case 6:
                    thisSquare.miners.push([
                      ["resIcon", "gems_24"],
                      ["Rare Minerals"],
                    ]);
                    break;
                  case 7:
                    thisSquare.cotters.push([
                      ["resIcon", "grapes_24"],
                      ["Grapes"],
                    ]);
                    break;
                  case 8:
                    thisSquare.skinners.push([
                      ["resIcon", "paws_24"],
                      ["Animal Parts"],
                    ]);
                    break;
                  case 9:
                    thisSquare.cotters.push([
                      ["calamity", "skyfallen_48"],
                      ["Skyfallen"],
                    ]);
                    break;
                }
              }
            }
            dt.found[thisKey] = thisSquare;
          }
        } // end of x loop
      } // end of y loop
      var b = "";
      var foundkeys = Object.keys(dt.found);
      var numFound = foundkeys.length;
      for (var i = 0; i < numFound; i++) {
        thisKey = foundkeys[i];
        var cArray = thisKey.split("|");
        var href = 'href="#/World/Map/' + cArray[1] + "/" + cArray[0] + '/5"';

        var thisSquare = dt.found[thisKey];
        // check if there are any collectables to be displayed in this row
        if (this.showRow(thisSquare)) {
          // Add a row to the table
          var row = outputTable.insertRow(-1);
          var newCell = row.insertCell(0);
          var newSpan = dt.addElement2(
            newCell,
            "span",
            ["class", "data"],
            ["name", "l=" + cArray[1] + "|" + cArray[0]]
          );
          newElem = dt.addElement2(newSpan, "a", ["onclick"], [href]);

          newElem.textContent = dt.coordSwap(thisKey);
          var newCell = row.insertCell(1);
          //                newCell.setAttribute("data","l="+cArray[0] + "|" + cArray[1]);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);

          // Build the Caravan cell
          var numEntries = thisSquare.caravans.length;
          if (numEntries > 0 && dt.sCollectables.sVan) {
            for (var n = 0; n < numEntries; n++) {
              var classes = thisSquare.caravans[n][0].join(" ");
              var title = thisSquare.caravans[n][1];
              var newSpan = dt.addElement2(
                newElem,
                "span",
                ["class", "title"],
                [classes, title]
              );
              newSpan.setAttribute("title", title);
            }
          }
          var newCell = row.insertCell(2);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          // Build the Cotters cell
          var numEntries = thisSquare.cotters.length;
          if (numEntries > 0 && dt.sCollectables.sCott) {
            for (var n = 0; n < numEntries; n++) {
              var thistitle = thisSquare.cotters[n][1];
              var classes = thisSquare.cotters[n][0].join(" ");
              var newSpan = dt.addElement2(
                newElem,
                "span",
                ["class"],
                [classes]
              );
              newSpan.setAttribute("title", thistitle);
              if (thistitle == "Equipment") {
                newSpan.innerHTML =
                  '<img class="simg" src="//assets.illyriad.net/img/icons/equip_48.png" />';
              }
              if (thistitle == "Skyfallen") {
                newSpan.innerHTML =
                  '<img class="simg" src="//assets.illyriad.net/img/icons/skyfallen_48.png" />';
              }
            }
          }
          var newCell = row.insertCell(3);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          // Build the Skinners cell
          var numEntries = thisSquare.skinners.length;
          if (numEntries > 0 && dt.sCollectables.sSkin) {
            for (var n = 0; n < numEntries; n++) {
              var thistitle = thisSquare.skinners[n][1];
              var classes = thisSquare.skinners[n][0].join(" ");
              var newSpan = dt.addElement2(
                newElem,
                "span",
                ["class"],
                [classes]
              );
              newSpan.setAttribute("title", thistitle);
            }
          }
          var newCell = row.insertCell(4);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          // Build the Herbalists cell
          var numEntries = thisSquare.herbalists.length;
          if (numEntries > 0 && dt.sCollectables.sHerb) {
            for (var n = 0; n < numEntries; n++) {
              var thistitle = thisSquare.herbalists[n][1];
              var classes = thisSquare.herbalists[n][0].join(" ");
              var newSpan = dt.addElement2(
                newElem,
                "span",
                ["class"],
                [classes]
              );
              newSpan.setAttribute("title", thistitle);
            }
          }
          var newCell = row.insertCell(5);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          // Build the Miners cell
          var numEntries = thisSquare.miners.length;
          if (numEntries > 0 && dt.sCollectables.sMin) {
            for (var n = 0; n < numEntries; n++) {
              var thistitle = thisSquare.miners[n][1];
              var classes = thisSquare.miners[n][0].join(" ");
              var newSpan = dt.addElement2(
                newElem,
                "span",
                ["class"],
                [classes]
              );
              newSpan.setAttribute("title", thistitle);
            }
          }

          var newCell = row.insertCell(6);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          // Build the Encampments cell
          var numEntries = thisSquare.camps.length;
          if (numEntries > 0 && dt.sCollectables.sCamp) {
            for (var n = 0; n < numEntries; n++) {
              var newSpan = dt.addElement2(newElem, "span", [], []);
              newSpan.innerHTML = thisSquare.camps[n][1];
              newCell.dataset.sort = Object.keys(dt.npcFamilies).indexOf(
                thisSquare.camps[n][3]
              );
            }
          }
          var newCell = row.insertCell(7);
          if (numEntries > 0 && dt.sCollectables.sCamp) {
            newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
            for (var n = 0; n < numEntries; n++) {
              var newSpan = dt.addElement2(newElem, "span", [], []);
              newSpan.textContent = thisSquare.camps[n][2];
              newCell.dataset.sort = gpsizes.indexOf(thisSquare.camps[n][2]);
            }
          } else {
            newCell.dataset.sort = 0;
          }

          var newCell = row.insertCell(8);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          var sourceCoords = [townX, townY];
          var coords = thisKey.split("|");
          coords[0] = parseInt(coords[0]);
          coords[1] = parseInt(coords[1]);
          var dist = dt.hypot(sourceCoords, coords.reverse()).toFixed(1);
          newElem.textContent = dist;
          // Add the sov status
          var newCell = row.insertCell(9);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          // Check if there is an entry in the sovKeys array for this location
          if (sovKeys.indexOf(thisKey) > -1) {
            var thisSov = mapData.s[thisKey];
            // Create the title for this element
            var title = thisSov.a + " " + thisSov.rd;
            var newSpan = dt.addElement2(
              newElem,
              "span",
              ["style", "title"],
              ["background-color: yellow", title]
            );
            newSpan.innerHTML = thisSov.pn;
          }
          // Build a terrain cell
          var newCell = row.insertCell(10);
          newElem = dt.addElement2(newCell, "a", ["onclick"], [href]);
          terrainCode =
            mapData.data[cArray[0] + "|" + cArray[1]].t.split("-")[0];
          biomeCode = mapData.data[cArray[0] + "|" + cArray[1]].b;
          // console.log(biomeCode);
          terrainText =
            terrain[terrainCode].type +
            " | " +
            terrain[terrainCode].combat +
            " | " +
            dt.mapTools.biomeNames[biomeCode];
          newElem.textContent = terrainText;
        }
      }
      //		})
      // Having built the table we need to check the height of it and adjust the window height if needed.
      var id = "#scanCollectableHtml";
      var winHeight = window.innerHeight;
      var maxHt = parseInt(0.75 * winHeight);
      var el = document.querySelector("div.ui-dialog > " + id).parentElement;

      var intElemOffsetHeight = el.offsetHeight;
      var currHeight = $(id).dialog("option", "height");
      if (intElemOffsetHeight > maxHt) {
        $(id).dialog("option", "height", maxHt);
      }
      dt.adjustTool("#scanCollectableHtml");
    },
    showRow: function (thisSq) {
      var rubbish = "";
      var s = 0;
      if (thisSq.caravans.length > 0 && dt.sCollectables.sVan) {
        s = 1;
      }
      if (thisSq.camps.length > 0 && dt.sCollectables.sCamp) {
        s = 1;
      }
      if (thisSq.cotters.length > 0 && dt.sCollectables.sCott) {
        s = 1;
      }
      if (thisSq.herbalists.length > 0 && dt.sCollectables.sHerb) {
        s = 1;
      }
      if (thisSq.miners.length > 0 && dt.sCollectables.sMin) {
        s = 1;
      }
      if (thisSq.skinners.length > 0 && dt.sCollectables.sSkin) {
        s = 1;
      }
      return s;
    },
    clearCollectTbl: function () {
      dt.found = {};
      //		document.querySelector('#dt_input').setAttribute('class', 'nosee');
      //	$( "#dt_output" ).load( dt.server+"/html/durctools3.html #scanCollectableHtml" );
      //$( "#dt_output" ).load(  dt.server+"/html/durctools3.html #scanCollectableHtml", function() {
      //  alert( "Load was performed." );
      //});
      // html body div#durcTools3.see div#dt_output.see div#scanCollectableHtml table#collectable.see thead tr
      var tblBody = document.querySelectorAll("#collectable tbody");
      //var element = document.getElementById("top");
      dt.removeRows(document.querySelector("#collectable"));
      //		while (tblBody.firstChild) {
      //			tblBody.removeChild(element.firstChild);
      //		}
      //for(var i=1;i<tblRows.length;i++){

      //}
      //		document.querySelector('#dt_output').setAttribute('class', 'see');
    },
    tapeMeasure: function () {
      if (this.checkHash()) {
        dt.showTool("#distMeasureHtml");
        this.tapeMeasure.start = [0, 0];
        this.tapeMeasure.end = [0, 0];
      }
    },
    getCoords: function () {
      // Find which options are currently selected and set the coords accordingly.
      var startAt = document.querySelector(
        'input[name="startSource"]:checked'
      ).value;
      var endAt = document.querySelector(
        'input[name="endSource"]:checked'
      ).value;
      switch (startAt) {
        case "Current Town":
          dt.mapTools.tapeMeasure.start[0] = dt[PlayerId].towns[CurrentTown].x;
          dt.mapTools.tapeMeasure.start[1] = dt[PlayerId].towns[CurrentTown].y;
          break;
        case "Map Center":
          dt.mapTools.tapeMeasure.start[0] = mapData.x;
          dt.mapTools.tapeMeasure.start[1] = mapData.y;
          break;
        case "Enter Coords":
          var t = document.getElementById("startX").value;
          dt.mapTools.tapeMeasure.start[0] = t.replace("X", "");
          var t = document.getElementById("startY").value;
          dt.mapTools.tapeMeasure.start[1] = t.replace("Y", "");
          break;
      }
      switch (endAt) {
        case "Current Town":
          dt.mapTools.tapeMeasure.end[0] = dt[PlayerId].towns[CurrentTown].x;
          dt.mapTools.tapeMeasure.end[1] = dt[PlayerId].towns[CurrentTown].y;
          break;
        case "Map Center":
          dt.mapTools.tapeMeasure.end[0] = mapData.x;
          dt.mapTools.tapeMeasure.end[1] = mapData.y;
          break;
        case "Enter Coords":
          var t = document.getElementById("endX").value;
          dt.mapTools.tapeMeasure.end[0] = t.replace("X", "");
          var t = document.getElementById("endY").value;
          dt.mapTools.tapeMeasure.end[1] = t.replace("Y", "");
          break;
      }
      dt.mapTools.calcHypot();
    },
    calcHypot: function () {
      var dist = dt
        .hypot(this.tapeMeasure.start, this.tapeMeasure.end)
        .toFixed(2);
      var resultText =
        "Distance between [" +
        this.tapeMeasure.start[0] +
        "|" +
        this.tapeMeasure.start[1] +
        "] and [" +
        this.tapeMeasure.end[0] +
        "|" +
        this.tapeMeasure.end[1] +
        "] is " +
        dist +
        " squares.";
      document.getElementById("result").textContent = resultText;
    },
    toggleManEntry: function (where) {
      var startX = document.getElementById("startX");
      var startY = document.getElementById("startY");
      var endX = document.getElementById("endX");
      var endY = document.getElementById("endY");
      switch (where) {
        case "startTown":
          startX.setAttribute("disabled", "disabled");
          startY.setAttribute("disabled", "disabled");
          break;
        case "startMap":
          startX.setAttribute("disabled", "disabled");
          startY.setAttribute("disabled", "disabled");
          break;
        case "startManual":
          startX.removeAttribute("disabled", "disabled");
          startY.removeAttribute("disabled", "disabled");
          break;
        case "endTown":
          endX.setAttribute("disabled", "disabled");
          endY.setAttribute("disabled", "disabled");
          break;
        case "endMap":
          endX.setAttribute("disabled", "disabled");
          endY.setAttribute("disabled", "disabled");
          break;
        case "endManual":
          endX.removeAttribute("disabled", "disabled");
          endY.removeAttribute("disabled", "disabled");
          break;
      }
    },
    /* Function: resScan
     * Display and enable the form for input of the ranges for basic resources.
     *
     */
    resScan: function () {
      if (this.checkHash()) {
        var ranges = {
          minW: [0, 25, 0],
          minC: [0, 25, 0],
          minI: [0, 25, 0],
          minS: [0, 25, 0],
          minF: [0, 25, 0],
          maxW: [0, 25, 25],
          maxC: [0, 25, 25],
          maxI: [0, 25, 25],
          maxS: [0, 25, 25],
          maxF: [0, 25, 25],
        };
        // Display the tool window with the form for setting the search parameters.
        dt.showTool("#spotScanHtml");
        var everythingLoaded = setInterval(function () {
          if (/loaded|complete/.test(document.readyState)) {
            clearInterval(everythingLoaded);

            //		$(document).ready(function resScanLoaded() {
            var resOptKeys = Object.keys(ranges);
            for (var i = 0; i < resOptKeys.length; i++) {
              var thisOpt = document.getElementById(resOptKeys[i]);
              var min = ranges[resOptKeys[i]][0];
              var max = ranges[resOptKeys[i]][1];
              var use = ranges[resOptKeys[i]][2];
              for (var val = min; val <= max; val++) {
                var newOpt = dt.addElement2(
                  thisOpt,
                  "option",
                  ["value"],
                  [val]
                );
                newOpt.textContent = val;
                if (val == use) {
                  newOpt.setAttribute("selected", "");
                }
              }
              //                                        var newOpt = dt.addElement2(thisOpt, 'option', ['value'], "99");
              //                                        newOpt.textContent = '-';
            }
            //			dt.outputArea.innerHtml = "";
            //	durc_input.innerHTML = durc.contents.resRange;
            cbtAcceptOpt = document.getElementById("sqTerrain");
            centAcceptOpt = document.getElementById("cTerrain");
            var t = Object.keys(dt.cbtTerrains);
            var l = t.length;
            for (i = 0; i < l; i++) {
              option = document.createElement("option");
              option.setAttribute("value", t[i]);
              option.appendChild(document.createTextNode(t[i]));
              cbtAcceptOpt.appendChild(option);
            }
            for (i = 0; i < l; i++) {
              option = document.createElement("option");
              option.setAttribute("value", t[i]);
              option.appendChild(document.createTextNode(t[i]));
              centAcceptOpt.appendChild(option);
            }
            //			dt.inputArea.setAttribute('class', 'see');
            //			dt.outputArea.setAttribute('class', 'nosee');
            //		});

            //    init(); // this is the function that gets called when everything is loaded
          }
        }, 10);
      }
    },
    /*Function: resourceScan
     * Checks the visible map for squares that match given resource values and
     * terrain classes (both on the square and adjacent).
     */
    resourceScan: function () {
      //	dt.callerId(resourceScan.caller);
      //dt.ajaxReq("resTable",'dt_output');

      // Now wait for the map etc to have finished loading
      var everythingLoaded = setInterval(function () {
        if (/loaded|complete/.test(document.readyState)) {
          clearInterval(everythingLoaded);

          //	$(document).ready(function resourceScanLoaded() {
          // Check if the sq matches a required terrain
          var outArea = document.querySelector("#spotScanResultsHtml tbody");
          //		outArea.setAttribute(['class'], ['see']);
          //		var newElem = dt.addElement2(outArea, 'p', [], []);
          //		newElem.textContent = "Checking terrain classes...";
          var wanted = [];
          var possible = [];
          var resLimits = [];
          // Get the options that have been selected
          var x = document.getElementById("resLimits");
          for (i = 0; i < 10; i++) {
            resLimits[i] = parseInt(x.elements[i].value);
          }

          var t = x.elements[10];
          if (t.options[0].selected == true) {
            wanted = Object.keys(dt.cbtTerrains);
          } else {
            for (var i = 0; i < t.options.length; i++) {
              if (t.options[i].selected == true) {
                var name = t.options[i].value;
                wanted.push(name);
              }
            }
          }
          // Get the area to be checked (1 sq inside the map limits)
          var newElem = dt.addElement2(outArea, "p", [], []);
          newElem.textContent = "Checking resource levels...";
          var centerCoords = [parseInt(mapData.x), parseInt(mapData.y)];
          var zoomLevel = parseInt(mapData.zoom) - 1;
          var xRange = [
            centerCoords[0] - zoomLevel,
            centerCoords[0] + zoomLevel,
          ];
          if (xRange[0] > xRange[1]) {
            var t = xRange[0];
            xRange[0] = xRange[1];
            xRange[1] = t;
          }
          var yRange = [
            centerCoords[1] - zoomLevel,
            centerCoords[1] + zoomLevel,
          ];
          if (yRange[0] > yRange[1]) {
            var t = yRange[0];
            yRange[0] = yRange[1];
            yRange[1] = t;
          }
          // Check and adjust the ranges for max/min values.
          if (xRange[0] < -1000) xRange[0] = -1000;
          if (xRange[1] > 1000) xRange[1] = 1000;
          if (yRange[0] < -3300) yRange[0] = -3300;
          if (yRange[1] > 1000) yRange[1] = 1000;

          // Get the info from the mapData object.
          var mapInfo = mapData.data;
          // Filter the squares for those with acceptable terrain types.
          for (var thisY = yRange[0]; thisY < yRange[1] + 1; thisY++) {
            for (var thisX = xRange[0]; thisX < xRange[1] + 1; thisX++) {
              var thisKey = thisY + "|" + thisX;
              if (mapData.data.hasOwnProperty(thisKey)) {
                var terrainCode = mapData.data[thisKey].i;
                if (wanted.lastIndexOf(terrain[terrainCode].combat) > -1) {
                  possible.push(thisKey);
                }
              }
            }
          }
          // Filter the remaing squares for acceptable resource levels.
          var rubbish = "";
          var matchRes = [];
          var numSqs = possible.length;
          for (var thisSq = 0; thisSq < numSqs; thisSq++) {
            var theRes = mapData.data[possible[thisSq]].rs;
            var resArray = theRes.split("|");
            var matched = 0;
            for (var i = 0; i < 5; i++) {
              // Check each of the resources
              if (
                resArray[i] >= resLimits[i] &&
                resArray[i] <= resLimits[i + 5]
              ) {
                matched = matched + 1;
              }
            }
            if (matched == 5) {
              matchRes.push(possible[thisSq]);
            }
          }
          // Check the squares adjacent to each of the remaining squares for the terrain type
          var newElem = dt.addElement2(outArea, "p", [], []);
          newElem.textContent = "Checking surrounding squares...";
          var t = x.elements[11];
          if (t.options[0].selected == true) {
            wanted = Object.keys(dt.cbtTerrains);
          } else {
            for (var i = 0; i < t.options.length; i++) {
              if (t.options[i].selected == true) {
                var name = t.options[i].value;
                wanted.push(name);
              }
            }
          }
          var numSqs = matchRes.length;
          fullMatch = [];
          for (var i = 0; i < numSqs; i++) {
            var coords = matchRes[i].split("|");
            var xRange = [parseInt(coords[1]) - 1, parseInt(coords[1]) + 1];
            if (xRange[0] > xRange[1]) {
              var t = xRange[0];
              xRange[0] = xRange[1];
              xRange[1] = t;
            }
            var yRange = [parseInt(coords[0]) - 1, parseInt(coords[0]) + 1];
            if (yRange[0] > yRange[1]) {
              var t = yRange[0];
              yRange[0] = yRange[1];
              yRange[1] = t;
            }
            // Check and adjust the ranges for max/min values.
            if (xRange[0] < -1000) xRange[0] = -1000;
            if (xRange[1] > 1000) xRange[1] = 1000;
            if (yRange[0] < -3300) yRange[0] = -3300;
            if (yRange[1] > 1000) yRange[1] = 1000;

            var matchCount = 0;
            for (var thisY = yRange[0]; thisY < yRange[1] + 1; thisY++) {
              for (var thisX = xRange[0]; thisX < xRange[1] + 1; thisX++) {
                var thisKey = thisY + "|" + thisX;
                if (thisKey != matchRes[i]) {
                  var terrainCode = mapData.data[thisKey].i;
                  if (wanted.lastIndexOf(terrain[terrainCode].combat) > -1) {
                    ++matchCount;
                  }
                }
              }
            }
            if (matchCount == 8) {
              fullMatch.push(matchRes[i]);
            }
          }
          var rubbish = "";
          var outString = fullMatch.join(", ");
          //		outArea.textContent=outString;
          var numMatches = fullMatch.length;
          outArea.innerHTML = "";
          var resTable = document.querySelector(
            "#spotScanResultsHtml table.oddeven tbody"
          );
          for (var i = 0; i < numMatches; i++) {
            var row = resTable.insertRow(-1);
            var cArray = fullMatch[i].split("|");
            var href =
              'href="#/World/Map/' + cArray[1] + "/" + cArray[0] + '/5"';

            var cell = row.insertCell(0);
            var newElem = dt.addElement2(cell, "a", ["onclick"], [href]);
            newElem.textContent = dt.coordSwap(fullMatch[i]);
            cell = row.insertCell(1);
            newElem = dt.addElement2(cell, "a", ["onclick"], [href]);
            var tName = terrain[mapData.data[fullMatch[i]].i].combat;
            newElem.textContent = tName;
            cell = row.insertCell(2);
            newElem = dt.addElement2(cell, "a", ["onclick"], [href]);
            newElem.textContent = mapData.data[fullMatch[i]].rs;
            cell = row.insertCell(3);
            newElem = dt.addElement2(cell, "span", [], []);
            newElem.textContent = "DETAILED";
            cell = row.insertCell(4);
            newElem = dt.addElement2(cell, "span", [], []);
            newElem.textContent = "SAVE";
          }
          dt.adjustTool("#spotScanHtml");
          var fullString = JSON.stringify(fullMatch);
        }
        //	}
      }, 10);
    },
    clearResTbl: function () {
      dt.removeRows(document.querySelector("#spotScanResultsHtml table"));
    },
  };

  dt.scanFactionTroops = function () {
    var msg = "Scanning for faction troops.";
    dt.logEntry(msg);
    //	var found = false;
    var everythingLoaded = setInterval(function () {
      if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);
        //	 dt.production.setup();
        //	 if(!dt[PlayerId].settings.chkFreq){
        //		 dt[PlayerId].settings.chkFreq = 300000;
        //	 }
        //	dt.prodCheckTimer = window.setInterval(dt.production.updateQueues, dt[PlayerId].settings.chkFreq);
        //
        ////    init(); // this is the function that gets called when everything is loaded
        //  }
        //}, 10);
        var found = false;
        $(document).ready(function scanFactionTroopsLoaded() {
          var camps = Object.keys(mapData.c);
          for (var i = 0; i < camps.length; i++) {
            var t = mapData.c[camps[i]].d;
            if (t.includes("Occupying")) {
              var v = t.substring(0, 3);
              switch (v) {
                case "You":
                case "Con":
                case "NAP":
                case "Neu":
                case "All":
                  // Not interested in these
                  break;
                default:
                  var s = camps[i];
                  var who = t.replace(" Occupying Force", "");
                  //						dt.factionTroops[s] = {whereat: s, name: who, by: PlayerId, when: Date()};
                  dt.ajaxFactionTroops({
                    whereat: s,
                    name: who,
                    by: PlayerId,
                    when: Date(),
                  });
                  //			dt.ajaxFactionTroops(dt.factionTroops);
                  //			dt.factionTroops = {};
                  found = true;
              }
            }
          }
          if (found === true) {
            //			dt.ajaxFactionTroops(dt.factionTroops);
            //			dt.factionTroops = {};
          }
        });
      }
    }, 10);

    var msg = "Faction troop scan finished.";
    dt.logEntry(msg);
  };
};
dtrmaptools = function () {
  dtr = {
    // NPC Names
    npcNames: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "Brown Bears",
      null,
      "Wild Dogs",
      null,
      null,
      null,
      "Wolves",
      "Giant Rats",
      "Mammoths",
      "Gharials",
      "Giant Spiders",
      "Giant Snakes",
      null,
      null,
      null,
      null,
      null,
      "Polar Bears",
      "Alligators",
      "Anacondas",
      "Cobras",
      "Coral Snakes",
      "Poisonous Crawlers",
      "Giant Scuttlers",
      "Scritchers",
      "Giant Scorpions",
      "Scaled Chargers",
      "Elephants",
      "Rhinoceros",
      "Simien Wolves",
      "Black Bears",
      "Arctic Wolves",
      "Jaguars",
      "Leopards",
      "Pumas",
      "Snow Leopards",
      "Lions",
      "Tigers",
      "White Tigers",
      "Salamanders",
      "Ice Salamanders",
      "Fire Salamanders",
      null,
      "Giant Beetles",
      "Golden Monkeys",
      "Baboons",
      "Massive Scarabs",
      "Black Panthers",
      "Saurians",
      "Cyclopes",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "Escaped Air Elementals",
      null,
      "Escaped Earth Elementals",
      "Escaped Fire Elementals",
      "Escaped Water Elementals",
    ],
    // Faction Names
    factionNames: [
      "Unknown",
      "Council of Illyria",
      "Arakvar",
      "Unknown",
      "Atagek",
      "Azure Throne",
      "Barbarians",
      "Fratri Hominis",
      "Tantarkim",
      "Circle Of Five",
      "Daedalons",
      "Dragonkin",
      "Kildarran",
      "Duchy of Keppen",
      "Unknown",
      "Eaglesbrood",
      "Empirium",
      "Kingdom of Larn",
      "Forbidden Empire",
      "Fyrgis",
      "Giantkind",
      "Skarakar",
      "Tinkers",
      "Keepers of the Golden Fields",
      "Harpies",
      "Sma Uruk",
      "Kadu",
      "Kanchalka",
      "Kingdom of Tal",
      "Unknown",
      "Parvacones",
      "Sslipentin",
      "Lords Of The West",
      "Melders",
      "Demersae",
      "Jannu",
      "Northmen",
      "Nordlanders",
      "Drangu Mundas",
      "Outlaws",
      "Parlan",
      "Raja Metu",
      "Order of Allembine",
      "Sillar",
      "Sirens",
      "Sultanate of Kazim",
      "Sylvans",
      "Tenaril",
      "Tewhirrus",
      "Tien Zao",
      "Tipu Khan",
      "Triumvirate",
      "Zau Brulk",
      "Udaiman",
      "Udan Tebriz",
      "Undying Flame",
      "Wen Kun Dynasty",
      "Windseekers",
      "Seelie Court",
      "Unseelie Court",
      "Crimson Dawn",
      "Treggar's Crows",
      "Brotherhood of Kerala",
      "Bayne's Irregulars",
      "Marauding Skullsplitters",
      "Illyria Trade Council",
      "Trappers",
      "Sundog Gith",
      "Guardians of Zera",
      "Clan Reashag",
      "Blood Reavers",
      "Crimson Skulls",
      "Pax Orcana",
      "Apaxu",
      "Lannigolds",
      "Clan Bealagh",
      "Clan Moedagh",
      "Hashashin",
      "Foshnu Ob Wulpor",
      "Turyns",
      "Illians",
      "Lyrians",
      "Dyadans",
      "Argiri",
      "Clan Dollogh",
      "Drek-Hhakral",
      "Free Orcs",
      "Guul-Hai",
      "Heirs of Voyldarn",
      "Houergerrt",
      "Kapikami",
      "Kartur-Hhakral",
      "Llwcharion",
      "Mellorians",
      "Overoad Traders",
      "South Oceans Company",
      "Tal Colonists",
      "The College of Silence",
      "The Lost Clans",
      "The New Light",
      "The Pirate Kings",
      "The Tears Eternal",
      "The Tower",
      "Virten",
      "Yuraquncha",
      "Underworld",
    ],
    // Group sizes
    groupSizes: {
      Few: ["Few", 1, 3],
      Handfull: ["Handfull", 4, 8],
      Several: ["Several", 9, 21],
      Pack: ["Pack", 22, 81],
      Many: ["Many", 82, 128],
      Gathering: ["Gathering", 129, 227],
      Horde: ["Horde", 228, 462],
      Throng: ["Throng", 463, 815],
      Host: ["Host", 816, 2500],
      Legion: ["Legion", 2501, 9999],
      Myriad: ["Myriad", 10000, 25000],
      Sea: ["Sea", 25001, 49999],
      Cornucopia: ["Cornucopia", 50000, "Infinity"],
      Unknown: ["Unknown", "", ""],
    },
    // Which camp sizes to show
    selectedSizes: [
      ...document.querySelectorAll("#campSizesSelect .dtcheck:checked"),
    ].map((e) => e.name),
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
        case orig > 999999:
          var formatted = (orig / 1000000).toFixed(2);
          formatted = formatted.toString() + "M";
          break;
        case orig > 999:
          formatted = (orig / 1000).toFixed(2);
          formatted = formatted.toString() + "k";
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
        case orig > 999999:
          var formatted = (orig / 1000000).toFixed(0);
          formatted = formatted.toString() + "M";
          break;
        case orig > 999:
          formatted = (orig / 1000).toFixed(0);
          formatted = formatted.toString() + "k";
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
      if (obj !== "undefined") {
        return Object.keys(obj)
          .sort()
          .reduce(function (result, key) {
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
        var t = coords.split("|");
        t.reverse();
        return t.join("|");
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
      dist = Math.sqrt(dx * dx + dy * dy);
      return dist;
    },
    /* Method: removeRows
     * Remove all the rows from the body of a table.
     *
     * Parameter:
     * tbl - object reference. The table to remove the rows from.
     */
    removeRows: function (tbl) {
      var bdy = tbl.querySelector("tbody");
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
      if (!h) var h = location.hash;
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

    clickMonitor: function (e) {
      let t = e.currentTarget;
      let d = t.dataset;
      if (d.tool) {
        e.stopPropagation();
        if (d.tool.startsWith("#")) {
          dtr.showToolDiv(d.tool);
        } else {
          dtr.runSelected(d.tool);
        }
      }
      if (t.classList.contains("cr")) {
        //
        switch (t.classList[0].toUpperCase()) {
          case "NW":
            dtr.moveUp();
            dtr.moveLeft();
            break;
          case "N":
            dtr.moveUp();
            break;
          case "NE":
            dtr.moveUp();
            dtr.moveRight();
            break;
          case "E":
            dtr.moveRight();
            break;
          case "SE":
            dtr.moveDown();
            dtr.moveRight();
            break;
          case "S":
            dtr.moveDown();
            break;
          case "SW":
            dtr.moveDown();
            dtr.moveLeft();
            break;
          case "W":
            dtr.moveLeft();
            break;
          case "H":
            dtr.goHome();
            break;
        }
      }
      if (e.target.classList.contains("zl")) {
        if (e.target.classList.contains("pluszoom")) {
          // console.log("zoom in");
          dtr.zoomOut();
        }
        if (e.target.classList.contains("minuszoom")) {
          // console.log("zoom out");
          dtr.zoomIn();
        }
      }
      // console.log(e,"currentTargt: ",t);
    },
    runSelected: function (tool) {
      switch (tool) {
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
    checkLimits: function (d) {
      let rect = d.getBoundingClientRect();
      toolHt = rect.bottom - rect.top;
      toolWdth = rect.right - rect.left;
      settings = { top: 0, left: 0, width: 0, height: 0 };
      let illyWin = document.body.getBoundingClientRect();
      if (toolHt > 0.9 * (illyWin.bottom - illyWin.top)) {
        settings.height = 0.9 * (illyWin.bottom - illyWin.top);
        settings.top = illyWin.top + 0.1 * (illyWin.bottom - illyWin.top);
      } else {
        settings.top = (illyWin.bottom - illyWin.top - toolHt) / 2;
        settings.height = toolHt;
      }
      if (toolWdth > 0.9 * (illyWin.right - illyWin.left)) {
        settings.width = 0.9 * (illyWin.right - illyWin.left);
        settings.left = illyWin.left + 0.1 * (illyWin.right - illyWin.left);
      } else {
        settings.left = (illyWin.right - illyWin.left - toolWdth) / 2;
        settings.width = toolWdth;
      }
      return settings;
    },
    showToolDiv: function (id) {
      // Get the div
      let d = document.querySelector(id);
      d.classList.remove("nosee");
      d.classList.add("see");
      // Get any settings for this tool
      let k = id + ":settings";
      let settings = JSON.parse(locStorage.getItem(k));
      if (settings !== null) {
        // Apply any settings
        d.style.width = settings.width + "px";
        d.style.height = settings.height + "px";
        d.style.top = settings.top + "px";
        d.style.left = settings.left + "px";
      } else {
        settings = dtr.checkLimits(d);
        d.style.width = settings.width + "px";
        d.style.height = settings.height + "px";
        d.style.top = settings.top + "px";
        d.style.left = settings.left + "px";
        locStorage.setItem(k, JSON.stringify(settings));
      }
      // Make the div draggable & resizeable
      if (!d.classList.contains("ui-draggable")) {
        $(d).draggable();
      }
      if (!d.classList.contains("ui-resizable")) {
        $(d).resizable();
      }
      //		el.currentTarget.parentNode.appendChild(el.currentTarget);
      //let aa = d.querySelector("div");
      //aa.click();
      d.querySelector("div").click();
      // Set as the front tool div
      //		$( ".tooldiv" ).removeClass( "selected" );
      //		$(d).addClass("selected");
    },
    closeTool: function (e) {
      document.querySelector(e.target.dataset.tool).classList.add("nosee");
      document.querySelector(e.target.dataset.tool).classList.remove("see");
      var rubbish = "";
    },
    toolMove: function (event, ui) {
      // console.log("toolMove event:",event);
      // console.log("toolMove ui:",ui);
      let toolId = "#" + event.target.id;
      let toolSettings = JSON.parse(locStorage.getItem(toolId + ":settings"));
      toolSettings.top = ui.position.top;
      toolSettings.left = ui.position.left;
      locStorage.setItem(toolId + ":settings", JSON.stringify(toolSettings));
    },
    toolResize: function (event, ui) {
      // console.log("toolResize event:",event);
      // console.log("toolResize ui:",ui);
      let toolId = "#" + event.target.id;
      let toolSettings = JSON.parse(locStorage.getItem(toolId + ":settings"));
      toolSettings.top = ui.position.top;
      toolSettings.left = ui.position.left;
      toolSettings.width = ui.size.width;
      toolSettings.height = ui.size.height;
      locStorage.setItem(toolId + ":settings", JSON.stringify(toolSettings));
    },
    toolToFront: function (el) {
      el.currentTarget.parentNode.appendChild(el.currentTarget);
    },
    moveTo: function (c) {
      let s = c.split("|").join("/");
      window.location = "https://enhanced.illyriad.co.uk/#/World/Map/" + s;
    },
    zoomOut: function () {
      let t = document.querySelector("#zoomOut");
      t.click();
    },
    zoomIn: function () {
      let t = document.querySelector("#zoomIn");
      t.click();
    },
    moveRight: function () {
      // console.log("moveRight called");
      let c = map._mapData._currentLocation;
      c.x += c.z * 2;
      let s = c.x + "/" + c.y;
      window.location = "https://enhanced.illyriad.co.uk/#/World/Map/" + s;
    },
    moveLeft: function () {
      // console.log("moveLeft called");
      let c = map._mapData._currentLocation;
      c.x -= c.z * 2;
      let s = c.x + "/" + c.y;
      window.location = "https://enhanced.illyriad.co.uk/#/World/Map/" + s;
    },
    moveUp: function () {
      // console.log("moveUp called");
      let c = map._mapData._currentLocation;
      c.y += c.z * 1.5;
      let s = c.x + "/" + c.y;
      window.location = "https://enhanced.illyriad.co.uk/#/World/Map/" + s;
    },
    moveDown: function () {
      // console.log("moveDown called");
      let c = map._mapData._currentLocation;
      c.y -= c.z * 1.5;
      let s = c.x + "/" + c.y;
      window.location = "https://enhanced.illyriad.co.uk/#/World/Map/" + s;
    },
    kbdMonitor: function () {
      document.addEventListener(
        "keyup",
        (event) => {
          const keyName = event.key;
          // console.log(keyName);
          if (keyName === "PageUp") {
            dtr.zoomOut();
          }
          if (keyName === "PageDown") {
            dtr.zoomIn();
          }
        },
        false
      );
    },
    kbdMonitorOn: function () {
      document.addEventListener("keyup", dtr.handleKeyUp, false);
    },
    kbdMonitorOff: function () {
      document.removeEventListener("keyup", dtr.handleKeyUp, false);
    },
    handleKeyUp: function (event) {
      const keyName = event.key;
      // console.log(keyName);
      if (keyName === "PageUp") {
        dtr.zoomOut();
      }
      if (keyName === "PageDown") {
        dtr.zoomIn();
      }
      if (keyName === "ArrowRight") {
        dtr.moveRight();
      }
      if (keyName === "ArrowLeft") {
        dtr.moveLeft();
      }
      if (keyName === "ArrowUp") {
        dtr.moveUp();
      }
      if (keyName === "ArrowDown") {
        dtr.moveDown();
      }
    },
    toggleControls: function () {
      document.querySelector("#dtrControls").classList.toggle("dtrbackground");
      document.querySelector(".moveto").classList.toggle("nosee");
      document.querySelector(".compass_rose").classList.toggle("nosee");
      document.querySelector(".zooms").classList.toggle("nosee");
    },
    getCurrentTown: function () {
      let t = dtr[playerId].towns;
      let ct = null;
      // Get the coords of the town in 'home'
      let coords = dtr
        .replaceAll(
          document
            .querySelector(".towndata > div.townlocation")
            .textContent.split(" in")[0],
          " ",
          ""
        )
        .split("|");
      // Step through the towns looking for one with matching coords
      for (let i = 0; i < t.numTowns; i++) {
        thisId = t.list[i];
        if (t[thisId].x === coords[0] && t[thisId].y === coords[1]) {
          ct = thisId;
        }
      }
      // console.log(t[ct]);
      return thisId;
    },
  };
  dtr.getCamps = function () {
    var camps = [];
    var ca = mapData.c;
    //console.log(ca)
    var thisCamp = {};
    for (var a in ca) {
      //  console.log(a);
      if (ca.hasOwnProperty(a)) {
        // console.log(`ca.${a} =`, ca[a]);
        thisCamp = ca[a];
        thisCamp.x = a.split("|")[1];
        thisCamp.y = a.split("|")[0];
        //var w = camps.concat(ca[a]);
        var w = camps.concat(thisCamp);
        camps = w;
      }
    }
    // console.log("Camps",camps);
    let tBody = document.querySelector("#campstool tbody");
    dtr.removeRows(tBody.parentNode);
    let town = dt[PlayerId].towns[CurrentTown];
    var showPlayer = document.getElementsByName("player")[0].checked;
    var showFaction = document.getElementsByName("faction")[0].checked;
    var showNPC = document.getElementsByName("npc")[0].checked;

    for (let i = 0; i < camps.length; i++) {
      var thisC = camps[i];
      showRow = true;
      // This is where we work out if it is a player, npc or faction camp and if we want to show it
      var cType = dtr.campType(thisC.d);
      switch (cType) {
        case "NPC":
          if (!showNPC) {
            showRow = false;
          }
          //cell.textContent = thisC.d;
          break;
        case "Faction":
          if (!showFaction) {
            showRow = false;
          }
          //cell.textContent = thisC.d;
          break;
        case "Player":
          if (!showPlayer) {
            showRow = false;
          }
          //cell.textContent = thisC.d;
          break;
        //default:
        //    cell.textContent = "Player id "+ Math.abs(thisC.p);
        //break;
      }
      // This checks to see if this size of camp is wanted
      if (!dtr.selectedSizes.includes(thisC.n)) {
        showRow = false;
      }
      if (showRow) {
        var tr = tBody.insertRow(-1);
        // Coords
        var cell = tr.insertCell(0);
        cell.appendChild(dtr.makeLoc(thisC.x + "|" + thisC.y));
        // Who owns the camp
        cell = tr.insertCell(1);
        cell.textContent = thisC.d;
        // The size of the camp if known
        cell = tr.insertCell(2);
        cell.textContent =
          dtr.groupSizes[thisC.n][0] +
          "(" +
          dtr.groupSizes[thisC.n][1] +
          " - " +
          dtr.groupSizes[thisC.n][2] +
          ")";
        // Dist to current town
        cell = tr.insertCell(3);
        dist = dtr.hypot([thisC.x, thisC.y], [town.x, town.y]);
        cell.textContent = dist.toFixed(2);
      }
    }
    TableSort.init("dtrcampstable");
  };
  dtr.showGetCamps = function () {
    if (dt.mapTools.checkHash()) {
      dt.showTool("#campstool");
    }

    //dt.showTool("#campstool");
  };
  dtr.clearCamps = function () {
    dt.removeRows(document.querySelector("#dtrcampstable"));
  };
  dtr.showMU = function () {
    if (dt.mapTools.checkHash()) {
      dt.showTool("#mutool");
    }
  };
  dtr.campType = function (d) {
    // Remove the 'Occupying Force' part if present
    var t = d.split(" Occupying Force")[0];
    // Check if it is an NPC camp
    if (dtr.npcNames.includes(t)) {
      return "NPC";
    }
    // Check if it is a Faction camp
    if (dtr.factionNames.includes(t)) {
      return "Faction";
    }
    // Check if it is a Player camp
    if (["Neutral", "Your", "Hostile"].includes(t)) {
      return "Player";
    }
    return "Unknown";
  };
  dtr.getSelectedSizes = function () {
    dtr.selectedSizes = [
      ...document.querySelectorAll("#campSizesSelect .dtcheck:checked"),
    ].map((e) => e.name);
    let t = document.getElementById("campSizesSelect");
    t.classList.add("nosee");
    t.classList.remove("see");
    $("#campSizesSelect").dialog("close");
  };
  dtr.makeLoc = function (coords) {
    let newEl = document.createElement("a");
    newEl.setAttribute("class", "a--location");
    var cArray = coords.split("|");
    var href = "#/World/Map/" + cArray[0] + "/" + cArray[1];
    //newEl.setAttribute("href","#");
    newEl.setAttribute("href", href);
    newEl.setAttribute("data-x", coords.split("|")[0]);
    newEl.setAttribute("data-y", coords.split("|")[1]);
    newEl.textContent = coords;
    return newEl;
  };
};
dtrmutools = function () {
  dtrmu = {};
  dtrmu.getMU = function () {
    var tBody = document.querySelector("#dtrmutable tbody");
    var mu = mapData.mu;
    for (const [key, value] of Object.entries(mu)) {
      //console.log(key+": "+ JSON.stringify(value));
      // Use the 'i' property to figure out what this is
      var i = value.i;
      switch (i) {
        case "sword":
          unitType = "muplayer";
          // console.log("player military units");
          orgName = "Player Military Unit(s)";
          // orgStatus is the status of the originator. Possible values are: Neutral, NAP, Confed, War
          orgStatus = "";
          break;
        case "diplo":
          unitType = "muplayer";
          // console.log("player diplo units");
          orgName = "Player Diplo Unit(s)";
          break;
        case "underworld3":
          unitType = "mufaction";
          // console.log("Underworld units");
          orgName = "Underworlders";
          orgFlag = "https://illystuff.uk/FactionRanges/images/sigils/105.png";
          break;
        default:
          if (i.includes("sigil")) {
            unitType = "mufaction";
            // console.log("Faction units");
            orgName = value.d;
            orgFlag =
              "https://illystuff.uk/FactionRanges/images/sigils/" + i + ".png";
          }
          if (dtrmu.hasNumbers(i)) {
            unitType = "munpc";
            // console.log("NPC units");
            orgName = value.d;
            orgFlag = null;
          }
        // console.log(i);
      }
      dtrmu.showTypes = [
        ...document.querySelectorAll("#typeFilter .dtcheck:checked"),
      ].map((e) => e.name);
      if (dtrmu.showTypes.includes(unitType)) {
        var dirData = dtrmu.getDirection(
          value.cx,
          value.cy,
          value.dx,
          value.dy
        );
        // console.log("Heading of units: ",dirData);

        var tr = tBody.insertRow(-1);
        // Coords
        var cell = tr.insertCell(0);
        cell.appendChild(
          dtr.makeLoc(value.cx.toFixed(0) + "|" + value.cy.toFixed(0))
        );
        // Who is moving
        cell = tr.insertCell(1);
        cell.textContent = orgName;
        // What direction
        cell = tr.insertCell(2);
        cell.textContent =
          "Heading " + dirData[0] + " on a rough bearing of " + dirData[1];
      }
    }
  };
  dtrmu.getDirection = function (cx, cy, dx, dy) {
    var xDelta = cx - dx;
    var yDelta = cy - dy;
    //var brg = ((Math.atan(yDelta/xDelta))*(180/Math.PI));
    //        var brg = dtrmu.getAngleDegrees(0,0,dx,dy);
    var brg = dtrmu.getAngleDegrees(cx, cy, dx, dy);

    //if(brg < 22.5) brg = brg +360;
    if (dtrmu.inRange(brg, 22.5, 67.5)) {
      return ["NE", brg.toFixed(2) + " deg"];
    }
    if (dtrmu.inRange(brg, 67.5, 112.5)) {
      return ["E", brg.toFixed(2) + " deg"];
    }
    if (dtrmu.inRange(brg, 112.5, 157.5)) {
      return ["SE", brg.toFixed(2) + " deg"];
    }
    if (dtrmu.inRange(brg, 157.5, 202.5)) {
      return ["S", brg.toFixed(2) + " deg"];
    }
    if (dtrmu.inRange(brg, 202.5, 247.5)) {
      return ["SW", brg.toFixed(2) + " deg"];
    }
    if (dtrmu.inRange(brg, 247.5, 292.5)) {
      return ["W", brg.toFixed(2) + " deg"];
    }
    if (dtrmu.inRange(brg, 292.5, 337.5)) {
      return ["NW", brg.toFixed(2) + " deg"];
    }
    if (brg < 23 || brg > 337.5) {
      return ["N", brg.toFixed(2) + " deg"];
    }
    // if(dtrmu.inRange(brg,337.5,382.5)){
    //     if(brg > 360){
    //         brg=brg-360;
    //     }
    //     return ["N",brg.toFixed(2)+" deg"];
    // }
  };

  dtrmu.hasNumbers = function (t) {
    var regex = /\d/g;
    return regex.test(t);
  };
  dtrmu.inRange = function (num, a, b) {
    low = Math.min(a, b);
    high = Math.max(a, b);
    if (num > low && num <= high) {
      return true;
    }
    return false;
  };
  dtrmu.clearMU = function () {
    var tbl = document.querySelector("#dtrmutable");
    dtr.removeRows(tbl);
  };
  dtrmu.getAngle = function (cx, cy, dx, dy) {
    var xDelta1 = cx - dx;
    var yDelta1 = cy - dy;
    var xDelta2 = dx - cx;
    var yDelta2 = dy - cy;

    //var deg1 = ((Math.atan(xDelta/yDelta))*(180/Math.PI));
    var deg1 = (Math.atan2(yDelta1, xDelta1) * 180) / Math.PI;
    var deg2 = (Math.atan2(yDelta2, xDelta2) * 180) / Math.PI;
    var deg3 = toDegrees(Math.atan2(yDelta1, xDelta1));
    var deg4 = toDegrees(Math.atan2(yDelta2, xDelta2));
    //var rads3 = Math.atan2(yDelta1, xDelta1);
    var rads = Math.atan2(yDelta2, xDelta2);
    if (deg3 < 0) {
      deg3 = deg3 + 360;
    }
    if (deg4 < 0) {
      deg4 = deg4 + 360;
    }
    //        // console.log(dx,dy,deg1,deg2,deg3,deg4);
    //        // console.log(xDelta1,yDelta1,"deg3: ",deg3,dtrmu.toCompass(deg3));
    //        // console.log(xDelta2,yDelta2,"deg4: ",deg4,dtrmu.toCompass(deg4));
    //        // console.log(xDelta2,yDelta2,"rads: ",rads,dtrmu.radsToCompass(rads));
    // console.log(xDelta2,yDelta2,"rads: ",rads,dtrmu.radsToCompass2(rads));
  };
  dtrmu.getAngleDegrees = function (cx, cy, dx, dy, force360 = true) {
    let deltaX = cx - dx;
    //let deltaY = cy-dy; // reverse
    let deltaY = -1 * (cy - dy);
    let radians = Math.atan2(deltaY, deltaX);
    let degrees = (radians * 180) / Math.PI - 90; // rotate
    if (force360) {
      while (degrees >= 360) degrees -= 360;
      while (degrees < 0) degrees += 360;
    }
    // console.log('angle to degree:',{deltaX,deltaY,radians,degrees})
    return degrees;
  };
};
function toRadians(angle) {
  return angle * (Math.PI / 180);
}
function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
dt.mo = {
  //   data: {
  //     notes: { v: false, c: "#ff0000" },
  //     tenSq: { v: false, c: "#808080" },
  //     fiveSq: { v: false, c: "#c0c0c0" },
  //     spawnLocs: { v: false, c: "#ff0000" },
  //   },
  initialize: function () {
    this.loadData();
    setTimeout(this.listeners, "1000");
    //this.listeners();
  },
  show: function () {
    dt.showTool("#mapOverlaySettings");
  },
  listeners: function () {
    var inputs = document.querySelectorAll(".overlays input");
    inputs.forEach(function (inp, ind, obj) {
      if (inp.type === "color") {
        inp.value = dt[PlayerId].mo.data[inp.dataset.property].c;
        inp.addEventListener("change", (ev) => {
          var tgt = ev.target;
          var s = tgt.dataset.property;
          // Set the appropriate property in dt[PlayerId].mo.data
          dt[PlayerId].mo.data[s].c = tgt.value;
          // Store the updated dt[PlayerId].mo.data
          dt.mo.storeData(dt[PlayerId].mo.data);
          //locStorage.setItem([PlayerId] + ":mo", JSON.stringify(dt[PlayerId].mo.data));
        });
      }
      if (inp.type === "radio") {
        // Set checked if appropriate
        const p = dt[PlayerId].mo.data[inp.dataset.sect];
        if (p.v === inp.dataset.state) {
          inp.checked = true;
        }
        inp.addEventListener("click", (ev) => {
          var tgt = ev.target;
          var s = tgt.dataset.sect;
          var state = tgt.dataset.state;
          // Set the appropriate property in dt[PlayerId].mo.data
          dt[PlayerId].mo.data[s].v = state;
          // Store the updated dt[PlayerId].mo.data
          dt.mo.storeData(dt[PlayerId].mo.data);
          // Enable/disable the overlay as appropriate.
          dt.mo.checkState(s, state);
        });
      }
    });
  },
  checkState: function (sect, state) {
    // Get the relevant canvas
    // notes - noteDisplay
    // fiveSq - fiveSq
    // tenSq - tenSq
    // spawnLocs - spawnTiles
    switch (sect) {
      case "notes":
        c = document.getElementById("noteDisplay");
        break;
      case "fiveSq":
        c = document.getElementById("fiveSq");
        break;
      case "tenSq":
        c = document.getElementById("tenSq");
        break;
      case "spawnLocs":
        c = document.getElementById("spawnTiles");
        break;
      default:
        console.log(`Sorry, no canvas found for ${sect}.`);
    }
    // Now deal with the state
    if (state === "on") {
      c.classList.replace("nosee", "see");
    }
    if (state === "off") {
      c.classList.replace("see", "nosee");
    }
  },
  loadData: function () {
    dt[PlayerId].mo = { data: {} };
    dt[PlayerId].mo.data = JSON.parse(locStorage.getItem([PlayerId] + ":mo"));
    if (dt[PlayerId].mo.data === null) {
      // Check if there are any values stored for the old system
      dt[PlayerId].mo.data = dt.mo.convert();
      if (dt[PlayerId].mo.data === null) {
        dt[PlayerId].mo.data = {
          notes: { v: "off", c: "#ff0000" },
          tenSq: { v: "off", c: "#808080" },
          fiveSq: { v: "off", c: "#c0c0c0" },
          spawnLocs: { v: "off", c: "#00ff00" },
        };
      }
    }
  },
  convert: function () {
    const tmp = JSON.parse(locStorage.getItem(PlayerId + ":mapDisplay"));
    if (tmp === null) {
      return null;
    }
    let colours = {
      Silver: "#c0c0c0",
      Gray: "#808080",
      Black: "#000000",
      Red: "#ff0000",
      Maroon: "#800000",
      Yellow: "#ffff00",
      Olive: "#808000",
      Lime: "#00ff00",
      Green: "#008800",
      Aqua: "#00ffff",
      Teal: "#008080",
      Blue: "#0000ff",
      Navy: "#000080",
      Fuschia: "#ff00ff",
    };
    tmp2 = {
      notes: { v: "off", c: "#ff0000" },
      tenSq: { v: "off", c: "#808080" },
      fiveSq: { v: "off", c: "#c0c0c0" },
      spawnLocs: { v: "off", c: "#00ff00" },
    };
    tmp2.notes.v = tmp.noteDisplay.onoff;
    tmp2.notes.c = colours[tmp.noteDisplay.colour];
    tmp2.tenSq.v = tmp.tenSq.onoff;
    tmp2.tenSq.c = colours[tmp.tenSq.colour];
    tmp2.fiveSq.v = tmp.fiveSq.onoff;
    tmp2.fiveSq.c = colours[tmp.fiveSq.colour];
    tmp2.spawnLocs.v = tmp.spawnLocs.onoff;
    tmp2.spawnLocs.c = colours[tmp.spawnLocs.colour];
    this.storeData(tmp2);
    return tmp2;
  },
  storeData: function (data) {
    locStorage.setItem([PlayerId] + ":mo", JSON.stringify(data));
  },
  intercept: function () {
    $(document).ajaxSuccess(function (event, xhr, settings) {
      var url = settings.url.split("?")[0];
      var bits = url.split("/");

      var paramArray = settings.url.split("?");
      if (paramArray.length > 1) {
        var paramstring = settings.url.split("?")[1];
        var params = paramstring.split("&");
      }
      if (
        bits[2] === "MapData" ||
        bits[2] === "MapRefresh" ||
        bits[2] === "MapCanvas"
      ) {
        dt.notes(dt.countVisible2); // Show count of visible notes. Need to add function to draw them.
        dt.mo.canvasChecks();
        dt.mo.townRadii();
        dt.mo.spawnLocs();
      }
    });
  },
  countVisible: function countVisible() {
    if (!dt.db) {
      dt.notes();
    }
    //        console.log("dt.countVisible2");
    //    console.trace();
    // Calculate the current map extents.
    var xCoords = [
      "" + (mapData.x + mapData.zoom),
      "" + (mapData.x - mapData.zoom),
    ].sort();
    var yCoords = [
      "" + (mapData.y + mapData.zoom),
      "" + (mapData.y - mapData.zoom),
    ].sort();
    // Get notes in the x range
    dt.xMatches = [];
    //    console.log("dt.xMatches cleared ",dt.xMatches);
    var transaction = dt.db.transaction(["notes"], "readonly");
    var store = transaction.objectStore("notes");
    var index = store.index("x");
    var rangeValue = IDBKeyRange.bound(xCoords[0], xCoords[1]);

    index.openCursor(rangeValue).onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        //      console.log(cursor);
        dt.xMatches.push(cursor.primaryKey);
        //            console.log("dt.xMatches ",dt.xMatches);
        //      console.log(cursor.value['x']);
        //      console.log(cursor.value);
        cursor.continue();
      } else {
        // Get notes in the y range
        dt.yMatches = [];
        var transaction = dt.db.transaction(["notes"], "readonly");
        var store = transaction.objectStore("notes");
        var index = store.index("y");
        var rangeValue = IDBKeyRange.bound(yCoords[0], yCoords[1]);

        index.openCursor(rangeValue).onsuccess = function (e) {
          var cursor = e.target.result;
          if (cursor) {
            //      console.log(cursor);
            dt.yMatches.push(cursor.primaryKey);
            //      console.log(cursor.value['x']);
            //      console.log(cursor.value);
            cursor.continue();
          } else {
            var combined = 0;
            for (x = 0; x < dt.xMatches.length; x++) {
              for (y = 0; y < dt.yMatches.length; y++) {
                if (dt.yMatches[y] === dt.xMatches[x]) {
                  combined = combined + 1;
                }
              }
            }
            // If the 'Visible Notes' element isn't present add it
            if (!document.getElementById("visibleNotes")) {
              var parent = document.querySelector(".subLinks");
              dt.addElement2(
                parent,
                "input",
                ["id", "value", "class", "type", "onclick", "style"],
                [
                  "visibleNotes",
                  "Visible Notes",
                  "see",
                  "button",
                  "dt.notes(dt.showVisible)",
                  "float: right;",
                ]
              );
            }
            var visNotes = document.getElementById("visibleNotes");
            visNotes.value = "Visible Notes: " + combined;
            if (dt[PlayerId].mo.notes.v == "on") {
              dt.canvasNotes();
              //dt.mapTools.getVisTowns();
            }
          }
        };
      }
    };
  },
  townRadii: function () {
    const tList = Object.keys(mapData.t);
    var sFactor = 500 / (mapData.zoom * 2 + 1);
    var cx = mapData.x;
    var cy = mapData.y;
    const tenSqCtx = document.querySelector("#tenSq").getContext("2d");
    const fiveSqCtx = document.querySelector("#fiveSq").getContext("2d");
    tenSqCtx.clearRect(0, 0, 500, 500);
    fiveSqCtx.clearRect(0, 0, 500, 500);
    tList.forEach((t) => {
      thisTown = t.split("|");
      x = thisTown[1];
      y = thisTown[0];
      xCol = mapData.zoom + (x - cx);
      yCol = mapData.zoom - (y - cy);
      // tenSq radius
      console.log("tenSq", x, xCol, y, yCol);
      this.drawCircle(
        tenSqCtx,
        xCol,
        yCol,
        sFactor,
        10,
        dt[PlayerId].mo.data.tenSq.c
      );
      // fiveSq radius
      console.log("fiveSq", x, xCol, y, yCol);
      this.drawCircle(
        fiveSqCtx,
        xCol,
        yCol,
        sFactor,
        5,
        dt[PlayerId].mo.data.fiveSq.c
      );
    });
  },
  spawnLocs: function () {
    const md = Object.keys(mapData.data);
    const sFactor = 500 / (mapData.zoom * 2 + 1);
    const cx = mapData.x;
    const cy = mapData.y;
    const spawnTilesCtx = document
      .querySelector("#spawnTiles")
      .getContext("2d");
    spawnTilesCtx.clearRect(0, 0, 500, 500);
    Object.entries(mapData.data).forEach(([k, v]) => {
      if (v.hasOwnProperty("npc")) {
        const coords = k.split("|");
        x = coords[1];
        y = coords[0];
        xCol = mapData.zoom + (x - cx);
        yCol = mapData.zoom - (y - cy);
        this.drawCircle(
          spawnTilesCtx,
          xCol,
          yCol,
          sFactor,
          0.5,
          dt[PlayerId].mo.data.spawnLocs.c
        );
      }
    });
  },
  drawNotes: function (combined) {
    //    console.log(combined);
    const canvas = document.getElementById("noteDisplay");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    const zoom = mapData.zoom;
    const cx = mapData.x;
    const cy = mapData.y;
    const sFactor = 500 / (zoom * 2 + 1);
    tx = cx - zoom;
    ty = cy - zoom;

    dt.visNotesX.forEach((n) => {
      x.n.x;
      y = n.y;
      xCol = zoom + (x - cx);
      yCol = zoom - (y - cy);
      this.drawSym3(ctx, xCol, yCol, sFactor);
    });
  },
  drawSym3: function (ctx, x, y, sFactor) {
    ctx.beginPath();
    //    ctx.strokeStyle = 'red';
    ctx.strokeStyle = dt[PlayerId].mo.data.notes.c;
    //    ctx.fillStyle = 'rgba(255, 51, 0, 1)';
    ctx.fillStyle = dt[PlayerId].mo.data.notes.c;
    ctx.save();
    ctx.translate(x * sFactor + 1, y * sFactor + 1);
    ctx.fillRect(0, 0, sFactor, sFactor);
    var lWidth = sFactor * 0.8;
    ctx.clearRect(lWidth, lWidth, sFactor - 2 * lWidth, sFactor - 2 * lWidth);
    ctx.restore();
    ctx.stroke();
    var rubbish = "";
  },
  drawCircle: function (ctx, x, y, sFactor, rad, col) {
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.fillStyle = col; //'rgba(255, 51, 0, 1)';
    ctx.lineWidth = sFactor * 0.1;
    ctx.save();
    ctx.translate((x + 0.5) * sFactor + 1, (y + 0.5) * sFactor + 1);
    ctx.arc(0, 0, rad * sFactor, 0, 2 * Math.PI);
    ctx.restore();
    ctx.stroke();
    var rubbish = "";
  },
  canvasChecks: function () {
    const dtCanvases = {
      notes: { id: "noteDisplay", class: dt[PlayerId].mo.data.notes.v },
      tenSq: { id: "tenSq", class: dt[PlayerId].mo.data.tenSq.v },
      fiveSq: { id: "fiveSq", class: dt[PlayerId].mo.data.fiveSq.v },
      spawnLocs: { id: "spawnTiles", class: dt[PlayerId].mo.data.spawnLocs.v },
    };
    var canvases = Object.keys(dtCanvases);
    var p = document.querySelector("#mapDiv");
    var b = document.getElementById("mapGrid");

    //canvases.forEach((c) => {
    Object.entries(dtCanvases).forEach(([k, v]) => {
      //console.log(`${key} ${value}`);
      //});
      //canvases.forEach((c) => {
      if (document.getElementById(v.id) === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", v.id);
        canvas.setAttribute("width", "500");
        canvas.setAttribute("height", "500");
        canvas.setAttribute("style", "position:absolute;top:11px;left:15px;");
        canvas.setAttribute("unselectable", "on");
        if (v.class == "on") {
          v.class = "see";
        } else {
          v.class = "nosee";
        }
        canvas.setAttribute("class", v.class);
        //            p.appendChild(canvas);
        p.insertBefore(canvas, b);
        dt.ctx = canvas.getContext("2d");
        dt.ctx.clearRect(0, 0, 500, 500);
      }
    });
  },
};
dt.canvas = {
  create: function (p, id, w, h) {
    newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", id);
    newCanvas.setAttribute("width", w);
    newCanvas.setAttribute("height", h);
    p.appendChild(newCanvas);
    return canvas;
  },
};
