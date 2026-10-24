log = function (a) {
    console.log(a)
};
log('IllyTools loading...');
var itmre = 0;
var itm = {};
var itr = {};
var itmnu = 0;
var settings = {
	'server': 'http://www.illytools.net/ajax',
	'static': 'http://www.illytools.net/latest',
	'tertiary': 'blue',
	'city_limit_alliance': 'green',
	'city_limit_other': 'gray'
};
var constants = {
    'human_race_id': 1,
    'elf_race_id': 2,
    'dwarf_race_id': 3,
    'orc_race_id': 4,
};
var races = {
    1: {
        'name': 'human'
    },
    2: {
        'name': 'elf'
    },
    3: {
        'name': 'dwarf'
    },
    4: {
        'name': 'orc'
    }
};
var units = {
    'scoutlvl1': {
        'img_token': 'scout',
        1: {
            'speed': 17,
            'name': 'Scout'
        },
        2: {
            'speed': 22,
            'name': 'Tracker'
        },
        3: {
            'speed': 14,
            'name': 'Sentry'
        },
        4: {
            'speed': 18,
            'name': 'Hunter'
        }
    },
    'scoutlvl2': {
        'img_token': 'scout',
        1: {
            'speed': 22,
            'name': 'Ranger'
        },
        2: {
            'speed': 30,
            'name': 'Outrider'
        },
        3: {
            'speed': 18,
            'name': 'Watcher'
        },
        4: {
            'speed': 20,
            'name': 'Stalker'
        }
    },
    'spylvl1': {
        'img_token': 'spy',
        1: {
            'speed': 17,
            'name': 'Agent'
        },
        2: {
            'speed': 21,
            'name': 'Waysman'
        },
        3: {
            'speed': 16,
            'name': 'Observer'
        },
        4: {
            'speed': 18,
            'name': 'Goblin Spy'
        }
    },
    'spylvl2': {
        'img_token': 'spy',
        1: {
            'speed': 23,
            'name': 'Spymaster'
        },
        2: {
            'speed': 28,
            'name': 'Farseer'
        },
        3: {
            'speed': 19,
            'name': 'Keeper of Secrets'
        },
        4: {
            'speed': 21,
            'name': 'Listener in the Dark'
        }
    },
    'thieflvl1': {
        'img_token': 'thief',
        1: {
            'speed': 15,
            'name': 'Burglar'
        },
        2: {
            'speed': 19,
            'name': 'Rogue'
        },
        3: {
            'speed': 14,
            'name': 'Footpad'
        },
        4: {
            'speed': 17,
            'name': 'Goblin Cutpurse'
        }
    },
    'thieflvl2': {
        'img_token': 'thief',
        1: {
            'speed': 22,
            'name': 'Master Thief'
        },
        2: {
            'speed': 25,
            'name': 'Dark Elf'
        },
        3: {
            'speed': 16,
            'name': 'Halfling'
        },
        4: {
            'speed': 20,
            'name': 'Plunderer'
        }
    },
    'saboteurlvl1': {
        'img_token': 'saboteur',
        1: {
            'speed': 15,
            'name': 'Saboteur'
        },
        2: {
            'speed': 17,
            'name': 'Elven Pruner'
        },
        3: {
            'speed': 13,
            'name': 'Sapper'
        },
        4: {
            'speed': 16,
            'name': 'Goblin Saboteur'
        }
    },
    'saboteurlvl2': {
        'img_token': 'saboteur',
        1: {
            'speed': 22,
            'name': 'Agent Provocateur'
        },
        2: {
            'speed': 25,
            'name': 'Dark Elf Saboteur'
        },
        3: {
            'speed': 19,
            'name': 'Underminer'
        },
        4: {
            'speed': 19,
            'name': 'Arsonist'
        }
    },
    'assassinlvl1': {
        'img_token': 'assassin',
        1: {
            'speed': 16,
            'name': 'Cutthroat'
        },
        2: {
            'speed': 18,
            'name': 'Willowblade'
        },
        3: {
            'speed': 14,
            'name': 'Executioner'
        },
        4: {
            'speed': 17,
            'name': 'Poisoner'
        }
    },
    'assassinlvl2': {
        'img_token': 'assassin',
        1: {
            'speed': 22,
            'name': 'Assassin'
        },
        2: {
            'speed': 24,
            'name': 'Night Shade'
        },
        3: {
            'speed': 18,
            'name': 'Deep Dweller'
        },
        4: {
            'speed': 19,
            'name': 'Iqadron Acolyte'
        }
    },
    'messenger': {
        'img_token': 'generic_messenger',
        1: {
            'speed': 60,
            'name': 'Messenger'
        },
        2: {
            'speed': 60,
            'name': 'Messenger'
        },
        3: {
            'speed': 60,
            'name': 'Messenger'
        },
        4: {
            'speed': 60,
            'name': 'Messenger'
        }
    }
};
var stats = {
    'nb_tilesIndexing': 0,
    'nb_gcchatloggercount': 0
};
var consone = {
    531: 'EE',
    659: 'FF',
    622: 'CE',
    46: 'VIC',
    155: 'VICX',
    189: 'Absa',
    165: 'WE',
    425: 'Druids',
    687: 'Sages',
    521: 'Frost',
    274: 'VALAR'
};
var ee = {
    531: 'EE',
    659: 'FF',
    622: 'CE'
};
Object.size = function (a) {
    var b = 0,
        key;
    for (key in a) {
        if (a.hasOwnProperty(key)) {
            b++
        }
    }
    return b
};
String.prototype.startsWith = function (a) {
    return this.indexOf(a) === 0
};
String.prototype.endsWith = function (a) {
    return this.match(a + "$") == a
};
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
};
Array.prototype.unique = function () {
    var a = this;
    var b = [];
    for (var i = a.length; i--;) {
        var c = a[i];
        if ($.inArray(c, b) === -1) {
            b.unshift(c)
        }
    }
    return b
};

function isAllianceInConsone(a) {
    return !(consone[a] == undefined)
}

function isAllianceInEE(a) {
    return !(ee[a] == undefined)
}
setNextEventsProgress = function (a) {
    progressNextEventsCurrentDate = GetServerTime();
    progressNextEventsRefreshPage = !1;
    a == !0 ? $("#NextEvents div.progBarNE, #GlobalNextEvents div.progBarNE, #GlobalMilitaryProduction div.progBar").each(innerSetNextEventsProgressCreate) : $("#NextEvents div.progBarNE, #GlobalNextEvents div.progBarNE, #GlobalMilitaryProduction div.progBar").each(innerSetNextEventsProgressUpdate);
    var e = $('#resbar td.resTxt');
    var f = 0;
    var g = 9e9;
    e.each(function (a, b) {
        if ($(b).attr('hasmax') == 'true') {
            var c = parseInt($(b).attr('data'));
            if (f < c) {
                f = c
            }
            res_speed = $(b).attr('inc');
            var d = parseInt((maxStorage - c) / res_speed);
            if (d > 0 && g > d) {
                g = d
            }
        }
    });
    storage_percent = Math.round((f * 100 / maxStorage) * 100) / 100;
    $('#next-events-' + CurrentTown + ' .storage-usage').html(storage_percent + '%').attr('title', 'Storage usage ' + storage_percent + '% - ' + SecToText(g) + ' before overflow')
};
setProgress = function (a) {
    progressCurrentDate = GetServerTime();
    progressRefreshPage = !1;
    if (a == !0) {
        $("#MainContentDiv div.progBar, #GlobalNextEvents div.progBar, #GlobalMilitaryProduction div.progBar").each(innerSetProgressCreate)
    } else {
        $("#MainContentDiv div.progBar, #GlobalNextEvents div.progBar, #GlobalMilitaryProduction div.progBar").each(innerSetProgressUpdate)
    }
    $("#NextEvents span.progTime, #MainContentDiv span.progTime, #GlobalNextEvents span.progTime, #GlobalMilitaryProduction span.progTime").each(innerSetProgress2);
    if (progressRefreshPage) {
        ForceLocationChange()
    }
};

function hypotenuse(a, b) {
    function square(x) {
        return x * x
    }
    return Math.sqrt(square(a) + square(b))
};

function secondsToString(a) {
    var b = Math.floor(a / 86400);
    var c = Math.floor((a % 86400) / 3600);
    var d = Math.floor(((a % 86400) % 3600) / 60);
    var e = Math.ceil(((a % 86400) % 3600) % 60);
    var f = "";
    if (b) {
        f = f + b + "d "
    }
    if (c) {
        f = f + c + "h "
    }
    if (d) {
        f = f + d + "m "
    }
    if (e) {
        f = f + e + "s "
    }
    return f
};
var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function c(a, b, c, d) {
    if (typeof (b) == "undefined") {
        var b = 0
    }
    if (typeof (c) == "undefined") {
        var c = '0'
    }
    if (typeof (d) == "undefined") {
        var d = STR_PAD_RIGHT
    }
    if (b + 1 >= a.length) {
        switch (d) {
        case STR_PAD_LEFT:
            a = Array(b + 1 - a.length).join(c) + a;
            break;
        case STR_PAD_BOTH:
            var e = Math.ceil((padlen = b - a.length) / 2);
            var f = padlen - e;
            a = Array(f + 1).join(c) + a + Array(e + 1).join(c);
            break;
        default:
            a = a + Array(b + 1 - a.length).join(c);
            break
        }
    }
    return a
};
time = function () {
    return Math.round((new Date()).getTime() / 1000)
};
toDate = function (a) {
    var b = new Date();
    b.setTime(a * 1000);
    return b.getDate() + '/' + (b.getMonth() + 1) + '/' + b.getFullYear()
};
toServerDateFull = function (a) {
    var b = new Date((parseInt(a)) * 1000 - -((new Date).getTimezoneOffset() * 60000));
    var c = b.getDate() + '/' + (b.getMonth() + 1) + '/' + b.getFullYear() + ' ' + b.getHours() + ':' + b.getMinutes();
    return c
};
toDDMM = function (a) {
    var b = new Date();
    b.setTime(a * 1000);
    return b.getDate() + '/' + (b.getMonth() + 1)
};
daysAgo = function (a) {
    var b = time() - a;
    return Math.ceil(b / (60 * 60 * 24))
};
getIcon = function (a, b) {
    return '<img src="' + settings.assets + '/img/' + a + '.png" alt="' + b + '" title="' + b + '" class="icon"/>'
};
getAjaxIcon = function (a) {
    if (a == undefined) {
        a = 'small'
    }
    return '<img src="' + settings.assets + '/img/ajax_spinner_' + a + '.gif" alt="Loading..." title="Loading..." class="ajaxicon"/>'
};
random_string = function (a, b) {
    var c = 0;
    var d = "";
    var e;
    if (b == undefined) {
        var b = false
    }
    while (c < a) {
        e = (Math.floor((Math.random() * 100)) % 94) + 33;
        if (!b) {
            if ((e >= 33) && (e <= 47)) {
                continue
            }
            if ((e >= 58) && (e <= 64)) {
                continue
            }
            if ((e >= 91) && (e <= 96)) {
                continue
            }
            if ((e >= 123) && (e <= 126)) {
                continue
            }
        }
        c++;
        d += String.fromCharCode(e)
    }
    return d
};
number_format = function (a, b) {
    if (b == undefined) {
        b = ','
    }
    a += '';
    x = a.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var c = /(\d+)(\d{3})/;
    while (c.test(x1)) {
        x1 = x1.replace(c, '$1' + b + '$2')
    }
    return x1 + x2
};
replaceIcons = function (a) {
    try {
        $(a).html($(a).html().replace(regexParams, regexParamsReplace));
        $(a + " span.name").each(replaceTokens)
    } finally {}
};
serialize = function (a) {
    if (typeof a.toSource !== 'undefined' && typeof a.callee === 'undefined') {
        return a.toSource()
    }
    switch (typeof a) {
    case 'number':
    case 'boolean':
    case 'function':
        return a;
        break;
    case 'string':
        return '\'' + a + '\'';
        break;
    case 'object':
        var b;
        if (a.constructor === Array || typeof a.callee !== 'undefined') {
            b = '[';
            var i, len = a.length;
            for (i = 0; i < len - 1; i++) {
                b += serialize(a[i]) + ','
            }
            b += serialize(a[i]) + ']'
        } else {
            b = '{';
            var c;
            for (c in a) {
                b += c + ':' + serialize(a[c]) + ','
            }
            b = b.replace(/\,$/, '') + '}'
        }
        return b;
        break;
    default:
        return 'UNKNOWN';
        break
    }
};
ItStorage = {
    stge: undefined,
    init: function () {
        if (window.localStorage != undefined) {
            this.stge = window.localStorage
        } else {
            if (globalStorage != undefined) {
                this.stge = globalStorage[location.hostname]
            } else {
                this.stge = {}
            }
        }
    },
    getInstance: function () {
        return this.stge
    },
    get: function (a, b) {
        value = this.stge.getItem(a);
        return value != null ? value : b
    },
    getKeyForIndex: function (a) {
        return this.stge.key(a)
    },
    set: function (a, b) {
        this.stge.setItem(a, b)
    }
};
Notepad = {
    $notepadtabs: undefined,
    init: function () {
        Notepad.$notepadtabs = $("#notepads").tabs({
            tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close notepad-ui-icon-close'>Remove Tab</span></li>",
            add: function (a, b) {
                $(b.panel).append("<div class='notepad'><input type='text' class='notepad_title' /><br/><textarea class='notepad_body'></textarea></div>")
            }
        });
        $("#add_notepad").click(function () {
            Notepad.addTab('new')
        });
        $("#tabs span.notepad-ui-icon-close").live("click", function () {
            id = $('a', $(this).parent()).attr('href').substring(1);
            var a = $("li", Notepad.$notepadtabs).index($(this).parent());
            Notepad.removeTab(a, id)
        });
        var c = ItStorage.getInstance();
        $(c).map(function (a, b) {
            b = ItStorage.getKeyForIndex(a);
            if (b != undefined && b.startsWith('notepad-')) {
                Notepad.addTab(b)
            }
        });
        $('.notepad input, .notepad textarea').live('keyup', function () {
            Notepad.saveNote($(this).parent().parent().attr('id'))
        });
        if (Notepad.$notepadtabs.tabs("length") == 0) {
            Notepad.addTab('new')
        }
    },
    addTab: function (a) {
        if (a == 'new') {
            a = 'notepad-' + time()
        }
        note = Notepad.getNote(a);
        var b = note.title ? note.title : 'New';
        Notepad.$notepadtabs.tabs("add", "#" + a, b);
        $('#' + a + ' .notepad_title').val(note.title);
        $('#' + a + ' .notepad_body').val(note.body)
    },
    removeTab: function (a, b) {
        $("#notepad-dialog-confirm").dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "Delete Note": function () {
                    $(this).dialog("close");
                    Notepad.$notepadtabs.tabs("remove", a);
                    ItStorage.getInstance().removeItem(b)
                },
                Cancel: function () {
                    $(this).dialog("close")
                }
            }
        })
    },
    saveNote: function (a) {
        var b = ItStorage.getInstance();
        notevalue = $('#' + a + ' .notepad_title').val() + '|||' + $('#' + a + ' .notepad_body').val();
        b[a] = notevalue;
        $('#notepads a[href=#' + a + ']').html($('#' + a + ' .notepad_title').val())
    },
    getNote: function (a) {
        var b = ItStorage.getInstance();
        notevalue = {
            0: 'new',
            1: ''
        };
        if (saved_note = ItStorage.get(a, 0)) {
            notevalue = saved_note.split("|||")
        }
        return {
            'title': notevalue[0],
            'body': notevalue[1]
        }
    },
    addSingleNotepad: function (a) {
        var b = getNote(a);
        Notepad.$notepadtabs.tabs("add", "#" + a, b.title)
    }
};
Player = {
    player_id: 0,
    currentPlayer: {},
    currentTown: {
        'x': 0,
        'y': 0
    },
    loadedPlayer: {},
    citiesData: {},
    getProfileTemplate: function () {
        return $('#it_playerDashboardTemplate').html()
    },
    init: function () {
        this.player_id = PlayerId;
        this.loadProfile(PlayerId);
        $('.action_focus_town, .next-event-bloc .title').live('click', function () {
            ChangeTownFocus($(this).attr('townid'));
            return false
        });
        $('#backToCurrentPlayer').live('click', function () {
            Player.loadProfile(PlayerId);
            return false
        });
        $('.loadPlayerProfile').live('click', function () {
            Player.loadProfile($(this).attr('playerid'));
            return false
        });
        $('#stats').live('click', function () {
            Player.openTownsHistoryGraph();
            return false
        });
        $('#optTown option').each(function (a, b) {
            pos_hyphen = $(b).html().lastIndexOf('-');
            name = $(b).html().substring(0, pos_hyphen - 1);
            $('#GlobalNextEvents').append("<div class='next-event-bloc' id='next-events-" + $(b).attr('value') + "'><span class='storage-usage'>--</span><a class='action_focus_town' townid='" + $(b).attr('value') + "' href='#'>" + name + "</a><div class='next-events-content'><div class='next-events'>Load " + name + " to update this</div><div class='top-nav'></div></div></div>");
            $('#GlobalMilitaryProduction').append("<div class='military-production-bloc' id='military-production-" + $(b).attr('value') + "'><a class='action_focus_town' townid='" + $(b).attr('value') + "' href='#'>" + name + "</a><div class='military-production-content'>Load military unit production page for " + name + " to update this bloc</div></div>");
            Player.citiesData[$(b).attr('value')] = {
                'maxStorage': 0,
                'basic_prod': {},
                'adv_prod': {},
                'troops': {},
                'diplos': {}
            }
        });
        Player.updateGlobalNextEvents();
        Player.updateGlobalTopNav();
        Player.toggleCrystalBallMode('simple');
        $('#crystal_ball_mode_switch').click(function (e) {
            e.stopPropagation();
            Player.toggleCrystalBallMode();
            return false
        })
    },
    getCityData: function (a) {
        if (a == undefined) {
            a = CurrentTown
        }
        return Player.citiesData[a]
    },
    loadProfile: function (m) {
        ItServer.send({
            action: 'playersFullData',
            key: 'player_id',
            values: [m]
        }, function (e, f, g) {
            var h = 0;
            if (e.players[m]) {
                player = e.players[m];
                var i = time();
                var j = 'odd';
                Player.loadedPlayer = player;
                $('#playerProfile').html(Player.getProfileTemplate());
                if (PlayerId == m) {
                    $('#backToCurrentPlayer').hide();
                    Player.currentPlayer = player;
                    h = 1;
                    Player.updateEmpireView()
                } else {
                    $('#backToCurrentPlayer').show()
                }
                $('.itPlayerName').html('<a href="#/Player/Profile/' + player.id + '" title="View player profile">' + player.name + '</a>');
                $('.itPlayerEmailLink').html('&nbsp;<a href="/#/Communication/ComposeMail/' + player.id + '" title="Send a message">' + getIcon('email', 'Send a message') + '</a>');
                if (player.alliance_id) {
                    ticker_css = 'neutral';
                    if (player.ticker) {
                        if (player.ticker == Player.currentPlayer.ticker) {
                            ticker_css = 'ally'
                        }
                    }
                    $('#playerProfile .playerAllianceName').html('<a href="/#/Alliance/Alliance/' + player.alliance_id + '" title="' + player.alliance_name + ' => alliance rank #' + player.alliance_rank + '" class="' + ticker_css + '">' + player.ticker + '</a>')
                } else {
                    $('#playerProfile .playerAllianceName').text('')
                } if (Player.currentPlayer['name'] != undefined) {
                    $('.currentPlayerName').text(Player.currentPlayer.name)
                }
                var k = '';
                var l = 0;
                $.each(player.towns, function (a, b) {
                    if (b.founded < i) {
                        i = b.founded
                    }
                    var c = '<td class="town_indicator" id="town_indicator_' + b.id + '"></td>';
                    if (b.active == 1) {
                        c = c + '<td class="bold">' + b.name + (b.iscapitalcity == 1 ? ' ' + getIcon('star', 'Capital') : '') + '</td>'
                    } else {
                        c = c + '<td class="bold strike"><span title="City destroyed (last seen on ' + toDate(b.updated) + ')">' + b.name + '</span></td>'
                    }
                    var d = [];
                    if (h) {
                        a_focus = '<a href="#" class="action_focus_town" townid="' + b.id + '">' + getIcon('house_go', 'Go to this town') + '</a>';
                        d.push(a_focus)
                    }
                    if (b.active == 1) {
                        a_res = '<a href="#/Trade/Orders/' + b.x + '/' + b.y + '">' + getIcon('lorry', 'Send Resources') + '</a>';
                        d.push(a_res);
                        a_spell = '<a href="#/Magic/Cast/' + b.id + '">' + getIcon('lightning', 'Cast spell') + '</a>';
                        d.push(a_spell)
                    }
                    a_map = '<a href="#/World/Map/' + b.x + '/' + b.y + '">' + getIcon('map', 'View in Map') + '</a>';
                    d.push(a_map);
                    c = c + '<td class="center">' + d.join('&nbsp;') + '</td>';
                    c = c + '<td class="center town_distance" x="' + b.x + '" y="' + b.y + '">--</td>';
                    c = c + '<td class="center" class="">' + number_format(b.population) + '</td>';
                    c = c + '<td class="center">' + daysAgo(b.founded) + ' days ago</td>';
                    l += parseInt(b.population);
                    k = k + '<tr class="' + j + ' middle">' + c + '</tr>';
                    j = ((j == 'odd') ? 'even' : 'odd')
                });
                k = k + '<tr class="middle"><td colspan="4" class="right" style="color:gray">Total Pop:</td><td class="center">' + number_format(l) + '</td><td>&nbsp;</td></tr>';
                $('#playerProfile #currentPlayerCities').append(k);
                $('#playerProfile #playerCreationDate').html('Player since ' + toDate(i) + ' - ' + daysAgo(i) + ' days ago');
                Player.setCurrentTown()
            }
        })
    },
    setCurrentTown: function () {
        $('.town_indicator').text('');
        if (CurrentTown > 0) {
            $('#town_indicator_' + CurrentTown).html(getIcon('bullet_go', '=>'));
            Player.currentTown = Player.currentPlayer.towns[CurrentTown];
            if (Player.currentTown != undefined) {
                $('.town_distance').each(function () {
                    var a = getDistance(Player.currentTown.x, Player.currentTown.y, $(this).attr('x'), $(this).attr('y'));
                    $(this).html('<span title="' + getTime('caravans', a) + ' for caravans">' + a + ' sq</span>')
                })
            }
        }
    },
    toggleCrystalBallMode: function (a) {
        if (a == undefined) {
            a = settings.crystal_ball_mode
        }
        if (a == 'advanced') {
            settings.crystal_ball_mode = 'simple';
            $('.top-nav').show();
            $('.next-event-bloc').css({
                'float': 'inherit',
                'max-width': 'inherit'
            })
        } else {
            settings.crystal_ball_mode = 'advanced';
            $('.top-nav').hide();
            $('.next-event-bloc').css({
                'float': 'left',
                'max-width': '220px'
            })
        }
    },
    updateGlobalNextEvents: function (a) {
        if (a == undefined) {
            a = $('#NextEvents').html()
        }
        $('#next-events-' + CurrentTown + ' .next-events').html(a)
    },
    updateGlobalTopNav: function (a) {
        if (a == undefined) {
            a = $('#TopNav').html()
        }
        $('#junk').html(a);
        $('#next-events-' + CurrentTown + ' .next-events-content .top-nav').html($('#junk table table'));
        $('#junk').text('')
    },
    updateMilitaryProduction: function (a) {
        if (a == undefined) {
            a = false
        }
        $('#junk').html(a);
        $units_table = $('.progBar', '#junk table').closest('table');
        if (!$units_table.length) {
            $units_table = "<span class='no-production'>No units in production</span>"
        }
        $('#military-production-' + CurrentTown + ' .military-production-content').html($units_table);
        $('#military-production-' + CurrentTown + ' .military-production-content input, #military-production-' + CurrentTown + ' .military-production-content .progBar').closest('td').remove();
        $('#military-production-' + CurrentTown + ' th:eq(5)').remove();
        $('#military-production-' + CurrentTown + ' th:eq(7)').remove();
        $('#military-production-' + CurrentTown + ' .military-production-content th').css('width', 'inherit');
        replaceIcons('#tabs-empiremilitaryproduction');
        $('#junk').text('')
    },
    extractRessourceValues: function (c) {
        res = {};
        $(c + ' .resInc').each(function (a, b) {
            inc = $(b).attr('data');
            res[a] = {
                'inc': inc
            }
        });
        $(c + ' .resTxt').each(function (a, b) {
            data = $(b).attr('data');
            res[a]['data'] = data;
            res[a]['icon'] = $('span.name', $(b).next()).attr('data')
        });
        return res
    },
    updateEmpireView: function () {
        Player.citiesData[CurrentTown]['basic_prod'] = Player.extractRessourceValues('#resbar');
        Player.citiesData[CurrentTown]['adv_prod'] = Player.extractRessourceValues('#advRes');
        res_basic_table = {
            'inc': {},
            'data': {}
        };
        res_adv_table = {
            'inc': {},
            'data': {}
        };
        ths = "";
        $.each(Player.citiesData, function (c, d) {
            city_name = (Player.currentPlayer && Player.currentPlayer.towns[c]) ? Player.currentPlayer.towns[c].name : 'UNK';
            ths += "<th><a href='#' class='action_focus_town' townid='" + c + "'>" + city_name + "</a></th>";
            $.each(d.basic_prod, function (a, b) {
                if (!res_basic_table['inc'][b.icon]) {
                    res_basic_table['inc'][b.icon] = {
                        'total': 0
                    }
                }
                if (!res_basic_table['data'][b.icon]) {
                    res_basic_table['data'][b.icon] = {
                        'total': 0
                    }
                }
                res_basic_table['inc'][b.icon][c] = b.inc;
                res_basic_table['data'][b.icon][c] = b.data;
                res_basic_table['inc'][b.icon]['total'] += parseFloat(b.inc);
                res_basic_table['data'][b.icon]['total'] += parseFloat(b.data)
            });
            $.each(d.adv_prod, function (a, b) {
                if (!res_adv_table['inc'][b.icon]) {
                    res_adv_table['inc'][b.icon] = {
                        'total': 0
                    }
                }
                if (!res_adv_table['data'][b.icon]) {
                    res_adv_table['data'][b.icon] = {
                        'total': 0
                    }
                }
                res_adv_table['inc'][b.icon][c] = b.inc;
                res_adv_table['data'][b.icon][c] = b.data;
                res_adv_table['inc'][b.icon]['total'] += parseFloat(b.inc);
                res_adv_table['data'][b.icon]['total'] += parseFloat(b.data)
            })
        });
        trs = {};
        trs_adv = {};
        var g = 0;
        $.each(res_basic_table, function (e, f) {
            trs[e] = "";
            cell_nb = 0;
            $.each(f, function (c, d) {
                tds = "<td class='center'>[@" + c + "]</td>";
                $.each(Player.citiesData, function (a, b) {
                    value = "--";
                    value_raw = 0;
                    if (d[a]) {
                        value_raw = d[a];
                        value = number_format(Math.ceil(d[a]))
                    }
                    tds += "<td class='center " + a + "' data='" + value_raw + "' cellnb='" + cell_nb + "'>" + value + "</td>";
                    cell_nb++
                });
                tds += "<td class='center total' data='" + d.total + "'  cellnb='" + cell_nb + "'>" + number_format(Math.ceil(d.total)) + "</td>";
                cell_nb++;
                trs[e] += "<tr class='" + (g ? 'odd' : 'even') + "'>" + tds + "</tr>";
                g = !g
            })
        });
        var g = 0;
        $.each(res_adv_table, function (e, f) {
            trs_adv[e] = "";
            cell_nb = 0;
            $.each(f, function (c, d) {
                tds = "<td class='center'>[@" + c + "]</td>";
                $.each(Player.citiesData, function (a, b) {
                    value = "--";
                    value_raw = 0;
                    if (d[a]) {
                        value_raw = d[a];
                        value = number_format(Math.ceil(d[a]))
                    }
                    tds += "<td class='center " + a + "' data='" + value_raw + "' cellnb='" + cell_nb + "'>" + value + "</td>";
                    cell_nb++
                });
                tds += "<td class='center total' data='" + d.total + "' cellnb='" + cell_nb + "'>" + number_format(Math.ceil(d.total)) + "</td>";
                cell_nb++;
                trs_adv[e] += "<tr class='" + (g ? 'odd' : 'even') + "'>" + tds + "</tr>";
                g = !g
            })
        });
        ths = "<tr><th>&nbsp;</th>" + ths + "<th class='total'>Total</th></tr>";
        tables_basic = "<h3>Production : Basic Resources</h3><table width='100%'>" + ths + trs['inc'] + "</table>";
        tables_basic += "<h3>Storage : Basic Resources</h3><table width='100%'>" + ths + trs['data'] + "</table>";
        tables_adv = "<h3>Production : Advanced Resources</h3><table width='100%'>" + ths + trs_adv['inc'] + "</table>";
        tables_adv += "<h3>Storage : Advanced Resources</h3><table width='100%'>" + ths + trs_adv['data'] + "</table>";
        $('#tabs-empirebasic').html(tables_basic);
        $('#tabs-empireadvanced').html(tables_adv);
        replaceIcons('#tabs-empirebasic');
        replaceIcons('#tabs-empireadvanced');
        $('#empire-tabs td').each(function (a, b) {
            $item = $(b);
            if (IsNumeric($item.attr('data'))) {
                val = parseFloat($item.attr('data'));
                if (val == 0) {
                    color = "neutral"
                } else if (val > 0) {
                    color = "positive"
                } else {
                    color = "negative"
                }
                $item.addClass(color)
            }
        });
        $('#empire-tabs td').hover(function () {
            cellnb = $(this).attr('cellnb');
            $('#empire-tabs td[cellnb="' + cellnb + '"]').addClass('active')
        }, function () {
            $('#empire-tabs td.active').removeClass('active')
        });
        $('#tabs-empire td.selected, #tabs-empire th.selected').removeClass('selected');
        $('#tabs-empire td.' + Player.currentTown.id + ', #tabs-empire th.' + Player.currentTown.id).addClass('selected')
    },
    extractUnitsValues: function (c) {
        units = {};
        $('#MainContentDiv fieldset tr').each(function (a, b) {
            tds = $('td', b);
            if ((tds.length == 10 && c == 'troops') || (tds.length == 8 && c == 'diplos')) {
                switch (c) {
                case 'troops':
                    id_span = $('span', tds[2]);
                    id = id_span.attr('data');
                    name = tds[3].innerHTML;
                    count = parseInt(tds[4].innerHTML.replace(',', ''));
                    break;
                case 'diplos':
                    id_span = $('span', tds[1]);
                    id = id_span.attr('data');
                    name = tds[2].innerHTML;
                    count = parseInt(tds[3].innerHTML.replace(',', ''));
                    break
                }
                if (id) {
                    if (!units[id]) {
                        units[id] = {
                            'name': name,
                            'count': 0,
                            'icon': id
                        }
                    }
                    if (count > 0) {
                        units[id].count += count
                    } else {
                        units[id].count += 1
                    }
                }
            }
        });
        return units
    },
    updateMilitaryOverview: function () {
        military_table = {
            'troops': {}
        };
        diplos_table = {
            'diplos': {}
        };
        ths = "";
        $.each(Player.citiesData, function (c, d) {
            city_name = (Player.currentPlayer && Player.currentPlayer.towns[c]) ? Player.currentPlayer.towns[c].name : 'UNK';
            ths += "<th><a href='#' class='action_focus_town' townid='" + c + "'>" + city_name + "</a></th>";
            $.each(d.troops, function (a, b) {
                if (!military_table['troops'][b.icon]) {
                    military_table['troops'][b.icon] = {
                        'total': 0
                    }
                }
                military_table['troops'][b.icon][c] = b.count;
                military_table['troops'][b.icon]['total'] += b.count
            });
            $.each(d.diplos, function (a, b) {
                if (!diplos_table['diplos'][b.icon]) {
                    diplos_table['diplos'][b.icon] = {
                        'total': 0
                    }
                }
                diplos_table['diplos'][b.icon][c] = b.count;
                diplos_table['diplos'][b.icon]['total'] += b.count
            })
        });
        trs = {};
        trs_diplos = {};
        var g = 0;
        trs['troops'] = "";
        $.each(military_table, function (e, f) {
            trs[e] = "";
            cell_nb = 0;
            $.each(f, function (c, d) {
                tds = "<td class='center'>[@" + c + "]</td>";
                $.each(Player.citiesData, function (a, b) {
                    value = "--";
                    value_raw = 0;
                    if (d[a]) {
                        value_raw = d[a];
                        value = number_format(Math.ceil(d[a]))
                    }
                    tds += "<td class='center " + a + "' data='" + value_raw + "' cellnb='" + cell_nb + "'>" + value + "</td>";
                    cell_nb++
                });
                tds += "<td class='center total' data='" + d.total + "'  cellnb='" + cell_nb + "'>" + number_format(Math.ceil(d.total)) + "</td>";
                cell_nb++;
                trs[e] += "<tr class='" + (g ? 'odd' : 'even') + "'>" + tds + "</tr>";
                g = !g
            })
        });
        var g = 0;
        trs_diplos['diplos'] = "";
        $.each(diplos_table, function (e, f) {
            trs_diplos[e] = "";
            cell_nb = 0;
            $.each(f, function (c, d) {
                tds_diplos = "<td class='center'>[@" + c + "]</td>";
                $.each(Player.citiesData, function (a, b) {
                    value = "--";
                    value_raw = 0;
                    if (d[a]) {
                        value_raw = d[a];
                        value = number_format(Math.ceil(d[a]))
                    }
                    tds_diplos += "<td class='center " + a + "' data='" + value_raw + "' cellnb='" + cell_nb + "'>" + value + "</td>";
                    cell_nb++
                });
                tds_diplos += "<td class='center total' data='" + d.total + "'  cellnb='" + cell_nb + "'>" + number_format(Math.ceil(d.total)) + "</td>";
                cell_nb++;
                trs_diplos[e] += "<tr class='" + (g ? 'odd' : 'even') + "'>" + tds_diplos + "</tr>";
                g = !g
            })
        });
        ths = "<tr><th>&nbsp;</th>" + ths + "<th class='total'>Total</th></tr>";
        ths_diplos = "<tr><th>&nbsp;</th>" + ths + "<th class='total'>Total</th></tr>";
        total_troops_all_cities = 0;
        total_diplos_all_cities = 0;
        trs['total_city'] = "";
        trs_diplos['total_city'] = "";
        $.each(Player.citiesData, function (c, d) {
            total_troops_city = 0;
            total_diplos_city = 0;
            $.each(d.troops, function (a, b) {
                total_troops_city += b.count
            });
            trs['total_city'] += "<td class='center total" + c + "'>" + number_format(total_troops_city) + "</td>";
            total_troops_all_cities += total_troops_city;
            $.each(d.diplos, function (a, b) {
                total_diplos_city += b.count
            });
            trs_diplos['total_city'] += "<td class='center total" + c + "'>" + number_format(total_diplos_city) + "</td>";
            total_diplos_all_cities += total_diplos_city
        });
        trs['total_city'] = "<tr><td><b>Total</b></td>" + trs['total_city'] + "<td class='center total'>" + number_format(total_troops_all_cities) + "</td></tr>";
        trs_diplos['total_city'] = "<tr><td><b>Total</b></td>" + trs_diplos['total_city'] + "<td class='center total'>" + number_format(total_diplos_all_cities) + "</td></tr>";
        tables_basic = "<h3>Military: Troops available</h3><table width='100%'>" + ths + trs['troops'] + trs['total_city'] + "</table>";
        tables_basic += "<h3>Diplomatic: Units available</h3><table width='100%'>" + ths + trs_diplos['diplos'] + trs_diplos['total_city'] + "</table>";
        $('#GlobalMilitaryOverview').html(tables_basic);
        replaceIcons('#GlobalMilitaryOverview')
    },
    openTownsHistoryGraph: function (p) {
        var q = $(window).height() - 100;
        var r = $(window).width() - 100;
        $("#graphBox").dialog({
            resizable: false,
            height: q,
            width: r,
            modal: true,
            close: function (a, b) {},
        });
        $("#graphBox .is_loading").html(getAjaxIcon('medium'));
        ItServer.send({
            action: 'playerTownHistory',
            player_id: Player.loadedPlayer.id,
            page: p
        }, function (f, g, h) {
            var j = f.history;
            var k = [];
            var l = [];
            var m = [];
            var n = 0;
            var o = "";
            $.each(j, function (c, d) {
                stat_data_town = {
                    label: '--',
                    data: []
                };
                var e = '';
                $.each(d, function (a, b) {
                    stat_data_town.label = b.name;
                    stat_data_town.data.push([a, b.population]);
                    if (parseInt(b.population) > n) {
                        n = b.population
                    }
                    l.push(parseInt(a));
                    e = e + '<td>' + b.population + '</td>'
                });
                k.push(stat_data_town);
                if (stat_data_town.data.length < 24) {
                    for (i = stat_data_town.data.length; i < 24; i++) {
                        e = '<td>--</td>' + e
                    }
                }
                o = o + '<tr><td>' + stat_data_town.label + '</td>' + e + '</tr>'
            });
            l = l.sort().unique();
            ths = '<th>City name</th>';
            $.each(l, function (a, b) {
                m.push([b, toDDMM(b)]);
                ths = ths + '<th>' + toDDMM(b) + '</th>'
            });
            o = '<tr>' + ths + '</tr>' + o;
            $('#graphPlot').height(q / 2).width(r - 100);
            $("#graphBox .is_loading").html('');
            $.plot($("#graphPlot"), k, {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    ticks: m
                },
                yaxis: {
                    ticks: 10,
                    min: 0,
                    max: n
                },
                grid: {
                    backgroundColor: {
                        colors: ["#fff", "#eee"]
                    }
                }
            });
            $('#graphTableData').empty();
            f.page = parseInt(f.page);
            navigation = "<input type='button' class='graph_navigation' value='<< Previous'  page='" + (f.page - 1) + "' id='graph_previous'/>" + "<input type='textfield' class='graph_navigation' value='" + f.page + "' disabled='disabled' size='5'/>" + "<input type='button' class='graph_navigation' value='Next >>' page='" + (f.page + 1) + "' id='graph_next'/>";
            $('#graphBox .graph_title').html("Population history for " + Player.loadedPlayer.name + " (" + f.human + ")");
            $('#graphNavigation').html(navigation);
            $('#graphTableData').append(o);
            $('#graphBox .graph_navigation').click(function () {
                Player.openTownsHistoryGraph($(this).attr('page'))
            })
        })
    }
};
IllyToolsCanvas = {
    square_width: 10,
    rules: {
        'primary': {
            'w': {
                "min": 3,
                "max": 99
            },
            'c': {
                "min": 3,
                "max": 99
            },
            'i': {
                "min": 3,
                "max": 99
            },
            's': {
                "min": 3,
                "max": 99
            },
            'f': {
                "min": 7,
                "max": 10
            }
        },
        'secondary': {
            'w': {
                "min": 0,
                "max": 99
            },
            'c': {
                "min": 0,
                "max": 99
            },
            'i': {
                "min": 0,
                "max": 99
            },
            's': {
                "min": 0,
                "max": 99
            },
            'f': {
                "min": 15,
                "max": 99
            }
        },
        'tertiary': {
            'w': {
                "min": 0,
                "max": 99
            },
            'c': {
                "min": 0,
                "max": 99
            },
            'i': {
                "min": 0,
                "max": 99
            },
            's': {
                "min": 0,
                "max": 99
            },
            'f': {
                "min": 11,
                "max": 14
            }
        }
    },
    tiles: {},
    stats: {},
    mapItems: {},
    mapItemGroups: {},
    getIllyToolsCanvasTemplate: function () {
        return $('#it_canvasTemplate').html()
    },
    init: function () {
        $('#sweetspot').html(this.getIllyToolsCanvasTemplate());
        this.loadRulesInInputs();
        $("#sweetspot_enabler").buttonset();
        $("#sweetspot_enabler input").change(function (e) {
            if ($("#sweetspot_enabled").attr('checked')) {
                $("#illytools #sweetspot_wrapper").show();
                settings['sweetspot_enabled'] = 1
            } else {
                $("#illytools  #sweetspot_wrapper").hide();
                settings['sweetspot_enabled'] = 0
            }
            $('#mapDiv').focus()
        });
        $('#buttonFindTiles').click(IllyToolsCanvas.findTiles);
        $('#buttonClearTiles').click(IllyToolsCanvas.clearTiles);
        $('#optionShowCityLimits').click(function () {
            settings.sweetspot_draw_town_limit = $(this).attr('checked');
            IllyToolsCanvas.findTiles()
        });
        $("#redbirds_enabler").buttonset();
        $("#redbirds_enabler input").change(function (e) {
            if ($("#raytruth_enabled").attr('checked')) {
                $("#redbirds_wrapper").show();
                settings['raytruth_enabled'] = 1
            } else {
                $("#redbirds_wrapper").hide();
                settings['raytruth_enabled'] = 0
            }
            $('#mapDiv').focus()
        });
        $('#itDrawRayTruth').click(function (e) {
            IllyToolsCanvas.clearTiles();
            IllyToolsCanvas.drawRayTruth()
        });
        $("#it_truth_angle").keydown(function (e) {
            angle = parseFloat($("#it_truth_angle").val());
            step = parseFloat($('#it_truth_angle_step').val());
            new_angle = angle;
            switch (e.keyCode) {
            case 38:
                new_angle = angle + step;
                break;
            case 40:
                new_angle = angle - step;
                break
            }
            if (new_angle != angle) {
                $("#it_truth_angle").val(Math.round((new_angle) * 100) / 100);
                IllyToolsCanvas.refreshCanvas()
            }
        });
        $('#mapItems-start-capture').click(function (e) {
            settings.mapitems_capture = 1;
            $(this).hide();
            $('#mapItems-stop-capture').show()
        });
        $('#mapItems-stop-capture').click(function (e) {
            settings.mapitems_capture = 0;
            $(this).hide();
            $('#mapItems-start-capture').show()
        });
        $('#mapItems-clear').click(function (e) {
            $('#mapItems tbody, #mapItems-filters td.filters').empty();
            $('#mapItems-nbcaptured').text(0);
            $('#mapItems-nbdisplayed').text(0)
        });
        $('.mapItemGroupFilter').live('change', function (e) {
            e.stopPropagation();
            group = $(this).attr('group');
            if ($(this).is(':checked')) {
                $('.' + group).show();
                IllyToolsCanvas.mapItemGroups[group].active = 1
            } else {
                $('.' + group).hide();
                IllyToolsCanvas.mapItemGroups[group].active = 0
            }
            $('#mapItems-nbdisplayed').text($('#mapItems tbody tr:visible').length)
        });
        $('.mapItemGroupFilter-selectall').live('change', function (e) {
            e.stopPropagation();
            filtertype = $(this).attr('filtertype');
            $("#mapItems-filters .filters input[filtertype='" + filtertype + "']").attr('checked', $(this).is(':checked')).trigger('change')
        });
        $('.mapItems-strikethrough').live('click', function (e) {
            e.stopPropagation();
            $(this).closest('tr').toggleClass('done');
            return false
        })
    },
    refreshCanvas: function () {
        this.clearTiles();
        if (settings.sweetspot_enabled) {
            this.clearTiles();
            this.findTiles()
        }
        if (settings.raytruth_enabled) {
            this.drawRayTruth()
        }
    },
    loadRulesInInputs: function () {
        var c = $('#illytools .main_rule');
        c.each(function (a, b) {
            a = $(b).attr('name').split('|');
            $(b).val(IllyToolsCanvas.rules['primary'][a[0]][a[1]])
        });
        var c = $('#illytools .secondary_rule');
        c.each(function (a, b) {
            a = $(b).attr('name').split('|');
            $(b).val(IllyToolsCanvas.rules['secondary'][a[0]][a[1]])
        });
        var c = $('#illytools .tertiary_rule');
        c.each(function (a, b) {
            a = $(b).attr('name').split('|');
            $(b).val(IllyToolsCanvas.rules['tertiary'][a[0]][a[1]])
        })
    },
    clearTiles: function () {
        var a = IllyToolsCanvas.getIllyToolsCanvas();
        a.width = a.width
    },
    statsReset: function () {
        IllyToolsCanvas.stats = {
            'matching': {}
        };
        $('#sweetStats').html('')
    },
    checkRulesSingleTile: function (f, g) {
        var h = {};
        var i = IllyToolsCanvas.tiles[f][g]['res'];
        $.each(IllyToolsCanvas.rules, function (c, d) {
            var e = 1;
            $.each(d, function (a, b) {
                if (i[a] < b['min'] || i[a] > b['max']) {
                    e = 0;
                    return
                }
            });
            if (e) {
                IllyToolsCanvas.stats['matching'][c] = IllyToolsCanvas.stats['matching'][c] + 1
            }
            h[c] = e
        });
        return h
    },
    findTiles: function () {
        IllyToolsCanvas.clearTiles();
        IllyToolsCanvas.statsReset();
        IllyToolsCanvas.loadRulesinMemory();
        $.each(mapData.data, function (a, b) {
            a = a.split("|");
            xabs = a[1];
            yabs = a[0];
            res = b.rs.split("|");
            if (!IllyToolsCanvas.tiles[xabs]) {
                IllyToolsCanvas.tiles[xabs] = {}
            }
            if (!IllyToolsCanvas.tiles[xabs][yabs]) {
                IllyToolsCanvas.tiles[xabs][yabs] = {
                    'res': {},
                    'matching': {}
                }
            }
            IllyToolsCanvas.tiles[xabs][yabs]['res'] = {
                'w': res[0],
                'c': res[1],
                'i': res[2],
                's': res[3],
                'f': res[4]
            };
            IllyToolsCanvas.tiles[xabs][yabs]['matching'] = IllyToolsCanvas.checkRulesSingleTile(xabs, yabs)
        });
        if (settings.sweetspot_draw_town_limit) {
            IllyToolsCanvas.drawTownLimits()
        }
        IllyToolsCanvas.drawMatchingTiles();
        html_stats_report = "";
        $.each(IllyToolsCanvas.stats['matching'], function (a, b) {
            html_stats_report = html_stats_report + "<li> " + a + " target => " + b + " spot(s) found</li>"
        });
        $('#sweetStats').html("<b>==Stats==</b><ul>" + html_stats_report + "</ul>")
    },
    loadRulesinMemory: function () {
        var c = $('#illytools .main_rule');
        c.each(function (a, b) {
            a = $(b).attr('name').split('|');
            IllyToolsCanvas.rules['primary'][a[0]][a[1]] = parseInt($(b).val())
        });
        var c = $('#illytools .secondary_rule');
        c.each(function (a, b) {
            a = $(b).attr('name').split('|');
            IllyToolsCanvas.rules['secondary'][a[0]][a[1]] = parseInt($(b).val())
        });
        var c = $('#illytools .tertiary_rule');
        c.each(function (a, b) {
            a = $(b).attr('name').split('|');
            IllyToolsCanvas.rules['tertiary'][a[0]][a[1]] = parseInt($(b).val())
        });
        $.each(IllyToolsCanvas.rules, function (a, b) {
            IllyToolsCanvas.stats['matching'][a] = 0
        })
    },
    drawMatchingTiles: function () {
        var f = this.getIllyToolsCanvasContext();
        f.globalAlpha = 0.6;
        $.each(mapData.data, function (d, e) {
            d = d.split("|");
            xabs = d[1];
            yabs = d[0];
            if (IllyToolsCanvas.tiles[xabs][yabs]) {
                $.each(IllyToolsCanvas.tiles[xabs][yabs]['matching'], function (a, b) {
                    if (b) {
                        var c = IllyToolsCanvas.getPxCoordsOnCanvas(xabs, yabs, 'middle');
                        f.fillStyle = settings['matching_colors'][a];
                        f.beginPath();
                        f.arc(c.x, c.y, IllyToolsCanvas.square_width / 2, 0, 2 * Math.PI, true);
                        f.fill()
                    }
                })
            }
        });
        f.globalAlpha = 1
    },
    drawTownLimits: function () {
        var e = 10;
        var f = this.getIllyToolsCanvasContext();
        f.globalAlpha = 0.2;
        var g = mapData.t;
        $.each(g, function (a, b) {
            a = a.split("|");
            xabs = parseInt(a[1]);
            yabs = parseInt(a[0]);
            city_alliance = b.t.ATick;
            color = (b.t.ATick == Player.currentPlayer.ticker) ? settings['city_limit_alliance'] : settings['city_limit_other'];
            var c = IllyToolsCanvas.getPxCoordsOnCanvas(xabs, yabs, 'middle');
            var d = (e + 0.5) * IllyToolsCanvas.square_width;
            f.beginPath();
            f.arc(c.x, c.y, d, 0, 2 * Math.PI, false);
            f.fillStyle = color;
            f.fill();
            f.stroke()
        });
        f.globalAlpha = 1
    },
    drawRayTruth: function () {
        var a = this.getPxCoordsOnCanvas($('#rayPointAx').val(), $('#rayPointAy').val(), 'middle');
        error_margin = parseFloat($('#it_truth_margin_error').val());
        var b = parseFloat($('#it_truth_angle').val());
        var c = b * 0.0174532925;
        var d = (b + error_margin) * 0.0174532925;
        var e = (b - error_margin) * 0.0174532925;
        x1 = Math.cos(c) * 100000;
        y1 = Math.sin(c) * 100000;
        x1_min = Math.cos(d) * 100000;
        y1_min = Math.sin(d) * 100000;
        x1_max = Math.cos(e) * 100000;
        y1_max = Math.sin(e) * 100000;
        extra_target = {
            'x': 0,
            'y': 0,
            'xmin': 0,
            'ymin': 0,
            'ymax': 0,
            'ymax': 0
        };
        extra_target.x = a.x + x1;
        extra_target.y = a.y + y1;
        extra_target.xmin = a.x + x1_min;
        extra_target.ymin = a.y + y1_min;
        extra_target.xmax = a.x + x1_max;
        extra_target.ymax = a.y + y1_max;
        var f = this.getIllyToolsCanvasContext();
        f.shadowBlur = 0;
        f.shadowColor = "black";
        f.globalAlpha = 0;
        f.beginPath();
        f.fillStyle = "red";
        f.globalAlpha = 0.1;
        f.moveTo(a.x, a.y);
        f.lineTo(extra_target.xmin, extra_target.ymin);
        f.lineTo(extra_target.xmax, extra_target.ymax);
        f.lineTo(a.x, a.y);
        f.closePath();
        f.fill();
        f.globalAlpha = 1;
        f.beginPath();
        f.strokeStyle = "black";
        f.moveTo(a.x, a.y);
        f.lineTo(extra_target.x, extra_target.y);
        f.closePath();
        f.stroke();
        f.shadowBlur = 10;
        f.shadowColor = "black";
        var w = IllyToolsCanvas.square_width;
        f.fillStyle = "red";
        f.fillRect(a.x - w / 2, a.y - w / 2, w, w)
    },
    getIllyToolsCanvas: function () {
        if ($('#mapIllyTools').length == 0) {
            illyCanvas = $('#mapGrid').clone(true);
            illyCanvas.attr('id', 'mapIllyTools');
            $('#mapDiv').append(illyCanvas)
        }
        return $('#mapIllyTools')[0]
    },
    getIllyToolsCanvasContext: function () {
        return this.getIllyToolsCanvas().getContext("2d")
    },
    getPxCoordsOnCanvas: function (x, y) {
        var a = 'topleft';
        if (arguments.length == 3) {
            a = arguments[2]
        }
        var b = 500 / (curMapZoom * 2 + 1);
        var c = x - curMapX;
        var d = y - curMapY;
        var e = 500 / 2 - b / 2 + (c * b);
        var f = 500 / 2 - b / 2 - (d * b);
        if (a == 'middle') {
            e = e + b / 2;
            f = f + b / 2
        }
        e = Math.ceil(e);
        f = Math.ceil(f);
        IllyToolsCanvas.square_width = b;
        return {
            'x': e,
            'y': f
        }
    },
    mapItemProcessDetails: function (a, b, c) {
        obj = {
            img: '',
            type: c,
            biome: '',
            size: '',
            name: ''
        };
        var d = ['few', 'handful', 'several', 'pack', 'many', 'gathering', 'horde', 'throng', 'host', 'legion', 'unknown'];
        switch (obj.type) {
        case 'npc':
            obj.size = b.n;
            obj.name = b.d;
            if (jQuery.inArray(obj.size.toLowerCase(), d) == -1) {
                obj.size = '--';
                obj.name = b.d
            }
            obj.img = 'map/flags/' + b.i;
            break;
        case 'resource':
            obj.img = b.rImg;
            var e = /Abandoned (.*)/gi;
            var f = new RegExp(e);
            var m = f.exec(b.d);
            if (m && m[1]) {
                obj.name = m[1].trim()
            }
            break
        }
        obj.name = obj.name.replace('\'', '');
        if (mapData.data[a] && dGVycmFpbg[mapData.data[a].i]) {
            biome = trans(dGVycmFpbg[mapData.data[a].i].o)
        }
        coord = a.split("|");
        xabs = coord[1];
        yabs = coord[0];
        group = obj.name.replace(/ /g, '_');
        if (!IllyToolsCanvas.mapItemGroups[group]) {
            IllyToolsCanvas.mapItemGroups[group] = {
                'label': obj.name,
                'active': 1,
                'type': obj.type,
                'img': obj.img,
                'img_code': obj.img_code
            }
        }
        var g = [];
        if (obj.type == 'resource') {
            if (!b.hImg) {
                a_link = '<a href="#/Trade/Orders/' + xabs + '/' + yabs + '?ActionTypeID=2">' + getIcon('basket_go', 'Harvest resources') + '</a>';
                g.push(a_link)
            }
        } else {
            a_link = '<a href="#/Military/Orders/' + xabs + '/' + yabs + '">' + getIcon('shield_go', 'Send Army') + '</a>';
            g.push(a_link)
        }
        a_diplo = '<a href="#/Diplomatic/Orders/' + xabs + '/' + yabs + '">' + getIcon('user_go', 'Send Diplomats') + '</a>';
        g.push(a_diplo);
        a_map = '<a href="#/World/Map/' + xabs + '/' + yabs + '">' + getIcon('map', 'View in centered in Map') + '</a>';
        g.push(a_map);
        a_strikethrough = ' | <a href="#" class="mapItems-strikethrough">' + getIcon('tick', 'Mark as done') + '</a>';
        g.push(a_strikethrough);
        img_html = '<span title="' + b.d + '">--</span>';
        try {
            if (obj.img) {
                img_html = '<img src="' + ResourceImage(obj.img).img.src + '" width="16px" title="' + b.d + '"/>'
            } else if (obj.img_code) {
                img_html = obj.img_code
            }
        } catch (err) {
            log('Error loading img : ' + obj.img + ', ' + err.message)
        }
        tr = '<tr mapitem="' + a + '" class="' + obj.type + ' ' + group + '">' + '<td class="center">' + img_html + '</td>' + '<td class="center">' + obj.type + '</td>' + '<td class="center">' + obj.size + '</td>' + '<td class="center">' + obj.name + (b.hImg ? ' <img src="' + ResourceImage(b.hImg).img.src + '" width="16px" title="Someone\'s there already..."/>' : '') + '</td>' + '<td class="center">' + obj.biome + '</td>' + '<td class="center">' + getDistance(townX, townY, xabs, yabs) + '</td>' + '<td class="center">' + g.join('&nbsp;') + '</td>' + '</tr>';
        $('#mapItems tbody').append(tr)
    },
    mapItemsProcess: function () {
        if (settings.mapitems_capture && mapData.n) {
            $.each(mapData.n, function (a, b) {
                if (!$('#mapItems tr[mapitem="' + a + '"]').length) {
                    obj = IllyToolsCanvas.mapItemProcessDetails(a, b, 'resource')
                }
            });
            $.each(mapData.c, function (a, b) {
                if (!$('#mapItems tr[mapitem="' + a + '"]').length) {
                    obj = IllyToolsCanvas.mapItemProcessDetails(a, b, 'npc')
                }
            });
            $('#mapItems-filters td').empty();
            $.each(IllyToolsCanvas.mapItemGroups, function (a, b) {
                if (b.img) {
                    img = "<img src='" + ResourceImage(b.img).img.src + "' width='16px' title=''/>"
                } else if (b.img_code) {
                    img = b.img_code
                }
                html = "<input type='checkbox' class='mapItemGroupFilter' group='" + a + "' filtertype='" + b.type + "' " + (b.active ? "checked='checked'" : "") + " id='mapItemGroupFilter-" + a + "'><label for='mapItemGroupFilter-" + a + "'>" + img + b.label + "</label><br/>";
                $('#mapItems-filters td.' + b.type).append(html)
            });
            $('#mapItems-nbcaptured').text($('#mapItems tbody tr').length);
            $('#mapItems-nbdisplayed').text($('#mapItems tbody tr:visible').length);
            replaceIcons('#mapItems')
        }
        if (settings.mapitems_find_ft && mapData.data) {
            $.each(mapData.data, function (d, e) {
                if (e.t == "157") {
                    coord = d.split('|');
                    ItServer.send({
                        action: 'tt',
                        n: 'ft',
                        x: coord[1],
                        y: coord[0],
                        p: PlayerId,
                    }, function (a, b, c) {})
                } else {}
            })
        }
    }
};
ItServer = {
    send: function (d, e) {
        d = $.extend({
            'token': ItServer.token
        }, d);
        $.ajax({
            crossDomain: true,
            type: "GET",
            url: settings.server,
            data: d,
            dataType: "jsonp",
            beforeSend: function (a) {},
            success: function (a, b, c) {
                e(a, b, c)
            }
        })
    }
};
ItSettings = {
    init: function () {
        $('#it-settings-gcchatlogger-enabled').live('click', function (e) {
            e.stopPropagation();
            $("#gcchatlog-dialog-confirm").dialog({
                resizable: false,
                height: 240,
                width: 350,
                modal: true,
                buttons: {
                    "Activate": function () {
                        $(this).dialog("close");
                        settings['log_chat_enabled'] = $('#it-settings-gcchatlogger-enabled').is(':checked');
                        ItStorage.set('illytools_gc_chat_log_enabled', settings['log_chat_enabled'])
                    },
                    "Deactivate": function () {
                        $(this).dialog("close");
                        settings['log_chat_enabled'] = 0;
                        $('#it-settings-gcchatlogger-enabled').attr('checked', false);
                        ItStorage.set('illytools_gc_chat_log_enabled', settings['log_chat_enabled'])
                    }
                }
            });
            ItStorage.set('illytools_gc_chat_log_enabled', 0)
        });
        if (ItStorage.get('illytools_gc_chat_log_enabled', 0) == "true") {
            $('#it-settings-gcchatlogger-enabled').trigger('click')
        }
    }
};
ItChatBrowser = {
    logs: {},
    current_page: -1,
    item_per_page: settings.chat_browser_items_per_page,
    $prev: undefined,
    $next: undefined,
    custom_colors: {},
    color_candidate: 0,
    init: function (x, y) {
        $('#chat-browser').html("chat initialised...");
        var b = $('<a></a>').attr('href', '#').addClass('browser-previous').html('<< Previous');
        var c = $('<a></a>').attr('href', '#').addClass('browser-next').html('Next >>');
        var d = $('<input/>').attr('size', 5).addClass('browser-jump-to');
        $('.chat-browser-pagination').append(b).append(d).append(c);
        ItChatBrowser.$prev = $('.browser-previous');
        ItChatBrowser.$prev.click(function (e) {
            e.stopPropagation();
            ItChatBrowser.loadPrevious();
            return false
        });
        ItChatBrowser.$next = $('.browser-next');
        ItChatBrowser.$next.click(function (e) {
            e.stopPropagation();
            ItChatBrowser.loadNext();
            return false
        });
        ItChatBrowser.$jump_to = $('.browser-jump-to');
        ItChatBrowser.$jump_to.keyup(function (e) {
            e.stopPropagation();
            var a = parseInt($(this).val());
            if (a >= 0) {
                ItChatBrowser.loadLogs(a)
            }
        });
        $('#chat-browser td.playername').live('click', function (e) {
            var a = $(this);
            color_candidate = a.attr('player_id');
            leftVal = e.pageX + "px";
            topVal = e.pageY + "px";
            $('#colorpicker').css({
                left: leftVal,
                top: topVal
            }).show()
        });
        $('#colorpicker a').click(function (e) {
            e.stopPropagation();
            ItChatBrowser.custom_colors[color_candidate] = $(this).attr('rel');
            ItChatBrowser.color_candidate = 0;
            $('#colorpicker').hide();
            ItChatBrowser.loadLogs(ItChatBrowser.current_page);
            return false
        });
        ItChatBrowser.loadLogs(ItChatBrowser.current_page)
    },
    loadPrevious: function () {
        ItChatBrowser.loadLogs(ItChatBrowser.current_page - 1)
    },
    loadNext: function () {
        ItChatBrowser.loadLogs(ItChatBrowser.current_page + 1)
    },
    loadLogs: function (d) {
        if (ItChatBrowser.logs[d] && Object.size(ItChatBrowser.logs[d]) == ItChatBrowser.item_per_page) {
            ItChatBrowser.current_page = parseInt(d);
            ItChatBrowser.refresh()
        } else {
            ItServer.send({
                action: 'browseChat',
                page: d
            }, function (a, b, c) {
                ItChatBrowser.current_page = parseInt(a.page);
                ItChatBrowser.logs[a.page] = a.chats;
                ItChatBrowser.refresh()
            })
        }
    },
    refresh: function () {
        var c = "";
        var d = -1;
        var e = 0;
        $.each(ItChatBrowser.logs[ItChatBrowser.current_page], function (a, b) {
            if (d == -1 || (b.id - d) <= 5) {
                color = ItChatBrowser.custom_colors[b.player_id] ? '#' + ItChatBrowser.custom_colors[b.player_id] : 'inherit';
                c += "<tr class='" + (e ? 'odd' : 'even') + "'><td class='date'>" + toServerDateFull(b.added) + "</td><td class='playername' player_id='" + b.player_id + "' style='background-color:" + color + "'>" + b.player_name + "</td><td class='text' style='background-color:" + color + "'>" + b.text + "</td></tr>"
            } else {
                c += "<tr class='" + (e ? 'odd' : 'even') + "'><td colspan='3' class='missing'><center><i>" + (b.id - d) + " messages missing here</i></center></td></tr>"
            }
            d = b.id;
            e = !e
        });
        $('#chat-browser').html("Page " + ItChatBrowser.current_page + "<br/><table width='100%'>" + c + "</table>");
        ItChatBrowser.$jump_to.val(ItChatBrowser.current_page)
    }
};
ItChat = {
    settings: {
        'heartbeat_min': 2000,
        'heartbeat_max': 30000,
        'heartbeat': 2000,
        'heartbeatcount': 0,
        'heartbeatstep': 10,
        'name': 'anonymous'
    },
    $tabs: undefined,
    chatrooms: {},
    update_count: 0,
    next_update_id: 0,
    init: function (c) {
        ItChat.settings = $.extend(ItChat.settings, c);
        $('#ItChat-welcome').html("Welcome " + Player.currentPlayer.name);
        $('#ItChat-tabs textarea').live('keyup', function (e) {
            e.stopPropagation();
            if (e.keyCode == 13) {
                elt = $(e.currentTarget);
                if (elt.val()) {
                    cid = elt.closest('.ui-tabs-panel').attr('cid');
                    ItChat.update(cid, elt.val());
                    elt.val('')
                }
            }
        });
        ItChat.$tabs = $("#ItChat-tabs").tabs({
            tabTemplate: "<li><a href='#{href}'>#{label}<span class='msg-count'></span></a> <span class='ui-icon ui-icon-close itchat-ui-icon-close' style='float:right'>Remove Tab</span></li>",
            add: function (a, b) {
                $(b.panel).append("<div class='ItChat-content'><center>" + getAjaxIcon('medium') + "</center></div><textarea></textarea>")
            },
            show: function (a, b) {
                elt_content = $('.ItChat-content', b.panel);
                elt_content.animate({
                    scrollTop: elt_content.attr("scrollHeight")
                }, 1e3)
            }
        });
        $("#ItChat-tabs span.itchat-ui-icon-close").live("click", function () {
            if (ItChat.$tabs.tabs('length') > 1) {
                id = $('a', $(this).parent()).attr('href').substring(1);
                var a = $("li", ItChat.$tabs).index($(this).parent());
                ItChat.removeTab(a, id)
            }
        });
        setTimeout(function () {
            ItChat.addChatRoom('illychat')
        }, 500)
    },
    update: function (h, i) {
        clearTimeout(ItChat.next_update_id);
        if (settings.itchat_enabled) {
            var j = '';
            $.each(ItChat.chatrooms, function (a, b) {
                j += b.id + ":" + b.last_chat_id + "|"
            });
            ItServer.send({
                'action': 'illyChat',
                'pid': Player.currentPlayer.id,
                'cid': h,
                'text': i,
                'state': j,
                'pn': Player.currentPlayer.name
            }, function (e, f, g) {
                ItChat.update_count = ItChat.update_count + 1;
                $('#update_count').text(ItChat.update_count);
                itemsfound = 0;
                items_to_notify = 0;
                $.each(e.chats, function (c, d) {
                    if (ItChat.chatrooms[c].last_chat_id == -1) {
                        $('#ItChat-' + c + ' .ItChat-content').empty()
                    }
                    unread = 0;
                    $.each(d, function (a, b) {
                        if ($('#ItChat-' + c + ' div[chat_id=' + a + ']').length == 0) {
                            css_class = (a % 2) ? 'odd' : 'even';
                            line = '<div class="' + css_class + '" chat_id="' + a + '">' + '  <span class="time">' + toServerDateFull(b.created) + '</span>' + '  <span class="name" data="p=' + b.player_name + '|' + b.player_id + '|' + b.ticker + '|' + b.alliance_id + '|' + b.race_id + '|" name="player' + b.player_id + '">' + b.player_name + ':</span>' + '  <span class="text">' + b.text + '</span>' + '</div>';
                            $('#ItChat-' + c + ' .ItChat-content').append(line);
                            ItChat.chatrooms[c].last_chat_id = Math.max(ItChat.chatrooms[c].last_chat_id, a);
                            ItChat.chatrooms[c].unread++;
                            itemsfound++
                        }
                        if (!$('#ItChat-' + c + ' .ItChat-content').is(":visible")) {
                            items_to_notify++
                        }
                    });
                    if ($('#ItChat-' + c + ' .ItChat-content').attr("scrollHeight")) {
                        $('#ItChat-' + c + ' .ItChat-content').animate({
                            scrollTop: $('#ItChat-' + c + ' .ItChat-content').attr("scrollHeight")
                        }, 1e3)
                    }
                });
                if (items_to_notify > 0) {
                    ItChat.notify()
                }
                ItChat.updateTabTitles();
                if (h == undefined) {
                    if (itemsfound > 0) {
                        ItChat.settings.heartbeat = ItChat.settings.heartbeat_min;
                        ItChat.settings.heartbeatcount = 1;
                        $('#heartbeat').text(ItChat.settings.heartbeat + ' ms')
                    } else if (ItChat.settings.heartbeatcount >= ItChat.settings.heartbeatstep) {
                        ItChat.settings.heartbeat *= 2;
                        ItChat.settings.heartbeatcount = 1;
                        if (ItChat.settings.heartbeat > ItChat.settings.heartbeat_max) {
                            ItChat.settings.heartbeat = ItChat.settings.heartbeat_max
                        }
                    } else {
                        ItChat.settings.heartbeatcount += 1
                    }
                    $('#heartbeat').text('refreshes every ' + (ItChat.settings.heartbeat / 1000) + ' s')
                } else {
                    ItChat.settings.heartbeat = ItChat.settings.heartbeat_min
                }
                ItChat.next_update_id = setTimeout(function () {
                    ItChat.update()
                }, ItChat.settings.heartbeat)
            })
        }
    },
    addChatRoom: function (a) {
        a = a.toLowerCase();
        if (a && ItChat.chatrooms[a] == undefined) {
            ItChat.$tabs.tabs("add", "#ItChat-" + a, '#' + a);
            ItChat.chatrooms[a] = {
                'id': a,
                'last_chat_id': -1,
                'unread': 0,
                'autoscroll': 1,
            };
            $("#ItChat-" + a).attr('cid', a);
            $('#ItChat-tabs a[href=#ItChat-' + a + ']').attr('cid', a);
            tab_nb = ItChat.$tabs.tabs("length") - 1;
            ItChat.$tabs.tabs("select", tab_nb);
            ItChat.update(a, '* ' + Player.currentPlayer.name + ' walks in...')
        }
    },
    removeTab: function (a, b) {
        $("#ItChat-dialog-confirm").dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "Close this chat": function () {
                    $(this).dialog("close");
                    cid = $('#' + b).attr('cid');
                    delete ItChat.chatrooms[cid];
                    ItChat.$tabs.tabs("remove", a)
                },
                Cancel: function () {
                    $(this).dialog("close")
                }
            }
        })
    },
    notify: function () {
        if ($('#itchat-notify').attr('checked')) {
            sound_file_url = settings.assets + '/sound/4f_here-I-am.mp3';
            $('#sound_element').html("<embed src='" + sound_file_url + "' hidden=true autostart=true loop=false>")
        }
    },
    updateTabTitles: function () {
        total_unread = 0;
        $.each(ItChat.chatrooms, function (a, b) {
            unread_str = '';
            if ($('#ItChat-' + a + ' .ItChat-content').is(":visible")) {
                ItChat.chatrooms[a].unread = 0;
                b.unread = 0
            } else if (b.unread > 0) {
                unread_str = '(' + b.unread + ')'
            }
            $('#ItChat-tabs a[href=#ItChat-' + a + '] .msg-count').html(unread_str);
            total_unread += b.unread
        });
        $('#tabs a[href=#tabs-itchat]').parent().removeClass('notified');
        unread_str = '';
        if (total_unread > 0) {
            unread_str = '(' + total_unread + ')';
            $('#tabs a[href=#tabs-itchat]').parent().addClass('notified')
        }
        $('#tabs a[href=#tabs-itchat] .msg-count').html(unread_str)
    },
};

function handleAjax(f, g, h) {
    pos = h.url.indexOf('?');
    if (pos > 0) {
        h.url = h.url.substring(0, pos)
    }
    switch (h.url) {
    case '/World/MapData':
    case '/World/MapCanvas':
    case '/World/MapRefresh':
        if (settings.map_indexing_enabled) {
            sendData()
        }
        IllyToolsCanvas.mapItemsProcess();
        IllyToolsCanvas.refreshCanvas();
        break;
    case '/Home/NextEvents':
        break;
    case '/Home/TopNav':
        break;
    case '/Town/UnitProduction/8':
    case '/Town/QueueUnitBuild':
        Player.updateMilitaryProduction(g.responseText);
        break;
    case '/Military':
        Player.citiesData[CurrentTown]['troops'] = Player.extractUnitsValues('troops');
        Player.updateMilitaryOverview();
        break;
    case '/Diplomatic':
        Player.citiesData[CurrentTown]['diplos'] = Player.extractUnitsValues('diplos');
        Player.updateMilitaryOverview();
        break;
    case '/Home/UpdateResources':
        setTimeout(function () {
            Player.setCurrentTown();
            Player.citiesData[CurrentTown]['maxStorage'] = maxStorage;
            Player.updateEmpireView();
            Player.updateGlobalTopNav(g.responseText);
            Player.updateGlobalNextEvents()
        }, 1000);
        break;
    case 'http://elgea-notify.illyriad.co.uk/Chat/Update':
        if (settings.log_chat_enabled && (h.url.startsWith('/Communication/Mail') || h.url.startsWith('/Communication/AlterMail'))) {
            var i = $('<span></span>').text('|');
            i.insertAfter($('input.composeSubmit'));
            $('input', $('#markReadSubmit').parent()).appendTo(i);
            $('input', $('#markUnreadSubmit').parent()).appendTo(i);
            $('<input>').attr('type', 'submit').val('Mark ALL read').addClass('medium').click(function (e) {
                $('input[type=checkbox]').attr('checked', 'checked');
                $('#markReadSubmit').trigger('click')
            }).appendTo(i)
        }
        if (h.url.startsWith('/Communication/ReadMail')) {
            var j = $('#MainContentDiv .info a img[src="/Content/img/icons/xmlicon.png"]');
            if (j.length) {
                var k = function () {
                    $('#submitBattleReportWrapper').html(getAjaxIcon('medium'));
                    ItServer.send({
                        action: 'importBattleReport',
                        ck: m
                    }, function (c, d, e) {
                        if (c.rid != undefined && c.rid > 0) {
                            $('#submitBattleReportWrapper').html("<div class='success'>Success !<br/><a href='http://www.illytools.net/combatReport/" + c.rid + "' target='_blank'>View this report on the tallyboard  (opens a new window)</a></div>")
                        } else {
                            $('#submitBattleReportWrapper').html("Error while importing... see below : ").addClass('failure')
                        }
                        $.each(c.flashes, function (a, b) {
                            $('#submitBattleReportWrapper').append('<br/>').append("<div>" + a + ": " + b + "</div>")
                        })
                    })
                };
                var l = $('<input/>').attr({
                    type: 'button',
                    name: 'submit_battle_report',
                    value: 'Submit this battle report'
                }).addClass("medium").click(k);
                $('#MainContentDiv .info').prepend("<div class='battle-report-submit-box-wrapper'><div><h2><a href='http://www.illytools.net' target='_blank' title='Go to the tallyboard (opens a new window)'>Illytools Tally Board</a></h2><p>You can now submit your battle reports to the Illytools Tally Board. By doing so, you archive your combats and increase your battle stats.</p><br/> <div id='submitBattleReportWrapper'></div></div></div>");
                $('#submitBattleReportWrapper').append(l);
                $('.battle-report-submit-box-wrapper').slideDown();
                var m = j.parent().attr('href')
            }
        }
        if ((itmre == "1" || isAllianceInConsone(Player.currentPlayer.alliance_id)) && h.url.startsWith('/Military/Movements')) {
            itm[CurrentTown] = [];
            $('#MainContentDiv tr').each(function () {
                $this = $(this);
                if ($this.attr('data')) {
                    mvt_data = [];
                    mvt_data.push($this.attr('data'));
                    $tds = $('td', $this);
                    if ($tds.eq(0).find('img').attr('src').indexOf('troop_hi') > 0) {
                        mvt_type = 'hostile'
                    } else {
                        mvt_type = 'neutral'
                    }
                    mvt_data.push(mvt_type);
                    mvt_data.push($tds.eq(1).text().replace(',', '').replace('.', ''));
                    elt = $('a', $tds.eq(2));
                    if (elt.attr('href')) {
                        mvt_data.push(elt.attr('href').split('/')[3])
                    } else {
                        mvt_data.push(0)
                    }
                    mvt_data.push($tds.eq(2).text());
                    mvt_data.push($tds.eq(3).text());
                    $spans = $('span', $tds.eq(4));
                    player = ExtractData($($spans[0]).attr('data'));
                    player_id = player.PlayerName ? player.PlayerId : 0;
                    mvt_data.push(player_id);
                    if ($spans.length == 2) {
                        town = ExtractData($($spans[1]).attr('data'));
                        if (town.TownName) {
                            mvt_data.push(town.TownId);
                            mvt_data.push(town.X);
                            mvt_data.push(town.Y);
                            mvt_data.push(town.RegionId);
                            mvt_data.push('')
                        } else {
                            mvt_data.push(0);
                            mvt_data.push(0);
                            mvt_data.push(0);
                            mvt_data.push(0);
                            mvt_data.push('')
                        }
                    } else {
                        elt_data = $spans.attr('data').substr(2).split('|');
                        mvt_data.push(0);
                        mvt_data.push(elt_data[0]);
                        mvt_data.push(elt_data[1]);
                        mvt_data.push(0);
                        mvt_data.push($spans.text().split(' in ')[1])
                    }
                    elt = $('span', $tds.eq(5)).attr('data').split('|');
                    mvt_data.push(parseInt(elt[0] / 1000));
                    mvt_data.push(parseInt(elt[1] / 1000));
                    mvt_data.push($('#MainContentDiv fieldset').index($this.closest('fieldset')));
                    itm[CurrentTown].push(mvt_data)
                }
            });
            if (itmre == 1 && itmnu == 0) {
                log('sending itm in 10s');
                itmnu = setTimeout(function () {
                    ItServer.send({
                        action: 'itm',
                        d: itm,
                        p: PlayerId
                    }, function (a, b, c) {
                        itmnu = 0
                    })
                }, 10000)
            } else {} if (isAllianceInConsone(Player.currentPlayer.alliance_id)) {
                var n = function () {
                    $('#submitBattleReportWrapper').html(getAjaxIcon('medium'));
                    itm_report = {};
                    itm_report[CurrentTown] = itm[CurrentTown];
                    ItServer.send({
                        action: 'itm',
                        d: itm_report,
                        p: PlayerId
                    }, function (c, d, e) {
                        if (c.created_reports != undefined) {
                            $('#submitBattleReportWrapper').html("<div class='success'>Success !<br/><a href='http://eagleseyrie.freeforums.org/army-movement-page-t653.html' target='_blank'>Access the EE Army movement page (opens a new window)</a></div>");
                            log('Army Mvt imported')
                        } else {
                            $('#submitBattleReportWrapper').html("Error while importing... see below : ").addClass('failure')
                        }
                        $.each(c.flashes, function (a, b) {
                            $('#submitBattleReportWrapper').append('<br/>').append("<div>" + a + ": " + b + "</div>")
                        })
                    })
                };
                var l = $('<input/>').attr({
                    type: 'button',
                    name: 'submit_troop_mvt',
                    value: 'Report troop movements'
                }).addClass("medium").click(n);
                msg_ee = "<div class='battle-report-submit-box-wrapper'><div><h2><a href='http://eagleseyrie.freeforums.org/army-movement-page-t653.html' target='_blank' title='Go to the army movement page (opens a new window)'>Army movements page</a></h2><p>You see this page because you are part of the EE alliance. This block allows you to submit your troops movements. Just click on the button below.<br/><br/>Please submit your movements : <ul><li>when you despatch new units</li><li>when your units land on a square</li><li>when your units leave a square</li></ul></p><br/> <div id='submitBattleReportWrapper'></div></div></div>";
                msg_consone = "<div class='battle-report-submit-box-wrapper'><div><h2>Thanks for reporting your troop movements</h2><p><a href='http://consone.freeforums.org/hostile-incoming-armies-board-t99.html' target='_blank' title='Go to the hostile army page (opens a new window)'>Go to the Hostile Incoming Armies page</a></p><p>You see this page because you are part of the Consone alliance. This block allows you to submit your troops movements. Just click on the button below.<br/><br/>Please submit your movements : <ul><li>when you despatch new units</li><li>when your units land on a square</li><li>when your units leave a square</li></ul></p><br/> <div id='submitBattleReportWrapper'></div></div></div>";
                msg = isAllianceInEE(Player.currentPlayer.alliance_id) ? msg_ee : msg_consone;
                $('#MainContentDiv fieldset').first().prepend(msg);
                $('#submitBattleReportWrapper').append(l);
                $('.battle-report-submit-box-wrapper').slideDown()
            }
        }
    };
    var tsd = {};

    function sendData() {
        data_array = prepareMapData(mapData.data);
        $.each(data_array, function (d, e) {
            ItServer.send({
                action: 'indexTiles',
                tiles: e,
                playerid: PlayerId
            }, function (a, b, c) {
                stats.nb_tilesIndexing++;
                $('#tilesIndexingCount').html(stats.nb_tilesIndexing + ' reports sent');
                $('#tilesIndexingTotal').html(a.total_tiles + ' tiles indexed (' + Math.round(a.total_tiles * 100 * 100 / 4004001) / 100 + '%)')
            })
        })
    };

    function prepareMapData(c) {
        current_item = 0;
        data_string = '';
        data_array = [];
        $.each(c, function (a, b) {
            if (b.sov == undefined) {
                b.sov = 0
            }
            if (b.hos == undefined) {
                b.hos = 0
            }
            data_string = data_string + a + "|" + b.rs + "|" + b.b + "|" + b.t + "|" + b.r + "|" + b.l + "|" + b.i + "|" + b.sov + "|" + b.hos + ':';
            current_item = current_item + 1;
            if (current_item >= settings.map_indexing_chunks) {
                data_array.push(data_string);
                data_string = '';
                current_item = 0
            }
        });
        data_array.push(data_string);
        return data_array
    };

    function getUnitTimeTable(c) {
        marketLvl = buildings[0][9][1];
        caravanTime = (c / (20 + marketLvl)) * 3600;
        var d = {
            'caravan': caravanTime
        };
        $.each(units, function (a, b) {
            race_unit = b[RaceID];
            d[a] = (c / race_unit.speed) * 3600
        });
        return d
    };

    function getDistance(a, b, c, d) {
        distX = c - a;
        distY = d - b;
        return Math.round(hypotenuse(distX, distY) * 100) / 100
    };

    function getTime(a, b) {
        var c = buildings[0][9][1];
        var d = '--';
        if (a == 'caravans') {
            d = (b / (20 + c)) * 3600
        } else {
            race_unit = units[a][RaceID];
            d = (b / race_unit.speed) * 3600
        }
        return secondsToString(d)
    };

    function getDistanceTable() {
        if ($('#distancePointAx').val() == '') {
            $('#distancePointAx').val(townX);
            $('#distancePointAy').val(townY);
            $('#reinitPointA').fadeIn(100).delay(4000).fadeOut(300)
        }
        if ($('#distancePointBx').val() == '') {
            $('#distancePointBx').val(curMapX);
            $('#distancePointBy').val(curMapY);
            $('#reinitPointB').fadeIn(100).delay(4000).fadeOut(300)
        }
        distX = $('#distancePointBx').val() - $('#distancePointAx').val();
        distY = $('#distancePointBy').val() - $('#distancePointAy').val();
        distTotal = Math.round(hypotenuse(distX, distY) * 100) / 100;
        $('#totalDistance').html('<b>' + distTotal + ' squares</b>');
        timeTable = getUnitTimeTable(distTotal);
        var c = "<table width='100%'>";
        var d = 'odd';
        $.each(timeTable, function (a, b) {
            if (units[a] != undefined) {
                image_token = units[a]['img_token'];
                if (a != 'messenger') {
                    image_path = 'icons/diplomatic/' + RaceName + '_' + image_token + '_24.png'
                } else {
                    image_path = 'icons/diplomatic/' + image_token + '_24.png'
                }
                name = units[a][RaceID]['name']
            } else {
                image_path = 'icons/caravan.png';
                name = "Caravans"
            }
            c = c + "<tr class='" + d + " middle'><td style='width:40px;text-align:center'><img src='http://uk1.illyriad.co.uk/Content/img/" + image_path + "' /></td><td>" + name + "</td><td>" + secondsToString(b) + "</td></tr>";
            d = ((d == 'odd') ? 'even' : 'odd')
        });
        c = c + "</table>";
        return c
    };

    function init() {
        RaceID = 1;
        $.each(races, function (a, b) {
            if (RaceName == b.name) {
                RaceID = a
            }
        });
        ItSettings.init();
        Player.init();
        Notepad.init();
        IllyToolsCanvas.init();
        ItChatBrowser.init();
        $("body").ajaxSuccess(handleAjax);
        $("#mapDiv").live("mouseenter mouseleave", function (a) {
            if (a.type == "mouseenter") {
                settings.bind_arrows = 1
            } else {
                settings.bind_arrows = 0
            }
        });
        $(document).keydown(function (e) {
            switch (e.keyCode) {
            case 38:
            case 39:
            case 37:
            case 40:
                if (settings.bind_arrows) {
                    switch (e.keyCode) {
                    case 38:
                        moveNN();
                        break;
                    case 39:
                        moveEE();
                        break;
                    case 37:
                        moveWW();
                        break;
                    case 40:
                        moveSS();
                        break
                    }
                    return false
                }
                break
            }
        });
        $(".it_open").click(function () {
            $(this).hide();
            $('#illytools').dialog('open');
            return false
        });
        $('.collapsible legend').live('click', function (e) {
            $('.fieldset-content', $(this).parent()).slideToggle()
        });
        $("#tabs").tabs();
        $("#quests-accordion").accordion({
            collapsible: true,
            active: false,
            autoHeight: false,
        });
        $("#empire-tabs").tabs();
        $('a').live('click', function (e) {
            var a = $(e.currentTarget);
            if (!a.hasClass('mapHistory')) {
                var b = a.attr('href') != undefined ? a.attr('href') : '';
                if (b.indexOf('World/Map') > 0 && (!b.endsWith('Map') || !a.parents('div.iconBox').length > 0)) {
                    var c = '';
                    if (a.parents('div.popup').length > 0) {
                        c = 'Map'
                    }
                    if (a.parents('div.allianceChat').length > 0) {
                        c = 'AC'
                    }
                    if (a.parents('div.globalChat').length > 0) {
                        c = 'GC'
                    }
                    if (c) {
                        c = " (" + c + ")"
                    }
                    if (b.indexOf("World/Map") >= 0) {
                        $('#link_history').prepend("<li><a class='mapHistory' href='" + b + "'>" + b + "</a>" + c + "</li>")
                    }
                    $('#pointbx').val(curMapX);
                    $('#pointby').val(curMapY);
                    $('#distanceTable').html('calculating...');
                    setTimeout(function () {
                        $('#distanceTable').html(getDistanceTable())
                    }, 1000)
                }
            }
        });
        $('#calculateDistance').click(function (e) {
            $('#distanceTable').html(getDistanceTable())
        });
        $('.captureTownLink').live('click', function (e) {
            $('.pointx', $(this).parent().parent()).val(townX);
            $('.pointy', $(this).parent().parent()).val(townY)
        });
        $('.captureMapLink').live('click', function (e) {
            $('.pointx', $(this).parent().parent()).val(curMapX);
            $('.pointy', $(this).parent().parent()).val(curMapY)
        });
        $("#playerLookup").autocomplete({
            source: function (e, f) {
                $.ajax({
                    url: settings.server,
                    dataType: "jsonp",
                    data: {
                        action: "search",
                        key: "player_name",
                        values: e.term,
                        token: ItServer.token
                    },
                    success: function (c) {
                        var d = [];
                        $.each(c.matches, function (a, b) {
                            alliance_ticker = '';
                            if (b.ticker) {
                                if (b.ticker == Player.currentPlayer.ticker) {
                                    ticker_css = 'ally'
                                } else {
                                    ticker_css = 'neutral'
                                }
                                alliance_ticker = '&nbsp;<span class="' + ticker_css + ' AllianceName">' + b.ticker + '</span>'
                            }
                            d.push({
                                label: b.name + alliance_ticker,
                                value: b.id
                            })
                        });
                        f(d)
                    }
                })
            },
            minLength: 2,
            select: function (a, b) {
                $('#playerLookupHistory').prepend('<a href="#" class="loadPlayerProfile" playerid="' + b.item.value + '">' + b.item.label + '</a>');
                Player.loadProfile(b.item.value);
                return false
            },
            open: function () {},
            close: function () {}
        }).data("autocomplete")._renderItem = function (a, b) {
            return $("<li></li>").data("item.autocomplete", b).append("<a>" + b.label + "</a>").appendTo(a)
        };
        $('#magic_box, #regexp').keyup(function () {
            var a = $('#regexp').val();
            var b = $('#magic_box').val().match(a);
            if (b && b.length == 3) {
                var c = '#/World/Map/' + b[1] + '/' + b[2];
                $('#magic_box_result').html('<a href="' + c + '">' + c + '</a>')
            } else {
                $('#magic_box_result').html(':(')
            }
        });
        $('div.allianceChatSubmit input[type="text"]').unbind().die().live("keydown", function (a) {
            if (a.keyCode == "13") {
                $(this).next().click()
            }
        });
        $('div.globalChatSubmit input[type="text"]').unbind().die().live("keydown", function (a) {
            if (a.keyCode == "13") {
                $(this).next().click()
            }
        });
        $("#itchat_enabler").buttonset();
        $("#itchat_enabler input").change(function (e) {
            if ($("#itchat_enabled").attr('checked')) {
                $("#itchat_wrapper").show();
                ItChat.init();
                settings['itchat_enabled'] = 1
            } else {
                $("#itchat_wrapper").hide();
                settings['itchat_enabled'] = 0
            }
        });
        $("#ref-tabs").tabs();
        trs = "";
        $.each(Items[5], function (a, b) {
            if (b && b[5] != undefined) {
                trs += "<tr>" + "<td>" + (b[3] ? '[@i=5|' + a + ']' : '--') + "</td>" + "<td>" + (b[4] ? b[4] : '--') + "</td>" + "<td>" + (b[5] ? b[5] : '--') + "</td>" + "<td>" + (b[0] ? b[0] : '--') + "</td>" + "<td class='center'>" + (b[7] ? b[7] : '--') + "</td>" + "<td class='center'>" + (b[8] ? b[8] : '--') + "</td>" + "<td class='center'>" + (b[9] ? b[9] : '--') + "</td>" + "<td class='center'>" + (b[11] ? b[11] : '--') + "</td>" + "<td class='center'>" + (b[12] ? b[12] : '--') + "</td>" + "<td class='center'>" + (b[13] ? b[13] : '--') + "</td>" + "<td class='center'>" + (b[14] ? b[14] : '--') + "</td>" + "<td class='center'>" + (b[15] ? b[15] : '--') + "</td>" + "</tr>"
            } else {}
        });
        $('#ref-units tbody').append(trs);
        replaceIcons('#ref-units');
        setTimeout(function () {
            $('input#ref-units-search').quicksearch('table#ref-units tbody tr')
        }, 5000);
        town_sizes = [0, 20, 50, 80, 120, 200, 350, 500, 750, 1100, 2e3, 3e3, 5e3, 7500, 1e4, 13e3, 17e3, 21e3, 25e3];
        trs = "";
        $.each(town_sizes, function (a, b) {
            trs += "<tr>" + "<td class='center'>" + b + "</td>" + "<td class='center'>" + (town_sizes[a + 1] ? town_sizes[a + 1] : 'Inf.') + "</td>" + "<td class='center'>" + CitySizeName(b) + "</td>" + "<td class='center'><img src='http://img6.illyriad.co.uk/img/map/towns/" + constants.human_race_id + "/" + CitySize(b) + ".png' alt='town'/></td>" + "<td class='center'><img src='http://img6.illyriad.co.uk/img/map/towns/" + constants.elf_race_id + "/" + CitySize(b) + ".png' alt='town'/></td>" + "<td class='center'><img src='http://img6.illyriad.co.uk/img/map/towns/" + constants.dwarf_race_id + "/" + CitySize(b) + ".png' alt='town'/></td>" + "<td class='center'><img src='http://img6.illyriad.co.uk/img/map/towns/" + constants.orc_race_id + "/" + CitySize(b) + ".png' alt='town'/></td>" + "</tr>"
        });
        $('#ref-town-size tbody').append(trs);
        $('#illytools').dialog({
            resizable: 1,
            width: 650,
            minWidth: 150,
            maxWidth: 800,
            position: ['right', 'top'],
            title: 'Illytools v' + settings.version,
            close: closeIllytools,
            open: openIllytools,
            autoOpen: false
        });
        $('a.make-sortable').live('click', function (e) {
            e.stopPropagation();
            $table = $(this).siblings('table');
            $table.attr('id', 'illysort');
            $('#illysort').tablesorter();
            log("TableSorter init");
            log($('#illysort'));
            return false
        });
        log('IllyTools Loaded and ready !');
        if (ItStorage.get('illytool_state', 0) == "1") {
            log('Reopening Illytools, according to last state.');
            $('.it_open').trigger('click')
        }
        setTimeout(function () {
            if (isAllianceInConsone(Player.currentPlayer.alliance_id)) {
                var f = function () {
                    $('#submitTroopReportWrapper .ajaxicon').remove();
                    $('#submitTroopReportWrapper').append(getAjaxIcon('medium'));
                    itr = {};
                    $.each(Player.citiesData, function (c, d) {
                        itr[c] = {
                            'm': {},
                            'd': {}
                        };
                        $.each(d.troops, function (a, b) {
                            a = a.split('|');
                            a = a[1];
                            itr[c]['m'][a] = b.count
                        });
                        $.each(d.diplos, function (a, b) {
                            a = a.split('|');
                            a = a[1];
                            itr[c]['d'][a] = b.count
                        })
                    });
                    ItServer.send({
                        action: 'itr',
                        r: itr,
                        p: PlayerId
                    }, function (c, d, e) {
                        $('#submitTroopReportWrapper .ajaxicon').remove();
                        if (c.created_reports != undefined) {
                            $('#submitTroopReportWrapper').append("<div class='status success'>Success !<br/></div>");
                            log('Troop report imported')
                        } else {
                            $('#submitTroopReportWrapper').append("<div class='status failure'>Error while importing... see below :<br/></div>")
                        }
                        $.each(c.flashes, function (a, b) {
                            $('#submitTroopReportWrapper').append("<div class='status'><br/><div>" + a + ": " + b + "</div></div>")
                        })
                    })
                };
                var g = $('<input/>').attr({
                    type: 'button',
                    name: 'submit_troop_report',
                    value: 'Submit troop count'
                }).addClass("medium").click(f);
                msg_ee = "<div class='troop-report-submit-box-wrapper'><div><h2>Report your troop count to EE's leadership</h2><p>You see this block because you are part of the EE alliance.<br/>Once all the troops are loaded in this page (table below is filled), please click on the \"Submit troop count\" button</p><div id='submitTroopReportWrapper'></div></div></div>";
                msg_consone = "<div class='troop-report-submit-box-wrapper'><div><h2>Report your troop count to Consone's leadership</h2><p>You see this block because you are part of the Consone confederation.<br/>Once all the troops are loaded in this page (table below is filled), please click on the \"Submit troop count\" button</p><div id='submitTroopReportWrapper'></div></div></div>";
                msg = isAllianceInEE(Player.currentPlayer.alliance_id) ? msg_ee : msg_consone;
                $('#tabs-empiremilitaryoverview').prepend(msg);
                $('#submitTroopReportWrapper').append(g);
                $('.troop-report-submit-box-wrapper').slideDown()
            }
        }, 8000)
    };
    closeIllytools = function () {
        log('Closing Illytools window');
        ItStorage.set('illytool_state', 0);
        $('.it_open').show()
    };
    openIllytools = function () {
        log('Opening Illytools window');
        ItStorage.set('illytool_state', 1)
    };
    report = function () {
        ItStorage.init();
        if (PlayerId) {
            log('Contacting server...');
            var h = ItStorage.get('sitter', PlayerId);
            var i = jstz.determine_timezone();
            ItServer.send({
                action: 'reportStats',
                version: settings.version,
                browser: navigator.userAgent,
                player_id: PlayerId,
                s: h,
                h: $(window).height(),
                w: $(window).width(),
                tzo: i.offset(),
                tzn: i.name(),
                tzd: i.dst()
            }, function (e, f, g) {
                log('Server replied');
                if (e.token) {
                    log('Valid');
                    ItServer.token = e.token;
                    ItServer.iuid = e.iuid;
                    itmre = e.itmre;
                    ItStorage.set('sitter', -1);
                    ItServer.send({
                        action: 'getTemplates'
                    }, function (a, b, c) {
                        $(document.body).append(a.templates);
                        log('Templates loaded...');
                        var d = document.createElement('script');
                        d.setAttribute('src', settings.static + '/jquery.plugins.min.js');
                        d.setAttribute('type', 'text/javascript');
                        document.getElementsByTagName('head')[0].appendChild(d);
                        init()
                    });
                    setTimeout(function () {
                        ping()
                    }, 300000);
                    window.onbeforeunload = ping;
                    $('img.logout').click(function () {
                        ping();
                        log('click on logout');
                        return false
                    })
                } else {
                    log('Invalid');
                    log("Sorry... there was an error during Illytools init...")
                }
            })
        } else {
            log('No PlayerId... retrying in 2 seconds...');
            setTimeout(function () {
                report()
            }, 2000)
        }
    };
    ping = function () {
        ItServer.send({
            action: 'ping',
            iuid: ItServer.iuid,
        }, function (a, b, c) {});
        setTimeout(function () {
            ping()
        }, 300000)
    };
    var jstz = function () {
        var b = function (a) {
            a = -a.getTimezoneOffset();
            return a !== null ? a : 0
        }, d = function () {
                return b(new Date(2010, 0, 1, 0, 0, 0, 0))
            }, e = function () {
                return b(new Date(2010, 5, 1, 0, 0, 0, 0))
            }, c = function () {
                var a = d(),
                    b = e(),
                    f = d() - e();
                if (f < 0) return a + ",1";
                else if (f > 0) return b + ",1,s";
                return a + ",0"
            };
        return {
            determine_timezone: function () {
                var a = c();
                return new jstz.TimeZone(jstz.olson.timezones[a])
            },
            date_is_dst: function (a) {
                var c = a.getMonth() > 5 ? e() : d(),
                    a = b(a);
                return c - a !== 0
            }
        }
    }();
    jstz.TimeZone = function () {
        var b = null,
            d = null,
            e = null,
            c = function (a) {
                e = a[0];
                b = a[1];
                d = a[2];
                if (typeof jstz.olson.ambiguity_list[b] !== "undefined")
                    for (var a = jstz.olson.ambiguity_list[b], c = a.length, f = 0, g = a[0]; f < c; f += 1)
                        if (g = a[f], jstz.date_is_dst(jstz.olson.dst_start_dates[g])) {
                            b = g;
                            break
                        }
            };
        c.prototype = {
            constructor: jstz.TimeZone,
            name: function () {
                return b
            },
            dst: function () {
                return d
            },
            offset: function () {
                return e
            }
        };
        return c
    }();
    jstz.olson = {};
    jstz.olson.timezones = function () {
        return {
            "-720,0": ["-12:00", "Etc/GMT+12", !1],
            "-660,0": ["-11:00", "Pacific/Pago_Pago", !1],
            "-600,1": ["-11:00", "America/Adak", !0],
            "-660,1,s": ["-11:00", "Pacific/Apia", !0],
            "-600,0": ["-10:00", "Pacific/Honolulu", !1],
            "-570,0": ["-09:30", "Pacific/Marquesas", !1],
            "-540,0": ["-09:00", "Pacific/Gambier", !1],
            "-540,1": ["-09:00", "America/Anchorage", !0],
            "-480,1": ["-08:00", "America/Los_Angeles", !0],
            "-480,0": ["-08:00", "Pacific/Pitcairn", !1],
            "-420,0": ["-07:00", "America/Phoenix", !1],
            "-420,1": ["-07:00", "America/Denver", !0],
            "-360,0": ["-06:00", "America/Guatemala", !1],
            "-360,1": ["-06:00", "America/Chicago", !0],
            "-360,1,s": ["-06:00", "Pacific/Easter", !0],
            "-300,0": ["-05:00", "America/Bogota", !1],
            "-300,1": ["-05:00", "America/New_York", !0],
            "-270,0": ["-04:30", "America/Caracas", !1],
            "-240,1": ["-04:00", "America/Halifax", !0],
            "-240,0": ["-04:00", "America/Santo_Domingo", !1],
            "-240,1,s": ["-04:00", "America/Asuncion", !0],
            "-210,1": ["-03:30", "America/St_Johns", !0],
            "-180,1": ["-03:00", "America/Godthab", !0],
            "-180,0": ["-03:00", "America/Argentina/Buenos_Aires", !1],
            "-180,1,s": ["-03:00", "America/Montevideo", !0],
            "-120,0": ["-02:00", "America/Noronha", !1],
            "-120,1": ["-02:00", "Etc/GMT+2", !0],
            "-60,1": ["-01:00", "Atlantic/Azores", !0],
            "-60,0": ["-01:00", "Atlantic/Cape_Verde", !1],
            "0,0": ["00:00", "Etc/UTC", !1],
            "0,1": ["00:00", "Europe/London", !0],
            "60,1": ["+01:00", "Europe/Berlin", !0],
            "60,0": ["+01:00", "Africa/Lagos", !1],
            "60,1,s": ["+01:00", "Africa/Windhoek", !0],
            "120,1": ["+02:00", "Asia/Beirut", !0],
            "120,0": ["+02:00", "Africa/Johannesburg", !1],
            "180,1": ["+03:00", "Europe/Moscow", !0],
            "180,0": ["+03:00", "Asia/Baghdad", !1],
            "210,1": ["+03:30", "Asia/Tehran", !0],
            "240,0": ["+04:00", "Asia/Dubai", !1],
            "240,1": ["+04:00", "Asia/Yerevan", !0],
            "270,0": ["+04:30", "Asia/Kabul", !1],
            "300,1": ["+05:00", "Asia/Yekaterinburg", !0],
            "300,0": ["+05:00", "Asia/Karachi", !1],
            "330,0": ["+05:30", "Asia/Kolkata", !1],
            "345,0": ["+05:45", "Asia/Kathmandu", !1],
            "360,0": ["+06:00", "Asia/Dhaka", !1],
            "360,1": ["+06:00", "Asia/Omsk", !0],
            "390,0": ["+06:30", "Asia/Rangoon", !1],
            "420,1": ["+07:00", "Asia/Krasnoyarsk", !0],
            "420,0": ["+07:00", "Asia/Jakarta", !1],
            "480,0": ["+08:00", "Asia/Shanghai", !1],
            "480,1": ["+08:00", "Asia/Irkutsk", !0],
            "525,0": ["+08:45", "Australia/Eucla", !0],
            "525,1,s": ["+08:45", "Australia/Eucla", !0],
            "540,1": ["+09:00", "Asia/Yakutsk", !0],
            "540,0": ["+09:00", "Asia/Tokyo", !1],
            "570,0": ["+09:30", "Australia/Darwin", !1],
            "570,1,s": ["+09:30", "Australia/Adelaide", !0],
            "600,0": ["+10:00", "Australia/Brisbane", !1],
            "600,1": ["+10:00", "Asia/Vladivostok", !0],
            "600,1,s": ["+10:00", "Australia/Sydney", !0],
            "630,1,s": ["+10:30", "Australia/Lord_Howe", !0],
            "660,1": ["+11:00", "Asia/Kamchatka", !0],
            "660,0": ["+11:00", "Pacific/Noumea", !1],
            "690,0": ["+11:30", "Pacific/Norfolk", !1],
            "720,1,s": ["+12:00", "Pacific/Auckland", !0],
            "720,0": ["+12:00", "Pacific/Tarawa", !1],
            "765,1,s": ["+12:45", "Pacific/Chatham", !0],
            "780,0": ["+13:00", "Pacific/Tongatapu", !1],
            "840,0": ["+14:00", "Pacific/Kiritimati", !1]
        }
    }();
    jstz.olson.dst_start_dates = function () {
        return {
            "America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0),
            "America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0),
            "America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0),
            "America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0),
            "Atlantic/Stanley": new Date(2011, 8, 4, 7, 0, 0, 0),
            "America/Asuncion": new Date(2011, 9, 2, 3, 0, 0, 0),
            "America/Santiago": new Date(2011, 9, 9, 3, 0, 0, 0),
            "America/Campo_Grande": new Date(2011, 9, 16, 5, 0, 0, 0),
            "America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0),
            "America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0),
            "America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0),
            "America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0),
            "America/Havana": new Date(2011, 2, 13, 2, 0, 0, 0),
            "America/New_York": new Date(2011, 2, 13, 7, 0, 0, 0),
            "Asia/Gaza": new Date(2011, 2, 26, 23, 0, 0, 0),
            "Asia/Beirut": new Date(2011, 2, 27, 1, 0, 0, 0),
            "Europe/Minsk": new Date(2011, 2, 27, 2, 0, 0, 0),
            "Europe/Helsinki": new Date(2011, 2, 27, 4, 0, 0, 0),
            "Europe/Istanbul": new Date(2011, 2, 28, 5, 0, 0, 0),
            "Asia/Damascus": new Date(2011, 3, 1, 2, 0, 0, 0),
            "Asia/Jerusalem": new Date(2011, 3, 1, 6, 0, 0, 0),
            "Africa/Cairo": new Date(2010, 3, 30, 4, 0, 0, 0),
            "Asia/Yerevan": new Date(2011, 2, 27, 4, 0, 0, 0),
            "Asia/Baku": new Date(2011, 2, 27, 8, 0, 0, 0),
            "Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0),
            "Pacific/Fiji": new Date(2010, 11, 29, 23, 0, 0, 0),
            "America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0),
            "America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0),
            "America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0),
            "America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0)
        }
    }();
    jstz.olson.ambiguity_list = {
        "America/Denver": ["America/Denver", "America/Mazatlan"],
        "America/Chicago": ["America/Chicago", "America/Mexico_City"],
        "America/Asuncion": ["Atlantic/Stanley", "America/Asuncion", "America/Santiago", "America/Campo_Grande"],
        "America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"],
        "Asia/Beirut": "Asia/Gaza,Asia/Beirut,Europe/Minsk,Europe/Helsinki,Europe/Istanbul,Asia/Damascus,Asia/Jerusalem,Africa/Cairo".split(","),
        "Asia/Yerevan": ["Asia/Yerevan", "Asia/Baku"],
        "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
        "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
        "America/New_York": ["America/Havana", "America/New_York"],
        "America/Halifax": ["America/Goose_Bay", "America/Halifax"],
        "America/Godthab": ["America/Miquelon", "America/Godthab"]
    };
    $(document).ready(function () {
        $.ajaxSetup({
            cache: false
        });
        report()
    });
};
