/* File: intercept9.js
 * Function to intercept network traffic from the game server. Used to update the data used by the tools.
 */
dtintercept = function () {
  dt.nLog = [];

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
      case "Alliance":
        if (bits[2] == "Faction") {
          if (bits.length == 4) {
            dt.getFactionStandings(event, xhr, settings, bits);
          } else {
            dt.tablesearch.init(
              document.querySelectorAll(".info  table table")
            );
          }
        }
        break;
      case "Chat":
        console.log("bits[1] == Chat");

        break;
      case "Home":
        switch (bits[2]) {
          case "UpdateResources":
            dt.invent.resUpdateImproved(xhr, event);
            var rubbish = "";
            break;
          case "Location":
            if (PlayerId === 279547) {
              dt.military.milOrdersPage();
            }
            break;
        }
      case "Town":
        switch (bits[2]) {
          case "Production":
            if (bits.length === 3) {
              dt.production.parseTownProd2(xhr, event, bits);
              //                        dt.scanTownProd(xhr, event,bits);
            }
            break;
          case "BuildingProduction":
            dt.production.parseBldgProd2(xhr, event, bits);
            const haveEnoughBldg = setTimeout(dt.production.haveEnough, 500);
            dt.resUse.addMonitors();
            var rubbish = "";
            break;
          case "Building":
            // Buildings in this town with known production queues
            let pb = dt[PlayerId].towns[dt.currentTown].prod;
            console.log(pb);
            //                    console.log(bits);
            let thisBid =
              dt.bNames[
                dt[PlayerId].towns[CurrentTown].plots.internal[bits[4]][0]
              ];
            console.log(thisBid);
            //                    console.log(dt[PlayerId].towns[CurrentTown].plots.internal[bits[4]]);
            // Loop through the pb looking for entries with a matching bid
            let f = false;
            for (let i = 0; i < pb.length; i++) {
              if (Number(pb[i].bId) === thisBid) {
                f = true;
              }
            }
            if (f) {
              console.log("Production present!");
              let p = document.querySelector("#UpgradePanel>div>div");
              let n = dt.addElement2(p, "span", ["class"], ["warn"]);
              n.textContent = "PRODUCTION PRESENT!";
            }
            var rubbish = "";

            // dt[PlayerId].towns[twns[t]].prod
            break;
          case "Map":
            dt.buildings.bldgScan();
            break;
          case "Sovereignty":
          case "ClaimSovereignty":
          case "BuildSovereignStructure":
            dt.sov.getTownSovHeld(xhr, event);
            break;
          case "Inventory":
            dt.invent.getMaxStorage(xhr, event);
            var rubbish = "";
            break;
          case "InventoryItems":
            dt.invent.subInvUpdate(xhr, event);
            var rubbish = "";
            break;
          case "UnitProduction":
            //                    console.log(bits);
            dt.production.parseUnitProd2(xhr, event, bits);
            const haveEnoughUnits = setTimeout(dt.production.haveEnough, 500);
            dt.resUse.addMonitors();
            switch (bits[3]) {
              case "8":
                //                            console.log("Military unit production page");
                //                            dt.military.getMilProdSchedule(xhr, event);

                break;
              case "9":
                //                            console.log("Trade unit production page");
                //                            dt.trade.getTradeProdSchedule(xhr, event);
                break;
              case "12":
                //                            console.log("Diplo unit production page");
                //                            dt.diplomatic.getDiploProdSchedule(xhr, event);
                break;
              default:
                break;
            }
            break;
        }

        break;

      case "Diplomatic":
        if (bits.length === 2) {
          // Military overview page
          dt.scanDiploOverview(xhr);
        }
        switch (bits[2]) {
          case "Orders":
            dt.diplomatic.orders(bits[3], bits[4]);
        }
        break;
      case "Trade":
        switch (bits[2]) {
          case "Movements":
            dt.currentHash = window.location.hash;
            //							dt.scanTradeMov();
            break;
          case "HubInventory":
            dt.currentHash = window.location.hash;
            //                    var timeoutID = window.setTimeout(dt.getHubList, 1000);
            dt.invent.getHubList(xhr, event);
            dt.invent.hubUpdate(xhr, event);
            break;
          case "Orders":
          case "HubOrders":
            dt.trade.tradeOrders();
            dt.trade.storeSetup();
            //                    dt.trade.setTitles();
            var timeoutID = window.setTimeout(dt.trade.setTitles, 2000);
            break;
          case "MarketData":
            dt.ui.market(event, xhr, settings);
            break;
          case undefined:
            dt.currentHash = window.location.hash;
            dt.trade.scanTradeOverview();
            break;
          default:
        }

        break;
      case "Research":
        dt.research.checkResearch();
        var rubbish = "";
        break;
      case "Magic":
        switch (bits[2]) {
          case "Cast":
            setTimeout(dt.magic.cancast(), 500);
            break;
        }
        break;
      case "Player":
        break;
      case "Alliance":
        break;
      case "Prestige":
        break;
      case "Communication":
        switch (bits[2]) {
          case "Mail":
            dt.mailsearch(dt.scanMail);
            break;
          case "ReadMail":
            // if (PlayerId == 418074 || PlayerId == 381057) {
            //   //                    if (PlayerId == 279547 || PlayerId == 356923) {
            //   //                        var resp = dt.reports.getPermission(event,xhr,settings);

            //   dt.reports.getType(event, xhr, settings);
            // }
            break;
          case "Chat":
            // destroy the tools affected by this page
            //$("#chatTheme").dialog("destroy");
            //$("#mapOverlaySettings").dialog("destroy");
            //The above didn't work
            break;
        }
        break;
      case "World":
        switch (bits[2]) {
          case "HeraldCombats":
            dt.misc.newPlayers(event, xhr);
            break;
          case "Strategic":
            //dt.ui.strategicMap();
            dt.ui.buildStratMapHTML();
            break;
          case "MapData":
            //                console.log("MapData intercept");
            //                mapUpdate(event, xhr, settings);
            if (dt[PlayerId].mo.hasOwnProperty("data")) {
              dt.mo.canvasChecks();
              dt.mo.townRadii();
              dt.mo.spawnLocs();
              dt.notes(dt.countVisible2); // Show count of visible notes
            } else {
              dt.notes(dt.countVisible2); // Show count of visible notes
              dt.misc.addCanvas();
              //                dt.canvasNotes();
              dt.mapTools.getVisTowns();
              dt.mapTools.getSpawnLocs();
            }
            break;
          case "MapRefresh":
            //                console.log("MapRefresh intercept");
            if (dt[PlayerId].mo.hasOwnProperty("data")) {
              dt.mo.canvasChecks();
              dt.mo.townRadii();
              dt.mo.spawnLocs();
              dt.notes(dt.countVisible2); // Show count of visible notes
            } else {
              dt.notes(dt.countVisible2); // Show count of visible notes
              dt.misc.addCanvas();
              //                dt.canvasNotes();
              dt.mapTools.getVisTowns();
              dt.mapTools.getSpawnLocs();
            }
            break;
          case "MapCanvas":
            //                console.log("MapCanvas intercept");
            if (dt[PlayerId].mo.hasOwnProperty("data")) {
              dt.mo.canvasChecks();
              dt.mo.townRadii();
              dt.mo.spawnLocs();
              dt.notes(dt.countVisible2); // Show count of visible notes
            } else {
              dt.notes(dt.countVisible2); // Show count of visible notes
              dt.misc.addCanvas();
              //                dt.canvasNotes();
              dt.mapTools.getVisTowns();
              dt.mapTools.getSpawnLocs();
            }
            break;
          case "TournamentSquares":
            dt.misc.getTourneySqs();
            break;
          case "RegionalBonuses":
            //    dt.tablesearch.init(document.querySelectorAll(".info > table"));
            break;
        }
        break;
      case "Military":
        if (bits.length === 2) {
          // Military overview page
          dt.military.scanMilOverview(xhr);
        } else {
          switch (bits[2]) {
            case "SendArmy":
              //                        dt.siege.armySent(event, xhr, settings);
              var rubbish = "";
              break;
            case "Orders":
              dt.military.addOccupyMax();
              dt.military.colourArmies();
              dt.military.milOrdersSetup();
              if (PlayerId === 279547) {
                dt.military.milOrdersPage();
              }
              break;
          }
        }
        break;

      default:
        //			console.log("Intercept:\t Un-caught update");
        //			console.log("Intercepted: " + urlStart);
        break;
    }
    switch (bits[3]) {
      case "Chat":
        // Get the returned data and process it then send it to the server.

        // Temporarily disabled start
        /*                 var r = JSON.parse(xhr.responseText);
                if (bits[4] == "Update") {
                    if (r.GlobalChats !== null) {
                        var posts = Object.keys(r.GlobalChats);
                        for (i = 0; i < posts.length; i++) {
                            var thisPost = r.GlobalChats[posts[i]];
                            //if (thisPost.PlayerId == -1 && GMbeep == true) {
                            if (thisPost.PlayerId == 418074 && GMbeep == true) {
                                dt.beep();
                            }
                        }
                    }
                }
 */
        // Temporarily disabled end
        if (r.Notifications !== null) {
          var notifys = r.Notifications;
          // Got at least one notification so call the (tmp?) function to record the details
          logNotifys(notifys);
          var posts = Object.keys(notifys);
          for (i = 0; i < posts.length; i++) {
            var thisPost = notifys[posts[i]];
            // Only proceed if the text contains 'interuppted'
            if (
              thisPost.Text.includes("interrupted") ||
              thisPost.Text.includes("destroyed")
            ) {
              //                    console.log(thisPost.Text);
              //                    window.alert(thisPost.Text);
            }
            if (thisPost.Text == "Prod change") {
              //    console.log(thisPost.Text + " at " + thisPost.TownID);
              dt.production.checkComplete(thisPost.TownID);
            }
            if (thisPost.Text == "Resource Production Queued") {
              //    console.log(thisPost.Text + " at " + thisPost.TownID);
              //                  //      dt.production.prodQueued(thisPost);
            }
            if (thisPost.Text == "Town focus changed") {
              //                        console.log(thisPost.Text + " from " + thisPost.TownID, "Current Town: "+CurrentTown);
              dt.currentTown = thisPost.TownID;
            }
          }
        }
        break;
    }
  });

  dt.beep = function () {
    var snd = new Audio(
      "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
    );
    snd.play();
  };

  dt.mapUpdate = function (event, xhr, settings) {
    var mD = JSON.parse(xhr.responseText);
    var mKeys = Object.keys(mD.c);
    for (i = 0; i < mKeys.length; i++) {}
  };
  dt.logNotifys = function (notifys) {
    if (!dt.notifys) {
      dt.notifys = [];
    }

    for (var i = 0; i < notifys.length; i++) {
      dt.notifys.push(notifys[i]);
      thisN = {};
      var n = notifys[i];
      thisN.nType = n.TypeID;
      thisN.nTown = n.TownID;
      thisN.nText = n.Text;
      dt.nLog.push(thisN);
    }
  };
};
