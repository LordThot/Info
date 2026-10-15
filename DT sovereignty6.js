/* File: sovereignty5.js
 * Holds information on sovereignty bonuses in-game and methods to find and 
 * store the ones available to each town as well as the current sov levels and 
 * sov building levels.
 */

/* Class: dt.sov
 * Holds data regarding sovereignty bonuses and methods for reporting on it.
 * 
 * Objects:
 * Bonuses - Details of the bonus available on each type of terrain.
 * 
 * Methods:
 * sovAvail - Return information on the sovereign bonuses available within 3 
 * squares of the map center.
 * getSovDetails - Gather details of current sov lvls and buildings for the current town.
 */
dtsov = function(){
    dt.sov = {
        ver:6,
        Bonuses: {
            0: {},
            1: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            2: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            3: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            4: {"type": "Town", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            5: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            6: {"type": "Rich Clay Seam", "combat": "Large Hill", "sov": {bldg: "Papermill", item: "Books", change: "3"}},
            7: {"type": "Abundant Clay", "combat": "Large Hill", "sov": {bldg: "Papermill", item: "Books", change: "2"}},
            8: {"type": "Exposed Clay", "combat": "Small Hill", "sov": {bldg: "Renderer", item: "Leather Armour", change: "1"}},
            9: {"type": "Clay Seam", "combat": "Small Hill", "sov": {bldg: "Renderer", item: "Leather Armour", change: "3"}},
            10: {"type": "Turned Clay", "combat": "Large Hill", "sov": {bldg: "Bridlemaker", item: "Saddles", change: "2"}},
            11: {"type": "Heavy Clay Seam", "combat": "Small Hill", "sov": {bldg: "Bridlemaker", item: "Saddles", change: "1"}},
            12: {"type": "Abundant Crops", "combat": "Plains", "sov": {bldg: "Brewer's Yard", item: "Beer", change: "3"}},
            13: {"type": "Bountiful Land", "combat": "Plains", "sov": {bldg: "Cattle Rancher", item: "Livestock", change: "3"}},
            14: {"type": "Fertile Pasture", "combat": "Plains", "sov": {bldg: "Jousting Yard", item: "Cavalry Units", change: "2"}},
            15: {"type": "Fertile Orchard", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            16: {"type": "Alluvial Plain", "combat": "Plains", "sov": {bldg: "Cattle Rancher", item: "Livestock", change: "1"}},
            17: {"type": "Fertile Ground", "combat": "Plains", "sov": {bldg: "Farrier", item: "Horses", change: "1"}},
            18: {"type": "Lake", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            19: {"type": "Loch", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            20: {"type": "Volcanic Peak", "combat": "Impassable", "sov": {bldg: "", item: "", change: ""}},
            21: {"type": "Fiery Mountain", "combat": "Impassable", "sov": {bldg: "", item: "", change: ""}},
            22: {"type": "Canyon", "combat": "Impassable", "sov": {bldg: "", item: "", change: ""}},
            23: {"type": "Swampland", "combat": "Impassable", "sov": {bldg: "", item: "", change: ""}},
            24: {"type": "Craggy Peaks", "combat": "Large Mountain", "sov": {bldg: "Armourer", item: "Chainmail", change: "3"}},
            25: {"type": "Bleak Mountains", "combat": "Large Mountain", "sov": {bldg: "Finishing School", item: "Diplomatic", change: "2"}},
            26: {"type": "Lonely Peaks", "combat": "Large Mountain", "sov": {bldg: "Plate Forger", item: "Plate Armour", change: "1"}},
            27: {"type": "Sharp Crags", "combat": "Small Mountain", "sov": {bldg: "Bladesmith", item: "Swords", change: "3"}},
            28: {"type": "Treacherous Mountains", "combat": "Small Mountain", "sov": {bldg: "Brewer's Yard", item: "Beer", change: "2"}},
            29: {"type": "Mountains", "combat": "Small Mountain", "sov": {bldg: "Bladesmith", item: "Swords", change: "1"}},
            30: {"type": "Scrubland", "combat": "Plains", "sov": {bldg: "Finishing School", item: "Diplomatic Units", change: "1"}},
            31: {"type": "Clearing", "combat": "Plains", "sov": {bldg: "Target Range", item: "Ranged Units", change: "1"}},
            32: {"type": "Tundra", "combat": "Plains", "sov": {bldg: "Training Ground", item: "Spear Units", change: "1"}},
            33: {"type": "Open Plains", "combat": "Plains", "sov": {bldg: "Jousting Yard", item: "Cavalry Units", change: "1"}},
            34: {"type": "Moor", "combat": "Plains", "sov": {bldg: "Military Academy", item: "Infantry Units", change: "1"}},
            35: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            36: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            37: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            38: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            39: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            40: {"type": "Standing Stones", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            41: {"type": "Barrow", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            42: {"type": "Abandoned Mineshaft", "combat": "Large Mountain", "sov": {bldg: "", item: "", change: ""}},
            43: {"type": "Ruined Tower", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            44: {"type": "Ancient Forest", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            45: {"type": "Dolmen", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            46: {"type": "Abundant Quarry", "combat": "Small Mountain", "sov": {bldg: "Plate Forger", item: "Plate Armour", change: "3"}},
            47: {"type": "Rich Quarry", "combat": "Small Mountain", "sov": {bldg: "Military Academy", item: "Infantry Units", change: "2"}},
            48: {"type": "Wooded Quarry", "combat": "Large Hill", "sov": {bldg: "Assembly Yard", item: "Siege Blocks", change: "1"}},
            49: {"type": "Rocky Outcrop", "combat": "Large Hill", "sov": {bldg: "Farrier", item: "Horses", change: "3"}},
            50: {"type": "Landslip", "combat": "Small Hill", "sov": {bldg: "Assembly Yard", item: "Siege Blocks", change: "2"}},
            51: {"type": "Stony Ground", "combat": "Large Hill", "sov": {bldg: "Armourer", item: "Chainmail", change: "1"}},
            52: {"type": "Thick Forest", "combat": "Large Forest", "sov": {bldg: "Bowyer", item: "Bows", change: "3"}},
            53: {"type": "Dense Forest", "combat": "Large Forest", "sov": {bldg: "Target Range", item: "Ranged Units", change: "2"}},
            54: {"type": "Forested Hilltop", "combat": "Large Forest", "sov": {bldg: "Bowyer", item: "Bows", change: "1"}},
            55: {"type": "Wooded Land", "combat": "Small Forest", "sov": {bldg: "Poleturner", item: "Spears", change: "3"}},
            56: {"type": "Wooded Glade", "combat": "Small Forest", "sov": {bldg: "Training Ground", item: "Spear Units", change: "2"}},
            57: {"type": "Light Woods", "combat": "Small Forest", "sov": {bldg: "Poleturner", item: "Spears", change: "1"}},
            58: {"type": "Plains", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            59: {"type": "Fresh Water", "combat": "Fresh Water", "sov": {bldg: "", item: "", change: ""}},
            60: {"type": "Tidal Water", "combat": "Tidal Water", "sov": {bldg: "", item: "", change: ""}},
            61: {"type": "Shallow Salt Water", "combat": "Shallow Salt Water", "sov": {bldg: "", item: "", change: ""}},
            62: {"type": "Ocean", "combat": "Ocean", "sov": {bldg: "", item: "", change: ""}},
            63: {"type": "Light Woods", "combat": "Small Forest", "sov": {bldg: "Poleturner", item: "Spears", change: "1"}},
            64: {"type": "Rocky Outcrop", "combat": "Large Hill", "sov": {bldg: "Farrier", item: "Horses", change: "3"}},
            65: {"type": "Clay Seam", "combat": "Small Hill", "sov": {bldg: "Renderer", item: "Leather Armour", change: "3"}},
            66: {"type": "Faction Hub", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            67: {"type": "Forbidden", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            68: {"type": "Barren Wastes", "combat": "Plains", "sov": {bldg: "Training Ground", item: "Spear Units", change: "3"}},
            69: {"type": "Glacier", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            70: {"type": "Frozen Ground", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            71: {"type": "Nunatak", "combat": "Small Mountain", "sov": {bldg: "Assembly Yard", item: "Siege Blocks", change: "3"}},
            72: {"type": "Scoured Bedrock", "combat": "Large Hill", "sov": {bldg: "Military Academy", item: "Infantry Units", change: "2"}},
            73: {"type": "Icefield", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            74: {"type": "Glacial Crevasse", "combat": "Large Hill", "sov": {bldg: "", item: "", change: ""}},
            75: {"type": "Ice cave", "combat": "Small Mountain", "sov": {bldg: "", item: "", change: ""}},
            76: {"type": "Tarn", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            77: {"type": "Rogen Moraine", "combat": "Large Hill", "sov": {bldg: "Target Range", item: "Ranged Units", change: "1"}, },
            78: {"type": "Moraine", "combat": "Small Mountain", "sov": {bldg: "Armourer", item: "Chainmail", change: "2"}},
            79: {"type": "Kame", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            80: {"type": "Drumlin", "combat": "Large Hill", "sov": {bldg: "", item: "", change: ""}},
            81: {"type": "Roche Moutonnee", "combat": "Small Mountain", "sov": {bldg: "Armourer", item: "Chainmail", change: "1"}},
            82: {"type": "Ice Holes", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            83: {"type": "Scrubland", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            84: {"type": "Permafrost", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            85: {"type": "Icy Moss", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            86: {"type": "Frosty Heath", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            87: {"type": "Lichen", "combat": "Plains", "sov": {bldg: "Cattle Rancher", item: "Livestock", change: "1"}},
            88: {"type": "Petrified Forest", "combat": "Small Forest", "sov": {bldg: "", item: "", change: ""}},
            89: {"type": "Swamp", "combat": "Small Hill", "sov": {bldg: "Bowyer", item: "Bows", change: "2"}},
            90: {"type": "Marsh", "combat": "Large Hill", "sov": {bldg: "Poleturner", item: "Spears", change: "3"}},
            91: {"type": "Bog", "combat": "Small Mountain", "sov": {bldg: "", item: "", change: ""}},
            92: {"type": "Mire", "combat": "Large Mountain", "sov": {bldg: "", item: "", change: ""}},
            93: {"type": "Sand Dune", "combat": "Large Hill", "sov": {bldg: "", item: "", change: ""}},
            94: {"type": "Oasis", "combat": "Small Forest", "sov": {bldg: "Cattle Rancher", item: "Livestock", change: "3"}, },
            95: {"type": "Playa", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            96: {"type": "Yardang", "combat": "Small Hill", "sov": {bldg: "", item: "", change: ""}},
            97: {"type": "Mesa", "combat": "Large Mountain", "sov": {bldg: "Plate Forger", item: "Plate Armour", change: "3"}},
            98: {"type": "Rocky Mountain", "combat": "Small Mountain", "sov": {bldg: "", item: "", change: ""}},
            99: {"type": "Hamada (Stone Plateau)", "combat": "Large Hill", "sov": {bldg: "", item: "", change: ""}},
            100: {"type": "Reg (Gravel Plain)", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            101: {"type": "Cactus", "combat": "Plains", "sov": {bldg: "Farrier", item: "Horses", change: "3"}},
            102: {"type": "Wadi ", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            103: {"type": "Tropical Foliage", "combat": "Small Forest", "sov": {bldg: "Bowyer", item: "Bows", change: "1"}},
            104: {"type": "Light Tropical Cover", "combat": "Small Forest", "sov": {bldg: "", item: "", change: ""}},
            105: {"type": "Palm Trees", "combat": "Small Forest", "sov": {bldg: "Poleturner", item: "Spears", change: "1"}},
            106: {"type": "Dense Foliage", "combat": "Large Forest", "sov": {bldg: "Papermill", item: "Books", change: "1"}},
            107: {"type": "Dense Tropical Forest", "combat": "Large Forest", "sov": {bldg: "Bowyer", item: "Bows", change: "2"}},
            108: {"type": "Tropical Hilltop ", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            109: {"type": "Monsoon Jungle", "combat": "Small Forest", "sov": {bldg: "Poleturner", item: "Spears", change: "2"}},
            110: {"type": "Jungle", "combat": "Small Forest", "sov": {bldg: "", item: "", change: ""}},
            111: {"type": "Damp Jungle", "combat": "Small Forest", "sov": {bldg: "", item: "", change: ""}},
            112: {"type": "Dense Jungle", "combat": "Large Forest", "sov": {bldg: "Poleturner", item: "Spears", change: "1"}},
            113: {"type": "Dense Monsoon Jungle", "combat": "Large Forest", "sov": {bldg: "Papermill", item: "Books", change: "2"}},
            114: {"type": "Monsoon Hilltop", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            115: {"type": "Light Rainforest", "combat": "Small Forest", "sov": {bldg: "", item: "", change: ""}},
            116: {"type": "Rainforest Canopy", "combat": "Small Forest", "sov": {bldg: "Bowyer", item: "Bows", change: "3"}},
            117: {"type": "Rainforest", "combat": "Small Forest", "sov": {bldg: "", item: "", change: ""}},
            118: {"type": "Dense Rainforest", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            119: {"type": "Thick Rainforest", "combat": "Large Forest", "sov": {bldg: "Papermill", item: "Books", change: "3"}},
            120: {"type": "Rainforest Hilltop", "combat": "Large Forest", "sov": {bldg: "Papermill", item: "Books", change: "3"}},
            121: {"type": "Succulents", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            122: {"type": "Dry tundra", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            123: {"type": "Geyser", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            124: {"type": "Faerie Ring", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            125: {"type": "Cairn", "combat": "Small Mountain", "sov": {bldg: "", item: "", change: ""}},
            126: {"type": "Lighthouse", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            127: {"type": "Stone Circle", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            128: {"type": "Mountain Cave", "combat": "Large Mountain", "sov": {bldg: "", item: "", change: ""}},
            129: {"type": "Pyramids", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            130: {"type": "Sphinx", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            131: {"type": "Obelisk", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            132: {"type": "Clock Tower", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            133: {"type": "Column", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            134: {"type": "Dragon Monument", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            135: {"type": "Heroic Human Statue", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            136: {"type": "Elf Monument", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            137: {"type": "Dwarf Monument", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            138: {"type": "Orc Monument", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            139: {"type": "Blessed Oak", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            140: {"type": "Ornamental Gardens", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            141: {"type": "Ornamental Gardens", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            142: {"type": "Mausoleum", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            143: {"type": "Dark Forest", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            144: {"type": "Ancient Lair", "combat": "Small Mountain", "sov": {bldg: "", item: "", change: ""}},
            145: {"type": "Abandoned Lodge", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            146: {"type": "Deserted Wayhouse", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            147: {"type": "Rockhewn Monastery", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            148: {"type": "House of the Spirits", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            149: {"type": "Forgotten Temple", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            150: {"type": "Hidden Temple", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            151: {"type": "Place of High Sacrifice", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            152: {"type": "Crooked House", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            153: {"type": "Deserted Monastery", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            154: {"type": "Dark Temple", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            155: {"type": "Gypsy Campsite", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            156: {"type": "Abandoned Campsite", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            157: {"type": "Fortune Teller", "combat": "Plains"},
            158: {"type": "Fortress of Shadows", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            159: {"type": "Ancient Claws", "combat": "Buildings"},
            160: {"type": "Gathering Place", "combat": "Plains"},
            161: {"type": "Temple of Reason", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            162: {"type": "Steamtastic Brewery", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            163: {"type": "Brewery Outbuildings", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            164: {"type": "Cylindroconical Vessels", "combat": "Buildings", "sov": {bldg: "", item: "", change: ""}},
            165: {"type": "Mystic Tomb", "combat": "Buildings"},
            166: {"type": "Corrupted Land", "combat": "Large Forest"},
            167: {"type": "Altar of Water", "combat": "Large Forest", "sov": {bldg: "", item: "", change: ""}},
            168: {"type": "Altar of Fire", "combat": "Plains", "sov": {bldg: "", item: "", change: ""}},
            169: {"type": "Altar of Air", "combat": "Large Hill", "sov": {bldg: "", item: "", change: ""}},
            170: {"type": "Altar of Earth", "combat": "Large Mountain", "sov": {bldg: "", item: "", change: ""}},
            171: {"type": "Activated Standing Stones", "combat": "Plains"},
            172: {"type": "Bankside", "combat": "Plains"},
            173: {"type": "Beach", "combat": "Plains"},
            174: {"type": "Shallow Coastline", "combat": "Plains"},
            175: {"type": "Coast", "combat": "Plains"},
            176: {"type": "Coniferous Thick Forest", "combat": "Large Forest"},
            177: {"type": "Coniferous Dense Forest", "combat": "Large Forest"},
            178: {"type": "Coniferous Forested Hilltop", "combat": "Large Forest"},
            179: {"type": "Coniferous Wooded Land", "combat": "Small Forest"},
            180: {"type": "Coniferous Wooded Glade", "combat": "Small Forest"},
            181: {"type": "Coniferous Light Woods", "combat": "Small Forest"},
            182: {"type": "Snowy Thick Forest", "combat": "Large Forest"},
            183: {"type": "Snowy Dense Forest", "combat": "Large Forest"},
            184: {"type": "Snowy Forested Hilltop", "combat": "Large Forest"},
            185: {"type": "Snowy Wooded Land", "combat": "Small Forest"},
            186: {"type": "Snowy Wooded Glade", "combat": "Small Forest"},
            187: {"type": "Snowy Light Woods", "combat": "Small Forest"},
            188: {"type": "Temperate Thick Forest", "combat": "Large Forest"},
            189: {"type": "Temperate Dense Forest", "combat": "Large Forest"},
            190: {"type": "Temperate Forested Hilltop", "combat": "Large Forest"},
            191: {"type": "Temperate Wooded Land", "combat": "Small Forest"},
            192: {"type": "Temperate Wooded Glade", "combat": "Small Forest"},
            193: {"type": "Temperate Light Woods", "combat": "Small Forest"},
            194: {"type": "Scorched Forest", "combat": "Large Forest"},
            195: {"type": "Petrified Forest", "combat": "Large Forest"},
            196: {"type": "Deadvlei Forest", "combat": "Large Forest"},
            197: {"type": "Parched Bones", "combat": "Plains"},
            198: {"type": "Dead Water", "combat": "Ocean"},
            199: {"type": "Obsidian Mountain", "combat": "Obsidian Mountains"},
            200: {"type": "Glassy Crag", "combat": "Obsidian Mountains"},
            201: {"type": "Volcanic Mountain", "combat": "Obsidian Mountains"},
            202: {"type": "Lava Peak", "combat": "Obsidian Mountains"},
            203: {"type": "Active Peak", "combat": "Obsidian Mountains"},
            204: {"type": "Emerging Mountaintop", "combat": "Obsidian Mountains"},
            205: {"type": "Glassy Mountain", "combat": "Obsidian Mountains"},
            206: {"type": "Lava Pool", "combat": "Obsidian Mountains"},
            207: {"type": "Magma Rift", "combat": "Obsidian Mountains"},
            208: {"type": "Abandoned Lair", "combat": "Buildings"},
            209: {"type": "Ancient Graveyard", "combat": "Buildings"},
            210: {"type": "Broken Tower", "combat": "Buildings"},
            211: {"type": "Dormant Portal", "combat": "Buildings"},
            212: {"type": "Fallen Dwarfhold", "combat": "Buildings"},
            213: {"type": "Fortified Hostel", "combat": "Buildings"},
            214: {"type": "Lawstones", "combat": "Buildings"},
            215: {"type": "Sacrificial Altar", "combat": "Buildings"},
            216: {"type": "Tiki Pole", "combat": "Small Forest"},
            217: {"type": "Weeping Willow", "combat": "Small Forest"},
            218: {"type": "Crumbling Lighthouse", "combat": "Buildings"},
            219: {"type": "Fisherman's Hut", "combat": "Buildings"},
            220: {"type": "Seahenge", "combat": "Buildings"},
            221: {"type": "Ferry Post", "combat": "Buildings"},
            222: {"type": "Head Statue", "combat": "Buildings"},
            223: {"type": "Jungle Standing Stones", "combat": "Buildings"},
            224: {"type": "Shattered Head", "combat": "Buildings"},
            225: {"type": "Shipwreck", "combat": "Buildings"},
            226: {"type": "Shipwreck", "combat": "Buildings"},
            227: {"type": "Shipwreck", "combat": "Buildings"},
            228: {"type": "Shipwreck", "combat": "Buildings"},
            229: {"type": "Shipwreck", "combat": "Buildings"}
        },
        unused: [125, 126, 132, 133, 134, 136, 137, 138, 140, 141, 154, 159, 160, 165, 166, 171, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229],
        setup: function(){
            dt.sov.fullCompleteCheck();
            dt.sov.updateFlag();
        },
        sovAvail: function () {
            if (dt.mapTools.checkHash()) {
                var cX = mapData.x;
                var cY = mapData.y;
                var header = "Sov available within 3sqs of ";
                document.querySelector('#sgSovHtml h4').textContent = header + ' ' + cX + '|' + cY;
                var results = {
                    1: {'Saddles': 0, 'Books': 0, 'Beer': 0, 'Livestock': 0, 'Horses': 0, 'Bows': 0, 'Spears': 0, 'Swords': 0, 'Plate Armour': 0, 'Chainmail': 0, 'Leather Armour': 0, 'Siege Equip': 0, 'Cavalry Units': 0, 'Infantry Units': 0, 'Ranged Units': 0, 'Spear Units': 0, 'Diplomatic Units': 0},
                    2: {'Saddles': 0, 'Books': 0, 'Beer': 0, 'Livestock': 0, 'Horses': 0, 'Bows': 0, 'Spears': 0, 'Swords': 0, 'Plate Armour': 0, 'Chainmail': 0, 'Leather Armour': 0, 'Siege Equip': 0, 'Cavalry Units': 0, 'Infantry Units': 0, 'Ranged Units': 0, 'Spear Units': 0, 'Diplomatic Units': 0},
                    3: {'Saddles': 0, 'Books': 0, 'Beer': 0, 'Livestock': 0, 'Horses': 0, 'Bows': 0, 'Spears': 0, 'Swords': 0, 'Plate Armour': 0, 'Chainmail': 0, 'Leather Armour': 0, 'Siege Equip': 0, 'Cavalry Units': 0, 'Infantry Units': 0, 'Ranged Units': 0, 'Spear Units': 0, 'Diplomatic Units': 0}
                };
                var x = cX;
                var y = cY;
                var tRes = 0;
                var bonuses = [];
                for (x = cX - 3; x <= cX + 3; x++) {
                    for (y = cY - 3; y <= cY + 3; y++) {
                        tid = y + '|' + x
                        var terr = mapData.data[tid].i;
                        if (this.Bonuses[terr].hasOwnProperty('sov')) {
                            if (this.Bonuses[terr].sov.change !== '') {
                                // This sq has a bonus of some type so add it to the list if not there already
                                if (bonuses.indexOf(this.Bonuses[terr].sov.item) === -1) {
                                    bonuses.push(this.Bonuses[terr].sov.item);
                                }
                                // Check if the sq is 3 away in either x or y
                                if ((Math.abs(x - cX) === 3) || (Math.abs(y - cY) === 3)) {
                                    //Yes, so add it to the list for 3
                                    if (isNaN(parseInt(this.Bonuses[terr].sov.change))) {
                                        window.alert(tid, this.Bonuses[terr].sov.change);
                                    }
                                    results[3][this.Bonuses[terr].sov.item] += parseInt(this.Bonuses[terr].sov.change);
                                } else {
                                    // Check if it is 2 sq away
                                    if ((Math.abs(x - cX) === 2) || (Math.abs(y - cY) === 2)) {
                                        if (isNaN(parseInt(this.Bonuses[terr].sov.change))) {
                                            window.alert(tid, this.Bonuses[terr].sov.change);
                                        }
                                        results[2][this.Bonuses[terr].sov.item] += parseInt(this.Bonuses[terr].sov.change);
                                    } else {
                                        // Check if it is 1 sq away
                                        if ((Math.abs(x - cX) === 1) || (Math.abs(y - cY) === 1)) {
                                            if (isNaN(parseInt(this.Bonuses[terr].sov.change))) {
                                                window.alert(tid, this.Bonuses[terr].sov.change);
                                            }
                                            results[1][this.Bonuses[terr].sov.item] += parseInt(this.Bonuses[terr].sov.change);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var tbl = document.querySelector('#sovPossTbl');
                dt.removeRows(tbl);
                var tbody = tbl.querySelector('tbody');
                for (var i = 0; i < bonuses.length; i++) {
                    var row = tbody.insertRow(-1);
                    var cell = row.insertCell(0);
                    cell.innerText = bonuses[i];
                    cell = row.insertCell(1);
                    cell.innerText = results[1][bonuses[i]];
                    cell = row.insertCell(2);
                    cell.innerText = results[2][bonuses[i]];
                    cell = row.insertCell(3);
                    cell.innerText = results[3][bonuses[i]];
                    cell = row.insertCell(4);
                    cell.innerText = results[1][bonuses[i]] + results[2][bonuses[i]] + results[3][bonuses[i]];
                }
                dt.showTool("#sgSovHtml");
                var rubbish = '';
            }
        },
        resSov: function () {
            var thisTile = [curMapX, curMapY];
            document.querySelector("#bonusMapCentre").textContent = "Res Bonus Map for " + thisTile.join("|");
            var xRange = [curMapX - 3, curMapX + 3];
            var yRange = [curMapY + 3, curMapY - 3];
    //        console.log("xRange: ", xRange);
    //        console.log("yRange: ", yRange);
            var ye = 0;
            var t = [];
            var wo = [];
            var cl = [];
            var ir = [];
            var st = [];
            var fo = [];
            var wot = document.querySelector("#woodB");
            dt.removeRows(wot);
            var clt = document.querySelector("#clayB");
            dt.removeRows(clt);
            var irt = document.querySelector("#ironB");
            dt.removeRows(irt);
            var stt = document.querySelector("#stoneB");
            dt.removeRows(stt);
            var fot = document.querySelector("#foodB");
            dt.removeRows(fot);
            // step through the Y range
            for (y = yRange[0]; y > yRange[1] - 1; y--) {
                var b = [];
                t.push(b);
                wo.push(b);
                cl.push(b);
                ir.push(b);
                st.push(b);
                fo.push(b);
                var wor = wot.insertRow(-1);
                var clr = clt.insertRow(-1);
                var irr = irt.insertRow(-1);
                var str = stt.insertRow(-1);
                var fdr = fot.insertRow(-1);
                // step through the X range
                var xe = 0;
                for (x = xRange[0]; x < xRange[1] + 1; x++) {
                    var r = mapData.data[y + "|" + x].rs.split("|");
                    if (r[4] > 7) {
                        var rubbish = "";
                    }
    //                console.log(mapData.data[y + "|" + x].rs, x, y);
                    //    console.log(ye);
                    //    t[ye][xe] = r;
                    wo[ye][xe] = r[0];
                    var c = wor.insertCell(xe);
                    c.textContent = r[0] / 5;
                    c.style.backgroundColor = this.getAlpha(r[0] / 5);
                    cl[ye][xe] = r[1];
                    var c = clr.insertCell(xe);
                    c.textContent = r[1] / 5;
                    c.style.backgroundColor = this.getAlpha(r[1] / 5);
                    ir[ye][xe] = r[2];
                    var c = irr.insertCell(xe);
                    c.textContent = r[2] / 5;
                    c.style.backgroundColor = this.getAlpha(r[2] / 5);
                    st[ye][xe] = r[3];
                    var c = str.insertCell(xe);
                    c.textContent = r[3] / 5;
                    c.style.backgroundColor = this.getAlpha(r[3] / 5);
                    fo[ye][xe] = r[4];
                    var c = fdr.insertCell(xe);
                    c.textContent = r[4] / 5;
                    c.style.backgroundColor = this.getAlpha(r[4] / 5);
                    xe += 1;
    //                    console.log(r);
                }
                ye += 1;
            }
    //        console.log("Wood:", wo, "Clay:", cl, "Iron:", ir, "Stone:", st, "Food:", fo);

            dt.showTool("#resBonuses");
        },
        getAlpha: function (v) {
            var tc = Number(v);
            var mv = tc / 5;
    //        console.log(tc/5);
            var a = mv - Math.floor(mv);
            a = Math.round(a * 100) / 100;
            if (tc == 5) {
                a = 1;
            }
    //        console.log("v:",v,"tc:",tc,"mv:",mv,"a:",a);
            var t = [0, 255, 0, a];
            var bc = "rgba(" + t.join(",") + ")";
            return bc;
        },

        /* Method: sovDisp
        * Build and display a table of all current sov lvls in all towns
        */
        sovDisp: function () {
            dt.showTool('#sovLvlsHtml');
    //        var target = document.getElementById('dt_output');
    //		dt.sovHoldingsTable = '<table  border="1" border-collapse="collapse" width="100%" id="twnSov"><tbody><tr><th class="eigth">Sov Lvl</th><th class="eigth">Building</th><th class="eigth">Bldg Lvl</th><th class="eigth">Complete</th></tr></table>';
    //		// The table for the display
    //		target.innerHTML = '';
    //		target.innerHTML = '<table><colgroup><col width="25%"><col></colgroup><tbody><tr><td id="townCol"></td><td id="sovCol"><div id="sovArea"></div>';
    //		document.getElementById('sovArea').innerHTML = dt.sovHoldingsTable;
    //		target.setAttribute('class', 'see');
            // Populate the list of towns
            var twnArea = document.querySelector("#sovLvlsHtml .townCol table");
            dt.removeRows(twnArea);
            var twnList = twnArea.querySelector("tbody");
    //		var twnArea = document.getElementById('sovCol');
    //		var twnList = dt.addElement(twnArea, 'table', ['border', 'border-collapse', 'class', 'width'], ['1', 'collapse', 'oddeven', '100%']);
    //		var tRow = dt.addElement(twnList, 'tr');
    //		var tCell = dt.addElement(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
    //		tCell.innerHTML = 'Location';
            //dt[PlayerId].towns.list.sort();
    //	var tRow = dt.addElement(twnList, 'tr');
    //	var tCell = dt.addElement(tRow, 'td', ['id', 'class', 'data'], ['-1', 'dthover', 'all']);
    //	tCell.innerHTML = 'Everywhere';
    //	tCell.setAttribute('onclick', 'dt.invSwitch("all",-1)');
    //	var tRow = dt.addElement(twnList, 'tr');
    //
    //	var tCell = dt.addElement(tRow, 'td', ['class', 'height'], ['titleCell', '29']);
    //	tCell.innerHTML = 'Towns';
            for (var i = 0; i < dt[PlayerId].towns.numTowns; i++) {
                var tRow = dt.addElement2(twnList, 'tr');
                var tCell = dt.addElement2(tRow, 'td', ['id', 'class', 'data'], [dt[PlayerId].towns.list[i], 'dthover', 'towns']);
                var thisTwn = dt[PlayerId].towns.list[i];
                tCell.innerHTML = dt[PlayerId].towns[thisTwn].name + " (" + dt[PlayerId].towns[thisTwn].sov.length + ")";
                tCell.setAttribute('onclick', 'dt.sov.sovSwitch(' + thisTwn + ')');
            }
            var rubbish = '';
            var sovArea = document.getElementById('sovCol');
            // Make the table visible and select the current town
    //		target.setAttribute('class', 'see');
            dt.sov.sovSwitch(CurrentTown);
        },
        sovSwitch: function (twn) {
            // Set the active town
            var townCol = document.querySelector('#sovLvlsHtml .townCol');
            var twns = townCol.getElementsByTagName('td');
            for (var i = 0; i < twns.length; i++) {
                twns.item(i).classList.remove("dtActive");
                // twns.item(i).setAttribute('class','');
            }
            document.getElementById(twn).classList.add("dtActive");
            var source = twn;
    //	var invSel = document.getElementById('invAreaSel');
    //	var invArea = invSel.getElementsByClassName('dtActive').item(0).getAttribute('id');
            var town = twn;
            var where = 'towns';
            //invAreaSel
            dt.sov.dispSovHeld(town);
        },
        dispSovHeld: function (town) {
    //	document.getElementById('sovArea').innerHTML = dt.sovHoldingsTable;
            dt.removeRows(document.querySelector('#twnSov'));
            var targetLoc = document.querySelector('#twnSov tbody');
            var sovData = dt[PlayerId].towns[town].sov;
            if (sovData !== null) {
                var numSovs = sovData.length;
                for (var i = 0; i < numSovs; i++) {
                    var thisSov = sovData[i];
                    var row = targetLoc.insertRow(-1);
    //                if (thisSov['state'] == 'Rising')
    //                    row.classList.add('green');
                    var cell = row.insertCell(0);
                    if (thisSov.claim['state'] == 'Rising')
                        cell.classList.add('green');
                    cell.innerText = thisSov.claim['lvl'];
                    cell = row.insertCell(1);
                    cell.innerText = thisSov.struct.bldg;
                    cell = row.insertCell(2);
                    cell.innerText = thisSov.struct.lvl;
                    if (thisSov.claim['lvl'] !== thisSov.struct.lvl) {
                        cell.classList.add("sovunequal");
                    } else {
                        cell.classList.remove("sovunequal");
                    }
                    cell = row.insertCell(3);
                    sovA = thisSov.struct.bonus.replace("[", "");
                    sovB = sovA.replace("\n %]", "%");
                    cell.innerText = sovB;
                    cell = row.insertCell(4);
                    cell.innerText = thisSov.claim.dist
                    cell = row.insertCell(5);
                    cell.className = "tCenter";
                    if(thisSov.claim.comp != ""){
                        let d = new Date(thisSov.claim.comp / 1);
                        let iEnd = d.toLocaleString(undefined, {weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC'});
                        cell.innerText = iEnd;
                    }
    //                cell.innerText = thisSov.comp.claim;
                    cell = row.insertCell(6);
                    cell.className = "tCenter";
                    if(thisSov.struct.comp != ""){
                        let d = new Date(thisSov.struct.comp / 1);
                        let iEnd = d.toLocaleString(undefined, {weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC'});
                        cell.innerText = iEnd;
                    }
    //                cell.innerText = thisSov.comp.bldg;
                    
                }
            }
        },

        showCharCode: function (str) {
            var biggie = '';
            for (cc = 0; cc < str.length; cc++) {
                var c = str.charCodeAt(cc);
                if ((c < 33) || (c > 126)) {
                    biggie = biggie + " #" + str.charCodeAt(cc) + " ";
                } else {
                    biggie = biggie + str[cc];
                }
            }
    //        console.log(biggie);
        },
        /* Updated to store details of claims etc in a new area of DurcTools
        dt[PlayerId].sov - array. Used to hold the details of any ongoing claims, structure upgrades, possible sov armies
        
        */
        getTownSovHeld: function (xhr, event) {
            // log the scan start
            var msg = "Scanning claimed sovereignty - " + dt[PlayerId].towns[CurrentTown].name;
            dt.logEntry(msg);
            if (!docfrag) {
                var docfrag = document.createDocumentFragment();
                var d = document.createElement("div");
                docfrag.appendChild(d);
            }
            var response = xhr.responseText.trim();
            var yr = new Date(event.timeStamp).getUTCFullYear();
            d.innerHTML = response;
            var twnSov = [];
            var sovonuses = [];
            // Check if there is a #sovAccordion element present and exit if not
            if ($('#sovAccordion').length > 0) {
                // Get the element holding each of the sov claims
                var sovAcc = d.querySelector("#sovAccordion");
                // Get any 'h3' elements in sovAcc. Each of these is a sov claim.
                var h3Tags = sovAcc.querySelectorAll("h3");
                // step through each of the sov claims 
                for (i = 0; i < h3Tags.length; i++) {
                    // Create a sov obj to hold all the data for this claim
                    var thisSovObj = {claim:{lvl: '',newLvl: '', state: '', coords: '', dist: '',comp:''},struct:{lvl: '',newLvl: '', bonus: '', bldg: '',comp:''}};
        //            var thisSovObj = {lvl: '',newLvl: '', state: '', coords: '', dist: '', struct: {lvl: '', bonus: '', bldg: ''},comp:{claim:'',bldg:''}};
                    // Get the spans in this h3 tag. These hold info about the claim and the building
                    var spans = h3Tags[i].querySelectorAll("span");
                    var spanTextL = spans[0].textContent;
                    partsL = spanTextL.split(String.fromCharCode(10, 10));
                    thisSovObj.claim.lvl = partsL[1].trim();
                    thisSovObj.claim.state = partsL[3].trim();
                    thisSovObj.claim.coords = partsL[4].split(" ")[2].trim();
                    thisSovObj.claim.dist = Number(dt.hypot(thisSovObj.claim.coords.split("|"), [dt[PlayerId].towns[CurrentTown].x, dt[PlayerId].towns[CurrentTown].y])).toFixed(2);
                    // Now get the completion info for the claim
                    // h3Tags[i].nextElementSibling.querySelector("tr:nth-child(8)").textContent.split("at")[1].trim()
                    var resolve = h3Tags[i].nextElementSibling.querySelector("tr:nth-child(8)").textContent.trim();
                    if(resolve != "There are no Sovereignty increases in progress."){
                        thisSovObj.claim.comp = this.makeTS(h3Tags[i].nextElementSibling.querySelector("tr:nth-child(8)").textContent.split("at")[1].trim());
                    }else{
                        thisSovObj.claim.comp = "";
                    }
                    // Find the element that begins with "Time To Lose Single Sovereign Level"
                    let hdrs = h3Tags[i].nextElementSibling.querySelectorAll("tr.hdr");
        //            console.log("hdrs",hdrs);
                    /*
                    hdr contents 
                    0 - holder
                    1 - where, dist, lvl, status
                    2 - whether there is a current claim underway
                    3 - costs
                    4 - table titles for location bonuses and struct costs
                    5 - location res bonus details
                    6 - structure hrly costs
                    7 - tbl hhrs for struct build options for current struct
                    8 - res hdrs for struct build options
                    9 - time to lose single sov lvl
                    10 - time to gain single sov lvl
                    */
                    
                    // Get the lvl info
                    var lInfo = hdrs[1].nextElementSibling.querySelectorAll("td")[2].textContent.trim();
        //			console.log("lInfo: ",lInfo);
                    if(thisSovObj.claim.state != "Balanced"){
                        var p = lInfo.split("(")[0].split("to ")[1].trim();
        //				console.log("newLvl:",p);
                    }else{
                        p = "";
                    }
                    thisSovObj.claim.newLvl = p;
                    // ui-progressbar-value
                    let pbar = h3Tags[i].nextElementSibling.querySelector("div.progBar");
                    if(pbar !== null){
                        thisSovObj.struct.comp = pbar.getAttribute("data").split("|")[1];
                        thisSovObj.struct.newLvl = pbar.parentElement.previousElementSibling.textContent.trim().split(" ").reverse()[0].trim();
                    }else{
                        thisSovObj.struct.comp = "";
                    }
                    // pbar.parentElement.previousElementSibling.textContent.trim().split(" ").reverse()[0].trim()
                    // h3Tags[i].nextElementSibling.querySelectorAll("tr")[31].querySelectorAll("tr>td")[0].querySelectorAll("td")[2].textContent.trim()
                    resolve = h3Tags[i].nextElementSibling.querySelectorAll("tr")[31].querySelectorAll("tr>td")[0].querySelectorAll("td")[2].textContent.trim();
                    var trs = h3Tags[i].nextElementSibling.querySelectorAll("tr.hdr").length;
        //            console.log("tr count: ",trs);
                    var thisEl = h3Tags[i].nextElementSibling.querySelectorAll("tr.hdr")[trs-2].previousElementSibling;
        //            console.log(thisEl);
        //            console.log(thisSovObj);
                    var spanTextR = spans[1].textContent;
                    if (!spanTextR.includes("No Structure Present")) {
                        thisSovObj.struct.bonus = "[" + spanTextR.split("[")[1].trim();
                        spanTextR = spanTextR.split("[")[0];
                        partsR = spanTextR.split(String.fromCharCode(10, 9, 10));
                        thisSovObj.struct.bldg = partsR[0].trim();
                        thisSovObj.struct.lvl = partsR[1].trim();
                    } else {
                        thisSovObj.struct.bldg = "None";
                    }
                    twnSov.push(thisSovObj);
                    if(thisSovObj.claim.comp !== ''){
                        storeObj = thisSovObj.claim;
                        storeObj.eType = "claim";
                        storeObj.tName = dt[PlayerId].towns[CurrentTown].name;
                        storeObj.tid = CurrentTown;
                        this.storeSovEvents(storeObj);
                    }
                    if(thisSovObj.struct.comp!== ''){
                        storeObj = thisSovObj.struct;
                        storeObj.eType = "struct";
                        storeObj.tName = dt[PlayerId].towns[CurrentTown].name;
                        storeObj.tid = CurrentTown;
                        this.storeSovEvents(storeObj);
                    }
                    
                    // Check if the structure can be upgraded
                    if (this.fromRoman(thisSovObj.lvl) > this.fromRoman(thisSovObj.struct.lvl)) {
                        // h3.ui-accordion-header:nth-child(3) > a:nth-child(2) > span:nth-child(2)
                        spans[1].classList.toggle("redB");
                        var dummy = "";
                    } else {
                        spans[1].classList.toggle("redB");
                        var dummy = "";

                    }
                }
                // Get the town name from the first table
                var t1 = sovAcc.querySelector('table');
                var townId = t1.querySelector("tr:nth-of-type(2) > td:nth-of-type(2)").textContent.split("|")[1];
                var rubbish = '';
                // Store the data
                dt[PlayerId].towns[townId].sov = twnSov;
                var key = CurrentTown + ':sov';
                locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].sov));
        //        console.log(dt[PlayerId].towns[CurrentTown].name,dt[PlayerId].towns[CurrentTown].sov);
        //        var rubbish = '';
                
                
                // log the scan end
                var msg = dt[PlayerId].towns[CurrentTown].name + " - claimed sovereignty scan finished.";
                dt.logEntry(msg);

                var rubbish = '';
                this.setRedSov();
            }    
        },
        
        toHHMMSS: function (s) {
        var sec_num = parseInt(s, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
        },
        
        storeSovEvents: function(sovObj){
            if(!dt[PlayerId].sov){
                dt[PlayerId].sov = [];
            }
            if(!dt[PlayerId].sov.includes(JSON.stringify(sovObj))){
                dt[PlayerId].sov.push(JSON.stringify(sovObj));
            }
            locStorage.setItem([PlayerId] + ":sov", JSON.stringify(dt[PlayerId].sov));
            console.log(dt[PlayerId].sov);
            
        },
        
        makeTS: function(s){
            // Split into date & time parts
            let p = s.split(" ");
            // Split the date into the day, month and year

            let yr = p[0].slice(-2);
            let month = p[0].slice(-5,-2);
            let day = p[0].slice(0,-5);
    //		console.log("day: "+day," month: "+month, " yr: "+yr);
            let ds = day + " " + month + " " + "20" + yr + " " + p[1] + ":00 GMT";
    //		console.log(ds);
            let ts = Date.parse(ds);
    //		console.log(ts);
            return ts;
        },

        /* Method: setRedSov
        * Set any sov structures that can be upgraded to have a red background
        */
        setRedSov: function () {
            var h3Tags = document.querySelectorAll("#sovAccordion h3");
            var twnSov = dt[PlayerId].towns[CurrentTown].sov;
            for (i = 0; i < h3Tags.length; i++) {
                var spans = h3Tags[i].querySelectorAll("a span");
                thisSovObj = twnSov[i];
                // Check if the structure can be upgraded
                if (this.fromRoman(thisSovObj.claim.lvl) > this.fromRoman(thisSovObj.struct.lvl)) {
                    // h3.ui-accordion-header:nth-child(3) > a:nth-child(2) > span:nth-child(2)
                    spans[1].classList.add("redB");
                    var dummy = "";
                } else {
                    spans[1].classList.remove("redB");
                    var dummy = "";
                }
            }
        },
        /* Method: fromRoman
        * Convert roman numerals from I to V into decimal equivalents
        */
        fromRoman: function (roman) {
            switch (roman) {
                case "":
                    return 0;
                    break;
                case "I":
                    return 1;
                    break;
                case "II":
                    return 2;
                    break;
                case "III":
                    return 3;
                    break;
                case "IV":
                    return 4;
                    break;
                case "V":
                    return 5;
                    break;
            }
        },

        /* Function: sovAllBonuses
        * Display a table of the various sovereignty bonuses that are available on each terrain.
        */
        sovAllBonuses: function () {
            dt.showTool("#sovBonusesHtml");
        },
        /* Check sov claims & bldgs in all towns for completed entries.
        * 
        */
        fullCompleteCheck: function () {
            for (t = 0; t < dt[PlayerId].towns.list.length; t++) {
                dt.sov.checkComplete(dt[PlayerId].towns.list[t]);
            }
        },
        /* Check sov claims, bldgs & pos sov armies in all towns for completed entries.
        * 
        */
        fullCompleteCheck2: function () {
            var currentTS = Date.now();
            var finished = [];
            var sovEvents = dt[PlayerId].sov;
            if(sovEvents){
            sovEvents.forEach(function (cv,index,array) {
                var thisEvent = JSON.parse(cv);
                console.log(thisEvent);
                if((thisEvent.hasOwnProperty('endsAt')) && (thisEvent.endsAt < currentTS)){
                    dt.sov.makeNotify3(thisEvent);
                    finished.push(index);
                    // and handle removing the entry from the array
                }
                if((thisEvent.hasOwnProperty('comp')) && (Number(thisEvent.comp) < currentTS)){
                    dt.sov.makeNotify3(thisEvent);
                    finished.push(index);
                    
                    // and handle removing the entry from the array
                }
            })
            }
            if(finished.length > 0){
                finished.reverse;
                finished.forEach(function (cv){
                    console.log("sovEvents: ",sovEvents);
                    sovEvents.splice(cv, 1);
                })
                dt[PlayerId].sov = sovEvents;
                locStorage.setItem([PlayerId] + ":sov", JSON.stringify(dt[PlayerId].sov));
            }
            
        },
        
        /* Check complete times
        * A simple check of the 'endsAt' property against the current datetime.
        * 
        * Parameters:
        * tId - integer. The id of the town to check.
        * list - array. An array holding the indexes of the elements in the src to check. If not present then check all elements.
        */
        checkComplete: function (tId, list) {
            var currentTS = Date.now();
            var finished = [];
            var townSov = dt[PlayerId].towns[tId].sov;
            for (let i = 0; i < townSov.length; i++) {
                if (townSov[i].claim.comp !== '' && townSov[i].claim.comp < currentTS) {
                    finished.push([i,"claim"]);
                    townSov[i].claim.comp = "";
                    
                }
                if (townSov[i].struct.comp !== '' && townSov[i].struct.comp < currentTS) {
                    finished.push([i,"struct"]);
                    townSov[i].struct.comp = "";
                }
            }
            finished.reverse();
    //        console.log("finished: ", finished);
            finished.forEach(function (cv,index,array) {
                console.log("cv:",cv,"index:",index,"array:",array,"finished[index]:",finished[index],"townSov[index]:",townSov[index]);
                dt.sov.makeNotify(tId, index,cv, townSov);
            });
        },
        makeNotify3: function(data){
            /* Structure of the different notifications
            Claim upgrade - [Town Name] upgraded the claim at [claim coords] to lvl [New claim lvl].
            Struct upgrade - [Town Name] upgraded [Struct Name] to lvl [New lvl] at [claim coords].
            Army arrive - Possible Sov Army from [Town Name] arrived at [claim coords].
            */
            if(data.eType == 'army'){
                var dString = Date(data.endsAt).replace(" GMT+0000 (Greenwich Mean Time)","");
                var sovN = {logged: true, seen: false, area: "army", "body": dString + ": Possible Sov Army from <i>" + data.src + "</i> arrived at <i>" + data.tgt + "</i>."};
            };
            if(data.eType == 'claim'){
                var dString = Date(data.comp).replace(" GMT+0000 (Greenwich Mean Time)","");
                var sovN = {logged: true, seen: false, area: "claim", "body": dString + ": <i>" + data.tName + "</i> upgraded the claim at <i>" + data.coords + "</i> to lvl <i>" + data.newLvl + "</i>."};
            };
            if(data.eType == 'struct'){
                if(data.bonus.includes('Demolition')){
                    dd = 'demolished';
                    let roman = ['0','I','II','III','IV','V'];
                    data.newLvl = roman[this.fromRoman(data.lvl)-1];
                }else{
                    dd = 'upgraded';
                }
                var dString = Date(data.comp).replace(" GMT+0000 (Greenwich Mean Time)","");
                var sovN = {logged: true, seen: false, area: "struct", "body": dString + ": <i>" + data.tName + "</i> " + dd + " <i>" + data.bldg + "</i> to lvl <i>" + data.newLvl + "</i> at <i>" + dt[PlayerId].towns[data.tid].x + "|" + dt[PlayerId].towns[data.tid].y + "</i>."};
            };
            dt[PlayerId].sovNotices.unshift(sovN);
            dt.sov.updateFlag();
            locStorage.setItem([PlayerId] + ":sov", JSON.stringify(dt[PlayerId].sov));
            locStorage.setItem([PlayerId] + ":sovNotices", JSON.stringify(dt[PlayerId].sovNotices));	
        },
        makeNotify: function (tId, index,cv, townSov) {
    //        console.log("tId:",tId,"index:",index,"cv:",cv,"townSov:",townSov)
            thisE = townSov[cv[0]];
    //        console.log("Notify done for ", thisE, " town id: " + tId);
            if(cv[1] == "claim"){
                var sovN = {logged: true, seen: false, area: "claim", "body": "<i>" + dt[PlayerId].towns[tId].name + "</i> upgraded the claim at <i>" + thisE.claim.coords + "</i> to lvl <i>" + thisE.claim.newLvl + "</i>."};
            }
            if(cv[1] == "struct"){
                //  town Rhynd completed a Sovereign Structure at [597|-3102] in Jurgor
                var sovN = {logged: true, seen: false, area: "struct", "body": "<i>" + dt[PlayerId].towns[tId].name + "</i> upgraded <i>" + thisE.struct.bldg + "</i> to lvl <i>" + thisE.struct.newLvl + "</i> at <i>" + thisE.claim.coords + "</i>."};
            }
            
            dt[PlayerId].sovNotices.unshift(sovN);
            dt.sov.updateFlag();
    //        dt[PlayerId].towns[tId].sov.splice(index, 1);
            locStorage.setItem(tId + ":sov", JSON.stringify(dt[PlayerId].towns[tId].sov));
            locStorage.setItem([PlayerId] + ":sovNotices", JSON.stringify(dt[PlayerId].sovNotices));
        },
        /* Method: updateFlag
        * Updates the count of unseen sovereignty notifications.
        */
        updateFlag: function () {
            var unseen = 0;
            dt[PlayerId].sovNotices.forEach(function (entry) {
                if (entry.seen === false) {
                    unseen++;
                }
            });
            document.getElementById("sovflag").textContent = unseen;
            document.getElementById("sovflag").setAttribute("title", unseen + " unread Sovereignty Alerts");
            // if (dt.popupStates.AllQs) {
                // dt.showTool("#showAllQueuesHtml", "AllQs");
            // }
        },
        showSovAlerts: function () {
            var sovAlertPopUp = document.getElementById("sovAlertsHtml");
            var tBody = sovAlertPopUp.getElementsByTagName("tbody")[1];
            while (tBody.rows.length > 0) {
                tBody.deleteRow(0);
            }
            var numAlerts = dt[PlayerId].sovNotices.length;
            for (i = 0; i < numAlerts; i++) {
    //        dt[PlayerId].prodNotices.forEach(function (item) {
                var item = dt[PlayerId].sovNotices[i];
                var row = tBody.insertRow(-1);
                row.classList.add(item.area);
                var cell = row.insertCell(0);
                // <input type="checkbox" id="cbox2" value="second_checkbox" checked="checked">
                var cBox = dt.addElement2(cell, "input", ["type", "value"], ["checkbox", i]);
                cBox.setAttribute("onchange", 'dt.sov.alertDelHandler(' + i + ')');
                cell = row.insertCell(1);
                if (!item.seen) {
                    item.seen = true;
                    cell.innerHTML = "<strong>" + item.body + "</strong>";
                } else {
                    cell.innerHTML = item.body;
                }
            }
            ;
            var key = PlayerId + ':sovNotices';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].sovNotices));
            var key = CurrentTown + ':sov';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].towns[CurrentTown].sov));
            var unseen = 0;
            document.getElementById("sovflag").textContent = unseen;
            document.getElementById("sovflag").setAttribute("title", unseen + " unread Sovereignty Alerts");
            dt.popupStates.sovNotices = true;
            dt.showTool("#sovAlertsHtml", "SovNotices");
        },
        alertDelHandler: function (index) {
            var arr = dt[PlayerId].sovNotices;
    //        var index = event.target.value;
            if (index > -1) {
                arr.splice(index, 1);
            }
            this.showSovAlerts();
            var key = PlayerId + ':sovNotices';
            locStorage.setItem(key, JSON.stringify(dt[PlayerId].sovNotices));
        },
        
    };

    dt.sovCheckTimer = window.setInterval(dt.sov.fullCompleteCheck2, 60000);
}
