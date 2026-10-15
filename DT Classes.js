dtclasses = function () {
  dt.classes = {
    Player: function (name, alliance) {
      this.name = name;
      this.alliance = alliance;
      this.towns = {};
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
    Town: function (name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.plots = new dt.classes.Plots();
      this.inv = new dt.classes.Inv(0);
      this.trade = new dt.classes.Trade();
      this.diplo = new dt.classes.Diplo();
    },
    /* Object: plots
     * Holds data on the building plots available to a particular town.
     *
     * Properties:
     * resource - object. Information on the resource plots available to this city. It is a collection of 25 objects each of which holds an array with the name of the building present and the current level.
     * internal - object. Information on the internal building plots available to this city. It is a collection of 25 objects each of which holds an array with the name of the building present and the current level.
     */
    Plots: function () {
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
    Hubs: function (name, x, y, traders, vans, inv) {
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
    Inv: function (
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
      // if (Object.getOwnPropertyNames(res).length > 0) {
      //   this.res = res;
      // } else {
      this.res = {
        Gold: {
          id: "i=4|1",
          held: 0,
          rate: 0,
          classes: " resIcon ico-gold",
        },
        Wood: {
          id: "i=1|1",
          held: 0,
          rate: 0,
          classes: " resIcon ico-wood",
        },
        Clay: {
          id: "i=1|2",
          held: 0,
          rate: 0,
          classes: " resIcon ico-clay",
        },
        Iron: {
          id: "i=1|3",
          held: 0,
          rate: 0,
          classes: " resIcon ico-iron",
        },
        Stone: {
          id: "i=1|4",
          held: 0,
          rate: 0,
          classes: " resIcon ico-stone",
        },
        Food: {
          id: "i=1|5",
          held: 0,
          rate: 0,
          classes: " resIcon ico-food",
        },
        Mana: {
          id: "i=2|1",
          held: 0,
          rate: 0,
          classes: " resIcon ico-mana",
        },
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
        Bow: {
          id: "i=3|4",
          held: 0,
          rate: 0,
          classes: " resIcon ico-bows",
        },
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
      //}
      this.mounts = {};
      this.weapons = {};
      this.armour = {};
      this.anatomies = {};
      this.minerals = {};
      this.herbs = {};
      this.exotic = {};
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
    Trade: function () {
      this.van = 0;
      this.cotter = 0;
      this.herbalist = 0;
      this.miner = 0;
      this.skinner = 0;
      this.trader = 0;
      this.storedTrades = [];
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
    Diplo: function (
      scout = 0,
      spy = 0,
      thief = 0,
      saboteur = 0,
      assassin = 0,
      messenger = 0,
      envoy = 0
    ) {
      this.scout = scout;
      this.spy = spy;
      this.thief = thief;
      this.saboteur = saboteur;
      this.assassin = assassin;
      this.messenger = messenger;
      this.envoy = envoy;
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
  };
};