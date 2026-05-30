dt = {
  currentData: "",
  server: "https://www.v3.durctools.uk/",
  imgServer: "https://www.durctools.uk/img",
  factionScanState: false,
  processingHash: false,
  db: null,
  mdb: null,
  oldH: "",
  popupStates: {
    MilSumm: false,
    AllQs: false,
    IdleQs: false,
    ProdNotices: false,
    SovNotices: false,
    BaseInvs: false,
    HubSum: false,
    StoredTrades: false,
    MovCoord: false,
  },
  sCollectables: {},

  /*Object: player
   * Holds all data relating to a player
   *
   * Properties:
   * name - string. The name of the player.
   * alliance - integer. The id of the alliance this player belongs to. Is 0 if not in an alliance.
   * towns - object. Data relating to the towns owned by this player. See <town> for details of the structure.
   * hubs - object. Data relating to the hubs the player has goods stored at. See <hubs> for details of the structure.
   * settings - object. Settings for various tools.
   * pres - integer. The current amount of Prestige in this players account.
   * toolSettings - object. Position and size settings for each of the tools.
   * prodNotices - array. Details of each item production queue that has finished.
   * sovNotices - array. Details of sov upgrades that has finished.
   * sieges - object. This will hold details of any ongoing sieges the player is involved in. These tools have not been written yet.
   */
  player: function (
    name,
    alliance,
    towns,
    hubs,
    settings,
    pres,
    toolSettings,
    prodNotices,
    sieges
  ) {
    this.name = name;
    this.alliance = alliance;
    this.towns = towns;
    this.hubs = hubs;
    this.settings = settings;
    this.toolSettings = toolSettings;
    this.prodNotices = [];
    this.sieges = {};
    this.factions = {};
    this.sovNotices = {};
  },
  /* Object: town
   * Holds all data relating to a particular town.
   *
   * Properties:
   * name - string. The name of the town.
   * x - integer. X coordinate of the town.
   * y - integer. Y coordinate of the town.
   * inv - object. Details of the inventory held by this town. See <inv> for details of the structure.
   * alembine - object. Status of this towns visits to each of the Allembine sites.
   * mil - object. Details of the troops currently in this town or being built there and the attack/defence scores for the town. See <mil> for details of the structure.
   * diplo - object. Details of the diplomatic units currently in this town as well as the diplomatic defence scores for this town. See <diplo> for details of the structure.
   * trade - details of the trade units currently in this town. See <trade> for details of the structure.
   * plots - object. Details of the building plots in the town. The plots are split into two objects internal and resource. The internal object holds details of the buildings on each of the plots inside (and including) the town wall while the resource holds the same details for the resource (wood, clay, iron etc) plots available to the town.
   * sov - array. An array of objects. Each object holds info on a sovereignty claim made by this town.
   */
  town: function (
    name,
    x,
    y,
    inv,
    allembine,
    mil,
    diplo,
    trade,
    prod,
    plots,
    sov
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inv = inv;
    this.allembine = allembine;
    this.mil = mil;
    this.diplo = diplo;
    this.trade = trade;
    this.prod = prod;
    this.plots = plots;
    this.sov = [];
  },

  /* Object: plots
   * Holds data on the building plots available to a particular town.
   *
   * Properties:
   * resource - object. Information on the resource plots available to this city. It is a collection of 25 objects each of which holds an array with the name of the building present and the current level.
   * internal - object. Information on the internal building plots available to this city. It is a collection of 25 objects each of which holds an array with the name of the building present and the current level.
   */
  plots: function () {
    (this.resource = {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
      11: "",
      12: "",
      13: "",
      14: "",
      15: "",
      16: "",
      17: "",
      18: "",
      19: "",
      20: "",
      21: "",
      22: "",
      23: "",
      24: "",
      25: "",
    }),
      (this.internal = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "",
        21: "",
        22: "",
        23: "",
        24: "",
        25: "",
      });
  },

  /* Object: hubs
   * Holds all data relating to a particular trade hub the user has goods and/or trade units at.
   *
   * Properties:
   * name - The name of the hub.
   * x - integer. The x coordinate of the hub.
   * y - integer. The y coordinate of the hub.
   * traders - unknown. Details of the traders at this hub.
   * vans - unknown. Details of the caravans at this hub.
   * inv - object. Details of the items currently held at this hub.
   */
  hubs: function (name, x, y, traders, vans, inv) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inv = inv;
    this.traders = traders;
    this.vans = vans;
  },
  /* Object: inv
   * Holds all data on the items held in the town. The items are organized into the same categories as the tabs at the bottom of the Inventory page.
   *
   * Properties:
   * maxStore - integer. The maximum storage capacity in this town.
   * res - object. Details of base and advanced resources held in this town. For each resource a property is created which is an instance of the <item> object.
   * mounts - object. Details of any specialist mounts held in this town. For each mount type a property is created which is an instance of the <item> object.
   * weapons - object. Details of any specialist weapons held in this town. For each weapon a property is created which is an instance of the <item> object.
   * armour - object. Details of any specialist armour held in this town. For each armour a property is created which is an instance of the <item> object.
   * anatomies - object. Details of any animal parts and hides held in this town. For each anatomy a property is created which is an instance of the <item> object.
   * minerals - object. Details of any minerals (rare and common) held in this town. For each mineral a property is created which is an instance of the <item> object.
   * herbs - object. Details of any herbs (rare and common) held in this town. For each herb a property is created which is an instance of the <item> object.
   * exotic - object. Details of any exotic items held in this town. For each exotic item a property is created which is an instance of the <item> object.
   */
  inv: function (
    maxStore,
    res,
    mounts,
    weapons,
    armour,
    anatomies,
    minerals,
    herbs,
    exotic
  ) {
    this.maxStore = maxStore;
    if (Object.getOwnPropertyNames(res).length > 0) {
      this.res = res;
    } else {
      this.res = {
        Gold: { id: "i=4|1", held: 0, rate: 0, classes: " resIcon ico-gold" },
        Wood: { id: "i=1|1", held: 0, rate: 0, classes: " resIcon ico-wood" },
        Clay: { id: "i=1|2", held: 0, rate: 0, classes: " resIcon ico-clay" },
        Iron: { id: "i=1|3", held: 0, rate: 0, classes: " resIcon ico-iron" },
        Stone: { id: "i=1|4", held: 0, rate: 0, classes: " resIcon ico-stone" },
        Food: { id: "i=1|5", held: 0, rate: 0, classes: " resIcon ico-food" },
        Mana: { id: "i=2|1", held: 0, rate: 0, classes: " resIcon ico-mana" },
        Research: {
          id: "i=2|2",
          held: 0,
          rate: 0,
          classes: " resIcon ico-research",
        },
        Horse: {
          id: "i=3|1",
          held: 0,
          rate: 0,
          classes: " resIcon ico-horses",
        },
        Livestock: {
          id: "i=3|2",
          held: 0,
          rate: 0,
          classes: " resIcon ico-livestock",
        },
        Beer: { id: "i=3|12", held: 0, rate: 0, classes: " resIcon ico-beer" },
        Book: { id: "i=3|7", held: 0, rate: 0, classes: " resIcon ico-books" },
        Spear: {
          id: "i=3|5",
          held: 0,
          rate: 0,
          classes: " resIcon ico-spears",
        },
        Sword: {
          id: "i=3|3",
          held: 0,
          rate: 0,
          classes: " resIcon ico-swords",
        },
        Bow: { id: "i=3|4", held: 0, rate: 0, classes: " resIcon ico-bows" },
        Saddle: {
          id: "i=3|6",
          held: 0,
          rate: 0,
          classes: " resIcon ico-saddles",
        },
        "Leather Armour": {
          id: "i=3|8",
          held: 0,
          rate: 0,
          classes: " resIcon ico-leather",
        },
        Chainmail: {
          id: "i=3|9",
          held: 0,
          rate: 0,
          classes: " resIcon ico-chainmail",
        },
        "Plate Armour": {
          id: "i=3|10",
          held: 0,
          rate: 0,
          classes: " resIcon ico-plate",
        },
        "Siege Block": {
          id: "i=3|11",
          held: 0,
          rate: 0,
          classes: " resIcon ico-siege",
        },
      };
    }
    this.mounts = mounts;
    this.weapons = weapons;
    this.armour = armour;
    this.anatomies = anatomies;
    this.minerals = minerals;
    this.herbs = herbs;
    this.exotic = exotic;
  },
  /* Object: item
   * Holds all the data for a particular item.
   *
   * Parameters:
   * name - string. The name of the item.
   * held - integer. The quantity of this item held.
   * classes - string. The classes used to display the icon/image for this item.
   * id - string. String that is used to identify this item in various parts of the DOM.
   * rate - float. The amount the quantity of this item changes each hour. Is 0 for items that do not have an hourly rate.
   *
   */
  item: function (name, held, classes, id, rate) {
    this.name = name;
    this.held = held;
    this.classes = classes;
    this.id = id;
    this.rate = rate;
  },
  /* Object: trade
   * Holds the number of each trade unit in a town.
   *
   * Properties:
   * van - integer. The number of caravans currently in this town.
   * cotter - integer. The number of cotters currently in this town.
   * herbalist - integer. The number of herbalists currently in this town.
   * miner - integer. The number of miners currently in this town.
   * skinner - integer. The number of skinners currently in this town.
   *
   */
  trade: function (van, cotter, herbalist, miner, skinner, trader, stored) {
    this.van = van;
    this.cotter = cotter;
    this.herbalist = herbalist;
    this.miner = miner;
    this.skinner = skinner;
    this.trader = trader;
    this.storedTrades = stored;
  },
  /* Object: diplo
   * Holds the number of each diplo unit in a town;
   *
   * Properties:
   * scout - array. The number of T1 and T2 scouts that are in this town.
   * spy - array. The number of T1 and T2 spies that are in this town.
   * thief - array. The number of T1 and T2 thieves that are in this town.
   * saboteur - array. The number of T1 and T2 saboteurs that are in this town.
   * assassin - array. The number of T1 and T2 assassins that are in this town.
   * messenger - array. The number of messengers that are in this town.
   */
  diplo: function (scout, spy, thief, saboteur, assassin, messenger) {
    this.scout = scout;
    this.spy = spy;
    this.thief = thief;
    this.saboteur = saboteur;
    this.assassin = assassin;
    this.messenger = messenger;
  },
  /* Object: mil
   * Holds all data for mil units and commanders in a town.
   *
   * Properties:
   * commanders - object. Holds details of the commanders based in this town.
   * units - object. Details of the units currently available or beinf built in this town.
   * armies - object. Details of any armies currently in this town.
   * summary - ?
   */
  mil: function (commanders, units, armies, summary) {
    this.commanders = commanders;
    this.units = units;
    this.armies = armies;
    this.summary = summary;
  },
  /* Object: commander
   * Holds all data for a mil commander.
   *
   * Properties:
   * name - string. The name of this commander.
   * lvl - integer. The level of this commander.
   * xp - integer. The current experience of this commander.
   * self - object. Details of the self bonus levels for this commander.
   * div - object. Details of the division bonus levels for this commander.
   * uType - string. The type of unit for this commander (Knight, Charioteer etc)
   */
  commander: function (
    name,
    lvl,
    xp,
    self = {
      atk: 0,
      spDef: 0,
      rgDef: 0,
      infDef: 0,
      cavDef: 0,
      cbtSurv: 0,
      health: 0,
      heal: 1,
      escAssas: 0,
    },
    div = {
      spAtk: 0,
      rgAtk: 0,
      infAtk: 0,
      cavAtk: 0,
      spDef: 0,
      rgDef: 0,
      infDef: 0,
      cavDef: 0,
      move: 0,
      carry: 0,
      magic: 0,
    },
    uType
  ) {
    this.name = name;
    this.lvl = lvl;
    this.self = self; // object
    this.div = div; // object
    this.uType = uType;
  },
  /* Object: army
   * Holds all data for an army.
   *
   * Properties:
   * name - the name of this army.
   * divisions - object. Details of each of the divisions in this army.
   */
  army: function (name, divisions) {
    this.name = name;
    this.divisions = divisions;
  },
  /* Object: division
   * Holds all data for a division.
   *
   * Properties:
   * name - string. The name of this division.
   * commander - integer. The id of the commander assigned to this division. Is 0 if no commander.
   * spear - object. Details of any T1 and T2 spear units in this division.
   * inf - object. Details of any T1 and T2 infantry units in this division.
   * ranged - object. Details of any T1 and T2 ranged units in this division.
   * cav - object. Details of any T1 and T2 cavalry units in this division.
   * siege - object. Details of any T1 and T2 siege units in this division.
   */
  division: function (name, commander, spear, inf, ranged, cav, siege) {
    this.name = name;
    this.commander = commander;
    this.spear = spear;
    this.inf = inf;
    this.ranged = ranged;
    this.cav = cav;
    this.siege = siege;
  },
  windowSettings: [],
  /* *************************************************************************
   * Methods
   ************************************************************************* */

  /* Method: getFactionStandings
   * Get the player and alliance standings with the currently displayed faction
   */
  getFactionStandings: function (event, xhr, settings, bits) {
    //    console.log("getFunctionStandings called...");
    var thisF = dt[PlayerId].factions;
    var t = xhr.responseText.split("\r\n<");
    for (var i = 0; i < t.length; i++) {
      if (t[i].startsWith('script type="text/javascript')) {
        tt2 = t[i]
          .split('Flotr.draw($("#yourStandings").get(0),')[1]
          .split("}],")[0]
          .split("\r\n");
        var s = [];
        for (var j = 0; j < tt2.length; j++) {
          if (tt2[j].trim().startsWith("data:")) {
            //                    console.log(tt2[j]);
            // data: [[-45,1]],
            var l1 = tt2[j].trim().replace("data:[[", "").split(",")[0];
            var l2 = l1.replace("data: [[", "");
            s.push(l2);
          }
        }
        dt[PlayerId].factions[bits[3]] = s;
        //            console.log(dt[PlayerId].factions[bits[3]]);
      }
    }
    var key = PlayerId + ":factions";
    locStorage.setItem(key, JSON.stringify(dt[PlayerId].factions));

    var rubbish = "";
  },
  /* Method: addElement
   * Create and append an element with multiple attributes
   *
   */
  addElement: function (
    assignTo,
    parent,
    elementType,
    attribNames,
    attribVals
  ) {
    var newElem = document.createElement(elementType);
    if (attribNames) {
      var numAttribs = attribNames.length;
      if (numAttribs > 0) {
        for (var i = 0; i < numAttribs; i++) {
          switch (attribNames[i]) {
            case "textContent":
              newElem.textContent = attribVals[i];
              break;
            case "innerHTML":
              newElem.innerHTML = attribVals[i];
              break;
            default:
              newElem.setAttribute(attribNames[i], attribVals[i]);
              break;
          }
        }
      }
    }
    try {
      if (document.querySelector(parent) !== null) {
        var newDiv = document.querySelector(parent).appendChild(newElem);
      } else {
        var newDiv = document.getElementById(parent).appendChild(newElem);
      }
    } catch (e) {
      var newDiv = parent.appendChild(newElem);
    }
    if (assignTo !== "") {
      dt[assignTo] = newDiv;
    }
    return newDiv;
  },
  /* Method: addElement2
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
  addElement2: function (parent, elementType, attribName, attribVal) {
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
  /* Function: logEntry
   * Add an entry to the log div
   *
   * Parameter:
   * msg - string. The message to be added.
   */
  logEntry: function (msg) {
    // Get server time
    var serverTimeArray = document
      .querySelector("#serverDate")
      .textContent.split(" ");
    serverTime = serverTimeArray[3];
    if (serverTimeArray[3] == "") {
      serverTime = serverTimeArray[4];
    }
    //        console.log("serverDate: " + document.querySelector("#serverDate").textContent);
    if (serverTime == "") {
      //            console.log("debug: logEntry serverTime is null...")
    }
    var parent = document.querySelector("#dt_log");
    newElement = document.createElement("p");
    newElement.textContent =
      serverTime + " - (" + dt[PlayerId].towns[CurrentTown].name + "):" + msg;
    parent.appendChild(newElement);
    //		newElement.scrollIntoView(true);
    var topPos = newElement.offsetTop;
    parent.scrollTop = topPos;
  },
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
        var formatted = (orig / 1000).toFixed(2);
        formatted = formatted.toString() + "k";
        break;
      default:
        formatted = parseInt(orig);
    }
    return formatted;
  },
  secondsToString: function (seconds) {
    var numdays = Math.floor(seconds / 86400);
    var numhours = Math.floor((seconds % 86400) / 3600);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var numseconds = ((seconds % 86400) % 3600) % 60;
    return (
      numdays +
      " days " +
      numhours +
      " hours " +
      numminutes +
      " minutes " +
      numseconds +
      " seconds"
    );
  },
  /* Method: secondsToString2
   * Convert a number of seconds to a string showing the number of days, hours, minutes and seconds.
   * @param {type} seconds
   * @returns {String}
   */
  secondsToString2: function (seconds) {
    seconds = Math.abs(seconds);
    retval = "";
    var numdays = Math.floor(seconds / 86400);
    var numhours = ((seconds % 86400) / 3600).toFixed(1);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var numseconds = ((seconds % 86400) % 3600) % 60;
    if (numdays > 0) {
      retval = numdays + "d ";
    }
    if (numhours > 0) {
      retval = retval + numhours + "h";
    }
    if (retval == "") {
      retval = "-";
    }
    //return numdays + "d " + numhours + "h";
    return retval.trim();
  },
  hoursToString: function (hours) {
    var numdays = Math.floor(hours / 24);
    var numhours = Math.floor((hours % 24) % 24);
    return numdays + " days " + numhours + " hours ";
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
        var formatted = (orig / 1000).toFixed(0);
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
  /* Function: usedIn
   * Find what crafted item an item is used in the creation of.
   *
   * Parameters:
   * assignTo - the name of the property this element should be assigned to.
   * parent - the element the element is to be appended to. Can be an element reference, an element id or a css selector.
   * elementType - the type of element to add.
   * attribVal - array holding the values to be given to the attributes
   * attribName - array holding the names of the attributes to be added.
   *
   * Returns:
   * The new element.
   */
  usedIn: function (id) {
    var appearsIn = [];
    // Step through all the known recipes.
    var numRecipes = dt.cRecipes.length;
    for (var item = 0; item < numRecipes; item++) {
      // Step through each of the sub-items in this recipe.
      for (subItem in item.recipe) {
        // Check if this sub-item is the required one and add the item id to the appearsIn array if it is.
        if (subItem[2] == id) {
          appearsIn.push();
        }
      }
    }
    return appearsIn;
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
  /* Function: newHash
   * Identify the change to the hash and/or town and call the relevant function after a delay of 2 seconds (to allow the in-game scripts time to finish up-dating the DOM).
   *
   * Dependant on the change various functions will be called to update the resource holdings, scan the map etc.
   *
   */
  newHash: function () {
    if (dt.processingHash === false) {
      dt.processingHash = true;
      $(document).ready(function newHashLoaded() {
        var newHash = window.location.hash;
        var newTown = CurrentTown;
        if (dt.currentTown !== CurrentTown) {
          dt.currentTown = CurrentTown;
          dt.getTopRes();
          dt.getAdvRes();
          dt.getBottomInv();
        }
        if (newHash.indexOf("?")) {
          var bits = newHash.split("?");
          newHash = bits[0];
        }
        var bits = newHash.split("/");
        switch (bits[1]) {
          case "World":
            if (bits[2] === "Map") {
              dt.currentHash = window.location.hash;
              if (dt[PlayerId].settings.factionScanState === true) {
                var timeoutID = window.setTimeout(dt.scanFactionTroops, 2000);
              }
              dt.scanMap();
            }
            if (bits[2] === "HeraldReleaseNotes") {
              dt.misc.newPlayers(event, xhr);
            }
            break;
          case "Communication":
            if (bits[2] === "Mail") {
              //					dt.mailsearch(dt.scanMail);
            }
            break;
          case "Town":
            if (bits[2] === "Inventory") {
              dt.currentHash = window.location.hash;
              try {
                var timeoutID = window.setTimeout(dt.getTownInventory, 2000);
              } catch (e) {}
            }
            switch (bits[2]) {
              case "Inventory":
                dt.currentHash = window.location.hash;
                try {
                  var timeoutID = window.setTimeout(dt.getTownInventory, 2000);
                } catch (e) {}
                break;
              case "Production":
                dt.currentHash = window.location.hash;
                try {
                  dt.getProdSchedule();
                } catch (e) {}
                break;
              case "Map":
                dt.currentHash = window.location.hash;
                dt.buildings.bldgScan();
                break;
            }
            break;
          case "Military":
            switch (bits[2]) {
              case "Movements":
                dt.currentHash = window.location.hash;
                dt.scanMilMov();
                break;
              case "Armies":
                dt.currentHash = window.location.hash;
                dt.scanMilArmy();
                break;
              case "Commanders":
                dt.currentHash = window.location.hash;
                dt.scanMilCommander();
                break;
              case undefined:
                dt.currentHash = window.location.hash;
                var timeoutID = window.setTimeout(
                  dt.military.scanMilOverview,
                  2000
                );
                break;
              default:
              // Do nothing
            }
            break;
          case "Diplomatic":
            switch (bits[2]) {
              case "Movements":
                dt.currentHash = window.location.hash;
                dt.scanDiploMov();
                break;
              case undefined:
                dt.currentHash = window.location.hash;
                dt.scanDiploOverview();
                break;
              default:
            }
            break;
          case "Trade":
            switch (bits[2]) {
              case "Movements":
                dt.currentHash = window.location.hash;
                dt.scanTradeMov();
                break;
              case "HubInventory":
                // https://elgea.illyriad.co.uk/#/Trade/HubInventory?HubId=1&Subtype=0
                dt.currentHash = window.location.hash;
                var timeoutID = window.setTimeout(dt.getHubList, 1000);
                var timeoutID = window.setTimeout(dt.getHubInv, 2000);
                dt.invent.getHubInv();
                break;
              case undefined:
                dt.currentHash = window.location.hash;
                dt.scanTradeOverview();
                break;
              default:
            }
            break;
        }
      });
      dt.processingHash = false;
    }
  },
  /* Function: durcbutToggle
   * Toggle the visibility of the entire tools.
   *
   */
  durcbutToggle: function () {
    var dbut = document.getElementById("durcbut");
    var tlvl = document.getElementById("durcTools3");
    // div.classList.toggle("visible");
    dbut.classList.toggle("see");
    dbut.classList.toggle("nosee");
    tlvl.classList.toggle("see");
    tlvl.classList.toggle("nosee");
  },
  /* Method: showTool
   * Display the dialog for the tool.
   */
  showTool: function (id, flag) {
    /*         let t=document.getElementById(id);

        if(t.nodeName==="DIALOG"){
            
            t.show();
        } */
    var winHeight = window.innerHeight;
    var maxHt = parseInt(0.9 * winHeight);
    var winWidth = window.innerWidth;
    var maxWd = parseInt(0.75 * winWidth);
    if (dt[PlayerId].toolSettings[id] !== undefined) {
      dt[PlayerId].toolSettings[id].maxHt = maxHt;
      dt[PlayerId].toolSettings[id].maxWd = maxWd;
      var me = dt[PlayerId].toolSettings[id];
    } else {
      me = {
        width: "auto",
        maxWd: maxWd,
        height: "auto",
        maxHt: maxHt,
        pos: { left: "center", top: 20 },
      };
    }
    $(function () {
      $(id).dialog({
        width: me.width,
        maxWidth: me.maxWd,
        height: me.height,
        maxHeight: me.maxHt,
        resizeStop: function (event, ui) {
          me.width = ui.size.width;
          me.height = ui.size.height;
          me.pos = ui.position;
          dt[PlayerId].toolSettings[id] = me;
          var key = PlayerId + ":toolSettings";
          locStorage.setItem(key, JSON.stringify(dt[PlayerId].toolSettings));
        },
        dragStop: function (event, ui) {
          me.pos = ui.position;
          dt[PlayerId].toolSettings[id] = me;
          var key = PlayerId + ":toolSettings";
          locStorage.setItem(key, JSON.stringify(dt[PlayerId].toolSettings));
        },
        beforeClose: function (event, ui) {
          if (flag !== undefined) {
            dt.popupStates[flag] = false;
          }
        },
      });
    });
    //
    if (dt[PlayerId].toolSettings[id] == undefined) {
      this.adjustTool(id);
    } else {
      this.posTool(id);
    }
  },
  /* Method: adjustTool
   * Check if the tool width and height are within the maximum values and adjust as needed.
   *
   * Parameter:
   * id - string. The css selector for the tool div.
   */
  adjustTool: function (id) {
    var winHeight = window.innerHeight;
    var maxHt = parseInt(0.9 * winHeight);
    var winWidth = window.innerWidth;
    var maxWd = parseInt(0.75 * winWidth);
    var el = document.querySelector(id).parentElement;

    var intElemOffsetHeight = el.offsetHeight;
    var intElemOffsetWidth = el.offsetWidth;
    var currHeight = $(id).dialog("option", "height");
    if (intElemOffsetHeight > maxHt) {
      $(id).dialog("option", "height", maxHt);
    }
    if (intElemOffsetWidth > maxWd) {
      $(id).dialog("option", "width", maxWd);
    }
  },
  /* Method: posTool
   * Change the position of the tool to the stored coords and size.
   *
   * Parameter:
   * id - string. The css selector for the tool div.
   */
  posTool: function (id) {
    var pel = document.querySelector(id).parentElement;
    pel.style.left = dt[PlayerId].toolSettings[id].pos.left + "px";
    pel.style.top = dt[PlayerId].toolSettings[id].pos.top + "px";
    pel.style.width = dt[PlayerId].toolSettings[id].width + "px";
    pel.style.height = dt[PlayerId].toolSettings[id].height + "px";
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
  /* Function: getTownList
   * Parse the optTown element to get a list of all the towns owned by the current player and either update or create a <town> object to hold the data.
   *
   */
  getTownList: function () {
    var townDivs = document.getElementsByClassName("cityMenu");
    var numTowns = townDivs.length;
    dt[PlayerId].towns.list = [];
    dt[PlayerId].towns.numTowns = numTowns;
    var list = [];
    for (var i = 0; i < numTowns; i++) {
      var townId = townDivs.item(i).getAttribute("data-townid");
      var name = townDivs
        .item(i)
        .getElementsByTagName("div")
        .item(0).textContent;
      name = name.replace("- Capital", "");
      name = name.trim();
      var coords = townDivs
        .item(i)
        .getElementsByTagName("div")
        .item(1).textContent;
      var coordArray = coords.split(" ");
      if (dt[PlayerId].towns.hasOwnProperty(townId) === false) {
        dt[PlayerId].towns[townId] = new dt.town(
          name,
          coordArray[0].trim(),
          coordArray[2].trim(),
          new dt.inv(0, {}, {}, {}, {}, {}, {}, {}, {}),
          "",
          "",
          "",
          "",
          {},
          []
        );
      } else {
        dt[PlayerId].towns[townId].name = name;
        dt[PlayerId].towns[townId].x = coordArray[0].trim();
        if (coordArray[3] == "in") {
          dt[PlayerId].towns[townId].y = coordArray[2].trim();
        } else {
          dt[PlayerId].towns[townId].y = coordArray[3].trim();
        }
      }
      dt[PlayerId].towns.list.push(townId);
    }
    // Check if the 'all' town exists and create if not
    if (!dt[PlayerId].towns.hasOwnProperty("all")) {
      dt[PlayerId].towns.all = { trade: { storedTrades: [] } };
    }

    dt[PlayerId].towns.list.sort();
  },
  /* Function: toggleFactionScanState
   * Toggle scanning and reporting of Faction troops on the world map.
   */
  toggleFactionScanState: function () {
    var factionchk = document.querySelector("#factionscan");
    if (dt[PlayerId].settings.factionScanState === true) {
      dt[PlayerId].settings.factionScanState = false;
    } else {
      dt[PlayerId].settings.factionScanState = true;
    }
    var key = PlayerId + ":settings";
    locStorage.setItem(key, JSON.stringify(dt[PlayerId].settings));
  },
  townChanged: function () {
    if (dt.currentTown !== CurrentTown) {
      dt.hashChanged();
    }
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
  /* Method: hashChanged
   * Called whenever the page hash changes. Builds an array of the parts of the hash including any parameters.
   * Depending on the values in the array calls the relevant function.
   *
   * No matter what the hash is it will call the method to get the base and
   * advanced resources for the current town.
   */
  hashChanged: function () {
    var rubbish = "";
    //		$(document).ready(function () {
    var hashParts = location.hash.split("?")[0].split("/");
    var params = dt.getURLParams();
    hashParts.push(params);
    var newTown = CurrentTown;
    if (dt.currentTown !== CurrentTown) {
      dt.currentTown = CurrentTown;
    }
    var rubbish = "";
    switch (hashParts[1]) {
      case "World":
        // Possible values for hashParts[2]: Map, Quests, Tournaments, Herald(several sub sections)
        if (hashParts[2] === "Map") {
          if (dt[PlayerId].settings.factionScanState === true) {
            dt.scanFactionTroops();
          }
        }

        break;
      case "Town":
        // Possible values for hashParts[2]: City, Map, Castle(several sub sections), Resources, Production, Sovereignty, Inventory, Growth, UnitProduction(hashParts[3] defines which type (mil, trade, diplo) are being produced))
        switch (hashParts[2]) {
          case "City":
            break;
          case "Map":
            // Get building levels
            dt.buildings.bldgScan();
            break;
          case "Production":
            // Get production queues
            dt.production.getProdSchedule();
            break;
          case "Sovereignty":
            // Get details of sovereignty claims and highlight any that can have the building upgraded.
            //                        dt.sov.getSovDetails();
            break;
          case "Inventory":
            // Get the maximum storage capacity and the currently selected sub-inventory
            //                        dt.invent.getTownInventory();
            break;
          case "BuildingProduction":
            // hashParts[3] holds the id of the building being viewed
            //                        dt.production.getBldgProd(hashParts[3]);
            break;
        }
        break;
      case "Military":
        // Possible values for hashParts[2]: none, Movements, Sieges, Orders, Armies, Commanders
        switch (hashParts[2]) {
          case "Commanders":
            dt.military.scanMilCommander();
            break;
          case "Movements":
            dt.military.scanMilMov();
            break;
          case "Sieges":
            dt.military.scanSieges();
            break;
          case "Orders":
            dt.military.addOccupyMax();
            break;
          case "Armies":
            dt.military.scanMilArmy();
            break;
          default:
            dt.military.scanMilOverview();
            break;
        }
        break;
      case "Diplomatic":
        break;
      case "Trade":
        break;
      case "Research":
        break;
      case "Magic":
        break;
      case "Player":
        break;
      case "Alliance":
        break;
      case "Prestige":
        break;
      case "Communication":
        // Possible values for hashParts[2]: Mail, Notifications, Chat
        switch (hashParts[2]) {
          case "Mail":
            dt.mailsearch(dt.scanMail);
            break;
        }
        break;
    }
  },
};
/* *************************************************************************
 * Code
 ************************************************************************* */

var dt3IntID = window.setInterval(basesetup, 500);

function basesetup() {
  if (window.jQuery) {
    window.clearInterval(dt3IntID);

    dt.currentData = "";

    var winWWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var logopos = document.getElementsByClassName("logo").item(0);
    var style = window.getComputedStyle(logopos, null);
    var left =
      parseInt(style.getPropertyValue("left")) +
      parseInt(style.getPropertyValue("width"));

    var struct = [
      {
        assignTo: "",
        parent: "head",
        elType: "link",
        attrNames: ["type", "href", "rel"],
        attrVals: ["text/css", dt.server + "/css/durcTools4.css", "stylesheet"],
      },
      {
        assignTo: "",
        parent: "head",
        elType: "link",
        attrNames: ["type", "href", "rel"],
        attrVals: ["text/css", dt.server + "/css/style-mk3.css", "stylesheet"],
      },
      {
        assignTo: "",
        parent: "head",
        elType: "link",
        attrNames: ["type", "href", "rel", "title"],
        attrVals: [
          "text/css",
          dt.server + "/css/theme-mk3.css",
          "stylesheet",
          "chatTheme",
        ],
      },

      {
        assignTo: "topLevel",
        parent: "body",
        elType: "div",
        attrNames: ["id", "style", "class"],
        attrVals: [
          "durcTools3",
          "border: solid; border-width: 3px; border-color: brown; overflow: visible; width: 320px;left:" +
            left +
            "px;top:0px;",
          "ui-widget-content nosee",
        ],
      },
      {
        assignTo: "",
        parent: "body",
        elType: "div",
        attrNames: ["id", "class"],
        attrVals: ["toolDivs", "nosee"],
      },
    ];

    for (var i = 0; i < struct.length; i++) {
      dt.addElement(
        struct[i].assignTo,
        struct[i].parent,
        struct[i].elType,
        struct[i].attrNames,
        struct[i].attrVals
      );
    }
    //
    // $("#result").load("ajax/test.html", function () {
    //   alert("Load was performed.");
    // });
    //
    // Load the html for the tools top section
    $("#durcTools3").load(dt.server + "/html/durctools11.html");
    // Load the html for the actual tools
    $("#toolDivs").load(dt.server + "/html/toolDivs12.html", function () {
      dttheme();
    });
    //        // Load the development html
    //        $("#devtools").load(dt.server + "/html/development.html");

    //        dtProd2();
    var durcbut = dt.addElement(
      "",
      "body",
      "div",
      ["id", "style", "class"],
      ["durcbut", "left:" + left + "px;top:0px", "see"]
    );
    // Get the value for dt.themeEnabled
    dt.themeEnabled = JSON.parse(
      localStorage.getItem(PlayerId + ":themeStatus")
    );
    if (dt.themeEnabled === null) {
      dt.themeEnabled = false;
    }
    // Set the disabled flag on the theme stylesheet to the same as dt.themeEnabled
    var styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      if (styleSheets[i].title === "chatTheme") {
        document.styleSheets[i].disabled = !dt.themeEnabled;
      }
    }
    // If dt.themeEnabled === true then load the theme and set the CSS vars
    // =====================================================================================
    var myElement = $("<div>hello world</div>")[0];

    var observer = new MutationObserver(function (mutations) {
      if (document.contains(myElement)) {
        console.log("It's in the DOM!");
        observer.disconnect();
      }
    });

    observer.observe(document, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });

    $("body").append(myElement); // console.log: It's in the DOM!
    // =====================================================================================

    durcbut.innerHTML =
      '<input class="durcbut" onclick="dt.durcbutToggle()" title="Click to open DurcTools v3">';
    $(function () {
      $("#durcTools3").draggable({ handle: "#dt_logo" });
    });

    var rubbish = "";

    dt[PlayerId] = new dt.player(
      CurPlayerName,
      YourAllianceId,
      {},
      {},
      {
        factionScanState: false,
        alertAudio: false,
        alertVisual: false,
        alertFreq: 10,
      },
      0,
      [],
      {}
    );
    dt.mo.initialize();
    // Get the id and name of each of the player towns
    dt.getTownList();
    var tList = dt[PlayerId].towns.list;
    //	dt.init();

    dt.currentTown = CurrentTown;
    // Load the settings for this player
    dt[PlayerId].settings = JSON.parse(
      locStorage.getItem([PlayerId] + ":settings")
    );
    if (dt[PlayerId].settings === null) {
      dt[PlayerId].settings = {};
    }
    // Load the mapDisplay setting for this player
    dt[PlayerId].mapDisplay = JSON.parse(
      locStorage.getItem([PlayerId] + ":mapDisplay")
    );
    if (dt[PlayerId].mapDisplay === null) {
      dt[PlayerId].mapDisplay = {
        noteDisplay: { onoff: "see", colour: "red" },
        tenSq: { onoff: "nosee", colour: "red" },
        fiveSq: { onoff: "nosee", colour: "red" },
        spawnLocs: { onoff: "nosee", colour: "yellow" },
      };
    }
    if (
      dt[PlayerId].mapDisplay.fiveSq.onoff == "see" ||
      dt[PlayerId].mapDisplay.fiveSq.onoff == "nosee"
    ) {
      dt[PlayerId].mapDisplay = {
        noteDisplay: { onoff: "on", colour: "red" },
        tenSq: { onoff: "off", colour: "red" },
        fiveSq: { onoff: "off", colour: "red" },
        spawnLocs: { onoff: "off", colour: "yellow" },
      };
    }
    if (!dt[PlayerId].mapDisplay.hasOwnProperty("noteDisplay")) {
      dt[PlayerId].mapDisplay.noteDisplay = { onoff: "off", colour: "red" };
    }
    if (!dt[PlayerId].mapDisplay.hasOwnProperty("fiveSq")) {
      dt[PlayerId].mapDisplay.fiveSq = { onoff: "off", colour: "red" };
    }
    if (!dt[PlayerId].mapDisplay.hasOwnProperty("tenSq")) {
      dt[PlayerId].mapDisplay.tenSq = { onoff: "off", colour: "red" };
    }
    if (!dt[PlayerId].mapDisplay.hasOwnProperty("spawnLocs")) {
      dt[PlayerId].mapDisplay.spawnLocs = { onoff: "off", colour: "yellow" };
    }
    // Load the GMbeep setting for this player
    dt[PlayerId].gmBeep = JSON.parse(
      locStorage.getItem([PlayerId] + ":GMBeep")
    );
    if (dt[PlayerId].gmBeep === null) {
      dt[PlayerId].gmBeep = false;
    }
    // Load the Trivia setting for this player
    dt[PlayerId].trivia = JSON.parse(
      locStorage.getItem([PlayerId] + ":trivia")
    );
    if (dt[PlayerId].trivia === null) {
      dt[PlayerId].trivia = false;
    }
    // Load the smileys setting for this player
    dt[PlayerId].smileys = JSON.parse(
      locStorage.getItem([PlayerId] + ":smileys")
    );
    if (dt[PlayerId].smileys === null) {
      dt[PlayerId].smileys = false;
    }
    // Load the faction standings for this player
    dt[PlayerId].factions = JSON.parse(
      locStorage.getItem([PlayerId] + ":factions")
    );
    if (dt[PlayerId].factions === null) {
      dt[PlayerId].factions = {};
    }
    // Load the toolSettings for this player
    dt[PlayerId].toolSettings = JSON.parse(
      locStorage.getItem([PlayerId] + ":toolSettings")
    );
    if (dt[PlayerId].toolSettings === null) {
      dt[PlayerId].toolSettings = {};
    }
    // Load any sieges for this player
    dt[PlayerId].sieges = JSON.parse(
      locStorage.getItem([PlayerId] + ":sieges")
    );
    if (dt[PlayerId].sieges === null) {
      dt[PlayerId].sieges = {};
    }
    // Load any personalised chat colours for this player
    // dt[PlayerId].chatcolours = JSON.parse(locStorage.getItem([PlayerId] + ':cc'));
    // if (dt[PlayerId].chatcolours === null) {
    // 	dt[PlayerId].chatcolours = {enabled:false,background:"",poster:"",post:""};
    // }
    // root = document.documentElement;
    // root.style.setProperty('--poster', dt[PlayerId].chatcolours.poster);
    // root.style.setProperty('--post', dt[PlayerId].chatcolours.post);
    // root.style.setProperty('--cbackground',dt[PlayerId].chatcolours.background);

    // Loop through each of this players towns
    var numTowns = dt[PlayerId].towns.list.length;
    var tList = dt[PlayerId].towns.list;
    for (var i = 0; i < numTowns; i++) {
      // Load any inventories in local storage
      dt[PlayerId].towns[tList[i]].inv = JSON.parse(
        locStorage.getItem(tList[i] + ":inv")
      );
      if (dt[PlayerId].towns[tList[i]].inv === null) {
        dt[PlayerId].towns[tList[i]].inv = new dt.inv(
          0,
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        );
      }
      // Check all the items are present in the res sub-inventory

      this.res = {
        Gold: { id: "i=4|1", held: 0, rate: 0, classes: " resIcon ico-gold" },
        Wood: { id: "i=1|1", held: 0, rate: 0, classes: " resIcon ico-wood" },
        Clay: { id: "i=1|2", held: 0, rate: 0, classes: " resIcon ico-clay" },
        Iron: { id: "i=1|3", held: 0, rate: 0, classes: " resIcon ico-iron" },
        Stone: { id: "i=1|4", held: 0, rate: 0, classes: " resIcon ico-stone" },
        Food: { id: "i=1|5", held: 0, rate: 0, classes: " resIcon ico-food" },
        Mana: { id: "i=2|1", held: 0, rate: 0, classes: " resIcon ico-mana" },
        Research: {
          id: "i=2|2",
          held: 0,
          rate: 0,
          classes: " resIcon ico-research",
        },
        Horse: {
          id: "i=3|1",
          held: 0,
          rate: 0,
          classes: " resIcon ico-horses",
        },
        Livestock: {
          id: "i=3|2",
          held: 0,
          rate: 0,
          classes: " resIcon ico-livestock",
        },
        Beer: { id: "i=3|12", held: 0, rate: 0, classes: " resIcon ico-beer" },
        Book: { id: "i=3|7", held: 0, rate: 0, classes: " resIcon ico-books" },
        Spear: {
          id: "i=3|5",
          held: 0,
          rate: 0,
          classes: " resIcon ico-spears",
        },
        Sword: {
          id: "i=3|3",
          held: 0,
          rate: 0,
          classes: " resIcon ico-swords",
        },
        Bow: { id: "i=3|4", held: 0, rate: 0, classes: " resIcon ico-bows" },
        Saddle: {
          id: "i=3|6",
          held: 0,
          rate: 0,
          classes: " resIcon ico-saddles",
        },
        "Leather Armour": {
          id: "i=3|8",
          held: 0,
          rate: 0,
          classes: " resIcon ico-leather",
        },
        Chainmail: {
          id: "i=3|9",
          held: 0,
          rate: 0,
          classes: " resIcon ico-chainmail",
        },
        "Plate Armour": {
          id: "i=3|10",
          held: 0,
          rate: 0,
          classes: " resIcon ico-plate",
        },
        "Siege Block": {
          id: "i=3|11",
          held: 0,
          rate: 0,
          classes: " resIcon ico-siege",
        },
      };
      var k = Object.keys(this.res);
      for (key = 0; key < k.length; key++) {
        if (!dt[PlayerId].towns[tList[i]].inv.res.hasOwnProperty(k[key])) {
          dt[PlayerId].towns[tList[i]].inv.res[k[key]] = this.res[k[key]];
        }
      }
      var key = tList[i] + ":inv";
      locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[tList[i]].inv));

      // Load any military info in local storage
      dt[PlayerId].towns[tList[i]].mil = JSON.parse(
        locStorage.getItem(tList[i] + ":mil")
      );
      if (dt[PlayerId].towns[tList[i]].mil === null) {
        dt[PlayerId].towns[tList[i]].mil = new dt.mil(
          {},
          {
            spear: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            inf: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            range: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            cav: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            siege: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            tournament: { pool: 0, build: 0, armies: 0 },
          },
          {},
          { atk: 0, spearDef: 0, infDef: 0, bowDef: 0, cavDef: 0 }
        );
      }
      if (
        !dt[PlayerId].towns[tList[i]].mil.units.hasOwnProperty("tournament")
      ) {
        dt[PlayerId].towns[tList[i]].mil.units["tournament"] = {
          pool: 0,
          build: 0,
          armies: 0,
        };
        var key = tList[i] + ":mil";
        locStorage.setItem(
          key,
          JSON.stringify(dt[PlayerId].towns[tList[i]].mil)
        );
      }
      // Load any diplo info in local storage
      dt[PlayerId].towns[tList[i]].diplo = JSON.parse(
        locStorage.getItem(tList[i] + ":diplo")
      );
      if (dt[PlayerId].towns[tList[i]].diplo === null) {
        //        dt[PlayerId].towns[tList[i]].diplo = new dt.diplo({t1: 0, t2: 0}, {t1: 0, t2: 0}, {t1: 0, t2: 0}, {t1: 0, t2: 0}, {t1: 0, t2: 0}, []);
        dt[PlayerId].towns[tList[i]].diplo = {
          scout: { t1: 0, t2: 0 },
          spy: { t1: 0, t2: 0 },
          thief: { t1: 0, t2: 0 },
          saboteur: { t1: 0, t2: 0 },
          assassin: { t1: 0, t2: 0 },
          messenger: 0,
        };
      }
      // Load any trade info in local storage
      dt[PlayerId].towns[tList[i]].trade = JSON.parse(
        locStorage.getItem(tList[i] + ":trade")
      );
      if (dt[PlayerId].towns[tList[i]].trade === null) {
        dt[PlayerId].towns[tList[i]].trade = new dt.trade(
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          []
        );
      }
      // Load any research info for this town
      dt[PlayerId].towns[tList[i]].research = JSON.parse(
        locStorage.getItem(tList[i] + ":research")
      );
      if (dt[PlayerId].towns[tList[i]].research === null) {
        dt[PlayerId].towns[tList[i]].research = {
          1: ["No data"],
          2: ["No data"],
          3: ["No data"],
          4: ["No data"],
          5: ["No data"],
          6: ["No data"],
          7: ["No data"],
          8: ["No data"],
        };
      }

      // Load any allembine quest info in local storage
      dt[PlayerId].towns[tList[i]].allembine = JSON.parse(
        locStorage.getItem(tList[i] + ":allem")
      );
      if (dt[PlayerId].towns[tList[i]].allembine === null) {
        dt[PlayerId].towns[tList[i]].allembine = {
          1: { a: "false" },
          2: { a: "false" },
          3: { a: "false" },
          4: { a: "false", b: "false" },
          5: { a: "false" },
          6: { a: "false" },
          7: { a: "false", b: "false" },
          8: { a: "false", b: "false" },
          9: { a: "false" },
          10: { a: "false" },
          11: { a: "false" },
          12: { a: "false" },
          13: { a: "false", b: "false" },
          14: { a: "false" },
          15: { a: "false", b: "false" },
          16: { a: "false" },
          17: { a: "false" },
          18: { a: "false" },
          19: { a: "false", b: "false" },
          20: { a: "false" },
        };
      }
      // Load any prod queue info in local storage
      dt[PlayerId].towns[tList[i]].prod2 = JSON.parse(
        locStorage.getItem(tList[i] + ":prod2")
      );
      if (
        dt[PlayerId].towns[tList[i]].prod2 === null ||
        dt[PlayerId].towns[tList[i]].prod2.hasOwnProperty("diplo")
      ) {
        if (dt[PlayerId].towns[tList[i]].prod2 !== null) {
          prodUpgraded = true;
        }
        dt[PlayerId].towns[tList[i]].prod2 = [];
      }
      // Load any building lvl info in local storage
      dt[PlayerId].towns[tList[i]].plots = JSON.parse(
        locStorage.getItem(tList[i] + ":plots")
      );
      if (dt[PlayerId].towns[tList[i]].plots === null) {
        dt[PlayerId].towns[tList[i]].plots = new dt.plots();
      }
      // Load any sov level info in local storage
      dt[PlayerId].towns[tList[i]].sov = JSON.parse(
        locStorage.getItem(tList[i] + ":sov")
      );
      if (dt[PlayerId].towns[tList[i]].sov === null) {
        dt[PlayerId].towns[tList[i]].sov = {};
      }
    }
    // Load the prodNotices array
    dt[PlayerId].prodNotices = JSON.parse(
      locStorage.getItem(PlayerId + ":prodNotices")
    );
    if (dt[PlayerId].prodNotices === null) {
      dt[PlayerId].prodNotices = [];
    }
    // Load the sovNotices array
    dt[PlayerId].sovNotices = JSON.parse(
      locStorage.getItem(PlayerId + ":sovNotices")
    );
    if (dt[PlayerId].sovNotices === null) {
      dt[PlayerId].sovNotices = [];
    }
    // Load the sov array
    dt[PlayerId].sov = JSON.parse(locStorage.getItem(PlayerId + ":sov"));
    if (dt[PlayerId].sov === null) {
      dt[PlayerId].sovs = [];
    }
    // Load any trade hub info in local storage
    dt[PlayerId].hubs = JSON.parse(locStorage.getItem(PlayerId + ":hubs"));
    if (dt[PlayerId].hubs === null) {
      dt[PlayerId].hubs = {};
    }
    // Setup checking of production queues
    var everythingLoaded = setInterval(function () {
      if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);
        dtRead();
        /*     		    if(document.querySelector("#gmBeepToggle") !== null){
    				// Set the GM Beep menu entry
	    			GMbeep = dt[PlayerId].gmBeep;
		    		var currentState = document.querySelector("#gmBeepToggle").textContent;
			    	var rd = document.querySelector("#gmBeepToggle");
				    if (GMbeep == true) {
	    				rd.textContent = "Disable GM Beep";
		    		} else {
			    		rd.textContent = "Enable GM Beep";
				    }
    		    }
    		    if(document.querySelector("#triviaToggle") !== null){
    				// Set the trivia filter menu entry
	    			trivia = dt[PlayerId].trivia;
		    		var currentState = document.querySelector("#triviaToggle").textContent;
			    	var rd = document.querySelector("#triviaToggle");
				    if (trivia == true) {
	    				rd.textContent = "Disable Trivia Filter";
		    		} else {
			    		rd.textContent = "Enable Trivia Filter";
				    }
    		    }
    		    if(document.querySelector("#smileysToggle") !== null){
    				// Set the smileys menu entry
	    			smileys = dt[PlayerId].smileys;
		    		var currentState = document.querySelector("#smileysToggle").textContent;
			    	var rd = document.querySelector("#smileysToggle");
				    if (smileys == true) {
	    				rd.textContent = "Disable smileys";
		    		} else {
			    		rd.textContent = "Enable smilies";
				    }
    		    }
				// Set the listeners for map display items
				if(document.querySelectorAll("#colourSetter fieldset") !== null){
    				var spans = document.querySelectorAll("#colourSetter fieldset");
	    			for (var i = 0; i < spans.length; i++) {
		    			spans[i].addEventListener("click", dt.mapTools.saveSettings);
			    	}
				}
 */
        /* =====================================================================================================================
PROBLEM SECTION - TEMP DISABLED
========================================================================================================================
*/
        //				dt.pcReq.init();
        //				dt.production.setup();
        /* =====================================================================================================================
END OF PROBLEM SECTION - TEMP DISABLED
========================================================================================================================
*/

        /* if(typeof prodUpgraded !== 'undefined' && prodUpgraded === true){
                    window.alert("Your production queue monitors have been reset as part of the upgrade to the new version of the production monitoring queues. Please re-scan the train unit and production overview pages in each town.");
				}
			}
			// Open the mail database
			try {
				if (!dt.mdb) {
					dt.mailsearch();
				}
			} catch (error) {
			}
			try{
			    if(dt.invent){
			        dt.rUpdTimerID = window.setInterval(dt.invent.getBaseRes2, 10000);
			    }
			} catch (error){
			    
			}
 */
        if (document.querySelector("#smileysToggle") !== null) {
          // Set the smileys menu entry
          smileys = dt[PlayerId].smileys;
          var currentState =
            document.querySelector("#smileysToggle").textContent;
          var rd = document.querySelector("#smileysToggle");
          if (smileys == true) {
            rd.textContent = "Disable smileys";
          } else {
            rd.textContent = "Enable smilies";
          }
        }
        if (document.querySelector("#gmBeepToggle") !== null) {
          // Set the GM Beep menu entry
          GMbeep = dt[PlayerId].gmBeep;
          var currentState =
            document.querySelector("#gmBeepToggle").textContent;
          var rd = document.querySelector("#gmBeepToggle");
          if (GMbeep == true) {
            rd.textContent = "Disable GM Beep";
          } else {
            rd.textContent = "Enable GM Beep";
          }
        }
        // Set the listeners for map display items
        if (document.querySelectorAll("#colourSetter fieldset") !== null) {
          var spans = document.querySelectorAll("#colourSetter fieldset");
          for (var i = 0; i < spans.length; i++) {
            spans[i].addEventListener("click", dt.mapTools.saveSettings);
          }
        }
      }
    }, 10);
  }
}

function dtRead() {
  //    debugger
  const names = [];
  dtdata();
  dtbuildings();
  dtcrafting();
  dthod();
  dtdiplo();
  dtgm();
  dtui();
  dtaudrey();
  dtexport();
  dthod();
  dthubs();
  dtidb11();
  dtinvent();
  dtmail();
  dtmailfolders();
  dtmailsearch();
  dtmaptools();
  dtmessagescan();
  dtmilitary();
  dtmisc();
  dtmovcoord();
  dtpcreq();
  dtpopupw();
  dtprod();
  dtprofutils();
  dtprojresuse();
  dtquests();
  dtresearch();
  dtsmileys();
  dtsov();
  dttrade();
  dtunitskilled();
  dttracker();
  dt.pcReq.init();
  dtintercept();
  dtrmaptools();
  dtrmutools();
  //dttheme();
  tablesearch();
  // if([418074,422387,369859].includes(PlayerId)){
  //     var mapMenu = document.querySelector(".nav li>ul");
  //     // newLi = document.createElement("li");
  //     // newLi.innerHTML = '<span onclick="dtr.showGetCamps()">Camp Scan</span>';
  //     // mapMenu.appendChild(newLi);
  //     newLi = document.createElement("li");
  //     newLi.innerHTML = '<span onclick="dtr.showMU()">Moving Units Scan</span>';
  //     mapMenu.appendChild(newLi);

  // }
}

function checkTheme() {
  if (!dt.theme) {
    dttheme();
  }
  dt.theme.show();
}

function stringsToSecs(strings) {
  let totalSecs = 0;
  let separated = [];
  let t = [];
  for (let i = 0; i < strings.length; i++) {
    t = strings[i].split(" ");
    for (let j = 0; j < t.length; j++) {
      separated.push(t[j]);
    }
  }
  separated.forEach((element) => {
    // switch dependant on the last char of the element
    t = element.substring(0, element.length - 1);
    switch (element.at(-1)) {
      case "s":
        // seconds
        totalSecs += Number(t);
        break;
      case "m":
        // minutes
        totalSecs += Number(t) * 60;
        break;
      case "h":
        // hours
        totalSecs += Number(t) * 3600;
        break;
      case "d":
        // days
        totalSecs += Number(t) * (24 * 3600);
        break;
    }

    //      console.log({ element });
  });
  //    console.log("Total Secs: ",totalSecs);
  return totalSecs;
}
/* Function: getHubList
 * Parse the HubId element to get a list of all the hubs this player has items stored at or trade units located in.
 *
 */
dt.getHubList = function () {
  if (document.querySelector("#HubId") !== null) {
    var hubSelect = document.getElementById("HubId");
    var hubOpts = hubSelect.getElementsByTagName("option");
    var numHubs = hubOpts.length;
    dt[PlayerId].hubs.list = [];
    dt[PlayerId].hubs.numHubs = numHubs;
    var list = [];
    for (var i = 0; i < numHubs; i++) {
      var hubId = hubOpts.item(i).getAttribute("value");
      var optText = hubOpts.item(i).textContent;
      var name = optText.split("-").join("");
      // Remove everything past '('
      name = name.split("[")[0];
      name = name.trim();
      if (hubId == 0) {
        var traders = 0;
        var vans = 0;
      } else {
        var vanStart = parseInt(optText.lastIndexOf("Caravans:"));
        var goodStart = parseInt(optText.lastIndexOf("Goods:"));
        var traderStart = parseInt(optText.lastIndexOf("Traders:"));
        var traders = hubOpts
          .item(i)
          .textContent.substring(traderStart, goodStart);
        traders = dt.replaceAll(traders, "Traders:", "");
        traders = traders.trim();
        var vans = optText.substring(vanStart);
        vans = dt.replaceAll(traders, "Caravans:", "");
        vans = vans.trim();
      }
      if (dt[PlayerId].hubs.hasOwnProperty(hubId) === false) {
        dt[PlayerId].hubs[hubId] = new dt.hubs(
          name,
          "",
          "",
          traders,
          vans,
          new dt.inv(0, {}, {}, {}, {}, {}, {}, {}, {})
        );
      } else {
        dt[PlayerId].hubs[hubId].name = name;
      }
      dt[PlayerId].hubs.list.push(hubId);
    }
    dt[PlayerId].hubs.list.sort();
  }
};
dt.getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
/* Function: clearData
 * Displays a form to allow the selection of various items of collected data to clear.
 */
dt.clearData = function () {
  var optList = document.querySelector("#dt_townSelector");
  optList.innerHTML = "";
  var numTowns = dt[PlayerId].towns.list.length;
  var tList = dt[PlayerId].towns.list;
  for (var i = 0; i < numTowns; i++) {
    $("#dt_townSelector").append(
      "<option value=" +
        tList[i] +
        ">" +
        dt[PlayerId].towns[tList[i]].name +
        "</option>"
    );
  }
  dt.showTool("#clearDataHtml");
  //    where.setAttribute('class', 'see');
};
/* Function: doClear
 * Function to remove selected data from both local storage and the DOM.
 *
 */
dt.doClear = function () {
  var dataSets = {
    inv: false,
    mil: false,
    allembine: false,
    diplo: false,
    prod: false,
    trade: false,
  };
  var clearTowns = [];
  var x = document.querySelector("#clearWhat");
  for (var i = 0; i < 6; i++) {
    if (x.elements[i].checked === true) {
      var setName = x.elements[i].name;
      dataSets[setName] = true;
    }
  }
  var t = x.elements[6];
  for (var i = 0; i < t.options.length; i++) {
    if (t.options[i].selected === true) {
      var name = t.options[i].value;
      clearTowns.push(name);
    }
  }
  if (clearTowns.length > 0) {
    for (var i = 0; i < clearTowns.length; i++) {
      var twn = clearTowns[i];
      if (dataSets.prod === true) {
        var key = clearTowns[i] + ":prod";
        locStorage.removeItem(key);
        dt[PlayerId].towns[clearTowns[i]].prod = {};
      }
      if (dataSets.trade === true) {
        var key = clearTowns[i] + ":trade";
        locStorage.removeItem(key);
        dt[PlayerId].towns[clearTowns[i]].trade = new dt.trade(
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        );
      }
      if (dataSets.inv === true) {
        var key = clearTowns[i] + ":inv";
        locStorage.removeItem(key);
        dt[PlayerId].towns[clearTowns[i]].inv = new dt.inv(
          0,
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        );
        dt[PlayerId].towns[clearTowns[i]].inv.res = {
          Gold: { id: "i=4|1", held: 0, rate: 0, classes: " resIcon ico-gold" },
          Wood: { id: "i=1|1", held: 0, rate: 0, classes: " resIcon ico-wood" },
          Clay: { id: "i=1|2", held: 0, rate: 0, classes: " resIcon ico-clay" },
          Iron: { id: "i=1|3", held: 0, rate: 0, classes: " resIcon ico-iron" },
          Stone: {
            id: "i=1|4",
            held: 0,
            rate: 0,
            classes: " resIcon ico-stone",
          },
          Food: { id: "i=1|5", held: 0, rate: 0, classes: " resIcon ico-food" },
          Mana: { id: "i=2|1", held: 0, rate: 0, classes: " resIcon ico-mana" },
          Research: {
            id: "i=2|2",
            held: 0,
            rate: 0,
            classes: " resIcon ico-research",
          },
          Horse: {
            id: "i=3|1",
            held: 0,
            rate: 0,
            classes: " resIcon ico-horses",
          },
          Livestock: {
            id: "i=3|2",
            held: 0,
            rate: 0,
            classes: " resIcon ico-livestock",
          },
          Beer: {
            id: "i=3|12",
            held: 0,
            rate: 0,
            classes: " resIcon ico-beer",
          },
          Book: {
            id: "i=3|7",
            held: 0,
            rate: 0,
            classes: " resIcon ico-books",
          },
          Spear: {
            id: "i=3|5",
            held: 0,
            rate: 0,
            classes: " resIcon ico-spears",
          },
          Sword: {
            id: "i=3|3",
            held: 0,
            rate: 0,
            classes: " resIcon ico-swords",
          },
          Bow: { id: "i=3|4", held: 0, rate: 0, classes: " resIcon ico-bows" },
          Saddle: {
            id: "i=3|6",
            held: 0,
            rate: 0,
            classes: " resIcon ico-saddles",
          },
          "Leather Armour": {
            id: "i=3|8",
            held: 0,
            rate: 0,
            classes: " resIcon ico-leather",
          },
          Chainmail: {
            id: "i=3|9",
            held: 0,
            rate: 0,
            classes: " resIcon ico-chainmail",
          },
          "Plate Armour": {
            id: "i=3|10",
            held: 0,
            rate: 0,
            classes: " resIcon ico-plate",
          },
          "Siege Block": {
            id: "i=3|11",
            held: 0,
            rate: 0,
            classes: " resIcon ico-siege",
          },
        };
      }
      if (dataSets.allembine === true) {
        var key = clearTowns[i] + ":allembine";
        locStorage.removeItem(key);
        dt[PlayerId].towns[clearTowns[i]].allembine = {
          1: { a: "false" },
          2: { a: "false" },
          3: { a: "false" },
          4: { a: "false", b: "false" },
          5: { a: "false" },
          6: { a: "false" },
          7: { a: "false", b: "false" },
          8: { a: "false", b: "false" },
          9: { a: "false" },
          10: { a: "false" },
          11: { a: "false" },
          12: { a: "false" },
          13: { a: "false", b: "false" },
          14: { a: "false" },
          15: { a: "false", b: "false" },
          16: { a: "false" },
          17: { a: "false" },
          18: { a: "false" },
          19: { a: "false", b: "false" },
          20: { a: "false" },
        };
      }
      if (dataSets.diplo === true) {
        var key = clearTowns[i] + ":diplo";
        locStorage.removeItem(key);
        dt[PlayerId].towns[clearTowns[i]].diplo = new dt.diplo(
          { t1: [], t2: [] },
          { t1: [], t2: [] },
          { t1: [], t2: [] },
          { t1: [], t2: [] },
          { t1: [], t2: [] },
          []
        );
      }
      if (dataSets.mil === true) {
        var key = clearTowns[i] + ":mil";
        locStorage.removeItem(key);
        dt[PlayerId].towns[clearTowns[i]].mil = new dt.mil(
          {},
          {
            spear: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            inf: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            range: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            cav: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            siege: {
              t1: { pool: 0, build: 0, armies: 0 },
              t2: { pool: 0, build: 0, armies: 0 },
            },
            tournament: { pool: 0, build: 0, armies: 0 },
          },
          {},
          { atk: 0, spearDef: 0, infDef: 0, bowDef: 0, cavDef: 0 }
        );
      }
    }
  }

  dt.clearData();
};
/* Function: ajaxFactionTroops
 * jQuery function to send details of a faction troop sighting to the server.
 *
 * Parameters:
 * data - object. The data to be sent.
 */
dt.ajaxFactionTroops = function (data) {
  $.ajax({
    url: "https://www.factionaction.dewt.me.uk/php/addSightings.php",
    data: data,
    type: "POST",
    dataType: "json",
    cache: false,
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    success: function () {},
    error: function (jqXHR, textStatus, errorThrown) {
      alert("You can not send Cross Domain AJAX requests: " + errorThrown);
    },
  });
};
/* Function: logEntry
 * Add an entry to the log div
 *
 * Parameter:
 * msg - string. The message to be added.
 */
dt.logEntry = function (msg) {
  var parent = document.getElementById("dt_log");
  newElement = document.createElement("p");
  newElement.textContent = msg;
  parent.insertBefore(newElement, parent.firstChild);
};
/* Function: moduleHelp
 * Creates and opens a popup with the help info for the tool that called it.
 *
 * Parameters:
 * title - string. The title for the popup.
 * contents - string. The html code for the contents of the popup.
 */
dt.moduleHelp = function (title, contents) {
  if (!document.getElementById("dt_" + title + "help")) {
    var thishlp = dt.addElement(
      document.getElementsByTagName("body").item(0),
      "div",
      ["title", "id"],
      [title, "dt_" + title + "help"]
    );
    thishlp.innerHTML = contents;
  }
  $(function () {
    $("#dt_" + title + "help").dialog();
  });
};
/* Method: removeRows
 * Remove all the rows from the body of a table.
 *
 * Parameter:
 * tbl - object reference. The table to remove the rows from.
 */
dt.removeRows = function (tbl) {
  var bdy = tbl.querySelector("tbody");
  if (bdy.hasChildNodes()) {
    while (bdy.firstChild) {
      bdy.removeChild(bdy.firstChild);
    }
  }
};
dt.secondsToString2 = function (seconds) {
  seconds = Math.abs(seconds);
  retval = "";
  var numdays = Math.floor(seconds / 86400);
  var numhours = ((seconds % 86400) / 3600).toFixed(1);
  var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
  var numseconds = ((seconds % 86400) % 3600) % 60;
  if (numdays > 0) {
    retval = numdays + "d ";
  }
  if (numhours > 0) {
    retval = retval + numhours + "h";
  }
  if (retval == "") {
    retval = "-";
  }
  //return numdays + "d " + numhours + "h";
  return retval.trim();
};
